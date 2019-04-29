import styled from 'styled-components/macro';

export const Footer = styled.footer`
    height: 40px;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 3px;

    background: 
        radial-gradient(ellipse at 30% 20%, transparent 60%, rgba(0,0,0,0.4)),
        radial-gradient(ellipse at 60% 20%, transparent 60%, rgba(0,0,0,0.4));
    background-color: #4792EC;

    box-shadow: 
        inset 0px -100px 30px -90px #1854C2,
        inset 100px 0px 4px -97px rgba(135, 179, 232, 0.5),
        inset 0px -100px 30px -90px rgb(26, 90, 209);
`;