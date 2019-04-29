import styled from 'styled-components/macro';
import windowsIcon from '../../../assets/widgets/toolbar-windows.png';

export const WindowsIcon = styled.img.attrs({
    src: windowsIcon,
    draggable: false
})`
    padding: 0 8px 0 9px;
    text-align: center;
    background-color: white;
`;
