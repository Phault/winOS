import styled from 'styled-components/macro';

export interface TextAreaProps {
  wordwrap?: boolean;
}

export const TextArea = styled.textarea.attrs({
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
  spellCheck: false,
})<TextAreaProps>`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: ${props => (props.wordwrap ? 'hidden' : 'scroll')};
  white-space: ${props => (props.wordwrap ? 'normal' : 'nowrap')};
  font: 'Lucida Console' 10pt;
`;
