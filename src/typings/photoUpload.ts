export interface IPhotoSet {
  imagePrimary: File;
  imageRegistration: File;
  imageSelfie: File;
}

export interface IUploadPhoto {
  type: 'PERSON' | 'PRIMARY' | 'REGISTRATION';
  file: File;
}
