import React, {useState, Fragment, useCallback} from 'react';
import {useAnketa} from 'context/Anketa';
import {useError} from 'context/Error';
import {LayoutPage} from 'components/Layout';
import {PassportForm} from 'components/PassportForm';
import css from './PassportPage.module.scss';
import {AutoStepper} from 'components/AutoStepper';
import {useModalState} from '../../../hooks/modal.hook';
import {ArchiveModal} from '../../../components/ArchiveModal/ArchiveModal';

export function PassportPage() {
  const {archivingAnketa, step, updateAnketa} = useAnketa();
  const {errorState} = useError();
  const {isShowModal, handleOpenModal, handleCloseModal} = useModalState();

  const [passport, setPassport] = useState<string[]>(undefined);

  const handleSubmitPassport: React.FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();
      const [series, number] = passport;
      updateAnketa(step, {
        series,
        number,
      });
    },
    [passport, step, updateAnketa],
  );

  const handleChangePassport = useCallback((passportValue: string[]) => {
    setPassport(passportValue);
  }, []);

  const handleArchivingAnketa = useCallback(() => {
    archivingAnketa(step);
  }, [archivingAnketa, step]);

  const isComplete = () => {
    if (passport) {
      const [series = '', number = ''] = passport;
      return Boolean(series.length === 4 && number.length === 6);
    }
    return false;
  };

  const getPassportValue = useCallback(() => passport && passport.join(''), [passport]);

  return (
    <LayoutPage>
      <AutoStepper className={css.Stepper} status={step} />
      <ArchiveModal
        isOpen={isShowModal}
        handleArchivingAnketa={handleArchivingAnketa}
        onClose={handleCloseModal}
      />
      <div className={css.Page}>
        <h2 className={css.PageTitle}>Введите паспорт</h2>
        <Fragment>
          <PassportForm
            formIsValid={isComplete()}
            onChangePassport={handleChangePassport}
            onSubmitPassport={handleSubmitPassport}
            onArchivingAnketa={handleOpenModal}
            value={getPassportValue()}
            hasError={Boolean(errorState?.status)}
          />
        </Fragment>
      </div>
    </LayoutPage>
  );
}
