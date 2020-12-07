import {setupServer} from 'msw/node';
import {rest} from 'msw';
import {handlers, statusHandler, anketaHandler} from './test-handlers';

export const server = setupServer(...handlers);
export {rest, statusHandler, anketaHandler};
