import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useUuid(): string {
  return useRef<string>(uuidv4()).current;
}
