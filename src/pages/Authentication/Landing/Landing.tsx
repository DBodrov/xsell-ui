import React from 'react';
import { BasicButton } from 'lib/components/buttons';
import { LayoutPage } from 'components/Layout';
import { Offer } from 'components/Offer';
import { LandingPicture } from './LandingPicture';
import { getLandingImagesSet } from './utils';
import css from './PersonalLanding.module.scss';

type Props = {
  onNextPage: () => void;
  variant?: string;
};

const currentImage = (landingKey: string) => getLandingImagesSet(landingKey);

export function Landing({ onNextPage, variant }: Props) {
  return (
    <LayoutPage>
      <div className={css.Page}>
        <div className={css.Heading}>
          <LandingPicture imageSet={currentImage(variant)} />
          <ul className={css.TagList}>
            <li className={css.Tag}>кредит</li>
            <li className={css.Tag}>просто</li>
            <li className={css.Tag}>деньги</li>
            <li className={css.Tag}>онлайн</li>
          </ul>
          <div className={css.HeadText}>
            <h2 className={css.HeadTitle}>Кредит наличными</h2>
            <p>Получить онлайн на любые цели</p>
          </div>
          <BasicButton
            className={css.StartButton}
            onClick={onNextPage}
            type="button"
            value="Получить онлайн"
            theme="primary"
          />
        </div>
        <Offer />
      </div>
    </LayoutPage>
  );
}
