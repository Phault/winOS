import { useRef } from 'react';
import uuidv4 from 'uuid';

export function useUuid(): string {
    return useRef<string>(uuidv4()).current;
}