//import {server, rest, statusHandler, anketaHandler} from 'src/test/dev-server';
import {anketa as response} from 'context/__mocks__/anketa-mock';

const viewportsList: Cypress.ViewportPreset[] = ['iphone-7', 'macbook-15'];

const Status = {
  current: null,
};

beforeEach(() => {
  Status.current = null;
  console.log('BEFORE EACH', Status);
});

describe('anketa registration step', () => {

    it('render registration step - MOBILE', () => {
      cy.viewport('iphone-7');
      cy.visit('/');
      cy.window().then(window => {
        // const {server, rest} = require('../../src/test/dev-server');

        const anketa = {...response, status: 'REGISTRATION_ADDRESS'};
        const {server, rest} = (window as any).msw;
        server.use(
          rest.post('/gateway/auth-status', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({status: 'OK'}));
          }),
          rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
            let updatedAnketa = {...anketa};
            if (Status.current) {
              updatedAnketa = {...anketa, status: Status.current};
            }
            return res(ctx.status(200), ctx.json(updatedAnketa));
          }),
          rest.post('/gateway/credit-application/submit-form', (req, res, ctx) => {
            Status.current = 'PASSPORT_PHOTO';
            return res(ctx.status(200), ctx.json({code: 'OK'}));
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
      cy.findByRole('button', {name: /Все данные верны/i}).click();
      cy.findByText(/Три фотографии с документами/i).should('exist');
    });

    it.skip('render registration step - DESKTOP', () => {
      cy.viewport('macbook-15');
      cy.visit('/');
      const anketa = {...response, status: 'REGISTRATION_ADDRESS'};
      cy.window().then(window => {
        const {server, rest} = (window as any).msw;
        server.use(
          rest.post('/gateway/auth-status', (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({status: 'OK'}));
          }),
          rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
            let updatedAnketa = {...anketa};
            if (Status.current) {
              updatedAnketa = {...anketa, status: Status.current};
            }
            return res(ctx.status(200), ctx.json(updatedAnketa));
          }),
          rest.post('/gateway/credit-application/submit-form', (req, res, ctx) => {
            Status.current = 'PASSPORT_PHOTO';
            return res(ctx.status(200), ctx.json({code: 'OK'}));
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
      cy.findByRole('button', {name: /Все данные верны/i}).click();
      cy.findByText(/Три фотографии с документами/i).should('exist');
    });

});
