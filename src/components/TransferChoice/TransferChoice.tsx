import React, { useCallback, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { auditService } from 'services';
import { routeMap } from 'pages/Anketa/anketa.routingMap';
import { BasicButton } from 'lib/components/buttons';
import css from './TransferChoice.module.scss';

export function TransferChoice() {
  const history = useHistory();

  const openTransferProperties = useCallback(
    (method: string) => history.push(`${routeMap.TRANSFER_DETAILS}/${method}`, { method }),
    [history]
  );

  const toAccount = useCallback(() => {
    auditService.userEvent({
      category: 'Anketa',
      action: 'User choose transfer to account',
    });
    openTransferProperties('account');
  }, [openTransferProperties]);

  const toCard = useCallback(() => {
    auditService.userEvent({
      category: 'Anketa',
      action: 'User choose transfer to card',
    });
    openTransferProperties('card');
  }, [openTransferProperties]);

  return (
    <Fragment>
      <div className={css.Description}>
        <h3>Выберите удобный для вас способ получения денег</h3>
      </div>
      <div className={css.ButtonsGroup}>
        <BasicButton
          className={css.ChoiceButton}
          type="button"
          theme="secondary"
          value="Перевод на ваш счет в другом банке"
          onClick={toAccount}
        />
        <BasicButton
          className={css.ChoiceButton}
          type="button"
          theme="secondary"
          value="Перевод на карту любого банка"
          onClick={toCard}
        />
      </div>
    </Fragment>
  );
}
