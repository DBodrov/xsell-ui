import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IPhotoSet } from 'typings';
import { PhotoUploadForm } from './PhotoUploadForm';

afterEach(cleanup);

const onSubmitFormMock = jest.fn();
const mockData: IPhotoSet = {
  imagePrimary: new File([new ArrayBuffer(null)], ''),
  imageRegistration: new File([new ArrayBuffer(null)], ''),
  imageSelfie: new File([new ArrayBuffer(null)], ''),
};

describe('*** PhotoUploadForm Form Test ***', () => {
  (global as any).URL.createObjectURL = jest.fn();

  test('should render PhotoUploadForm', () => {
    const { getByText, container } = render(<PhotoUploadForm onSubmitForm={onSubmitFormMock} />);
    container.querySelector('#upload-1');
    container.querySelector('#upload-2');
    const submitBtn = getByText('Отправить фотографии');
    expect(submitBtn).toBeDisabled();
  });

  test('Submit filled form', () => {
    const { getByText, container } = render(<PhotoUploadForm onSubmitForm={onSubmitFormMock} />);

    const imageFirst = container.querySelector('#upload-1');
    fireEvent.change(imageFirst, { target: { files: [mockData.imagePrimary] } });
    const imageSecond = container.querySelector('#upload-2');
    fireEvent.change(imageSecond, { target: { files: [mockData.imageRegistration] } });
    const submitBtn = getByText('Отправить фотографии');
    // expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);
    // FIXIT: async compress
    // expect(onSubmitFormMock).toHaveBeenCalledTimes(1);
    // expect(onSubmitFormMock).toHaveBeenCalledWith(mockData);
  });
});
