import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { animated, useTransition } from 'react-spring';
// import cn from 'classnames/bind';
import { UI } from 'src/services';
import closeIco from 'lib/ui-kit/assets/icons/forms/close.svg';
import css from './BasicModal.module.scss';

interface IModalProps {
    isOpen: boolean;
    clickClose?: boolean;
    escClose?: boolean;
    styles?: React.CSSProperties;
    title?: string;
    showClose?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function BasicModal(props: IModalProps) {
    const { isOpen, clickClose, escClose, onClose, styles, title, showClose, children } = props;
    // console.log(isOpen);
    const modalRef = useRef<HTMLDivElement>(null);
    const rootNode = UI.createModalRootNode();
    const transition = useTransition(isOpen, null, {
        enter: { opacity: 1, transform: 'translateY(0)' },
        from: { opacity: 0, transform: 'translateY(-200px)' },
        leave: { opacity: 0, transform: 'translateY(-200px)' },
    });

    const handleClickOutside = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (event: Event) => {
            // console.log('click outoside callback', event);
            if (event.target instanceof HTMLElement && !modalRef.current.contains(event.target)) {
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

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        // console.log(props);
    });

    useEffect(() => {
        if (clickClose && isOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        if (escClose && isOpen) {
            document.addEventListener('keydown', handleEscKeyPress);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [clickClose, escClose, handleClickOutside, handleEscKeyPress, isOpen]);

    const renderModal = () =>
        transition.map(
            ({ item, props: springProps, key }) =>
                item && (
                    <div className={css.Overlay} key={key}>
                        <animated.div
                            key={key}
                            className={css.Modal}
                            style={{ ...springProps, ...styles }}
                            ref={modalRef}>
                            {title && (
                                <div className={css.Title}>
                                    <span>{title}</span>
                                    {showClose && (
                                        <div
                                            className={css.Close}
                                            role="button"
                                            tabIndex={-1}
                                            onClick={handleClose}>
                                            <img src={closeIco} alt="X" />
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className={css.ModalContent}>{children}</div>
                        </animated.div>
                    </div>
                )
        );

    return ReactDOM.createPortal(<Fragment>{renderModal()}</Fragment>, rootNode);
}
