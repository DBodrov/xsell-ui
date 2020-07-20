import React from 'react';
import { BasicButton } from 'lib/components/buttons';
import css from './AdvanceScoringRefusalPage.module.scss';

export function RejectReason({ onCloseModal }: { onCloseModal: () => void }) {
  return (
    <div className={css.RejectReason}>
      <h3>Три наиболее частые причины отказа</h3>
      <ul className={css.ReasonsList}>
        <li>
          <span>Превышена долговая нагрузка (если уже есть кредиты)</span>
        </li>
        <li>
          <span>Просрочка платежей (если сейчас или ранее были не оплаченные платежи по кредитам)</span>
        </li>
        <li>
          <span>Некорректные данные (если изменились персональные данные или паспорт не действителен)</span>
        </li>
      </ul>
      <BasicButton type="button" theme="hero" onClick={onCloseModal} value="Понятно" />
    </div>
  );
}
