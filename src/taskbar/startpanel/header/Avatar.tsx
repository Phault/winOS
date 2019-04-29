import styled from 'styled-components/macro';

export const Avatar = styled.img.attrs({
    draggable: false
})`
    display: inline-block;
    vertical-align: middle;
    width: 45px;
    height: 45px;
    margin-right: 8px;
    background: #CCD6EB;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
    padding: 2px;
`;