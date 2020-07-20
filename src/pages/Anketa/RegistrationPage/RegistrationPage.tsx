import React, { useCallback } from 'react';
import { useAnketa, useAnketaUpdaters } from 'providers';
import { BasicButton } from 'lib/components/buttons/BasicButton';
import { BasicTextarea } from 'lib/components/data-entry/BasicTextarea';
import { LayoutPage } from 'components/Layout';
import css from './RegistrationPage.module.scss';

export function RegistrationPage() {
  const {
    anketa: { registrationAddress },
    anketaStatus,
  } = useAnketa();
  const { handleUpdateAnketa } = useAnketaUpdaters();

  const handleAddressChanged = useCallback(
    () => handleUpdateAnketa(anketaStatus, { registrationAddressChanged: true }),
    [anketaStatus, handleUpdateAnketa]
  );
  const handleAddressVerify = useCallback(
    () => handleUpdateAnketa(anketaStatus, { registrationAddressChanged: false }),
    [anketaStatus, handleUpdateAnketa]
  );

  return (
    <LayoutPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Проверьте регистрацию</h2>
        <div className={css.Label}>ТЕКУЩИЙ АДРЕС</div>
        <BasicTextarea name="address" disabled value={registrationAddress} rows={3} />
        <p>Подтвердите актуальность адреса регистрации</p>

        <div className={css.PageFooter}>
          <BasicButton
            type="button"
            theme="secondary"
            flat
            value="Адрес изменился"
            onClick={handleAddressChanged}
            className={css.VerifyButton}
            // disabled={isFetching}
          />
          <BasicButton
            type="button"
            theme="primary"
            flat
            value="Подтвердить адрес регистрации"
            className={css.VerifyButton}
            onClick={handleAddressVerify}
            // disabled={isFetching}
          />
        </div>
      </div>
    </LayoutPage>
  );
}
