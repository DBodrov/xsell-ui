import React from 'react';
import { useLocation } from 'react-router-dom';
import errorIcon from 'assets/images/error.svg';
import css from './ErrorPage.module.scss';

export function ErrorPage() {
    const { state: { message = 'Что-то пошло не так' } = {} } = useLocation();

    return (
        <div className={css.ErrorPage}>
            <div className={css.ErrorImageWrapper}>
                <img className={css.ErrorImage} src={errorIcon} alt="error" />
            </div>
            <div className={css.ErrorTitle}>
                <h2>Опс :(</h2>
            </div>
            <div className={css.ErrorText}>
                <h3>{message}</h3>
            </div>
        </div>
    );
}
