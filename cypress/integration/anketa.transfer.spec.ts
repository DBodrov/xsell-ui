import {anketa as response} from 'context/__mocks__/anketa-mock';

const Status = {
  current: null,
};

beforeEach(() => {
  Status.current = null;
  console.log('BEFORE EACH', Status);
});

it('SBP Page test', () => {
  cy.viewport('iphone-7');
  cy.visit('/');
  cy.window().then(window => {
    const {server, rest} = (window as any).msw;
    const anketa = {...response, status: 'TRANSFER_DETAILS', dboActivated: true};
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json({status: 'OK'}));
      }),
      rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
        let updatedAnketa = {...anketa};
        if (Status.current) {
          updatedAnketa = {...anketa, status: Status.current};
        }
        return res(ctx.status(200), ctx.json(updatedAnketa));
      }),
      rest.post('/gateway/credit-application/update-session-app-outer-card-transfer-details', (req, res, ctx) => {
        Status.current = 'AGREEMENT_SMS_CODE';
        return res(ctx.status(200), ctx.json({code: 'OK'}));
      }),
    );
  });
  cy.findByRole('button', {name: /Далее/i}).click();
  cy.findByText(/Согласие на запрос кредитной истории/i).should('exist');
});

it('Cards Page test', () => {
  cy.viewport('iphone-7');
  cy.visit('/');
  cy.window().then(window => {
    const {server, rest} = (window as any).msw;
    const anketa = {...response, status: 'TRANSFER_DETAILS', dboActivated: false};
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json({status: 'OK'}));
      }),
      rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
        let updatedAnketa = {...anketa};
        if (Status.current) {
          updatedAnketa = {...anketa, status: Status.current};
        }
        return res(ctx.status(200), ctx.json(updatedAnketa));
      }),

      rest.post('/gateway/credit-application/update-session-app-card-transfer-details', (req, res, ctx) => {
        Status.current = 'AGREEMENT_SMS_CODE';
        return res(ctx.status(200), ctx.json({code: 'OK'}));
      }),
    );
  });
  cy.findByLabelText(/card-input/i).click();
  cy.get('[value="1"]').click();
  cy.findByRole('button', {name: /Далее/i}).click();

  cy.findByText(/Согласие на запрос кредитной истории/i).should('exist');
});

it('Account page test', () => {
  cy.viewport('iphone-7');
  cy.visit('/');
  cy.window().then(window => {
    const {server, rest} = (window as any).msw;
    const anketa = {...response, status: 'TRANSFER_DETAILS', dboActivated: false};
    server.use(
      rest.post('/gateway/auth-status', (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json({status: 'OK'}));
      }),
      rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
        let updatedAnketa = {...anketa};
        if (Status.current) {
          updatedAnketa = {...anketa, status: Status.current};
        }
        return res(ctx.status(200), ctx.json(updatedAnketa));
      }),
      rest.post('/gateway/customer-profile/get-otp-cards', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            customerOtpCards: [],
          }),
        );
      }),
      rest.post('/gateway/credit-application/update-session-app-account-transfer-details', (req, res, ctx) => {
        Status.current = 'AGREEMENT_SMS_CODE';
        return res(ctx.status(200), ctx.json({code: 'OK'}));
      }),
    );
  });

  cy.get('[name="bankIdCode"]').clear().type('044');
  cy.get('[data-bic="044525593"]').click();
  cy.get('[name="accountNumber"]').clear().type('40817810006251111111').blur();
  cy.findByRole('button', {name: /отправить заявку/i}).click();
  cy.findByText(/Согласие на запрос кредитной истории/i).should('exist');
});
