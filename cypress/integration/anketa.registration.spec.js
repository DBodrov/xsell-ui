it('render registration step', () => {
  cy.visit('/');
  cy.findByText(/Проверьте свои данные/i).should('exist')
})
