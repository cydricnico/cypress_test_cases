///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
import { FillRegistrationForm } from '../../support/commands';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';

describe("Assert the Transfer Funds Page", { testIsolation: false }, () => {
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

  it("Fill up the Registration Form using commands", () => {
    cy.FillRegistrationForm(getuserData());
    cy.screenshot('parabank-registration-form-filled');
  });

  it("Verify the Transfer Funds function", () => {
    cy.get('#leftPanel > ul > :nth-child(3) > a').click();
    cy.url().should('include', 'transfer.htm');
    cy.wait(1000);
    cy.get('input[id="amount"]').type("100");
    cy.get(':nth-child(4) > .button').click();
    cy.url().should('include', 'transfer.htm');
    cy.get('#showResult > .title').should('be.visible').and('contain', 'Transfer Complete!');
  });

  it('Verify that the transfer will not proceed when special characters are entered', () => {
    cy.get('#leftPanel > ul > :nth-child(3) > a').click();
    cy.url().should('include', 'transfer.htm');
    cy.wait(1000);
    cy.get('input[id="amount"]').type("test");
    cy.get(':nth-child(4) > .button').click();
    cy.url().should('include', 'transfer.htm');
    cy.get('#showError > .title').should('be.visible').and('contain', 'Error!');  
  });

  it("Verify the UI of the Transfer Funds page", () => {
    cy.visit("https://parabank.parasoft.com/parabank/transfer.htm");
    cy.get('#showForm > .title').should('be.visible').and('contain', 'Transfer Funds');
    cy.get('#transferForm > p > b').should('be.visible');
    cy.get('#transferForm > :nth-child(2)').should('be.visible').and('not.be.disabled');
    cy.get('#amount').should('be.visible').and('not.be.disabled');
    cy.get('#fromAccountId').should('be.visible').and('not.be.disabled');
    cy.get('#toAccountId').should('be.visible').and('not.be.disabled');
    cy.get(':nth-child(4) > .button').should('be.visible').and('not.be.disabled');
  });
});

