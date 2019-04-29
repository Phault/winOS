import styled from 'styled-components/macro';

export const AutosuggestWrapper = styled.div`
    position: relative;
    align-self: stretch;
    flex-grow: 1;

    .react-autosuggest__container, .react-autosuggest__input {
        width: 100%;
        height: 100%;
    }

    .react-autosuggest__suggestions-container {
        background: white;
        color: black;
        position: absolute;
        width: 100%;
        left: 0px;
        top: 100%;

        max-height: 100px;
    }

    .react-autosuggest__suggestions-container--open {
        border: 1px solid black;
        overflow: auto;
    }

    .react-autosuggest__suggestions-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .react-autosuggest__suggestion {
        padding: 1px 4px 0;
    }

    .react-autosuggest__suggestion--highlighted {
        color: white;
        background: #316ac5;
    }
`;