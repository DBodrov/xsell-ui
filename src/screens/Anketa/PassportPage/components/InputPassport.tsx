import React from 'react';
import {removeMask, createMaskedValue} from './utils';
import {StyledInput} from './styles';

interface IInputPassportProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  value?: string;
}

type TCursorPosition = {
  cursorStart?: number;
  cursorEnd?: number;
};

export function InputPassport(props: IInputPassportProps) {
  const {onChange, value, ...restProps} = props;
  const [{cursorStart, cursorEnd}, setCursor] = React.useReducer(
    (s: TCursorPosition, a: TCursorPosition): TCursorPosition => ({...s, ...a}),
    {
      cursorStart: undefined,
      cursorEnd: undefined,
    },
  );
  const [updateKey, forceUpdate] = React.useState(0);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputType = React.useRef<string>('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = removeMask(event.currentTarget.value);
      const displayValue = createMaskedValue(rawValue, '9999 999999');
      let updatedCursor = cursorStart;

      switch (inputType.current) {
        default:
        case 'insertText': {
          if (cursorStart === 4) {
            updatedCursor = cursorStart + 2;
          } else {
            updatedCursor = cursorStart + 1;
          }
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
        case 'deleteContentBackward': {
          updatedCursor = cursorStart - 1;
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
        case 'deleteContentForward': {
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          forceUpdate(s => s + 1);
          break;
        }
        case 'deleteSection': {
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
        case 'insertFromPaste': {
          updatedCursor = displayValue.length;
          setCursor({cursorStart: updatedCursor, cursorEnd: updatedCursor});
          break;
        }
      }
      onChange && onChange(displayValue);
    },
    [cursorStart, onChange],
  );

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey, key} = event;
    const isNumericKey = isFinite(Number(key));
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;

    if (start === end) {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteContentBackward';
      } else if (key === 'Delete') {
        inputType.current = 'deleteContentForward';
      }
    } else {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteSection';
      } else if (key === 'Delete') {
        inputType.current = 'deleteSection';
      }
    }
    setCursor({cursorStart: start, cursorEnd: end});
  }, []);

  const handlePaste = React.useCallback(() => {
    inputType.current = 'insertFromPaste';
  }, []);

  React.useLayoutEffect(() => {
    inputRef.current.setSelectionRange(cursorStart, cursorEnd);
  }, [cursorStart, cursorEnd, updateKey]);

  return (
    <StyledInput
      placeholder="____ ______"
      ref={inputRef}
      onChange={handleChange}
      value={value}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      name="passport"
      aria-label="passport"
      {...restProps}
    />
  );
}
