import React from 'react';
import {LayoutPage} from 'components/Layout';
import maintenanceImg from 'assets/images/maintenance.png';
import css from './MaintenancePage.module.scss';

export function MaintenancePage() {
  return (
    <LayoutPage layoutStyles={{maxWidth: '1024px'}}>
      <div className={css.Page}>
        <div className={css.Heading}>
          <img className={css.HeadImage} src={maintenanceImg} alt="heading" />
          <p className={css.HeadText}>Регламентные работы</p>
        </div>
        <div className={css.Info}>
          <h2>Уважаемые клиенты</h2>
          <p>Сервис временно недоступен. Мы уже работаем над этим.</p>
          <p>Приносим свои извинения за доставленные неудобства.</p>
          <p>
            <strong>ОТП Банк</strong>
          </p>
        </div>
      </div>
    </LayoutPage>
  );
}
