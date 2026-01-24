import { RequestHandler } from 'msw';
import { authHandlers, clientHandlers, userHandlers } from './handlers';

export const authServerHandlers: RequestHandler[] = [...authHandlers, ...userHandlers, ...clientHandlers];
