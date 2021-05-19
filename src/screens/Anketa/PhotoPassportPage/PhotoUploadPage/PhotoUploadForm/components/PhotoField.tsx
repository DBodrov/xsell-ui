import React from 'react';
import {css} from '@emotion/react';
import {CameraIcon} from 'icons';
import {Spinner} from 'components/lib';
import {TPhotoType, PhotoFieldLabels} from '../types';
import {Field, PhotoButton} from './styles';

interface IPhotoFieldProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  onChange: (file: File, type: TPhotoType) => void;
  preview?: string;
  photoType: TPhotoType;
  showLoader: boolean;
}

export function PhotoField(props: IPhotoFieldProps) {
  const {onChange, preview, photoType, showLoader} = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFieldClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    onChange(file, photoType);
  };

  const renderButtonContent = () => {
    if (showLoader) {
      return (
        <Spinner
          loaderCss={css({width: '100%', height: '100%'})}
          css={{position: 'relative', width: '80%', height: '80%', transform: 'translateY(0)'}}
        />
      );
    } else if (preview) {
      return <img src={preview} alt="" css={{height: '100%', maxWidth: '100%'}} />;
    } else {
      return <CameraIcon />;
    }
  };

  return (
    <Field>
      <input
        style={{display: 'none'}}
        type="file"
        name={photoType}
        onChange={handleChange}
        accept="image/*"
        ref={inputRef}
        aria-label={PhotoFieldLabels[photoType]}
      />
      <PhotoButton onClick={handleFieldClick} disabled={showLoader}>
        {renderButtonContent()}
      </PhotoButton>
      <span>{PhotoFieldLabels[photoType]}</span>
    </Field>
  );
}
