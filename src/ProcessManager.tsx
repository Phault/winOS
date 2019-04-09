import { Program } from "./apps/framework/Program.interface";
import { OS } from './App';
import { decorate, computed } from "mobx";

export interface Process<T = any, R = any> {
    program: Program<T>;
    args?: T;
    promise: Promise<R>,
}

class ProcessManager {
    private _running: Process[] = [];

    constructor(private os: OS) { }

    get running(): ReadonlyArray<Process> {
        return this._running;
    }

    async run<T, R>(program: Program<T, R>, args?: T): Promise<R> {
        const process: Process = {
            program,
            args,
            promise: program.run(this.os, args)
        };

        this._running.push(process);

        process.promise.finally(() => {
            this._running.splice(this.running.indexOf(process));
        });

        return await process.promise;
    }
}

decorate(ProcessManager, {
    running: computed
});

export { ProcessManager };