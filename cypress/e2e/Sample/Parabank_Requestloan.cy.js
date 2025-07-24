///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
import { FillRegistrationForm } from '../../support/commands';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';

describe("Assert the Request Loan Page", { testIsolation: false }, () => {
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

  it("Verify that requesting loan is successful", () => {
    cy.get('#leftPanel > ul > :nth-child(7) > a').click();
    cy.url().should('include', 'requestloan.htm');
    cy.wait(1000);
    cy.get('#amount').type("1000");
    cy.get('#downPayment').type("500");
    // cy.get('#fromAccountId').select('');
    cy.get('[colspan="2"] > .button').click();
    cy.url().should('include', 'requestloan.htm');
    cy.get('#requestLoanResult').should('be.visible').and('contain', 'Loan Request Processed');
  });

  it("Verify that requesting loan will not proceed when alphabets are entered", () => {
    cy.get('#leftPanel > ul > :nth-child(7) > a').click();
    cy.url().should('include', 'requestloan.htm');
    cy.wait(1000);
    cy.get('#amount').type("test");
    cy.get('#downPayment').type("test");
    // cy.get('#fromAccountId').select('');
    cy.get('[colspan="2"] > .button').click();
    cy.url().should('include', 'requestloan.htm');
    cy.get('#requestLoanError > .title').should('be.visible').and('contain', 'Error!');
  });

  it("Verify that requesting loan will not proceed when special characters are entered", () => {
    cy.get('#leftPanel > ul > :nth-child(7) > a').click();
    cy.url().should('include', 'requestloan.htm');
    cy.wait(1000);
    cy.get('#amount').type("@#$");
    cy.get('#downPayment').type("@#$");
    // cy.get('#fromAccountId').select('');
    cy.get('[colspan="2"] > .button').click();
    cy.url().should('include', 'requestloan.htm');
    cy.get('#requestLoanError > .title').should('be.visible').and('contain', 'Error!');
  });

    it("Verify that requesting loan will not proceed when blank field are entered", () => {
    cy.get('#leftPanel > ul > :nth-child(7) > a').click();
    cy.url().should('include', 'requestloan.htm');
    cy.wait(1000);
    cy.get('#amount').type(" ");
    cy.get('#downPayment').type(" ");
    // cy.get('#fromAccountId').select('');
    cy.get('[colspan="2"] > .button').click();
    cy.url().should('include', 'requestloan.htm');
    cy.get('#requestLoanError > .title').should('be.visible').and('contain', 'Error!');
  });

});

