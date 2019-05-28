import { useState, useEffect } from "react";
import { FSModule } from "browserfs/dist/node/core/FS";

export function useDirectory(fileSystem: FSModule, path: string, filter?: (file: string, index: number, array: string[]) => any) {
    const [contents, setContents] = useState<string[]>([]);

    useEffect(() => {
        let contents = fileSystem.readdirSync(path);

        if (filter)
            contents = contents.filter(filter);

        setContents(contents);
    }, [path, fileSystem]);

    return contents;
}