import React, { useCallback } from 'react';
import { LayoutPage } from 'components/Layout';
import { BasicButton } from 'lib/components/buttons';
import { useAuth } from 'context/Auth';
import css from './ComebackPage.module.scss';

export function ComebackPage() {
  const { handleAuth1SignIn } = useAuth();
  const handleUserComeback = useCallback(() => {
    handleAuth1SignIn(null, true);
  }, [handleAuth1SignIn]);

  return (
    <LayoutPage>
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Вас долго не было</h2>
        <p className={css.Text}>
          Поэтому мы завершили ваш сеанс. Нажмите продолжить и введите СМС которая придёт на ваш номер.
        </p>
        <BasicButton type="button" value="Продолжить" onClick={handleUserComeback} className={css.Button} />
      </div>
    </LayoutPage>
  );
}
