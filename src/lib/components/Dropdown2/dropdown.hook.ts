import { useEffect, useCallback, useState } from 'react';

export function useDropdown(
    parentRef: React.MutableRefObject<HTMLElement>,
    dropdownRef: React.MutableRefObject<HTMLElement>
) {
    const [parentRect, setParentRect] = useState<ClientRect>(null);
    const [isOpen, setIsOpen] = useState(false);
    const calcParentRect = useCallback(() => {
        const parentBoundRect = parentRef && parentRef.current.getBoundingClientRect();
        setParentRect(parentBoundRect);
    }, [parentRef]);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (event.target instanceof HTMLElement) {
                const dropdown = dropdownRef?.current;
                if (
                    !parentRef.current ||
                    !dropdown ||
                    parentRef.current.contains(event.target) ||
                    dropdown.contains(event.target)
                ) {
                    return;
                }
                setIsOpen(false);
            }
        },
        [dropdownRef, parentRef]
    );

    const handleEscPress = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        window.addEventListener('resize', calcParentRect);
        document.addEventListener('scroll', calcParentRect);
        document.addEventListener('keydown', handleEscPress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.removeEventListener('scroll', calcParentRect);
            window.removeEventListener('resize', calcParentRect);
            document.removeEventListener('keydown', handleEscPress);
        };
    }, [calcParentRect, handleClickOutside, handleEscPress]);

    useEffect(() => {
        if (isOpen) {
            calcParentRect();
        }
    }, [calcParentRect, isOpen]);

    return { isOpen, setIsOpen, parentRect, calcParentRect };
}
