import {TCustomerCard} from 'context/Anketa';

export type TCardSelectProps = {
  cardsList?: TCustomerCard[];
  currentCardId?: string;
  onSelectCard: (cardId: string) => void;
};

export type TCardSelectInputProps = {
  value?: string;
  noCards?: boolean;
};
