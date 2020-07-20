import React from 'react';

const hrefSmsService = 'https://cash.otpbank.ru/public/sms-service.pdf';
const hrefInsuranceJob = 'https://cash.otpbank.ru/public/insurance-job.pdf';
const hrefInsuranceLife = 'https://cash.otpbank.ru/public/insurance-life.pdf';

export const SmsInfoLink = ({ htmlFor }: { htmlFor: string }) => (
  <div>
    <p>
      <label htmlFor={htmlFor}>
        <b>SMS информирование</b>
      </label>
    </p>
    Банк напомнит Вам о дате и сумме платежа, о зачислении средств на счет и многое другое (
    <a className="as-link" href={hrefSmsService} type="download" target="_blank" rel="noopener noreferrer">
      Подробнее PDF 412 Kb
    </a>
    )
  </div>
);

export const JobInsuranceLink = ({ htmlFor }: { htmlFor: string }) => (
  <div>
    <p>
      <label htmlFor={htmlFor}>
        <b>Защита от потери работы</b>
      </label>
    </p>
    При сокращении штата или ликвидации организации за счет страховых выплат вы сможете погашать кредит (
    <a className="as-link" href={hrefInsuranceJob} type="download" target="_blank" rel="noopener noreferrer">
      Подробнее PDF 994 Kb
    </a>
    )
  </div>
);

export const LifeInsuranceLink = ({ htmlFor }: { htmlFor: string }) => (
  <div>
    <p>
      <label htmlFor={htmlFor}>
        <b>Защита жизни и здоровья</b>
      </label>
    </p>
    При болезни, инвалидности или уходе из жизни за счет страховых выплат вы сможете погашать кредит (
    <a className="as-link" href={hrefInsuranceLife} type="download" target="_blank" rel="noopener noreferrer">
      Подробнее PDF 1.1 Mb
    </a>
    )
  </div>
);
