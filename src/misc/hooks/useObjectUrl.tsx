import { useState, useEffect } from 'react';

export function useObjectUrl(object: BlobPart, type: string): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const blob = new Blob([object], {
      type,
    });
    const url = URL.createObjectURL(blob);

    setUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      setUrl(null);
    };
  }, [object, type]);

  return url;
}
