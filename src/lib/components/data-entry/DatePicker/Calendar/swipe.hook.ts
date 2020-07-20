import { useState, useCallback, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { useDatePicker } from '../DatePicker.provider';
import { PanelType } from '../types';

export function useSwipe(panelType: PanelType, value: string) {
    const [firstTouch, setFirstTouch] = useState(null);
    const [isSwipe, setIsSwipe] = useState(false);
    const { handleChangePanel, panelDirection } = useDatePicker();
    const [calendarStyles, set] = useSpring(() => ({
        left: 0,
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        from: { opacity: 0 },
        config: { duration: 400, tension: 200 },
    }));

    const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
        const firstX = event.touches[0].clientX;
        setFirstTouch(firstX);
    }, []);

    const handleTouchMove = useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            const { clientX } = event.touches[0];
            if (firstTouch + 50 < clientX) {
                setIsSwipe(true);
                const diff = clientX - firstTouch;
                set({ left: diff * 40, opacity: 0 });
            } else if (firstTouch > clientX + 50) {
                setIsSwipe(true);
                const diff = firstTouch - clientX;
                set({ left: Number(`-${diff}`) * 40 });
            }
        },
        [firstTouch, set]
    );

    const handleTouchEnd = useCallback(
        (event: React.TouchEvent<HTMLDivElement>) => {
            if (isSwipe) {
                setIsSwipe(false);
                if (event.currentTarget.offsetLeft > 0) {
                    handleChangePanel('prev', panelType);
                } else {
                    handleChangePanel('next', panelType);
                }
            }
        },
        [handleChangePanel, isSwipe, panelType]
    );

    useEffect(() => {
        set({ opacity: 1, left: 0, from: { opacity: 0 } });
    }, [value, panelDirection, set]);

    return { handleTouchStart, handleTouchMove, handleTouchEnd, calendarStyles };
}
