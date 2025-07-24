// cypress/support/pages/registrationPOM.js
export class parabankRegistrationPage {
    
  fillRegistrationForm(user) {
    cy.get('input[id="customer.firstName"]').should('be.visible').type(user.firstName);
    cy.get('input[id="customer.lastName"]').should('be.visible').type(user.lastName);
    cy.get('input[id="customer.address.street"]').should('be.visible').type(user.address);
    cy.get('input[id="customer.address.city"]').should('be.visible').type(user.city);
    cy.get('input[id="customer.address.state"]').should('be.visible').type(user.state);
    cy.get('input[id="customer.address.zipCode"]').should('be.visible').type(user.zipCode);
    cy.get('input[id="customer.phoneNumber"]').should('be.visible').type(user.phoneNumber);
    cy.get('input[id="customer.ssn"]').should('be.visible').type(user.ssn);
    cy.get('input[id="customer.username"]').should('be.visible').type(user.username);
    cy.get('input[id="customer.password"]').should('be.visible').type(user.password);
    cy.get('input[id="repeatedPassword"]').should('be.visible').type(user.repeatedPassword);
    cy.get('[colspan="2"] > .button').should('be.visible').and('not.be.disabled');
  }

  submitForm() {
    cy.get('input[value="Register"]').click();
    cy.url().should('include', 'parabank/register.htm');
  }
}
