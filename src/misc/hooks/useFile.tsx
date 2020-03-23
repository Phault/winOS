import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { FSModule } from 'browserfs/dist/node/core/FS';

export interface FileOptions {
  encoding?: string;
  mode?: string | number;
  flag?: string;
}

export function useFile(
  fileSystem: FSModule,
  path: string,
  options?: FileOptions
): [Buffer | string, Dispatch<SetStateAction<Buffer | string>>] {
  const [data, setData] = useState<Buffer | string>(new Buffer(0));

  useEffect(() => {
    const contents = fileSystem.readFileSync(path, options);
    setData(contents);
  }, [path, fileSystem]);

  const writeData = useCallback(
    (data: any) => {
      fileSystem!.writeFileSync(path, data, options);
      setData(data);
    },
    [path, fileSystem]
  );

  return [data, writeData];
}
