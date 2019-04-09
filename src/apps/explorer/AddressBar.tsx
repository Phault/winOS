import React, { useState, useContext, useCallback, useEffect } from 'react';
import Autosuggest, { RenderSuggestion } from 'react-autosuggest';
import * as nodePath from 'bfs-path';
import './AddressBar.scss';
import { OSContext } from '../../App';

const renderSuggestion: RenderSuggestion<string> = (suggestion: string) => {
    return <span>{suggestion}</span>;
};

const getSuggestionValue: Autosuggest.GetSuggestionValue<string> = suggestion => suggestion;

export interface AddressBarProps {
    value: string;
    onChange: (newValue: string) => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({value, onChange, ...rest}) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [workingValue, setWorkingValue] = useState<string>(value);
    const {fileSystem} = useContext(OSContext)!;

    useEffect(() => setWorkingValue(value), [value]);

    const onKeyDownCapture = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setWorkingValue(value);

            const input = e.currentTarget as HTMLInputElement;
            input.value = value;
            input.setSelectionRange(0, 99999999);
        }
    }, [value]);

    const onKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onChange(workingValue);
            (document.activeElement as HTMLElement).blur();
        }
    }, [workingValue, onChange]);

    const onInputChange = useCallback((_, {newValue, method}) => {
        if (method === 'escape')
            return;
            
        setWorkingValue(newValue);

        if (method === 'enter' || method === 'click')
            onChange(newValue);
    }, [onChange]);

    const inputProps = {
        ...rest,
        value: workingValue,
        suggestions,
        onChange: onInputChange,
        onKeyPress,
        onKeyDownCapture
    };

    const onSuggestionsFetchRequested = useCallback(({value: request}: {value: string}) => {
        const isExactDir = request.endsWith('/');

        const path = isExactDir ? { dir: request, base: '' } : nodePath.parse(request);
        let dirContents: string[];
        
        try {
            dirContents = fileSystem.readdirSync(path.dir);
        } catch {
            dirContents = [];
        }

        const newSuggestions = dirContents
            .filter(file => file.startsWith(path.base) && file !== path.base)
            .map(file => nodePath.join(path.dir, file)); 

        setSuggestions(newSuggestions);
    }, [fileSystem]);

    function onSuggestionsClearRequested() {
        setSuggestions([]);
    }

    return (
        <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested} 
            onSuggestionsClearRequested={onSuggestionsClearRequested} 
            getSuggestionValue={getSuggestionValue} 
            shouldRenderSuggestions={() => true}
            renderSuggestion={renderSuggestion} 
            focusInputOnSuggestionClick={false}
            inputProps={inputProps} />
    );
};