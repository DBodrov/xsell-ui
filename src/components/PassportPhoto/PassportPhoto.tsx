import React, { useCallback, useRef, useState } from 'react';
import { isMobile } from 'src/services/ui.service';
import { ImageTaking, IUploadHandles } from 'src/lib/components/ImageTaking';
import css from './PassportPhoto.module.scss';

interface IPassportPhotoProps {
  onPhotoCapture: (photo: Blob) => void;
  mask?: React.ReactNode;
  hint?: React.ReactNode;
  step?: React.ReactNode;
}

export function PassportPhoto({ onPhotoCapture, step, hint, mask }: IPassportPhotoProps) {
  const [isHidden, setHidden] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isMob] = useState(isMobile());
  const refImage = useRef<IUploadHandles>(null);

  const handleTakingPhoto = useCallback(async () => {
    if (refImage.current.capture) {
      const blob = (await refImage.current.capture()) as Blob;
      setPhoto(URL.createObjectURL(blob));
      setHidden(true);
      onPhotoCapture(blob);
    }
  }, [onPhotoCapture]);

  return (
    <div className={css.Page}>
      <div className={css.Background}>
        <div className={css.CameraZone}>
          {step && <div className={css.TopOverlay}>{step}</div>}

          {isMob && mask && <div className={css.MaskFrame}>{mask}</div>}
          <div className={css.CameraPreview}>
            {!isMob && mask && <div className={css.MaskFrame}>{mask}</div>}
            {photo && <img src={photo} width="100%" alt="tablet" />}
            {!isHidden && <ImageTaking ref={refImage} returningType="blob" />}
          </div>

          {hint && <div className={css.BottomOverlay}>{hint}</div>}
        </div>

        <div className={css.Controls}>
          <button className={css.ShotButton} type="button" onClick={handleTakingPhoto}>
            {''}
          </button>
        </div>
      </div>
    </div>
  );
}
