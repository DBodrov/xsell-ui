import React from 'react';

import moneyIcon from 'lib/ui-kit/assets/icons/otp/money-atm-3.svg';
import hourglassIcon from 'lib/ui-kit/assets/icons/otp/hourglass-gray.svg';
import percentIcon from 'lib/ui-kit/assets/icons/otp/percent-circle.svg';

import userBoxIcon from 'lib/ui-kit/assets/icons/otp/user-box.svg';
import bankingIcon from 'lib/ui-kit/assets/icons/otp/banking-spendings-2.svg';
import phoneIcon from 'lib/ui-kit/assets/icons/otp/phone-speaker.svg';

import css from './Offer.module.scss';

const OfferItem = ({ srcImg, text }: { srcImg: string; text: string }) => (
  <li className={css.OfferItem}>
    <img src={srcImg} alt="X" className={css.ItemPic} />
    <span className={css.ItemText}>{text}</span>
  </li>
);

const requestList = [
  { id: 1, srcImg: moneyIcon, text: 'Сумма до 1 000 000 рублей' },
  { id: 2, srcImg: percentIcon, text: 'Ставка от 14,9%' },
  { id: 3, srcImg: hourglassIcon, text: 'Получение денег без посещения офиса' },
];

const keepHandyList = [
  { id: 1, srcImg: userBoxIcon, text: 'Российский паспорт' },
  { id: 2, srcImg: bankingIcon, text: 'Номер вашего счета для перевода' },
  { id: 3, srcImg: phoneIcon, text: 'Доступ к телефону для СМС и звонка' },
];

export function Offer() {
  return (
    <div className={css.Offer}>
      <div className={css.ListWrapper}>
        <h3 className={css.ListTitle}>Заполните онлайн-заявку</h3>
        <ul className={css.OfferList}>
          {requestList.map((item) => (
            <OfferItem key={item.id} srcImg={item.srcImg} text={item.text} />
          ))}
        </ul>
      </div>
      <div className={css.ListWrapper}>
        <h3 className={css.ListTitle}>Вам понадобятся</h3>
        <ul className={css.OfferList}>
          {keepHandyList.map((item) => (
            <OfferItem key={item.id} srcImg={item.srcImg} text={item.text} />
          ))}
        </ul>
      </div>
    </div>
  );
}
