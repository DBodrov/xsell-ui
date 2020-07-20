/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';
declare module '*.module.scss';

// custom global types
type StringOrNumber = string | number;
interface IKeyValue {
  [key: string]: any;
}

interface ILocationState {
  state: {
    message: string;
  };
}
