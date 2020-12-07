import React from 'react';
import {ShieldIcon} from 'icons';

export function SecuritySign() {
  return (
    <div css={{display: 'flex', alignItems: 'center'}}>
      <ShieldIcon />
      <span css={{color: '#939393', fontSize: 16, paddingLeft: 10}}>
        Гарантируем безопасность данных
      </span>
    </div>
  );
}
