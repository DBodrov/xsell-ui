import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import cN from 'classnames/bind';
import { animated, useTransition } from 'react-spring';
import { UI } from 'services';
import css from './Dropdown.module.scss';

const cx = cN.bind(css);

export interface IDropdownProps {
    isOpen: boolean;
    parentRect?: ClientRect;
    triangle?: 'left' | 'right' | 'center';
    styles?: React.CSSProperties;
    children: React.ReactNode;
}

export function Dropdown(props: IDropdownProps): React.ReactPortal {
    const { isOpen, parentRect, children, triangle = 'right', styles = {} } = props;
    const [isReady, setIsReady] = useState(false);
    const ddRef = useRef<HTMLDivElement>(null);
    const rootNode = UI.createModalRootNode();

    const cssClasses = cx(
        'js-dropdown',
        css.Dropdown,
        css.TriangleTop,
        { [css.TriangleLeft]: triangle === 'left' },
        { [css.TriangleRight]: triangle === 'right' },
        { [css.TriangleCenter]: triangle === 'center' }
    );

    const onUpdateCallback = (): React.CSSProperties => {
        if (isReady && ddRef && ddRef.current) {
            const dropdownHeight = ddRef && ddRef.current && ddRef.current.clientHeight;
            const windowHeight = window.innerHeight;
            const bottomSpace = windowHeight - parentRect.bottom;
            const topSpace = parentRect.top;

            // console.log(bottomSpace, windowHeight, topSpace, dropdownHeight, parentRect);

            if (bottomSpace < dropdownHeight) {
                if (topSpace > dropdownHeight) {
                    ddRef.current.classList.remove(css.TriangleTop);
                    ddRef.current.classList.add(css.TriangleBottom);
                    return {
                        top: parentRect.top - dropdownHeight - 10,
                        left: parentRect.left,
                        minWidth: parentRect.width,
                        width: parentRect.width,
                    };
                }
                if (windowHeight < dropdownHeight) {
                    ddRef.current.style.height = `${windowHeight}px`;
                }
                return {
                    top: 0,
                    border: 0,
                    position: 'fixed',
                    left: parentRect.left,
                    minWidth: parentRect.width,
                    width: parentRect.width,
                };
            }
            if (bottomSpace > dropdownHeight) {
                // console.log(bottomSpace, dropdownHeight, parentRect);

                ddRef.current.classList.remove(css.TriangleBottom);
                ddRef.current.classList.add(css.TriangleTop);
                return {
                    top: parentRect.bottom + 10,
                    left: parentRect.left,
                    minWidth: parentRect.width,
                    width: parentRect.width,
                };
            }
        }
        return {};
    };

    const transition = useTransition(isReady, {
        from: { opacity: 0, transform: 'translateY(20px)' },
        enter: isReady
            ? {
                  top: parentRect.bottom + 10,
                  opacity: 1,
                  transform: 'translateY(0)',
                  left: parentRect.left,
                  minWidth: parentRect.width,
                  width: parentRect.width,
              }
            : {},
        update: onUpdateCallback,
        leave: { opacity: 0, transform: 'translateY(20px)' },
        config: { duration: 400, tension: 200 },
    });

    useEffect(() => {
        if (isOpen && parentRect) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [isOpen, parentRect]);

    const renderDropdown = () =>
        transition(
            (springProps, item) =>
                item && (
                    <animated.div
                        className={cssClasses}
                        ref={ddRef}
                        style={{ ...springProps as any, ...styles }}
                        tabIndex={-1}
                        data-testid="dropdown">
                        {children}
                    </animated.div>
                )
        );

    return ReactDOM.createPortal(<React.Fragment>{renderDropdown()}</React.Fragment>, rootNode);
}
