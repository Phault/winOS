import {
  FileSystem,
  FileSystemOptions,
  BFSCallback,
  BFSOneArgCallback,
} from 'browserfs/dist/node/core/file_system';
import { EventEmitter } from 'events';
import Stats from 'browserfs/dist/node/core/node_fs_stats';
import { FileFlag } from 'browserfs/dist/node/core/file_flag';
import { File } from 'browserfs/dist/node/core/file';

export type WatchEventType =
  | 'add'
  | 'addDir'
  | 'change'
  | 'unlink'
  | 'unlinkDir'
  | 'any';

export interface WatchableFSOptions {
  wrapped: FileSystem;
}

export interface WatchableFS extends EventEmitter {
  prependListener(
    type: 'any',
    listener: (type: WatchEventType, path: string) => void
  ): this;
  prependListener(type: WatchEventType, listener: (path: string) => void): this;
  prependOnceListener(
    type: 'any',
    listener: (type: WatchEventType, path: string) => void
  ): this;
  prependOnceListener(
    type: WatchEventType,
    listener: (path: string) => void
  ): this;
  addListener(
    type: 'any',
    listener: (type: WatchEventType, path: string) => void
  ): this;
  addListener(type: WatchEventType, listener: (path: string) => void): this;
  removeListener(
    type: 'any',
    listener: (type: WatchEventType, path: string) => void
  ): this;
  removeListener(type: WatchEventType, listener: (path: string) => void): this;
  removeAllListeners(type: WatchEventType): this;
  once(
    type: 'any',
    listener: (type: WatchEventType, path: string) => void
  ): this;
  once(type: WatchEventType, listener: (path: string) => void): this;
  on(type: 'any', listener: (type: WatchEventType, path: string) => void): this;
  on(type: WatchEventType, listener: (path: string) => void): this;
  off(
    type: 'any',
    listener: (type: WatchEventType, path: string) => void
  ): this;
  off(type: WatchEventType, listener: (path: string) => void): this;
  emit(type: WatchEventType, path: string): boolean;
}

export class WatchableFS extends EventEmitter implements FileSystem {
  public static readonly Name = 'WatchableFS';

  public static readonly Options: FileSystemOptions = {
    wrapped: {
      type: 'object',
      description: 'The file system to wrap',
      optional: false,
    },
  };

  public static Create(
    opts: WatchableFSOptions,
    cb: BFSCallback<WatchableFS>
  ): void {
    try {
      const fs = new WatchableFS(opts.wrapped);
      cb(undefined, fs);
    } catch (e) {
      cb(e);
    }
  }
  public static isAvailable(): boolean {
    return true;
  }

  public _wrapped: FileSystem;

  private constructor(wrapped: FileSystem) {
    super();

    this._wrapped = wrapped;
  }

  public getName(): string {
    return this._wrapped.getName();
  }

  public diskSpace(p: string, cb: (total: number, free: number) => any): void {
    return this._wrapped.diskSpace(p, cb);
  }

  public isReadOnly(): boolean {
    return this._wrapped.isReadOnly();
  }

  public supportsLinks(): boolean {
    return this._wrapped.supportsProps();
  }

  public supportsProps(): boolean {
    return this._wrapped.supportsProps();
  }

  public supportsSynch(): boolean {
    return this._wrapped.supportsSynch();
  }

  public rename(oldPath: string, newPath: string, cb: BFSOneArgCallback): void {
    this.stat(oldPath, false, (_statError, oldStats) => {
      this._wrapped.rename(oldPath, newPath, renameError => {
        if (renameError) {
          cb(renameError);
          return;
        }

        if (oldPath === newPath || !oldStats) return;

        if (oldStats.isFile()) {
          this.emit('unlink', oldPath);
          this.emit('add', newPath);
        } else {
          this.emit('unlinkDir', oldPath);
          this.emit('addDir', newPath);
        }
      });
    });
  }

  public renameSync(oldPath: string, newPath: string): void {
    const oldStats = this.statSync(oldPath, false);

    this._wrapped.renameSync(oldPath, newPath);

    if (oldPath === newPath) return;

    if (oldStats.isFile()) {
      this.emit('unlink', oldPath);
      this.emit('add', newPath);
    } else {
      this.emit('unlinkDir', oldPath);
      this.emit('addDir', newPath);
    }
  }

  public stat(
    p: string,
    isLstat: boolean | null,
    cb: BFSCallback<Stats>
  ): void {
    return this._wrapped.stat(p, isLstat, cb);
  }

  public statSync(p: string, isLstat: boolean | null): Stats {
    return this._wrapped.statSync(p, isLstat);
  }

  public open(
    p: string,
    flag: FileFlag,
    mode: number,
    cb: BFSCallback<File>
  ): void {
    return this._wrapped.open(p, flag, mode, cb);
  }

  public openSync(p: string, flag: FileFlag, mode: number): File {
    return this._wrapped.openSync(p, flag, mode);
  }

  public unlink(p: string, cb: BFSOneArgCallback): void {
    this._wrapped.unlink(p, e => {
      if (!e) this.emit('unlink', p);

      cb(e);
    });
  }

  public unlinkSync(p: string): void {
    this._wrapped.unlinkSync(p);
    this.emit('unlink', p);
  }

  public rmdir(p: string, cb: BFSOneArgCallback): void {
    this._wrapped.rmdir(p, e => {
      if (!e) this.emit('unlinkDir', p);

      cb(e);
    });
  }

  public rmdirSync(p: string): void {
    this._wrapped.rmdirSync(p);
    this.emit('unlinkDir', p);
  }

  public mkdir(p: string, mode: number, cb: BFSOneArgCallback): void {
    this._wrapped.mkdir(p, mode, e => {
      if (!e) this.emit('addDir', p);

      cb(e);
    });
  }

  public mkdirSync(p: string, mode: number): void {
    this._wrapped.mkdirSync(p, mode);
    this.emit('addDir', p);
  }

  public readdir(p: string, cb: BFSCallback<string[]>): void {
    return this._wrapped.readdir(p, cb);
  }

  public readdirSync(p: string): string[] {
    return this._wrapped.readdirSync(p);
  }

  public exists(p: string, cb: (exists: boolean) => void): void {
    return this._wrapped.exists(p, cb);
  }

  public existsSync(p: string): boolean {
    return this._wrapped.existsSync(p);
  }

  public realpath(
    p: string,
    cache: { [path: string]: string },
    cb: BFSCallback<string>
  ): void {
    return this._wrapped.realpath(p, cache, cb);
  }

  public realpathSync(p: string, cache: { [path: string]: string }): string {
    return this._wrapped.realpathSync(p, cache);
  }

  public truncate(p: string, len: number, cb: BFSOneArgCallback): void {
    return this._wrapped.truncate(p, len, cb);
  }

  public truncateSync(p: string, len: number): void {
    return this._wrapped.truncateSync(p, len);
  }

  public readFile(
    fname: string,
    encoding: string | null,
    flag: FileFlag,
    cb: BFSCallback<string | Buffer>
  ): void {
    return this._wrapped.readFile(fname, encoding, flag, cb);
  }

  public readFileSync(
    fname: string,
    encoding: string | null,
    flag: FileFlag
  ): any {
    return this._wrapped.readFileSync(fname, encoding, flag);
  }

  public writeFile(
    fname: string,
    data: any,
    encoding: string | null,
    flag: FileFlag,
    mode: number,
    cb: BFSOneArgCallback
  ): void {
    this.exists(fname, exists => {
      this._wrapped.writeFile(fname, data, encoding, flag, mode, cb);

      if (exists) this.emit('change', fname);
      else this.emit('add', fname);
    });
  }

  public writeFileSync(
    fname: string,
    data: string | Buffer,
    encoding: string | null,
    flag: FileFlag,
    mode: number
  ): void {
    const exists = this.existsSync(fname);

    this._wrapped.writeFileSync(fname, data, encoding, flag, mode);

    if (exists) this.emit('change', fname);
    else this.emit('add', fname);
  }

  public appendFile(
    fname: string,
    data: string | Buffer,
    encoding: string | null,
    flag: FileFlag,
    mode: number,
    cb: BFSOneArgCallback
  ): void {
    return this._wrapped.appendFile(fname, data, encoding, flag, mode, cb);
  }

  public appendFileSync(
    fname: string,
    data: string | Buffer,
    encoding: string | null,
    flag: FileFlag,
    mode: number
  ): void {
    return this._wrapped.appendFileSync(fname, data, encoding, flag, mode);
  }

  public chmod(
    p: string,
    isLchmod: boolean,
    mode: number,
    cb: BFSOneArgCallback
  ): void {
    return this._wrapped.chmod(p, isLchmod, mode, cb);
  }

  public chmodSync(p: string, isLchmod: boolean, mode: number): void {
    return this._wrapped.chmodSync(p, isLchmod, mode);
  }

  public chown(
    p: string,
    isLchown: boolean,
    uid: number,
    gid: number,
    cb: BFSOneArgCallback
  ): void {
    return this._wrapped.chown(p, isLchown, uid, gid, cb);
  }

  public chownSync(
    p: string,
    isLchown: boolean,
    uid: number,
    gid: number
  ): void {
    return this._wrapped.chownSync(p, isLchown, uid, gid);
  }

  public utimes(
    p: string,
    atime: Date,
    mtime: Date,
    cb: BFSOneArgCallback
  ): void {
    return this._wrapped.utimes(p, atime, mtime, cb);
  }

  public utimesSync(p: string, atime: Date, mtime: Date): void {
    return this._wrapped.utimesSync(p, atime, mtime);
  }

  public link(srcpath: string, dstpath: string, cb: BFSOneArgCallback): void {
    return this._wrapped.link(srcpath, dstpath, cb);
  }

  public linkSync(srcpath: string, dstpath: string): void {
    return this._wrapped.linkSync(srcpath, dstpath);
  }

  public symlink(
    srcpath: string,
    dstpath: string,
    type: string,
    cb: BFSOneArgCallback
  ): void {
    return this._wrapped.symlink(srcpath, dstpath, type, cb);
  }

  public symlinkSync(srcpath: string, dstpath: string, type: string): void {
    return this._wrapped.symlinkSync(srcpath, dstpath, type);
  }

  public readlink(p: string, cb: BFSCallback<string>): void {
    return this._wrapped.readlink(p, cb);
  }

  public readlinkSync(p: string): string {
    return this._wrapped.readlinkSync(p);
  }

  public emit(type: WatchEventType, path: string) {
    super.emit('any', type, path);
    return super.emit(type, path);
  }
}
