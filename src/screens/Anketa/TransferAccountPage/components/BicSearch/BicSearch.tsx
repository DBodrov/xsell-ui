import React from 'react';
import {Dropdown} from 'neutrino-ui';
import {Label} from 'components/lib';
import {onlyDigit} from 'utils/string.utils';
import {SuggestionList} from './SuggestionList';
import {BicInput} from './styles';
import {TBicSearchProps} from './types';

export function BicSearch({
  wasSubmitted,
  searchResults,
  onChange,
  onTouch,
  onSelect,
  touched,
  errorMessage,
  value,
}: TBicSearchProps) {
  const [showList, setShowList] = React.useState(false);
  const displayErrorMessage = (wasSubmitted || touched) && Boolean(errorMessage);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRect = inputRef?.current?.getBoundingClientRect();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleChangeBic = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const value = onlyDigit(e.currentTarget.value);
      setShowList(value.length >= 3);
      if (value.length > 9) return;

      onChange(value);
    },
    [onChange],
  );

  const handleSelectSuggest = React.useCallback(
    (value: string) => {
      onSelect(value);
      setShowList(false);
    },
    [onSelect],
  );

  const handleInputClick = React.useCallback(() => {
    if (value.length >= 3 && !showList) {
      setShowList(true);
    }
  }, [showList, value.length]);

  React.useEffect(() => {
    const suggestionList = dropdownRef?.current;
    const bicInput = inputRef?.current;
    const handleClickOutside = (e: PointerEvent) => {
      if (e.target instanceof HTMLElement && showList) {
        if (suggestionList?.contains(e.target) || bicInput?.contains(e.target)) {
          return;
        }
        setShowList(false);
      }
    };

    if (showList) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showList]);

  return (
    <div css={{display: 'flex', flexFlow: 'column nowrap'}}>
      <Label htmlFor="bankIdCode">БИК вашего банка</Label>
      <BicInput
        type="tel"
        onChange={handleChangeBic}
        value={value}
        ref={inputRef}
        onClick={handleInputClick}
        onBlur={onTouch}
        hasError={displayErrorMessage}
        id="bankIdCode"
        name="bankIdCode"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        aria-label="БИК вашего банка"
      />
      <Dropdown ref={dropdownRef} isOpen={showList} parentBound={showList ? inputRect : undefined}>
        <SuggestionList query={value} results={searchResults} onSelectSuggest={handleSelectSuggest} />
      </Dropdown>
      {displayErrorMessage ? (
        <span role="alert" css={{color: 'var(--color-error)', fontSize: 12}}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
