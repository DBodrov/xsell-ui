import React from 'react';
import { auditService } from 'services';
import { BasicButton } from 'lib/components/buttons';
import { LayoutPage } from 'components/Layout';
import calendarPic from 'assets/images/calendar-check.svg';
import css from './CustomerChoice.module.scss';

function toMap() {
    auditService.userEvent({ category: 'FE_REDIRECT', action: 'Redirect to office map' });
    window.location.href = 'https://www.otpbank.ru/maps/points/';
}

function toCall() {
    auditService.userEvent({ category: 'FE_REDIRECT', action: 'User tap call 0707' });
    window.location.href = 'tel:0707';
}

export function CustomerChoice() {
    return (
        <LayoutPage>
            <div className={css.CustomerChoice}>
                <div className={css.Description}>
                    <img className={css.PageTitlePic} src={calendarPic} alt="title" />
                    <h3>Выберите удобный для Вас вариант оформления:</h3>
                </div>
                <div className={css.ButtonsGroup}>
                    <BasicButton
                        className={css.ChoiceButton}
                        type="button"
                        theme="secondary"
                        value="Получить консультацию по телефону"
                        onClick={toCall}
                    />
                    <BasicButton
                        className={css.ChoiceButton}
                        type="button"
                        theme="secondary"
                        value="Найти ближайший офис банка"
                        onClick={toMap}
                    />
                </div>
            </div>
        </LayoutPage>
    );
}
