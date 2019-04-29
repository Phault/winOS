import styled from 'styled-components/macro';
import { MenuBar } from '../../../widgets/menubar/MenuBar';

export const Header = styled.header`
    background: linear-gradient(to right, #f3f5f6, #ede8ce);
    box-shadow: inset 0 -10px 2px -8px #cdcabb;

    ${MenuBar} {
        background: transparent;
        padding: 1px 2px 2px;
        flex-grow: 1;
        border-bottom: none;
        border-right: 1px solid #cdcabb;
    }

    >* {
        &:first-child {
            padding-right: 0px;
        }

        &:not(:last-child) {
            border-bottom: 1px solid #cdcabb;
        }

        &:not(:first-child) {
            border-top: 1px solid white;
        }
    }
`;
