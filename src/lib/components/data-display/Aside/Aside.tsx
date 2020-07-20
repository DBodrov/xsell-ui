import React, { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames/bind';
import { UI } from 'src/services';
import closeIco from 'lib/ui-kit/assets/icons/forms/close.svg';
import css from './Aside.module.scss';

export type AsideSize = 'full' | 'middle' | 'small';

export interface IAsideProps {
    isOpen: boolean;
    size?: AsideSize;
    title?: string;
    clickClose?: boolean;
    escClose?: boolean;
    showClose?: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const defaultProps: Partial<IAsideProps> = {
    size: 'middle',
};

const cx = cn.bind(css);

export function Aside(props: IAsideProps) {
    const asideRef = useRef<HTMLDivElement>(null);
    const rootNode = UI.createModalRootNode();
    const { isOpen, size, title, onClose, clickClose, escClose, showClose, children } = props;
    const [showAside, setShowAside] = useState(false);

    const handleClickOutside = useCallback(
        (event: any) => {
            if (event.target.classList.contains(css.Overlay)) {
                onClose();
            }
        },
        [onClose]
    );

    const handleEscKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        let timeOut: number;
        if (isOpen) {
            setShowAside(true);
            timeOut = window.setTimeout(() => toggleOpenClass(true), 100);
            if (clickClose) {
                document.addEventListener('click', handleClickOutside);
            }
            if (escClose) {
                document.addEventListener('keydown', handleEscKeyPress);
            }
        } else {
            toggleOpenClass(false);
            timeOut = window.setTimeout(() => setShowAside(false), 100);
        }

        return () => {
            clearTimeout(timeOut);
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [clickClose, escClose, handleClickOutside, handleEscKeyPress, isOpen]);

    const getCssClasses = cx(
        css.Aside,
        { [css.Full]: size === 'full' },
        { [css.Middle]: size === 'middle' },
        { [css.Small]: size === 'small' }
    );

    const toggleOpenClass = (isVisible: boolean): void => {
        const aside = asideRef.current;
        if (aside && isVisible) {
            aside.classList.add(css.isOpen);
        } else if (aside && !isVisible) {
            aside.classList.remove(css.isOpen);
        }
    };

    return ReactDOM.createPortal(
        <Fragment>
            {showAside && (
                <div className={css.Overlay}>
                    <div className={getCssClasses} ref={asideRef}>
                        <Fragment>
                            {title && (
                                <div className={css.Title}>
                                    <span>{title}</span>
                                </div>
                            )}
                            {showClose && (
                                <div className={css.Close} role="button" tabIndex={-1} onClick={onClose}>
                                    <img src={closeIco} alt="X" />
                                </div>
                            )}
                        </Fragment>
                        <div className={css.Content}>{children}</div>
                    </div>
                </div>
            )}
        </Fragment>,
        rootNode
    );
}

Aside.defaultProps = defaultProps;
