import React from 'react';
import {css} from '@emotion/react';

const asLink = css`
  font-family: 'Source Sans Pro';
  font-size: 1rem;
  font-weight: normal;
  font-style: normal;
  color: var(--color-primary);

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  &:active {
    color: var(--color-secondary);
  }
`;

const agreementLink = 'https://cash.otpbank.ru/public/soglasie_otpbank.pdf';
const hrefDistanceServiceRule = 'https://cash.otpbank.ru/public/distant-service-rules.pdf';



export const AgreementLink = () => (
  <span>
    Я даю{' '}
    <a css={asLink} href={agreementLink} type="download" target="_blank" rel="noopener noreferrer">
      согласие на обработку
    </a>{' '}
    Банком моих персональных данных в целях рассмотрения настоящего сообщения
  </span>
);

export const DistanceAgreementLink = () => (
  <p>
    Я присоединяюсь к действующей редакции{' '}
    <a
      css={asLink}
      href={hrefDistanceServiceRule}
      type="download"
      target="_blank"
      rel="noopener noreferrer"
    >
      Правил дистанционного банковского обслуживания физических лиц АО &quot;ОТП Банк&quot;
    </a>
  </p>
);
