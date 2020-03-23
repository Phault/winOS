import styled from 'styled-components/macro';
import { Rectangle } from '../../misc/Rectangle';

export interface SelectionBoxProps {
  rect: Rectangle;
}

export const SelectionBox = styled.div.attrs<SelectionBoxProps>(({ rect }) => ({
  style: {
    width: rect.width,
    height: rect.height,
    transform: `translate(${rect.left}px, ${rect.top}px)`,
  },
}))<SelectionBoxProps>`
  position: absolute;
  border: 1px solid #3398ff;
  background: #a6c8ea;
  mix-blend-mode: multiply;
  pointer-events: none;
  left: 0;
  top: 0;
`;
