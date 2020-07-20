import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LayoutPage } from 'components/Layout';
import { Card } from 'components/Card';
import { List } from 'components/List';

import CameraAccessIcon from 'lib/ui-kit/assets/icons/otp/camera-access.svg';

import { BasicButton } from 'src/lib/components/buttons';
import css from './PhotoPage.module.scss';
import { routeMap } from '../Anketa/anketa.routingMap';

export function PhotoPage({ history }: RouteComponentProps) {
    const redirect = useCallback(() => {
        history.push(`${routeMap.PASSPORT_PHOTO}/upload`);
    }, [history]);

    return (
        <LayoutPage>
            <div className={css.Page}>
                <h2 className={css.PageTitle}>Сделайте фото паспорта</h2>
                <Card>
                    <Card.Body>
                        <h2 className={css.PageTitle}>Нужны две страницы паспорта: ФИО и прописка</h2>
                        <List>
                            <List.ListItem>
                                <img src={CameraAccessIcon} alt="X" />
                                <span>Потребуется доступ к камере и микрофону</span>
                            </List.ListItem>
                        </List>
                    </Card.Body>
                </Card>
                <BasicButton
                    onClick={redirect}
                    className={css.Button}
                    type="button"
                    theme="primary"
                    flat
                    value="Сделать 2 фотографии"
                />
            </div>
        </LayoutPage>
    );
}
