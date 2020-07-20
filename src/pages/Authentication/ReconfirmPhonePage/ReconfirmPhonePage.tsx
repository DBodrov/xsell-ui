import React from 'react';
import { LayoutPage } from 'components/Layout';
import { PhoneConfirmForm } from 'components/PhoneConfirmForm';
import css from './ReconfirmPhonePage.module.scss';

export function ReconfirmPhonePage() {
    return (
        <LayoutPage>
            <div className={css.Page}>
                <h2 className={css.PageTitle}>Подтвердите вход</h2>
                <p className={css.Text}>Введите СМС которая придёт на ваш номер.</p>
                <PhoneConfirmForm />
            </div>
        </LayoutPage>
    );
}
