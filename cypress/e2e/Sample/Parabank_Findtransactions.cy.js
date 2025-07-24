///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
import { billPay } from '../../support/commands/parabankCommands';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';
import { openNewAccountFunction } from '../../support/commands/parabankCommands';
import { transferfunds } from '../../support/commands/parabankCommands';

describe("Assert the Find Transactions Page", { testIsolation: false }, () => {
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

  it("Verify creating new account is successfull", () => {
    cy.openNewAccountFunction();
    cy.getScreenshotWithDate();
  });

  it("Verify transferring funds is successful", () => {
    cy.transferfunds();
    cy.getScreenshotWithDate();
  });

  it("Verify that finding a transaction by ID is successful", () => {
    cy.get('#leftPanel > ul > :nth-child(2) > a').click();
    cy.url().should('contain', 'overview.htm');
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();
    cy.url().should('contain', 'activity.htm');
    cy.get('tbody > :nth-child(1) > :nth-child(2) > a').click();
    cy.url().should('contain', 'transaction.htm');
    cy.get('tbody > :nth-child(1) > :nth-child(2)')
      .first()
      .invoke('text')
      .then((accountId) => {
        cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
        cy.get('#transactionId').type(accountId);
        cy.get('#findById').click();
        cy.url().should('contain', 'findtrans.htm');
        cy.get('#resultContainer').should('be.visible');
      });
    cy.getScreenshotWithDate();
  });
  
  it("Verify that finding a transaction by Date is successful", () => {
    const today = new Date();
    const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}-${today.getFullYear()}`;
    cy.get('#leftPanel > ul > :nth-child(5) > a').click();
    cy.url().should('contain', 'findtrans.htm');
    cy.get('#accountId option').eq(0).then($option => {
      const defaultAccount = $option.text();
      cy.get('#accountId').select(defaultAccount);
    });
    cy.get('#transactionDate').type(formattedDate);
    cy.get('#findByDate').click();
    cy.url().should('contain', 'findtrans.htm');
    cy.get('#resultContainer').should('be.visible');
    cy.getScreenshotWithDate();
  });

  it("Verify that finding a transaction by Date Range is successful", () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formatDate = (date) =>
      `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;
    const fromDate = formatDate(yesterday);
    const toDate = formatDate(today);
    cy.get('#leftPanel > ul > :nth-child(5) > a').click();
    cy.url().should('contain', 'findtrans.htm');
    cy.get('#accountId option').eq(0).then(($option) => {
      const defaultAccount = $option.text();
      cy.get('#accountId').select(defaultAccount);
    });
    cy.get('#fromDate').type(fromDate);
    cy.get('#toDate').type(toDate);
    cy.get('#findByDateRange').click();
    cy.url().should('contain', 'findtrans.htm');
    cy.get('#resultContainer').should('be.visible');
    cy.getScreenshotWithDate();
  });

  it("Verify that finding transaction by amount is successful", () => {
    cy.visit('https://parabank.parasoft.com/parabank/findtrans.htm');
    cy.get('#amount').type("100"); // change depend on the created transaction
    cy.get('#findByAmount').click();
    cy.url().should('contain', 'findtrans.htm');
    cy.get('#resultContainer').should('be.visible');
    cy.getScreenshotWithDate();
  });
});

