import React from 'react';
import {css} from '@emotion/react';
import {ToggleProvider, useToggle, ToggleArrowIcon, Span, Dropdown} from 'neutrino-ui';
import {MasterCardIcon} from 'icons';
import {TCardSelectInputProps, TCardSelectProps} from './types';
import {CardInputBox, CardsList, CustomerCard} from './styles';

function maskCardNumber(cardNumber: string): string {
  if (cardNumber) {
    const lastNumBlock = cardNumber.slice(-4);
    return `**** **** **** ${lastNumBlock}`;
  }
  return '';
}


function CardSelectInputComponent(
  {value, noCards}: TCardSelectInputProps,
  ref: React.ForwardRefExoticComponent<HTMLDivElement>,
) {
  const {isOpen, handleToggle} = useToggle();
  const cardBoxRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => cardBoxRef.current, []);
  return (
    <CardInputBox
      aria-label="card-input"
      ref={cardBoxRef}
      css={{borderColor: isOpen ? 'var(--color-primary)' : 'var(--color-border)'}}
      onClick={noCards ? undefined: handleToggle}
    >
      {value ? (
        <>
          <MasterCardIcon />
          <div css={{display: 'flex', flexFlow: 'column nowrap', paddingLeft: 8}}>
            <Span css={{fontSize: 14}}>Ваша карта</Span>
            <Span css={{fontSize: 14}}>{value}</Span>
          </div>
        </>
      ) : null}
      <div
        css={{
          display: noCards ? 'none' : 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          width: 40,
          height: 24,
          borderLeft: '1px var(--color-border) solid',
        }}
      >
        <ToggleArrowIcon width="12" height="12" fill="#9E9E9E" />
      </div>
    </CardInputBox>
  );
}
const CardSelectInput = React.forwardRef(CardSelectInputComponent);

function SelectCard(props: TCardSelectProps) {
  const {cardsList, onSelectCard, currentCardId} = props;
  const {isOpen, handleClose} = useToggle();
  const cardInputRef = React.useRef<HTMLDivElement>(null);
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const cardInputRect = cardInputRef?.current?.getBoundingClientRect();

  const handleSelectCard = React.useCallback(
    (e: React.PointerEvent<HTMLLIElement>) => {
      onSelectCard(String(e.currentTarget.value));
      handleClose();
    },
    [handleClose, onSelectCard],
  );

  const cardNumber = cardsList?.find(card => card.id === currentCardId)?.number;

  React.useEffect(() => {
    const handleClickOutside = (e: PointerEvent | MouseEvent) => {
      if (e.target instanceof HTMLElement && isOpen) {
        const optionsList = dropDownRef?.current;
        const cardInput = cardInputRef?.current;
        if (optionsList?.contains(e.target) || cardInput?.contains(e.target)) {
          return;
        }
        handleClose();
      }
    };

    const handleScroll = (e: Event) =>
      window.requestAnimationFrame(() => {
        if (e.target instanceof HTMLElement && isOpen) {
          const optionsList = dropDownRef?.current;
          if (optionsList?.contains(e.target)) {
            return;
          }
          handleClose();
        }
      });

    const handleResize = () => {
      handleClose();
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize, true);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleClose, isOpen]);

  return (
    <div css={{position: 'relative', width: '100%'}}>
      <CardSelectInput value={maskCardNumber(cardNumber)} ref={cardInputRef} noCards={!cardsList || cardsList.length === 0}/>
      <Dropdown isOpen={isOpen} parentBound={isOpen ? cardInputRect : undefined} ref={dropDownRef}>
        <CardsList>
          {cardsList?.map(card => {
            return (
              <li role="menuitem" css={{width: '100%'}} key={card.id} value={card.id} onClick={handleSelectCard}>
                <CustomerCard
                  css={css`
                    background-color: ${card.id === currentCardId ? '#f3f3f3' : '#fff'};
                    &:hover {
                      cursor: pointer;
                      background-color: #f3f3f3;
                    }
                  `}
                >
                  <MasterCardIcon />
                  <div css={{display: 'flex', flexFlow: 'column nowrap', paddingLeft: 8}}>
                    <Span css={{fontSize: 14}}>Ваша карта</Span>
                    <Span css={{fontSize: 14}}>{maskCardNumber(card.number)}</Span>
                  </div>
                </CustomerCard>
              </li>
            );
          })}
        </CardsList>
      </Dropdown>
    </div>
  );
}

export function CardSelect(props: TCardSelectProps) {
  return (
    <ToggleProvider>
      <SelectCard {...props} />
    </ToggleProvider>
  );
}
