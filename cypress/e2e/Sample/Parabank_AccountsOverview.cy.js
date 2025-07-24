///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
import { CheckUIActivity } from '../../support/commands/parabankCommands';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';

describe("Assert the Accounts Overview Page", { testIsolation: false }, () => {
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

  it("Verify the UI of the Accounts Overview page", () => {
    cy.get('#leftPanel > ul > :nth-child(2) > a').click();
    cy.url().should('include', 'overview.htm');
    cy.get('#showOverview > .title').should('be.visible').and('not.be.disabled');
    cy.get('#accountTable').should('be.visible').and('not.be.disabled');
    cy.get('#showOverview').should('be.visible').and('not.be.disabled');
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();
    cy.url().should('include', 'activity.htm');
    cy.getScreenshotWithDate();
  });

  it("Verify the UI of the Account details page", () => {
    cy.CheckUIActivity();
    cy.getScreenshotWithDate();
  });
});

