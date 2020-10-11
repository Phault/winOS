import { OS } from '../OS';

export type Executable = (
  this: ProcessContext,
  args: string[]
) => Promise<void>;

export interface Process {
  id: number;
  command: string;
  userName: string;
}

export interface ProcessContext extends Process {
  os: OS;
  environment: Record<string, string>;
  workingDirectory: string;
}

export interface ProcessStartInfo {
  fileName: string;
  arguments: string[];
  userName: string;
  workingDirectory: string;
  environment: Record<string, string>;
}

export interface ProcessStartInfoInput extends Partial<ProcessStartInfo> {
  fileName: string;
}

export class ProcessManager {
  private _processes: Process[] = [];
  private _nextId = 0;

  constructor(private os: OS) {}

  start(fileName: string, ...args: string[]): Promise<Process> {
    return this.startWithInfo({
      fileName,
      arguments: args,
    });
  }

  async startWithInfo(startInfo: ProcessStartInfoInput): Promise<Process> {
    const contents = this.os.fileSystem.readFileSync(
      startInfo.fileName,
      'utf8'
    );

    const base64code = 'data:application/javascript;base64,' + btoa(contents);

    const entryPoint = (await import(/* webpackIgnore: true */ base64code))
      .main;
    return this.startFromMemory(entryPoint, startInfo);
  }

  startFromMemory(
    entryPoint: Executable,
    startInfo: ProcessStartInfoInput
  ): Process {
    const fullStartInfo: ProcessStartInfo = {
      arguments: [],
      environment: {
        OS: 'Windows_NT',
        PATH: '%SystemRoot%;%SystemRoot%/System32',
        TEMP: '%SystemRoot%/TEMP',
        TMP: '%SystemRoot%/TEMP',
      },
      workingDirectory: '%SystemRoot%/System32',
      userName: 'SYSTEM',
      ...startInfo,
    };

    const process: ProcessContext = {
      ...fullStartInfo,
      id: this.getNextId(),
      command: 'placeholder.exe',
      os: this.os,
    };

    try {
      this._processes.push(process);

      const promise = entryPoint.apply(process, [fullStartInfo.arguments]);

      promise.finally(() => {
        this._processes.splice(this._processes.indexOf(process));
      });

      // todo: store this promise so we can await it in wait()
    } catch (e) {
      console.error('process exited with an error', process, e);
    }

    return process;
  }

  // async wait(process: Process) {}

  // kill(process: Process) {}

  private getNextId() {
    return this._nextId++;
  }
}
