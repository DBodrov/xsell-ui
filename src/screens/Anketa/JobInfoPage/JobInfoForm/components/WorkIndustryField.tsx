import React from 'react';
import {css} from '@emotion/react';
// import {ToggleProvider, useToggle, ToggleArrowIcon} from 'components/lib/ToggleProvider';
import {Dropdown, ToggleProvider, useToggle, ToggleArrowIcon} from 'neutrino-ui';
import {workIndustryList} from '../utils';
import {Label, FormField, ErrorText} from '../styles';
import {SelectBox} from './styles';

const getDisplayValue = (id?: string) => workIndustryList.find(item => item?.id === id)?.title ?? '';

type Props = {
  industryId?: string;
  onChangeIndustry: (id: string) => void;
  onBlurHandler: (value: string, e?: React.FocusEvent<HTMLInputElement>) => void;
  hasError: boolean;
  errorText?: string;
};

export function WorkIndustryField(props: Props) {
  return (
    <ToggleProvider>
      <SelectIndustry {...props} />
    </ToggleProvider>
  );
}

function SelectIndustry({industryId, onChangeIndustry, onBlurHandler, hasError, errorText}: Props) {

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const inputRect = inputRef?.current?.getBoundingClientRect();
  const {isOpen, handleToggle, handleClose} = useToggle();

  const handleItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const id = event?.currentTarget?.dataset?.value;
      onChangeIndustry(id);
      inputRef.current.focus();
      handleClose();
    },
    [handleClose, onChangeIndustry],
  );

  const handleInputBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (
        e.relatedTarget instanceof HTMLElement &&
        dropdownRef &&
        dropdownRef?.current?.contains(e.relatedTarget)
      ) {
        return;
      }
      onBlurHandler(industryId, e);
    },
    [industryId, onBlurHandler],
  );

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent | MouseEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const options = dropdownRef?.current;
        const input = inputRef.current;
        if (options?.contains(e.target) || input.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    const handleScroll = (e?: Event) =>
      window.requestAnimationFrame(() => {
        if (e.target instanceof HTMLElement && isOpen) {
          const optionsList = dropdownRef?.current;
          if (optionsList?.contains(e.target)) {
            return;
          }
          handleClose();
        }
      });

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <FormField>
      <Label htmlFor="workIndustry">?????????????? ??????????????????</Label>
      <div css={{position: 'relative'}}>
        <SelectBox
          readOnly
          aria-label="?????????????? ??????????????????"
          ref={inputRef}
          name="workIndustry"
          placeholder="???????????????? ???? ????????????"
          css={[
            css({
              border: `1px ${
                isOpen ? 'var(--color-primary)' : hasError ? 'var(--color-secondary)' : 'var(--color-border)'
              } solid`,
              '&:hover, &:focus': {
                borderColor: hasError ? 'var(--color-secondary)' : 'var(--color-primary)',
              },
            }),
          ]}
          value={getDisplayValue(industryId)}
          onBlur={handleInputBlur}
          onClick={handleToggle}
        />
        <div css={{position: 'absolute', top: '35%', right: 10}}>
          <ToggleArrowIcon fill={hasError ? 'var(--color-secondary)' : 'var(--color-primary)'} />
        </div>

        <Dropdown isOpen={isOpen} parentBound={isOpen ? inputRect : undefined} ref={dropdownRef}>
          <ul
            css={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              overflow: 'auto',
              height: 250,
              border: '1px var(--color-border) solid',
              borderRadius: 4,
            }}
          >
            {workIndustryList.map(item => {
              return (
                <li
                  key={item.id}
                  data-value={item.id}
                  onClick={handleItemClick}
                  css={{
                    padding: '8px 16px',
                    borderBottom: '1px #ccc solid',
                    margin: 0,
                    fontSize: 14,
                    cursor: 'pointer',
                    backgroundColor: item.id === industryId ? 'var(--color-border)' : '#fff',
                    '&:hover': {
                      backgroundColor: 'var(--color-border)',
                    },
                  }}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </Dropdown>
      </div>
      {hasError ? <ErrorText>{errorText}</ErrorText> : null}
    </FormField>
  );
}
