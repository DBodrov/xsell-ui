import React from 'react';
import {Span, Button} from 'neutrino-ui';
import {FormField, Label} from '../styles';

type Props = {address?: string, onChangeAddress: () => void};
export function CustomerAddress(props: Props) {
  const {address = '', onChangeAddress} = props;

  return (
    <>
      <FormField css={{marginBottom: 12}}>
        <Label>Текущей адрес</Label>
        <div
          css={{
            border: '1px var(--color-border) dashed',
            borderRadius: 8,
            padding: '12px 16px',
            width: '288px',
            minHeight: '96px',
          }}
        >
          <Span css={{color: '#ABABAB'}}>{address}</Span>
        </div>
      </FormField>
      <FormField>
        <Span css={{padding: '22px 0 0', marginBottom: 16, '@media (max-width: 767px)': {padding: 0}}}>
          Проверьте ваш текущий адрес. Если адрес изменился, то обновите его.
        </Span>
        <Button
          variant="primary"
          css={{
            width: 183,
            minHeight: 32,
            height: 32,
            borderRadius: 18,
            '&:focus': {backgroundColor: 'var(--color-primary-dark)'},
          }}
          flat
          onClick={onChangeAddress}
        >
          Обновить адрес
        </Button>
      </FormField>
    </>
  );
}
