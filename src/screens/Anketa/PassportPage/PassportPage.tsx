import React, {useState, useCallback} from 'react';
import {Span, Button} from 'neutrino-ui';
import {useAnketa} from 'context/Anketa';
import {AppPage, Screen} from 'components/Layout';
import {H1, SecuritySign, Form, FormField, Label} from 'components/lib';
import {InputPassport} from './components';


export function PassportPage() {
  const {step, updateAnketa} = useAnketa();
  const [passport, setPassport] = useState<string>('');

  const handleSubmitPassport: React.FormEventHandler<HTMLFormElement> = useCallback(
    event => {
      event.preventDefault();
      const [series, number] = passport.split(' ');
      updateAnketa(step, {
        series,
        number,
      });
    },
    [passport, step, updateAnketa],
  );

  const handleChangePassport = useCallback((passportValue: string) => {
    setPassport(passportValue);
  }, []);

  const isValidPassport = () => {
    if (passport) {
      const [series = '', number = ''] = passport.split(' ');
      return Boolean(series.length === 4 && number.length === 6);
    }
    return false;
  };

  return (
    <AppPage>
      <Screen>
        <H1 css={{marginBottom: 24}}>Введите паспорт</H1>
        <Form onSubmit={handleSubmitPassport}>
          <FormField>
            <Label>Паспорт</Label>
            <InputPassport onChange={handleChangePassport} value={passport} />
            <Span
              css={{fontSize: 14, color: 'var(--color-text-label)', paddingTop: 8, letterSpacing: '0.005em'}}
            >
              Введите серию и номер вашего действующего паспорта.
            </Span>
          </FormField>
          <FormField></FormField>
          <FormField>
            <Button
              variant="primary"
              flat
              css={{width: 288, height: 48, borderRadius: 28}}
              type="submit"
              disabled={!isValidPassport()}
            >
              Отправить данные паспорта
            </Button>
          </FormField>
          <FormField css={{height: 48, justifyContent: 'center'}}>
            <SecuritySign />
          </FormField>
        </Form>
      </Screen>
    </AppPage>
  );
}
