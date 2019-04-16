import { FSModule } from "browserfs/dist/node/core/FS";
import * as path from 'bfs-path';

/**
 * Remove directory recursively
 * @param {FSModule} fs
 * @param {string} dir_path
 * @see https://stackoverflow.com/a/42505874/3027390
 */
export function rimraf(fs: FSModule, dir_path: string) {
    if (fs.existsSync(dir_path)) {
        fs.readdirSync(dir_path).forEach(function(entry) {
            const entry_path = path.join(dir_path, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                rimraf(fs, entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dir_path);
    }
}