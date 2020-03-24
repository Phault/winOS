import { Program } from '../Program.interface';
import { OS } from '../OS';
import { computed } from 'mobx';

export interface Process {
  program: Program;
  args?: string;
  promise: Promise<number | void>;
}

export class ProcessManager {
  private _running: Process[] = [];

  constructor(private os: OS) {}

  @computed
  get running(): ReadonlyArray<Process> {
    return this._running;
  }

  async run(program: Program, args?: string): Promise<number | void> {
    const process: Process = {
      program,
      args,
      promise: program.run(this.os, args),
    };

    this._running.push(process);

    process.promise.finally(() => {
      this._running.splice(this.running.indexOf(process));
    });

    return await process.promise;
  }
}
