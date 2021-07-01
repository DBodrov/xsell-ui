import {rest} from 'msw';
import {AuthStatus} from 'context/Auth';
import {TAnketaStep} from 'context/Anketa';
import {anketa} from 'context/__mocks__/anketa-mock';

export const handlers = [
  rest.post('/gateway/reject-offer', async (req, res, ctx) => {
    return res(ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/report/store-event', async (req, res, ctx) => {
    return res(ctx.json({code: 'OK'}));
  }),

  rest.post('/gateway/auth-status', (req, res, ctx) => {
    const {cookies} = req;
    if (cookies['userData'] && cookies['SESSION']) {
      return res(ctx.status(200), ctx.json({status: 'AUTH2_REQUIRED'}));
    }
    return res(ctx.status(200), ctx.json({status: 'OK'}));
    // return res(ctx.status(500), ctx.json({code: 'ERROR'}));
  }),
  //ctx.cookie('userData', '', {maxAge: 0}),

  rest.post('/gateway/initialize', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.cookie('SESSION', '__Session_cookie__'),
      ctx.json({sessionStatus: 'AUTH1_REQUIRED', settings: {}}),
    );
  }),

  rest.post('/gateway/auth1', (req, res, ctx) => {
    const {body} = req;
    const phone = body['phoneNumber'];
    if (phone === '0000000000') {
      return res(
        ctx.status(200),
        ctx.json({
          passwordLength: 4,
          passwordLifetimeInSeconds: 60,
          sessionStatus: 'AUTH1_REQUIRED',
          verified: false,
        }),
      );
    }
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
        sessionStatus: 'AUTH1_REQUIRED',
        verified: true,
      }),
    );
  }),

  rest.post('/gateway/auth2-retry', (req, res, ctx) => {
    if (req.body['verificationCode'] === '0000') {
      return res(
        ctx.status(200),
        ctx.json({
          sessionStatus: 'AUTH2_REQUIRED',
          verified: false,
        }),
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        verified: true,
        passwordLengtH: 4,
        passwordLifetimeInSeconds: 60,
        sessionStatus: 'OK',
      }),
    );
  }),
  rest.post('/gateway/auth2', (req, res, ctx) => {
    if (req.body['verificationCode'] === '0000') {
      return res(
        ctx.status(200),
        ctx.json({
          sessionStatus: 'AUTH2_REQUIRED',
          verified: false,
        }),
      );
    }
    return res(
      ctx.status(200),
      ctx.cookie('userData', '_encripted_user_data_'),
      ctx.json({
        sessionStatus: 'OK',
        verified: true,
      }),
    );
  }),
  rest.post('/gateway/send-sms', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        passwordLength: 4,
        passwordLifetimeInSeconds: 60,
      }),
    );
  }),

  /** ANKETA HANDLERS */
  rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(anketa));
  }),

  rest.post('/gateway/credit-application/agree-to-sign-documents', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),

  rest.post('/gateway/credit-application/archive-app', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),

  rest.post('/gateway/credit-application/get-employee-monthly-payment', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({monthlyPayment: 12345}));
  }),
  rest.post('/gateway/credit-application/get-monthly-payment', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        allCampaignPayment: 9900,
        allJobLossProtectionPayment: 12743.36,
        allLifeAndHealthProtectionPayment: 19115.04,
        allSmsPayment: 2376,
        monthlyCampaignPayment: 412.5,
        monthlyJobLossProtectionPayment: 530.97,
        monthlyLifeAndHealthProtectionPayment: 796.46,
        monthlyPayment: 17498.19,
        monthlySmsPayment: 99,
      }),
    );
  }),
  rest.post('/gateway/credit-application/send-documents', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/send-signature-code', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/sign-agreement', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        passwordLength: 4,
        passwordLifetimeInSeconds: 60,
        retryTimeInSeconds: 0,
      }),
    );
  }),
  rest.post('/gateway/credit-application/submit-form', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/update-session-app-account-transfer-details', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/update-session-app-card-transfer-details', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/update-session-app-outer-card-transfer-details', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post(
    '/gateway/credit-application/update-session-app-confirm-upload-passport-photo',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({code: 'OK'}));
    },
  ),
  rest.post('/gateway/credit-application/update-session-app-details', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/update-session-app-loan-params', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/update-session-app-passport', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post(
    '/gateway/credit-application/update-session-app-refuse-upload-passport-photo',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({code: 'OK'}));
    },
  ),
  rest.post('/gateway/credit-application/update-session-app-registration-address', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/upload-passport-photo', (req, res, ctx) => {
    // const photoType = req.url.searchParams.get('passportPhotoType');
    // if (photoType === 'PRIMARY') {
    //   return res(
    //     ctx.status(409),
    //     ctx.json({message: 'Something went wrong'})
    //   )
    // }
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/credit-application/verify-agreement-signature', (req, res, ctx) => {
    if (req.body['verificationCode'] === '0000') {
      return res(
        ctx.status(200),
        ctx.json({
          verified: false,
        }),
      );
    }
    return res(ctx.status(200), ctx.json({verified: true}));
  }),
  rest.post('/gateway/credit-application/verify-signature-code', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({code: 'OK'}));
  }),
  rest.post('/gateway/customer-profile/get-work-experience', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({workExperienceMonths: 20}));
  }),
  rest.post('/gateway/customer-profile/get-otp-cards', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        // customerOtpCards: [
        //   {
        //     bankCardId: '2-QF19DDU',
        //     bankCardNumber: '1234567890123456',
        //     cardExpirationDt: '2020-12-25',
        //   },
        //   {
        //     bankCardId: '2-1QZXRWG',
        //     bankCardNumber: '9876543200001234',
        //     cardExpirationDt: '2023-10-02',
        //   },
        // ],
      }),
    );
  }),

  rest.post('/gateway/dadata/suggestions/api/4_1/rs/suggest/bank', (req, res, ctx) => {
    const query = JSON.parse(req.body as string)['query'];
    if (query === '000000000') {
      return res(
        ctx.status(200),
        ctx.json({
          suggestions: []
        })
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        suggestions: [
          {
            value: 'КЦ СЕВЕРО-ЗАПАДНОГО ГУ БАНКА РОССИИ',
            data: {
              bic: '044012000',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'СЕВЕРО-ЗАПАДНОЕ ГУ БАНКА РОССИИ',
            data: {
              bic: '044030001',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'АО "АЛЬФА-БАНК"',
            data: {
              bic: '044525593',
              address: {data: {region_with_type: 'г Москва'}},
            },
          },
          {
            value: 'ООО НКО "МОБИЛЬНАЯ КАРТА"',
            data: {
              bic: '044030303',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'НКО АО ПРЦ',
            data: {
              bic: '044030505',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'СЕВЕРО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК',
            data: {
              bic: '044030653',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'АО "СИТИ ИНВЕСТ БАНК"',
            data: {
              bic: '044030702',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'Ф. ОПЕРУ БАНКА ВТБ (ПАО) В САНКТ-ПЕТЕРБУРГЕ',
            data: {
              bic: '044030704',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'ПАО "БАЛТИНВЕСТБАНК"',
            data: {
              bic: '044030705',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
          {
            value: 'ФИЛИАЛ ПАО "БАНК УРАЛСИБ" В Г.САНКТ-ПЕТЕРБУРГ',
            data: {
              bic: '044030706',
              address: {data: {region_with_type: 'г Санкт-Петербург'}},
            },
          },
        ],
      }),
    );
  }),
];

export const statusHandler = (status: AuthStatus = 'INITIALIZE') => {
  return rest.post('/gateway/auth-status', (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json({status}));
  });
};

export const anketaHandler = (step: TAnketaStep) => {
  const updatedAnketa = {...anketa, status: step};
  return rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json(updatedAnketa));
  });
};
