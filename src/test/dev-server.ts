import {setupWorker} from 'msw';
import {handlers} from './dev-handlers';

export const server = setupWorker(...handlers);

export * from 'msw';
