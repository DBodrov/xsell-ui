import React, { useRef, useEffect, useCallback } from 'react';
import cN from 'classnames/bind';
import { minMaxGuard } from '../utils';
import { ISliderProps } from '../types';
import css from './Slider.module.scss';

const cx = cN.bind(css);

export function Slider(props: ISliderProps) {
    const {
        max = 10,
        min = 0,
        value = 0,
        onChangeHandler,
        step = 1,
        disabled = false,
        isManualEdit,
        onEndEditing,
        onBlurHandler,
        onFocusHandler,
        hasError,
    } = props;

    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLSpanElement>(null);
    const indicatorRef = useRef<HTMLSpanElement>(null);

    const sliderCssClasses: string = cx(css.Slider, { [css.hasError]: hasError });
    const trackCSSClasses: string = cx(css.Track, { [css.isDisabled]: disabled });

    const setThumbPosition = useCallback(
        (thumbPosition = 0) => {
            if (trackRef && thumbRef && indicatorRef) {
                const thumbPosX = thumbPosition;
                indicatorRef.current.style.width = `${thumbPosX}%`;
                thumbRef.current.style.left = `${thumbPosX}%`;
                onEndEditing && onEndEditing();
            }
        },
        [onEndEditing]
    );

    const handleChange = useCallback(
        (posX: number) => {
            if (trackRef) {
                const track = trackRef.current;
                const { width, left } = track.getBoundingClientRect();
                let positionOnScale = posX - left;
                if (positionOnScale > width) {
                    positionOnScale = width;
                }
                if (positionOnScale < 0) {
                    positionOnScale = 0;
                }
                const thumbLeftPosition = (positionOnScale * 100) / width;
                const valFromRatio = (thumbLeftPosition / 100) * (max - min);
                const sharpVal = valFromRatio + min;
                const roundedVal = Math.ceil(sharpVal / step) * step;
                const val = minMaxGuard(min, max, roundedVal);
                setThumbPosition(thumbLeftPosition);
                onChangeHandler(val);
            }
        },
        [max, min, onChangeHandler, setThumbPosition, step]
    );

    const handleTrackClick: React.MouseEventHandler<HTMLDivElement> = event => {
        handleChange(event.clientX);
    };

    const calcPositionFromValue = useCallback(
        (numberValue: number) => {
            if (trackRef) {
                let val = Math.round(numberValue / step) * step;
                if (val > max) {
                    val = max;
                }
                if (val < min) {
                    val = min;
                }
                const ratio = (val - min) / (max - min);
                return ratio * 100;
            }
            return 0;
        },
        [max, min, step]
    );

    const handleChangeThumbPosition = useCallback(() => {
        const position = calcPositionFromValue(Number(value));
        setThumbPosition(position);
    }, [calcPositionFromValue, setThumbPosition, value]);

    const handleThumbMove = useCallback(
        (event: PointerEvent | MouseEvent) => {
            handleChange(event.clientX);
        },
        [handleChange]
    );

    const handleThumbDown = useCallback(() => {
        document.addEventListener('pointermove', handleThumbMove);
        document.addEventListener('mousemove', handleThumbMove);
    }, [handleThumbMove]);

    const handleThumbUp = useCallback(() => {
        document.removeEventListener('pointermove', handleThumbMove);
        document.removeEventListener('mousemove', handleThumbMove);
    }, [handleThumbMove]);

    const handleTouchMove = (event: React.TouchEvent<HTMLSpanElement>) => {
        event.preventDefault();
        const { clientX } = event.touches[0];
        handleChange(clientX);
    };

    const handleKeydown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>) => {
            const key = event.keyCode;
            if (key === 37 || key === 39) {
                const track = trackRef.current;
                const { left } = track.getBoundingClientRect();
                const positionOnPage = event.currentTarget.offsetLeft + left;
                let position: number;
                if (key === 37) {
                    position = positionOnPage - 1;
                } else if (key === 39) {
                    position = positionOnPage + 1;
                }
                handleChange(position);
            }
        },
        [handleChange]
    );

    const handleFocus = useCallback(() => {
        onFocusHandler && onFocusHandler();
    }, [onFocusHandler]);

    const handleBlur = useCallback(() => {
        onBlurHandler && onBlurHandler();
    }, [onBlurHandler]);

    const handleTouchStart = useCallback(
        (event: TouchEvent | React.TouchEvent) => {
            handleFocus();
            event.preventDefault();
        },
        [handleFocus]
    );

    const handleTouchEnd = useCallback(
        (event: TouchEvent | React.TouchEvent) => {
            handleBlur();
            event.preventDefault();
        },
        [handleBlur]
    );

    const handleResize = useCallback(() => {
        handleChangeThumbPosition();
    }, [handleChangeThumbPosition]);

    useEffect(() => {
        const thumb = thumbRef && thumbRef.current;
        document.addEventListener('pointerup', handleThumbUp);
        document.addEventListener('mouseup', handleThumbUp);
        thumb.addEventListener('touchstart', handleTouchStart, { passive: false });
        thumb.addEventListener('touchend', handleTouchEnd, { passive: false });
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('pointermove', handleThumbUp);
            document.removeEventListener('mousemove', handleThumbUp);
            thumb.removeEventListener('touchstart', handleTouchStart);
            thumb.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleKeydown, handleResize, handleThumbMove, handleThumbUp, handleTouchEnd, handleTouchStart]);

    useEffect(() => {
        if (!isManualEdit) {
            handleChangeThumbPosition();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isManualEdit) {
            handleChangeThumbPosition();
        }
    }, [handleChangeThumbPosition, isManualEdit, value]);

    return (
        <div className={sliderCssClasses}>
            <div
                className={trackCSSClasses}
                onClick={disabled ? undefined : handleTrackClick}
                role="presentation"
                ref={trackRef}>
                <span className={css.Indicator} ref={indicatorRef} />
                <span
                    aria-label="select"
                    className={css.Thumb}
                    role="button"
                    tabIndex={0}
                    ref={thumbRef}
                    onBlur={handleBlur}
                    onMouseDown={disabled ? undefined : handleThumbDown}
                    onTouchMove={disabled ? undefined : handleTouchMove}
                    onKeyDown={handleKeydown}
                    onFocus={handleFocus}
                />
            </div>
        </div>
    );
}
