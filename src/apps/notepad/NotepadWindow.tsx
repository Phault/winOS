import React, { FC, useContext, useState, useEffect } from 'react';
import { OSContext } from '../../App';
import { TextArea } from './TextArea';
import { NotepadMenuBar } from './NotepadMenuBar';

export interface NotepadWindowProps {
  path: string;
}

export const NotepadWindow: FC<NotepadWindowProps> = ({ path }) => {
  const { fileSystem } = useContext(OSContext)!;
  const [contents, setContents] = useState(() => {
    try {
      return fileSystem.readFileSync(path).toString();
    } catch {
      return '';
    }
  });

  useEffect(() => {
    fileSystem.writeFileSync(path, contents, {
      flag: 'w+',
    });
  }, [path, contents]);

  return (
    <React.Fragment>
      <NotepadMenuBar />
      <TextArea
        wordwrap
        defaultValue={contents}
        onChange={e => setContents(e.currentTarget.value)}
      />
    </React.Fragment>
  );
};
