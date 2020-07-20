import React from 'react';

const agreementLink =
    'https://hb.bizmrg.com/otpbank-docs/x-sell/%D0%A1%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%BD%D0%B0%20%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D1%83%20%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%B8%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%BD%D1%8B%D1%85%20%D0%BE%D1%82%D1%87%D0%B5%D1%82%D0%BE%D0%B2.pdf';
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
            rel="noopener noreferrer">
            Правил дистанционного банковского обслуживания физических лиц АО &quot;ОТП Банк&quot;
        </a>
    </p>
);
