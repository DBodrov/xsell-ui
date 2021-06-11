import React from 'react';
import {Switch} from 'react-router-dom';
import {ProtectedRoute} from 'components/ProtectedRoute';
import {CalculatorPage} from 'screens/Anketa/CalculatorPage';
import {PassportPage} from 'screens/Anketa/PassportPage';
import {JobInfoPage} from 'screens/Anketa/JobInfoPage';
import {TransferDetailsPage} from 'screens/Anketa/TransferDetailsPage';
import {PhotoPassportPage} from 'screens/Anketa/PhotoPassportPage';
import {AgreementPage} from 'screens/Anketa/AgreementSMSPage';
import {PendingScoringPage} from 'screens/Anketa/PendingScoringPage';
import {AdvanceScoringRefusalPage} from 'screens/Anketa/AdvanceScoringRefusalPage';
import {ResultScoringPage} from 'screens/Anketa/ResultScoringPage';
import {SignaturePage} from '../../pages/Anketa/SignaturePage';
import {ExecutionPage} from '../../pages/Anketa/ExecutionPage';
import {ExecutionFailedPage} from '../../pages/Anketa/ExecutionFailedPage';
import {CompletedPage} from '../../pages/Anketa/CompletedPage';
import {RegistrationChanged} from '../../pages/Anketa/RegistrationChanged';
// import {PassportRegPhotoPage} from '../../pages/PassportRegPhotoPage';
// import {PassportPhotoPage} from '../../pages/PassportPhotoPage';
import {PendingDocumentsPage} from '../../pages/Anketa/PendingDocumentsPage';
import {routeMap} from './anketa.routingMap';

export function AnketaRoutes() {
  return (
    <Switch>
      {/* Необходимо ввести запрашиваемые параметры кредита(размер и срок) */}
      <ProtectedRoute path={routeMap.LOAN_PARAMS}>
        <CalculatorPage />
      </ProtectedRoute>
      {/* Необходимо заполнить серию и номер паспорта */}
      <ProtectedRoute path={routeMap.PASSPORT}>
        <PassportPage />
      </ProtectedRoute>
      {/* Необходимо подтверждение адреса регистрации, который есть у банка
      + Необходимо ввести анкетные данные клиента (работа, стаж, заработная плата и тд)*/}
      <ProtectedRoute path={routeMap.REGISTRATION_ADDRESS}>
        <JobInfoPage />
      </ProtectedRoute>
      {/* Паспорт ввел не правильно / Адрес изменился */}
      <ProtectedRoute path={routeMap.CHANGED_REGISTRATION_ADDRESS}>
        <RegistrationChanged />
      </ProtectedRoute>
      {/* Фото */}
      <ProtectedRoute exact path={routeMap.PASSPORT_PHOTO}>
        <PhotoPassportPage />
      </ProtectedRoute>
      {/* <ProtectedRoute path={`${routeMap.PASSPORT_PHOTO}/person`} component={PassportPhotoPage} />
      <ProtectedRoute path={`${routeMap.PASSPORT_PHOTO}/registration`} component={PassportRegPhotoPage} /> */}
      {/* Необходимо получить согласие клиента на его проверку в БКИ */}
      {/* <ProtectedRoute exact path={routeMap.PROCESSING_AGREEMENT}>
                <ContactsPage />
            </ProtectedRoute> */}
      {/* Необходимо получить код клиента из отправленного нами смс для подтверждения согласия на проверку в БКИ */}
      <ProtectedRoute exact path={routeMap.AGREEMENT_SMS_CODE}>
        <AgreementPage />
      </ProtectedRoute>
      {/* Проверяем кредитную историю */}
      <ProtectedRoute exact path={routeMap.PENDING_ADVANCE_SCORING}>
        {/* TODO: Long polling */}
        {/* <PendingAdvanceScoringPage /> */}
        <PendingScoringPage />
      </ProtectedRoute>
      {/* ПРЕскоринг - ОТКАЗ */}
      <ProtectedRoute exact path={routeMap.ADVANCE_SCORING_REFUSAL}>
        <AdvanceScoringRefusalPage />
      </ProtectedRoute>
      <ProtectedRoute exact path={routeMap.TRANSFER_DETAILS}>
        <TransferDetailsPage />
      </ProtectedRoute>
      {/* скоринг: одобрение или нет решения */}
      <ProtectedRoute exact path={routeMap.PENDING_SCORING}>
        <PendingScoringPage />
      </ProtectedRoute>
      {/* Заявка доставлена роботу. Ждем результаты скоринга. */}
      <ProtectedRoute exact path={routeMap.SCORING}>
        <PendingScoringPage />
      </ProtectedRoute>
      {/* Заявка одобрена. Показываем клиенту одобренные параметры кредита */}
      <ProtectedRoute exact path={routeMap.APPROVED}>
        <ResultScoringPage />
      </ProtectedRoute>
      {/* Отказ на скорринге */}
      <ProtectedRoute exact path={routeMap.REJECTED}>
        <AdvanceScoringRefusalPage />
      </ProtectedRoute>
      {/* Ожидается код, подтверждающий подпись клиента под документами на кредит */}
      <ProtectedRoute exact path={routeMap.SIGNATURE_SMS_CODE}>
        <SignaturePage />
      </ProtectedRoute>
      {/* Ждем */}
      <ProtectedRoute exact path={routeMap.PENDING_DOCUMENTS}>
        <PendingDocumentsPage />
      </ProtectedRoute>
      {/** Одобрено */}
      <ProtectedRoute exact path={routeMap.EXECUTION}>
        <CompletedPage />
      </ProtectedRoute>
      <ProtectedRoute exact path={routeMap.EXECUTION_FAILED}>
        <ExecutionFailedPage />
      </ProtectedRoute>
      {/* Деньги отправлены клиенту */}
      <ProtectedRoute exact path={routeMap.COMPLETED}>
        <ExecutionPage />
      </ProtectedRoute>
    </Switch>
  );
}
