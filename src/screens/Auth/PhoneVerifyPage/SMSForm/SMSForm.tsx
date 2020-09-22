import React from 'react';
import {Span, MaskInput} from 'neutrino-ui';
import {HeroSubText, LinkButton} from 'components/lib';
import {onlyDigit} from 'utils/string.utils';
import {isProduction} from 'utils/environment';
import {useFetch} from 'utils/use-fetch';
import {useAuth} from 'context/Auth';
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
  const {handleAuth2SignIn, error} = useAuth();
  const hasError = error && Object.keys(error).length > 0;
  const fetchClient = useFetch();

  const handleChangeCode = (value: string) => {
    const smsCode = onlyDigit(value);
    setCode(smsCode);
  };

  const handleGetSMS = () => {
    fetchClient('/gateway/send-sms', {method: 'POST'}).then(
      data => {
        setShowLink(false);
        setTimeLeft(startTimeLeft);
        return data;
      },
      error => {
        //setErrorState({status: 400, message: error?.message});
        return error;
      },
    );
  };

  React.useEffect(() => {
    if (code?.length === 4) {
      timeout = window.setTimeout(() => handleAuth2SignIn(code), 300);
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
  }, [code, handleAuth2SignIn, showLink]);

  React.useEffect(() => {
    if (timeLeft === 0) {
      setShowLink(true);
      clearInterval(interval);
    }
  }, [timeLeft]);

  return (
    <Form>
      <HeroSubText css={{fontSize: '24px !important', color: '#000', marginBottom: 8}}>
        Введите код из СМС
      </HeroSubText>
      <Span css={{alignSelf: 'flex-start'}}>Код отправлен на номер</Span>
      <Span css={{alignSelf: 'flex-start'}}>{maskedPhoneNumber()}</Span>
      <MaskInput
        hasError={hasError}
        autoFocus
        type="tel"
        css={{
          textAlign: 'center',
          letterSpacing: 8,
          fontSize: 28,
          height: 48,
          margin: '8px 0',
          '&:hover, &:focus': {borderColor: !hasError && '#000'},
        }}
        name="smsCode"
        mask="9999"
        aria-label="Введите код"
        maskPlaceholder="_"
        value={code}
        onChangeHandler={handleChangeCode}
      />
      {hasError ? <Span css={{color: 'var(--color-error)', fontSize: 12}}>{error.message}</Span> : null}
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
