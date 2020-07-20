import React, { useCallback, useState } from 'react';
import { RangeInput } from './RangeInput';
import { Slider } from './Slider';
import { MinmaxText } from './MinmaxText';
import { IRangeProps } from './types';
import { clearFormat, getCurrencySymbol, isEmptyString } from './utils';
import css from './Range.module.scss';

export function Range(props: IRangeProps) {
    const {
        name,
        rangeType,
        currency,
        caption,
        value = '',
        onChangeHandler,
        onBlurHandler,
        max = 10,
        min = 0,
        minText,
        maxText,
        styles,
        step = 1,
        disabled = false,
        inputDisabled = false,
        hasError,
    } = props;

    const [isEditMode, setEditMode] = useState(true);
    const [isTouched, setTouched] = useState(false);

    const handleChangeValue = useCallback(
        (val: string) => {
            const rangeValue: StringOrNumber = isEmptyString(val) ? '' : val;
            onChangeHandler(clearFormat(rangeValue));
        },
        [onChangeHandler]
    );

    const handleSliderChange = useCallback(
        (sliderValue: number) => {
            onChangeHandler(String(sliderValue));
        },
        [onChangeHandler]
    );

    const getCaption = () => {
        if (rangeType === 'currency') {
            return getCurrencySymbol(currency);
        }
        return caption;
    };

    const handleEndEditing = useCallback(() => {
        isEditMode && setEditMode(false);
    }, [isEditMode]);

    const handleBlur = useCallback(() => {
        onBlurHandler && onBlurHandler(value);
    }, [onBlurHandler, value]);

    const handleTouch = useCallback((touchState: boolean) => {
        setTouched(touchState);
    }, []);

    return (
        <div className={css.Range} style={styles}>
            <RangeInput
                name={name}
                onChange={handleChangeValue}
                onTouch={handleTouch}
                onBlurHandler={handleBlur}
                isTouched={isTouched}
                value={String(value)}
                caption={getCaption()}
                min={Number(min)}
                max={Number(max)}
                disabled={inputDisabled || disabled}
                hasError={hasError}
            />
            <Slider
                max={Number(max)}
                min={Number(min)}
                value={value}
                onChangeHandler={handleSliderChange}
                onBlurHandler={handleBlur}
                onEndEditing={handleEndEditing}
                isManualEdit={isTouched}
                step={Number(step)}
                disabled={disabled}
                hasError={hasError}
            />
            {!hasError && <MinmaxText minText={minText} maxText={maxText} />}
        </div>
    );
}
