import styled from 'styled-components/macro';

export const Body = styled.div`
    flex-grow: 1;
    color: black;
    background: white;
    z-index: 0;
    display: flex;
        
    border: 1px solid #1854C2;
    border-left-color: #67A2EA;
    border-right-color: #2C6DD3;

    >* {
        flex: 1 1 50%;
    }
`;