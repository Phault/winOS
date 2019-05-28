import styled from "styled-components/macro";

export const Button = styled.button.attrs({
    type: 'button'
})`
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 2px 3px;

    :disabled * {
        filter: grayscale(1);
        opacity: 0.6;
    }
    
    :not(:disabled) {
        &:hover {
            border-color: #cecec3;
            background: linear-gradient(to bottom, #FEFEFD, #F1F1EA 85%, #D7D2C6 95%);

            * {
                filter: brightness(0.9) contrast(1.3);
            }
        }

        &:active {
            border-color: #9D9D92;
            background: linear-gradient(to bottom, #E7E6E0 85%, #f4f3ef);
            box-shadow: inset 1px 1px 2px #DCDAD1;

            * {
                transform: translate(1px, 1px);
            }
        }
    }
`;
