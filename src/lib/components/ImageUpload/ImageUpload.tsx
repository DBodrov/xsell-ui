import React, { useState, useRef } from 'react';
import { Spinner } from 'lib/components/Spinner';
import cN from 'classnames/bind';
import css from './ImageUpload.module.scss';

const cx = cN.bind(css);

interface IUploadProps {
    onUpload: (file: File) => void;
    name: string;
    loading?: boolean;

    children?: React.ReactNode;
    className?: string;
}

// TODO: объединить с модулем реалтайм и вынести
const compressPhoto = (file: File, canvas: HTMLCanvasElement): Promise<File> =>
    new Promise((resolve) => {
        const url = URL.createObjectURL(file);

        const img = new Image();
        img.src = url;

        img.onload = () => {
            const width = Math.max(1280 || img.width);
            const scaleFactor = width / img.width;

            canvas.width = width;
            canvas.height = img.height * scaleFactor;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
            ctx.canvas.toBlob(
                (blob) =>
                    resolve(
                        new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        })
                    ),
                'image/jpeg',
                0.92
            );
        };
    });

export const ImageUpload = ({ className, name, children, loading, onUpload }: IUploadProps) => {
    const [preview, setPreview] = useState(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        if (!event.target.files || !event.target.files.length) return;

        const file = event.target.files[0];
        const nextPreview = file.type.startsWith('image') ? URL.createObjectURL(file) : null;
        setPreview(nextPreview);

        const compressedImage = await compressPhoto(file, canvasRef.current);
        onUpload(compressedImage);
    };

    return (
        <label htmlFor={name} className={cx(css.Zone, className)}>
            <input id={name} type="file" accept="image/*" onChange={onChangeHandler} />
            {loading && (
                <React.Fragment>
                    <Spinner className={css.Spinner} />
                    <div className={css.Overlay} />
                </React.Fragment>
            )}
            {!preview && <div>{children}</div>}
            {preview && <div className={css.Image} style={{ backgroundImage: `url("${preview}")` }} />}
            <canvas ref={canvasRef} style={{ width: '100%', display: 'none' }} />
        </label>
    );
};
