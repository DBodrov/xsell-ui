import React from 'react';
import cn from 'classnames/bind';
import css from './Hero.module.scss';

type Background = 'green' | 'orange' | 'blue';

interface IHeroProps {
    imgUrl: string;
    headText: string;
    subheadText: string;
    headColor?: Background;
    subheadColor?: Background;
}

const cx = cn.bind(css);

const getCssColorClass = (color: Background): string => {
    switch (color) {
        default:
        case 'green':
            return css.Green;

        case 'blue':
            return css.Blue;

        case 'orange':
            return css.Orange;
    }
};

export function Hero(props: IHeroProps) {
    const { imgUrl, headText, subheadText, headColor = 'green', subheadColor = 'blue' } = props;

    return (
        <div className={css.Hero}>
            <div className={css.HeroFocus}>
                <img className={css.HeroImage} src={imgUrl} alt="" />
            </div>
            <div className={css.HeroLines}>
                <div className={css.HeroLinesWrap}>
                    <div className={cx(css.HeroHeadline, getCssColorClass(headColor))}>
                        <h2>{headText}</h2>
                    </div>
                    <div className={cx(css.HeroSubheadline, getCssColorClass(subheadColor))}>
                        <p className="text-lead">{subheadText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
