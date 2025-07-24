///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
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
  
  it("Should not accept blank inputs in Update Contact Info form", () => {
    Cypress.on('uncaught:exception', () => false); 
    cy.visit("https://parabank.parasoft.com/parabank/updateprofile.htm");
    cy.get('#leftPanel > ul > :nth-child(6) > a').click();
    cy.url().should('include', 'updateprofile.htm');
    cy.wait(3000);
    cy.get('input[name="customer.firstName"]').invoke('val').then(val => {
        cy.log('First Name value is:', val); 
      });
    cy.get('input[name="customer.lastName"]').invoke('val').then(val => {
        cy.log('Last Name value is:', val); 
      });
    cy.get('input[name="customer.firstName"]').clear();
    cy.get('input[name="customer.lastName"]').clear();
    cy.get('input[name="customer.address.street"]').clear();
    cy.get('input[name="customer.address.city"]').clear();
    cy.get('input[name="customer.address.state"]').clear();
    cy.get('input[name="customer.address.zipCode"]').clear();
    cy.get('input[name="customer.phoneNumber"]').clear();
    cy.get('input[value="Update Profile"]').click();
    cy.get('#street-error').should('contain', 'Address is required.');
    cy.get('#city-error').should('contain', 'City is required.');
    cy.get('#state-error').should('contain', 'State is required.');
    cy.get('#zipCode-error').should('contain', 'Zip Code is required.');
    cy.url().should('include', 'updateprofile.htm');
    cy.getScreenshotWithDate();
  });
});

