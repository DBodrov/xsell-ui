import {anketa as response} from 'context/__mocks__/anketa-mock';

const viewportsList: Cypress.ViewportPreset[] = ['iphone-7', 'macbook-15'];

const Status = {
  current: null
}

it('render transfer details page', () => {
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
        if (!Status.current) {
          Status.current = 'AGREEMENT_SMS_CODE';
        } else {
          updatedAnketa = {...anketa, status: Status.current}
        }
        return res(ctx.status(200), ctx.json(updatedAnketa));
      }),
    );
  });
  cy.findByRole('button', {name: /Далее/i}).click();
  cy.findByText(/Согласие на запрос кредитной истории/i).should('exist');
})
