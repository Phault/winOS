import styled from 'styled-components/macro';
import { Icon } from './';

export const Label = styled.div`
    padding: 1px;

    ${Icon}:focus &, ${Icon}.focus & {
        border: 1px dotted rgb(99, 181, 222);
    }

    ${Icon}:focus:active &, ${Icon}.active:focus &,
    ${Icon}.focus:active &, ${Icon}.active.focus & {
        border-color: rgb(255, 177, 103);
    }

    ${Icon}:active &, ${Icon}.active & {
        color: white;
        text-shadow: none;
        background: rgb(49, 107, 197);
    }
`;
