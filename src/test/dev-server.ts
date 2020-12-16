import {setupWorker, rest} from 'msw';
import {handlers, anketaHandler, statusHandler} from './dev-handlers';

export const server = setupWorker(...handlers);

(window as any).msw = {
  server,
  rest,
  anketaHandler,
  statusHandler
}
export * from 'msw';
export {anketaHandler, statusHandler}
