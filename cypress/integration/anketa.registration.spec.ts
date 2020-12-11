it('render registration step', () => {
  cy.visit('http://localhost:5000/inputmask');
  //cy.findByText(/Проверьте свои данные/i).should('exist');
  cy.get('[name="passport"]').type('1234567890');
  //cy.findByLabelText(/Место работы/i).clear().type('отп банк');

})
