import React from 'react';
import cx from 'classnames';
import css from './Card.module.scss';

interface ICardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

interface IHeaderProps {
    style?: React.CSSProperties;
    children: React.ReactNode;
}

interface IBodyProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

interface IFooterProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export function Card({ children, className, style }: ICardProps) {
    return (
        <div className={cx(css.Wrapper, className)} style={style}>
            {children}
        </div>
    );
}

function Header({ children, style }: IHeaderProps) {
    return (
        <div className={css.Header} style={style}>
            {children}
        </div>
    );
}

function Body({ children, className, style }: IBodyProps) {
    return (
        <div className={cx(css.Body, className)} style={style}>
            {children}
        </div>
    );
}

function Footer({ children, style }: IFooterProps) {
    return (
        <div className={css.Footer} style={style}>
            {children}
        </div>
    );
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export const Island = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <Card className={cx(css.Island, className)}>
        <Card.Body className={css.IslandBody}>{children}</Card.Body>
    </Card>
);
