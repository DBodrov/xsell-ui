import {rest} from 'msw';
import {AuthStatus} from 'context/Auth';

export const handlers = [
  rest.post('/gateway/reject-offer', async (req, res, ctx) => {
    return res(ctx.json({code: 'OK'}));
  }),

  rest.post('/gateway/auth-status', (req, res, ctx) => {
    return res(ctx.status(200), ctx.cookie('userData', '', {maxAge: 0}), ctx.json({status: 'INITIALIZE'}));
  }),
  rest.post('/gateway/initialize', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({sessionStatus: 'AUTH1_REQUIRED'}));
  }),
  rest.post('/gateway/auth1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('userData', '__encrypted__user__data__'),
      ctx.json({
        passwordLength: 4,
        passwordLifetimeInSeconds: 60,
        sessionStatus: 'AUTH2_REQUIRED',
        verified: true,
      }),
    );
  }),
  rest.post('/gateway/auth1-utm', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('userData', '__encrypted__user__data__'),
      ctx.json({
        passwordLength: 4,
        passwordLifetimeInSeconds: 60,
        phone: '79123456789',
        sessionStatus: 'AUTH2_REQUIRED',
        verified: true,
      }),
    );
  }),
  rest.post('/gateway/auth1-retry', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        passwordLength: 4,
        passwordLifetimeInSeconds: 60,
        sessionStatus: 'AUTH2_REQUIRED',
        verified: true,
      }),
    );
  }),
  rest.post('/gateway/auth2-retry', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sessionStatus: 'OK',
        verified: true,
      }),
    );
  }),
  rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({status: 'LOAN_PARAMS'}));
  }),
];

export const statusHandler = (status: AuthStatus = 'INITIALIZE') =>
  rest.post('/gateway/auth-status', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({status}));
  });
