import React from 'react';
import {Span, InputMask} from 'neutrino-ui';
import {HeroSubText, LinkButton} from 'components/lib';
import {onlyDigit} from 'utils/string.utils';
import {isProduction} from 'utils/environment';
import {useFetch} from 'utils/use-fetch';
import {useAnketa} from 'context/Anketa';
import {maskedPhoneNumber} from './utils';
import {Form} from './styles';

let timeout: any;
let interval: any;
const delay = isProduction ? 1000 : 500;
const startTimeLeft = isProduction ? 60 : 10;

export function SMSForm() {
  const [code, setCode] = React.useState('');
  const [showLink, setShowLink] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(startTimeLeft);

  const fetchClient = useFetch();
  const {anketa, verifySignature, step} = useAnketa();

  const handleChangeCode = (value: string) => {
    const smsCode = onlyDigit(value);
    setCode(smsCode);
  };

  const handleGetSMS = () => {
    fetchClient('/gateway/credit-application/send-signature-code', {
      method: 'POST',
      body: {phoneNumber: anketa.mobilePhone},
    }).then(
      data => {
        setShowLink(false);
        setTimeLeft(startTimeLeft);
        return data;
      },
      error => {
        return error;
      },
    );
  };

  React.useEffect(() => {
    if (code?.length === 4) {
      timeout = window.setTimeout(() => verifySignature(step, {verificationCode: code}), 300);
    }
    if (!showLink) {
      interval = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, delay);
    }

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [code, showLink, step, verifySignature]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      setShowLink(true);
      clearInterval(interval);
    }
  }, [timeLeft]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <HeroSubText css={{fontSize: '24px !important', color: '#000', marginBottom: 8}}>
        Подпишите кодом из СМС
      </HeroSubText>
      <Span css={{alignSelf: 'flex-start'}}>Код отправлен на номер</Span>
      <Span css={{alignSelf: 'flex-start'}}>{maskedPhoneNumber()}</Span>
      <InputMask
        autoFocus
        css={{
          textAlign: 'center',
          letterSpacing: 8,
          fontSize: 28,
          height: 48,
          width: '100%',
          margin: '8px 0',
          borderRadius: 4,
          border: '1px var(--color-primary) solid',
          '&:hover, &:focus': {
            border: '1px #000 solid',
            outline: 0,
          },
        }}
        name="smsCode"
        mask="9999"
        aria-label="Введите код"
        maskPlaceholder="_"
        value={code}
        onChangeHandler={handleChangeCode}
      />
      <>
        {showLink ? (
          <LinkButton
            type="button"
            css={{color: 'var(--color-primary)', fontSize: 20}}
            onClick={handleGetSMS}
          >
            Отправить СМС повторно
          </LinkButton>
        ) : (
          <Span>Повторный запрос возможен через {timeLeft} сек.</Span>
        )}
      </>
    </Form>
  );
}
