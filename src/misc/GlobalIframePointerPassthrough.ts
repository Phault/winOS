import { createGlobalStyle } from 'styled-components';

export const GlobalIframePointerPassthrough = createGlobalStyle`
    iframe {
        pointer-events: none !important;
    }
`;
