import React from 'react';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {ToggleProvider, useToggle, ToggleArrowIcon, Span, Dropdown} from 'neutrino-ui';
import {TCustomerCard} from 'context/Anketa';
import {MasterCardIcon} from 'icons';

type TCardSelectProps = {
  cardsList?: TCustomerCard[];
  currentCardId?: string;
  onSelectCard: (cardId: string) => void;
};

const CustomerCard = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  width: 100%;
  min-width: 238px;
  padding: 12px;
`;

const CardInputBox = styled(CustomerCard)`
  border: 1px var(--color-border) solid;
  border-radius: 4px;
  &:hover {
    border-color: var(--color-primary);
    cursor: pointer;
  }
`;

const CardsList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-height: 300px;
  overflow: auto;
  margin: 0;
  padding: 0;
  border: 1px var(--color-border) solid;
  border-radius: 4px;
  background-color: var(--color-background);
`;

type TCardSelectInputProps = {
  value?: string;
};
function CardSelectInputComponent(
  {value}: TCardSelectInputProps,
  ref: React.ForwardRefExoticComponent<HTMLDivElement>,
) {
  const {isOpen, handleToggle} = useToggle();
  const cardBoxRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => cardBoxRef.current, []);
  return (
    <CardInputBox
      ref={cardBoxRef}
      css={{borderColor: isOpen ? 'var(--color-primary)' : 'var(--color-border)'}}
      onClick={handleToggle}
    >
      {value ? (
        <>
          <MasterCardIcon />
          <div>
            <Span>Ваша карта</Span>
            <Span>{value}</Span>
          </div>
        </>
      ) : null}
      <div
        css={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 'auto',
          width: 40,
          height: 24,
          borderLeft: '1px var(--color-border) solid',
        }}
      >
        <ToggleArrowIcon width="24" height="24" fill="#9E9E9E" />
      </div>
    </CardInputBox>
  );
}
const CardSelectInput = React.forwardRef(CardSelectInputComponent);

function SelectCard(props: TCardSelectProps) {
  const {cardsList, onSelectCard, currentCardId} = props;
  const {isOpen} = useToggle();
  const cardInputRef = React.useRef<HTMLDivElement>(null);
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const cardInputRect = cardInputRef?.current?.getBoundingClientRect();

  const handleSelectCard = React.useCallback((e: React.PointerEvent<HTMLLIElement>) => {
    onSelectCard(String(e.currentTarget.value));
  }, [onSelectCard])

  //const [] = React.useState();
  const cardNumber = cardsList?.find(card => card.bankCardId === currentCardId)?.bankCardNumber;
  return (
    <div css={{position: 'relative', width: '100%'}}>
      <CardSelectInput value={cardNumber} ref={cardInputRef} />
      <Dropdown isOpen={isOpen} parentBound={isOpen ? cardInputRect : undefined} ref={dropDownRef}>
        <CardsList>
          {cardsList?.map(card => {
            return (
              <li key={card.bankCardId} value={card.bankCardId} onClick={handleSelectCard}>
                <CustomerCard
                  css={css`
                    &:hover {
                      cursor: pointer;
                      background-color: #f3f3f3;
                    }
                  `}
                >
                  <MasterCardIcon />
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
