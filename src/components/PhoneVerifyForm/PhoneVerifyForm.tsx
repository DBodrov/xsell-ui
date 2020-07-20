import React, { useState, useCallback } from 'react';
import { useAuth } from 'providers';
import { Environment } from 'services';
import { onlyDigit } from 'utils/string.utils';
import { BasicInput } from 'lib/components/data-entry/BasicInput';
import { Countdown } from 'lib/components/Countdown';
import { Card } from 'components/Card';
import mobileIcon from 'assets/images/mobile.svg';

import css from './PhoneVerifyForm.module.scss';

interface IPhoneVerifyFormProps {
  onSubmit: (code: string) => void;
  onResend: () => void;
  hasError: boolean;
  header: string;
  subheader?: string;
  title: string;
  phone?: string;
  codeLength?: number;
  timeout?: number;
}

const maskPhoneNumber = (number: string) => {
  const value = onlyDigit(number);
  const part1 = value.substring(value.length - 4, value.length - 2);
  const part2 = value.substring(value.length - 2);
  return `+7 (XXX) XXX-${part1}-${part2}`;
};

export function PhoneVerifyForm(props: IPhoneVerifyFormProps) {
  const {
    onSubmit,
    onResend,
    phone,
    header,
    subheader,
    title,
    hasError,
    codeLength = 4,
    timeout = Environment.ProdMode ? 60 : 10,
  } = props;

  const [code, setCode] = useState('');
  const [attempt, setAttempt] = useState(0);
  const { error } = useAuth();
  const smsText = phone ? `номер ${maskPhoneNumber(phone)}` : 'ваш номер';

  const handleResend = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setAttempt((i) => i + 1);
      onResend();
    },
    [onResend]
  );

  const handleChange = useCallback(
    (value: string) => {
      setCode(value);
      if (value.trim().length === codeLength) {
        onSubmit(value);
      }
    },
    [codeLength, onSubmit]
  );

  return (
    <div className={css.PhoneVerifyForm}>
      <h2 className={css.Header}>{header}</h2>
      <span>{subheader}</span>
      <Card className={css.PhoneVerifyCard}>
        <Card.Header>
          <img src={mobileIcon} alt="mobile" />
        </Card.Header>
        <Card.Body>
          <h4 className={css.PhoneVerifyTitle}>{title}</h4>
          <span>Код отправлен на {smsText}</span>

          <div className={css.PhoneVerifyInputBlock}>
            <BasicInput
              className={css.PhoneVerifyInput}
              extendProps={{ control: { style: { textAlign: 'center', fontSize: '1.5rem' } } }}
              autoFocus
              autoComplete="off"
              type="tel"
              data-testid="sms-code-input"
              name="smsCode"
              onChangeHandler={handleChange}
              value={code}
              maxLength={4}
              hasError={hasError}
              placeholder="Введите код"
            />
            {hasError && <span className={css.ErrorText}>{error.errorMessage}</span>}
          </div>

          <Countdown
            key={attempt}
            className={css.PhoneVerifyCountdown}
            seconds={timeout}
            renderDone={
              <a href="#" className={css.PhoneVerifyLink} onClick={handleResend}>
                Отправить СМС повторно
              </a>
            }>
            {(value) => <span>Повторный запрос возможен через {value} сек.</span>}
          </Countdown>
        </Card.Body>
      </Card>
      <div />
    </div>
  );
}
