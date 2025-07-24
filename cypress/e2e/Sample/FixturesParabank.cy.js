///<reference types="cypress" />
import {getScreenshotWithDate} from '../../support/commands/parabankCommands';
describe("Assert the basic functionalities of the website using Fixtures", { testIsolation: false }, () => {
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
    cy.getScreenshotWithDate();
  });


  it("Register successfully using fixtures", () => {
    cy.fixture('fixtureTestData').then((user) => {
      cy.visit("https://parabank.parasoft.com/parabank/register.htm");
      cy.get('input[id="customer.firstName"]').type(user.firstName);
      cy.get('input[id="customer.lastName"]').type(user.lastName);
      cy.get('input[id="customer.address.street"]').type(user.address);
      cy.get('input[id="customer.address.city"]').type(user.city);
      cy.get('input[id="customer.address.state"]').type(user.state);
      cy.get('input[id="customer.address.zipCode"]').type(user.zipCode);
      cy.get('input[id="customer.phoneNumber"]').type(user.phoneNumber);
      cy.get('input[id="customer.ssn"]').type(user.ssn);
      cy.get('input[id="customer.username"]').type(user.username);
      cy.get('input[id="customer.password"]').type(user.password);
      cy.get('input[id="repeatedPassword"]').type(user.repeatedPassword);
      cy.get('[colspan="2"] > .button').should('be.visible').and('not.be.disabled');
      cy.get('input[value="Register"]').click();
      cy.url().should('include', 'parabank/register.htm');
      cy.getScreenshotWithDate();
    });
  });
});



 