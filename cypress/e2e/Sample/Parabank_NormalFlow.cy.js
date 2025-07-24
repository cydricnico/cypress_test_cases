///<reference types="cypress" />

import { parabankRegistrationPage } from '../../support/pages/registrationPOM';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';
import { getuserData } from '../../support/utils/parabankutils';

describe("Assert the basic functionalities of the website", { testIsolation: false }, () => {
  before(() => {
    cy.visit("https://parabank.parasoft.com/parabank/register.htm");
    cy.url().should('contain', 'register.htm');
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  it("Verify the UI of the Registration Page", () => {
    cy.get('input[id="customer.firstName"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.lastName"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.address.street"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.address.state"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.address.city"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.address.zipCode"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.phoneNumber"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.ssn"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.username"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="customer.password"]').should('be.visible').and('not.be.disabled');
    cy.get('input[id="repeatedPassword"]').should('be.visible').and('not.be.disabled');
  });

  it("Verify the registration form", () => {
    const registrationPage = new parabankRegistrationPage();
    const user = getuserData();

    cy.visit("https://parabank.parasoft.com/parabank/register.htm");
    registrationPage.fillRegistrationForm(user);
    registrationPage.submitForm();

  });

  it('Verify the Logout function', () => {
    Cypress.on('uncaught:exception', () => false); // prevent app errors from failing test
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    cy.get('#leftPanel > ul > :nth-child(8) > a').click();
    cy.url().should('include', 'index.htm');
  });

});



 