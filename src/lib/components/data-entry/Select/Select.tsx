import React, {Fragment, useState, useEffect, useRef, useCallback} from 'react';
import cn from 'classnames/bind';
import arrowDownIco from 'ui-kit/assets/icons/arrows/chevron-down.svg';
import closeIco from 'ui-kit/assets/icons/forms/close.svg';
// import { SelectDropdown } from './SelectDropdown';
import {Dropdown, useDropdown} from '../../Dropdown2';
import {OptionsList} from './OptionsList';
import {useSelected} from './hooks';
import {ISelectProps} from './types';
import css from './Select.module.scss';

const cx = cn.bind(css);

export function Select(props: ISelectProps) {
  const {
    name,
    options,
    onChangeHandler,
    disabled,
    styles,
    value,
    hasClear,
    hasError,
    placeholder,
    onClearHandler,
    onBlurHandler,
    onFocusHandler,
    ...restProps
  } = props;
  const selectRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [isShowClear, setShowClear] = useState(false);
  const {selectedValue, valueSetter, resetValue, caption} = useSelected(options);
  const {isOpen, parentRect, setIsOpen} = useDropdown(selectRef, suggestionsRef);

  const handleKeypress = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen],
  );

  useEffect(() => {
    if (value && options && Object.keys(options).length > 0) {
      valueSetter(value);
    } else if (!value) {
      resetValue();
    }
  }, [value, valueSetter, options, resetValue, setIsOpen]);

  const cssClasses: string = cx(
    css.Select,
    {[css.isOpen]: isOpen},
    {[css.isDisabled]: disabled},
    {[css.hasError]: hasError},
  );

  const handleClick: React.MouseEventHandler<HTMLDivElement> = event => {
    event.preventDefault();
    setIsOpen(!isOpen);
    onFocusHandler && onFocusHandler(selectedValue);
  };

  const handleMouseEnter = () => {
    if (hasClear && selectedValue && !disabled) {
      setShowClear(true);
    }
  };

  const handleMouseLeave = () => {
    if (isShowClear) {
      setShowClear(false);
    }
  };

  const handleItemClick = (optionValue: string) => {
    valueSetter(optionValue);
    selectRef.current.focus();
    onChangeHandler(optionValue);
    setIsOpen(false);
  };

  const handleClear: React.MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation();
    if (!onClearHandler) {
      throw new Error('onClearHandler props - is not defined!');
    }
    setIsOpen(false);
    resetValue();
    onClearHandler(name);
  };

  const handleFocus: React.FocusEventHandler<HTMLDivElement> = () => {
    console.log('on focus');
    const select = selectRef.current;
    select.addEventListener('keypress', handleKeypress);
    onFocusHandler && onFocusHandler(selectedValue);
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = e => {
    const select = selectRef.current;
    select.removeEventListener('keypress', handleKeypress);
    console.log('Select blur');
    onBlurHandler && onBlurHandler();
  };

  return (
    <Fragment>
      <div
        className={cssClasses}
        data-testid="select"
        style={styles}
        ref={selectRef}
        title={caption}
        {...restProps}
        onClick={disabled ? undefined : handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {caption || placeholder}
        {isShowClear && (
          <div
            className={css.ClearButton}
            role="button"
            tabIndex={-1}
            onClick={handleClear}
            data-testid="clear-btn"
          >
            <img src={closeIco} alt="X" />
          </div>
        )}
        <div className={css.ArrowSection}>
          <img src={arrowDownIco} alt="X" />
        </div>
      </div>
      <Dropdown isOpen={isOpen} parentBound={parentRect}>
        <div ref={suggestionsRef}>
          <OptionsList options={options} selectedValue={selectedValue} onChangeHandler={handleItemClick} />
        </div>
      </Dropdown>
    </Fragment>
  );
}
