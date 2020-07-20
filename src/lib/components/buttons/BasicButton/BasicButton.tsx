import React, { useCallback } from 'react';
import cN from 'classnames/bind';
import css from './BasicButton.module.scss';

interface IBasicButtonProps {
    flat?: boolean;
    inactive?: boolean;
    styles?: React.CSSProperties;
    theme?: 'primary' | 'secondary' | 'hero' | 'secondary-hero' | 'default';
    icon?: string;
    value?: string;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    children?: never;
}

export type BasicButtonProps = IBasicButtonProps & JSX.IntrinsicElements['button'];

const cx = cN.bind(css);

export function BasicButton(props: BasicButtonProps) {
    const {
        className,
        type = 'button',
        flat,
        styles,
        theme = 'primary',
        icon,
        value,
        onClick,
        disabled = false,
        inactive,
        ...nativeProps
    } = props;
    const cssClasses = cx(
        className,
        css.BasicButton,
        { [css.Flat]: flat },
        { [css.Default]: theme === 'default' },
        { [css.Primary]: theme === 'primary' },
        { [css.Secondary]: theme === 'secondary' },
        { [css.SecondaryHero]: theme === 'secondary-hero' },
        { [css.Hero]: theme === 'hero' },
        { [css.Disabled]: disabled || inactive },
        { [css.Inactive]: inactive }
    );

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => onClick(event), [
        onClick,
    ]);

    return (
        // eslint-disable-next-line react/button-has-type
        <button
            className={cssClasses}
            data-testid="basic-button"
            type={type}
            style={styles}
            value={value}
            onClick={type !== 'submit' ? handleClick : undefined}
            disabled={disabled}
            {...nativeProps}>
            {icon && <img src={icon} alt="" className={css.Icon} />}
            {value && value}
        </button>
    );
}
