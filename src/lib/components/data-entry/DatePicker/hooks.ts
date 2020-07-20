import { useState, useMemo, useEffect } from 'react';
import { IPickerValue } from './types';

export function usePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [rect, setRect] = useState<ClientRect>(null);
    const [day, setDay] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<string>('');

    const pickerValue: IPickerValue = useMemo(() => ({ day, month, year }), [day, month, year]);

    return { isOpen, setIsOpen, rect, setRect, day, setDay, month, setMonth, year, setYear, pickerValue };
}

export function useClickOutside(ref: React.MutableRefObject<HTMLElement>, handler: (event: Event) => void) {
    useEffect(() => {
        const listener = (event: Event) => {
            if (event.target instanceof HTMLElement) {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            }
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [handler, ref]);
}
