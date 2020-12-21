import React from 'react';

const agreementLink = 'https://cash.otpbank.ru/public/soglasie_otpbank.pdf';
const hrefDistanceServiceRule = 'https://cash.otpbank.ru/public/distant-service-rules.pdf';

export const AgreementLink = () => (
  <span>
    Я даю{' '}
    <a className="as-link" href={agreementLink} type="download" target="_blank" rel="noopener noreferrer">
      согласие на обработку
    </a>{' '}
    Банком моих персональных данных в целях рассмотрения настоящего сообщения
  </span>
);

export const DistanceAgreementLink = () => (
  <p>
    Я присоединяюсь к действующей редакции{' '}
    <a
      className="as-link"
      href={hrefDistanceServiceRule}
      type="download"
      target="_blank"
      rel="noopener noreferrer"
    >
      Правил дистанционного банковского обслуживания физических лиц АО &quot;ОТП Банк&quot;
    </a>
  </p>
);
