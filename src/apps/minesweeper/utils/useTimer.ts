import { useEffect } from 'react';

export function useTimer(ms: number, callback: () => void, deps: any[] = []) {
    useEffect(() => {
        const handle = setInterval(callback, ms);
        return () => clearInterval(handle);
    }, [ms, callback, ...deps]);
}