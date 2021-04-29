import React from 'react';
import {AppPage} from 'components/Layout';
import maintenanceImg from 'assets/images/maintenance.png';
import {Screen, Heading, HeadImage, HeadText, Info} from './styles';

export function MaintenancePage() {
  return (
    <AppPage noStepper>
      <Screen>
        <Heading>
          <HeadImage src={maintenanceImg} alt="heading" />
          <HeadText>Регламентные работы</HeadText>
        </Heading>
        <Info>
          <h2>Уважаемые клиенты</h2>
          <p>Сервис временно недоступен. Мы уже работаем над этим.</p>
          <p>Приносим свои извинения за доставленные неудобства.</p>
          <p>
            <strong>ОТП Банк</strong>
          </p>
        </Info>
      </Screen>
    </AppPage>
  );
}
