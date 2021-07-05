export type TPhotoType = 'PRIMARY' | 'REGISTRATION' | 'PERSON';

export enum PhotoFieldLabels {
  'PRIMARY' = 'Основной разворот',
  'REGISTRATION' = 'Разворот с регистрацией',
  'PERSON' = 'Селфи с паспортом'
}

export interface IPhotoSet {
  PRIMARY: File| null;
  REGISTRATION: File | null;
  PERSON: File | null;
}
