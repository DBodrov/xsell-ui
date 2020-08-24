import {setupServer} from 'msw/node';
import {rest} from 'msw';
import {handlers, statusHandler} from './handlers';

export const server = setupServer(...handlers);
export {rest, statusHandler};
