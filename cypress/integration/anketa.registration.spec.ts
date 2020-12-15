//import {server, rest, statusHandler, anketaHandler} from 'src/test/dev-server';
import {anketa as response} from 'context/__mocks__/anketa-mock';

const viewportsList: Cypress.ViewportPreset[] = ['iphone-7', 'macbook-15'];

describe('anketa registration step', () => {
  it('render registration step', () => {
    cy.viewport('iphone-7');
    cy.visit('/');
    cy.window().then(window => {
      const {server, rest} = (window as any).msw;
      const anketa = {...response, status: 'REGISTRATION_ADDRESS'};
      server.use(
        rest.post('/gateway/auth-status', (req, res, ctx) => {
          return res.once(ctx.status(200), ctx.json({status: 'OK'}));
        }),
        rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
          return res.once(ctx.status(200), ctx.json(anketa));
        }),
      );
    });
    cy.findByText(/Проверьте свои данные/i).should('exist');

    cy.findByLabelText(/ИНН работодателя/i).type('123456789012');
    cy.findByLabelText(/ИНН работодателя/i).should('have.value', '123456789012');

    cy.findByLabelText(/Место работы/i)
      .clear()
      .type('отп банк');
    cy.findByLabelText(/Место работы/i).should('have.value', 'отп банк');

    cy.findByLabelText(/Весь ежемесячный доход/i)
      .clear()
      .type('10000');
    cy.findByLabelText(/Весь ежемесячный доход/i).should('have.value', '10000');

    cy.findByLabelText(/стаж/i).clear().type('18');
    cy.findByLabelText(/отрасль/i).click();
    cy.findByText(/энергетика/i).click();
    cy.findByRole('checkbox').click();
    cy.findByRole('button', {name: /Все данные верны/i}).should('not.be.disabled');
  });
});
