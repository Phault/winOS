import styled from 'styled-components/macro';

export const List = styled.div`
    position: relative;
    padding-top: 9px;
    display: flex;
    flex-direction: column;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 2px;        
        background: #F88A24;
    }

    &:first-child::before {
        background: linear-gradient(to left, #F88A24, transparent);
    }

    &:last-child::before {
        background: linear-gradient(to right, #F88A24, transparent);
    }

    hr {
        width: 100%;
        height: 2px;
        border: 0;
    }
`;
