/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */
import React, {
    Fragment,
    useCallback,
    useEffect,
    useImperativeHandle,
    forwardRef,
    Ref,
    RefObject,
} from 'react';
import css from './ImageTaking.module.scss';

interface IUploadProps {
    returningType?: 'blob' | 'base64';
}

export interface IUploadHandles {
    capture(): Promise<any>;
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment',
};

const ImageTakingRaw = ({ returningType = 'blob' }: IUploadProps, ref: Ref<any>) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const videoRef = React.useRef<HTMLMediaElement>(null);
    const streamRef = React.useRef<MediaStream>(null);

    const unmount = useCallback(() => {
        // Stop preview
        if (videoRef.current) videoRef.current.srcObject = null;
        // Stop camera
        if (!streamRef.current) return;
        if (streamRef.current.getVideoTracks && streamRef.current.getAudioTracks) {
            streamRef.current.getVideoTracks().map(track => track.stop());
            streamRef.current.getAudioTracks().map(track => track.stop());
        } else {
            ((streamRef.current as unknown) as MediaStreamTrack).stop();
        }
    }, [streamRef]);

    useEffect(() => {
        if (videoRef.current) {
            requestMedia();
        }

        return unmount;
    }, [unmount, videoRef]);

    const capture = useCallback(async (): Promise<any> => {
        const context = canvasRef.current.getContext('2d');
        adjustCanvasSize();
        context.drawImage(
            videoRef.current as CanvasImageSource,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

        return returning(canvasRef.current, returningType);
    }, [returningType]);

    const adjustCanvasSize = () => {
        const canvas = canvasRef.current;
        const aspectRatio = videoRef.current.clientWidth / videoRef.current.clientHeight;

        let canvasWidth = Math.max(1000 || videoRef.current.clientWidth);
        let canvasHeight = canvasWidth / aspectRatio;

        if (canvasHeight < 1000) {
            canvasHeight = 1000;
            canvasWidth = canvasHeight * aspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    };

    const requestMedia = () => {
        if (!!videoRef.current && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: videoConstraints }).then(stream => {
                streamRef.current = stream;
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            });
        }
    };

    function returning(canvas: HTMLCanvasElement, returnType: string): Promise<any> {
        return new Promise(resolve => {
            if (returnType === 'blob') {
                canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg', 0.92);
            }

            if (returnType === 'base64') {
                resolve(canvas.toDataURL('image/jpeg', 0.92));
            }
        });
    }

    useImperativeHandle(ref, () => ({
        capture,
    }));

    return (
        <Fragment>
            <video
                className={css.CameraPreview}
                ref={videoRef as RefObject<HTMLVideoElement>}
                width="100%"
                autoPlay
                playsInline
                muted
            />
            <canvas ref={canvasRef} width="640" height="480" style={{ width: '100%', display: 'none' }} />
        </Fragment>
    );
};

export const ImageTaking = forwardRef(ImageTakingRaw);
