import React from 'react';
import logo from 'assets/images/otp-logo.svg';
import shield from 'assets/images/shield.svg';
import css from './PageHeader.module.scss';

export function PageHeader() {
  return (
    <div className={css.HeadPanel}>
      <div className={css.Header}>
        <img className={css.Logo} src={logo} alt="OTP Bank" />
        <div className={css.ShieldSign}>
          <img className={css.Shield} src={shield} alt="shield" />
          <span className={css.ShieldText}>Гарантируем безопасность ваших данных</span>
        </div>
      </div>
    </div>
  );
}
