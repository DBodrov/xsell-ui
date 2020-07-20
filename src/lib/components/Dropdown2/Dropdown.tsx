import React, { useRef, CSSProperties } from 'react';
import cN from 'classnames/bind';
import { animated, useTransition } from 'react-spring';
import { Portal } from '../Portal';
import { DropdownSpringStyles } from './styles';

import css from './Dropdown.module.scss';

const cx = cN.bind(css);

export interface IDropdownProps {
    isOpen: boolean;
    parentBound?: ClientRect;
    styles?: React.CSSProperties;
    children: React.ReactNode;
}

export function Dropdown(props: IDropdownProps) {
    const { isOpen, parentBound, children, styles = {} } = props;
    const dropdownRef = useRef<HTMLDivElement>(null);
    const cssClasses = cx(css.Dropdown);

    const onUpdate = () => {
        if (isOpen) {
            return new DropdownSpringStyles(dropdownRef, parentBound).createSpringStyles();
        }
        return {};
    };

    const transitions = useTransition(isOpen, null, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        update: onUpdate(),
        leave: { opacity: 0, transform: 'translateY(20px)' },
        config: { duration: 200, tension: 200 },
    });

    const renderDropdown = () =>
        transitions.map(
            ({ item, props: springProps, key }) =>
                item && (
                    <animated.div
                        key={key}
                        className={cssClasses}
                        ref={dropdownRef}
                        style={{ ...springProps, ...styles }}
                        tabIndex={-1}>
                        {children}
                    </animated.div>
                )
        );

    return <Portal portalName="otp-portal">{renderDropdown()}</Portal>;
}
