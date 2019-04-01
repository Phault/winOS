import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export function useStyleSheet() {
    const [sheet] = useState<CSSStyleSheet>(() => {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        return styleElement.sheet as CSSStyleSheet;
    });

    useEffect(() => {
        return () => { sheet.ownerNode.parentNode!.removeChild(sheet.ownerNode) };
    }, []);

    return sheet;
}

type CSSProperty = string | undefined | null;

export function useCssRule(selector: string, initialValue: CSSProperty): [CSSProperty, Dispatch<SetStateAction<CSSProperty>>] {
    const styleSheet = useStyleSheet();
    const [value, setValue] = useState(initialValue);
    
    useEffect(() => {
        if (!value)
            return;

        styleSheet.addRule(selector, value);
        const index = styleSheet.cssRules.length - 1;
        return () => styleSheet.removeRule(index);
    }, [selector, value]);

    return [value, setValue];
}