import React, { useCallback, useRef } from 'react';
import { Dropdown, useDropdown } from '../../Dropdown';
import { BasicModal } from '../../BasicModal';
import { PickerInput } from './PickerInput';
import { Calendar } from './Calendar';
import { DatePickerProvider } from './DatePicker.provider';
import { IDatePickerProps } from './types';
import css from './DatePicker.module.scss';

const modalStyles: React.CSSProperties = {
    width: '80%',
    height: '80%',
    maxHeight: '400px',
    userSelect: 'none',
};

const dropdownStyles: React.CSSProperties = {
    paddingBottom: 0,
    height: '80%',
    maxHeight: '400px',
    userSelect: 'none',
};

export function DatePicker(props: IDatePickerProps) {
    const { disabled, styles, hasError } = props;
    const dpRef = useRef<HTMLDivElement>(null);
    const { isOpen, parentRect, setIsOpen } = useDropdown(dpRef);
    const handleClick = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleCloseModal = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const handleCloseCalendar = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <div className={css.DatePicker} ref={dpRef} data-testid="date-picker" style={styles}>
            <DatePickerProvider {...props} onCloseCalendar={handleCloseCalendar} calendarIsOpen={isOpen}>
                <PickerInput disabled={disabled || isOpen} onClick={handleClick} hasError={hasError} />
                {window.innerWidth > 480 ? (
                    <Dropdown isOpen={isOpen} parentRect={parentRect} triangle="left" styles={dropdownStyles}>
                        <Calendar />
                    </Dropdown>
                ) : (
                    <BasicModal
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        clickClose
                        showClose
                        styles={modalStyles}>
                        <Calendar />
                    </BasicModal>
                )}
            </DatePickerProvider>
        </div>
    );
}

export default DatePicker;
