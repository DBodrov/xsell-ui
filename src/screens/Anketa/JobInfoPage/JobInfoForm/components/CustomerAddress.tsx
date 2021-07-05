import React from 'react';
import {Span} from 'neutrino-ui';
import {LinkButton} from 'components/lib';
import {FormField, Label} from '../styles';

type Props = {address?: string; onChangeAddress: (e: React.PointerEvent<HTMLButtonElement>) => void};

export function CustomerAddress(props: Props) {
  const {address = '', onChangeAddress} = props;

  return (
    <>
      <FormField css={{marginBottom: 12}}>
        <Label>Текущий адрес</Label>
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
        <Span css={{padding: '22px 0 0', marginBottom: 16, '@media (max-width: 704px)': {padding: 0}}}>
          Проверьте ваш текущий адрес. Если адрес изменился, то обновите его.
        </Span>
        <LinkButton type="button" css={{alignSelf: 'flex-start'}} onClick={onChangeAddress}>Обновить адрес</LinkButton>
      </FormField>
    </>
  );
}
