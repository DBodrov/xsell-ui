import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { auditService } from 'services';
import { LayoutPage } from 'components/Layout';
import { List } from 'components/List';
import { BasicButton } from 'lib/components/buttons';

import billIcon from 'lib/ui-kit/assets/icons/otp/bill.svg';
import hourglassIcon from 'lib/ui-kit/assets/icons/otp/hourglass.svg';
import constructionImg from 'assets/images/landing/construction.png';

import css from './IntroPage.module.scss';

export function IntroPage() {
    const history = useHistory();

    const openLoginPage = useCallback(() => {
        auditService.userEvent({ category: 'FE_REDIRECT', action: 'Open login page' }, { toBE: true });
        history.push('/login');
    }, [history]);

    useEffect(() => {
        localStorage.setItem('landingHasRead', 'true');
    }, []);

    return (
        <LayoutPage>
            <div className={css.Page}>
                <div
                    className={cx(css.Block, css.MainImage)}
                    style={{ backgroundImage: `url("${constructionImg}")` }}>
                    <h2>
                        Экспресс кредит
                        <br />
                        через интернет,
                        <br />
                        не выходя
                        <br />
                        из дома
                    </h2>

                    <div className={css.Advice}>Рекомендуем вам взять</div>
                    <div className={css.AdviceSum}>250 000₽</div>

                    <BasicButton
                        className={css.Button}
                        onClick={openLoginPage}
                        type="button"
                        flat
                        value="Оформить кредит"
                    />
                </div>
                <div className={css.Block}>
                    <List className={css.List}>
                        <h3 className={css.Title}>Заполните онлайн-заявку</h3>
                        <List.ListItem>
                            <img src={billIcon} alt="X" />
                            <span>Сумма до 1 000 000 рублей</span>
                        </List.ListItem>
                        <List.ListItem>
                            <img src={hourglassIcon} alt="X" />
                            <span>Ставка от 14,9%</span>
                        </List.ListItem>
                        <List.ListItem>
                            <img src={hourglassIcon} alt="X" />
                            <span>Решение за 45 минут</span>
                        </List.ListItem>
                    </List>

                    <List className={css.List}>
                        <h3 className={css.Title}>Держи под рукой</h3>
                        <List.ListItem>
                            <img src={billIcon} alt="X" />
                            <span>Сумма до 1 000 000 рублей</span>
                        </List.ListItem>
                        <List.ListItem>
                            <img src={hourglassIcon} alt="X" />
                            <span>Ставка от 14,9%</span>
                        </List.ListItem>
                        <List.ListItem>
                            <img src={hourglassIcon} alt="X" />
                            <span>Решение за 45 минут</span>
                        </List.ListItem>
                    </List>

                    <List className={cx(css.List, css.Bullets)}>
                        <h3 className={css.Title}>Условия</h3>
                        <List.ListItem>
                            <div className={css.Dot} />С октября 2019 года, для получения кредита у вас должен
                            быть подтверждёный доход, достаточный для повышенной долговой нагрузки, а также
                            отсутствовать проскочки по текущим кредитам.
                        </List.ListItem>
                        <List.ListItem>
                            <div className={css.Dot} />
                            Если у вас есть просрочки, то мы рекомендуем обратиться в отделение нашего банка
                            за услугой “Рефинансирование кредита”, которая поможет вам сократить долговую
                            нагрузку.
                        </List.ListItem>
                        <List.ListItem>
                            <div className={css.Dot} />
                            Для получения кредита в размере более 500 000 рублей необходим подтверждённый
                            доход не менее 200 000 рублей в месяц.
                        </List.ListItem>
                    </List>
                </div>
            </div>
        </LayoutPage>
    );
}
