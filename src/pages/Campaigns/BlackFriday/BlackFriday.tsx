import React from 'react';
import { useHistory } from 'react-router-dom';
import { BasicButton } from 'lib/components/buttons';
import { LayoutPage } from 'components/Layout';
import { Offer } from 'components/Offer';
import { auditService } from 'services';
import css from './BlackFriday.module.scss';
import friday from 'assets/images/black-friday-text.png';

export function BlackFriday() {
    const history = useHistory();

    const openLoginPage = () => {
        auditService.userEvent(
            { category: 'FE_REDIRECT', action: 'Open login page from landing' },
            { toBE: true }
        );
        history.push('/login');
    };

    return (
        <LayoutPage>
            <div className={css.Page}>
                <div className={css.Heading}>
                    <div className={css.HeadingInfo}>
                        <img src={friday} className={css.BannerText} alt="friday" />
                        <div className={css.CaptionBlock}>
                            <h2 className={css.Caption}>Не упусти. </h2>
                            <h2 className={css.Caption}>Кредит на твои мечты по сниженной ставке!</h2>
                        </div>
                        <BasicButton
                            className={css.ActionButton}
                            onClick={openLoginPage}
                            type="button"
                            flat
                            value="Оформить кредит"
                        />
                    </div>
                </div>
                <div className={css.OfferPlace}>
                    <Offer />
                </div>
                <BasicButton
                    className={css.ActionButton}
                    onClick={openLoginPage}
                    type="button"
                    flat
                    value="Оформить кредит"
                />
            </div>
        </LayoutPage>
    );
}
