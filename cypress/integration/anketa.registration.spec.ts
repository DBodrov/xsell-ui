import {server, rest, statusHandler, anketaHandler} from 'src/test/dev-server';
import {anketa} from 'context/__mocks__/anketa-mock';

it('render registration step', () => {
  cy.visit('/');
  cy.window().then(window => {
    const {server, rest, anketaHandler, statusHandler} = (window as any).msw;
    server.use(statusHandler('OK'), anketaHandler('REGISTRATION_ADDRESS'));
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
