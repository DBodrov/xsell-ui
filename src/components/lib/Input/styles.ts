import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {ITheme} from '../Themes';
import {IInputProps} from './types';

export const StyledInput = styled.input`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  height: auto;
  border-radius: 4px;
  outline: 0;
  line-height: 2rem;
  transition: all 0.2s ease-in-out;
`;

export const createInputStyles = ({typography, colors}: ITheme, props: IInputProps) => {
  const {disabled, hasError, style} = props;
  const hasErrorBorder = `1px ${colors.feedbackColors.error} solid`;
  const focusedBorder = `1px ${colors.mainColors.primary} solid`;
  const defaultBorder = `1px ${colors.pageElementsColors.border} solid`;
  /**@ts-ignore */
  return css(
    {
      ...typography.span,
      border: hasError ? hasErrorBorder : defaultBorder,
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'initial',
      color: colors?.textColors.text,
      padding: '0 0.5rem',
      backgroundColor: colors.pageElementsColors.formElements,
      ':-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active': {
        boxShadow: `0 0 0 30px ${colors.pageElementsColors.formElements} inset`,
      },

      // '-webkit-text-fill-color': colors.textColors.text,
      ':hover, :focus': {
        outline: 0,
        border: hasError ? hasErrorBorder : focusedBorder,
      },
      ...style,
    },
    css`
      -webkit-text-fill-color: ${colors.textColors.text};
    `,
  );
};
