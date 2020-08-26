import React, {useState, useRef, useEffect, Fragment, useCallback} from 'react';
import cN from 'classnames/bind';
import {ErrorText} from 'lib/components/Forma2';
import {isEmptyString, onlyDigit} from 'utils/string.utils';
import {Cookies} from 'utils/cookies';
import {useFetch} from 'utils/use-fetch';
import {Environment} from 'services';
import {useAuth} from 'context/Auth';
import {useError} from 'context/Error';
import css from './PhoneConfirmForm.module.scss';

const cx = cN.bind(css);

const maskedPhoneNumber = () => {
  const storedPhone = Cookies.getCookie(Cookies.PHONE_NUMBER);
  if (isEmptyString(storedPhone)) return '';
  const part1 = storedPhone.substring(storedPhone.length - 4, storedPhone.length - 2);
  const part2 = storedPhone.substring(storedPhone.length - 2);
  return `+7 (***) ***-${part1}-${part2}`;
};

let timeout: any;
let interval: any;
const delay = Environment.ProdMode ? 1000 : 500;
const startTimeLeft = Environment.ProdMode ? 60 : 10;

export function PhoneConfirmForm() {
  const [smsCode, setSMSCode] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState(startTimeLeft);
  const fetchClient = useFetch();
  const {errorState, setErrorState} = useError();

  const inputRef = useRef<HTMLInputElement>(null);
  const description = maskedPhoneNumber() ? `номер ${maskedPhoneNumber()}` : 'ваш номер';

  const {handleAuth2SignIn} = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.currentTarget.value;
    const digit = onlyDigit(rawValue);
    if (digit.length > 4) return;
    setSMSCode(digit);
  };

  useEffect(() => {
    inputRef?.current?.focus();
    if (smsCode.length === 4) {
      timeout = window.setTimeout(() => handleAuth2SignIn(smsCode), 300);
    }
    if (!showLink) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, delay);
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [handleAuth2SignIn, showLink, smsCode, smsCode.length]);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowLink(true);
      clearInterval(interval);
    }
  }, [timeLeft]);

  const handleGetSMS = useCallback(() => {
    setErrorState(undefined);
    fetchClient('/gateway/send-sms', {method: 'POST'}).then(
      data => {
        setShowLink(false);
        setTimeLeft(startTimeLeft);
        return data;
      },
      error => {
        setErrorState({status: 400, message: error?.message});
        return error;
      },
    );
  }, [fetchClient, setErrorState]);

  const hasError = Boolean(errorState?.status);

  return (
    <div className={css.ConfirmForm}>
      <span>
        <strong>Войдите используя код из СМС</strong>
      </span>
      <span>Код отправлен на {description}</span>
      <div className={css.FormControl}>
        <input
          ref={inputRef}
          className={cx(css.InputControl, hasError ? css.HasError : '')}
          type="tel"
          name="code"
          placeholder="Введите код"
          onChange={handleChange}
          value={smsCode}
          autoComplete="off"
        />
        {hasError && <ErrorText errorMessage={errorState.message} />}
      </div>
      <Fragment>
        {showLink ? (
          <span className={css.GetSMSLink} onClick={handleGetSMS}>
            Отправить СМС повторно
          </span>
        ) : (
          <span>Повторный запрос возможен через {timeLeft} сек.</span>
        )}
      </Fragment>
    </div>
  );
}
