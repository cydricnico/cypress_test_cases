///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
import { FillRegistrationForm } from '../../support/commands';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';

describe("Assert the Open New Account Page", { testIsolation: false }, () => {
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
    cy.getScreenshotWithDate();
  });

  it("Verify the UI of the Open New Account Page", () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
        })
        cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');
        cy.get('#leftPanel > ul > :nth-child(1) > a').click();
        cy.url().should('include', 'openaccount.htm');
        cy.get('form > div > .button').should('be.visible').and('not.be.disabled');
        cy.get('select[id="type"]').select('SAVINGS');
        cy.get('select[id="fromAccountId"]').should('be.visible').and('not.be.disabled');
        });
  it('Opening new account is successful', () => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');
    cy.get('select[id="type"]').select('SAVINGS');
    cy.get('select[id="fromAccountId"]').should('be.visible').and('not.be.disabled');
    cy.get('select[id="fromAccountId"] option').then((options) => {
      if (options.length > 1) {
        const value = options[1].value;
        cy.get('select[id="fromAccountId"]').select(value);
      }
    });
    cy.get('input[value="Open New Account"]').should('be.visible').and('not.be.disabled').click();
    cy.url().should('include', 'openaccount.htm');
    cy.get('#openAccountResult > .title').should('contain', 'Account Opened!');
    cy.get('#openAccountResult > :nth-child(2)').should('contain', 'Congratulations, your account is now open.');
    cy.get('#newAccountId').should('be.visible');
    cy.getScreenshotWithDate();
    });
});

