///<reference types="cypress" />

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

  it("Verify the Registration function", () => {
    const user = getuserData()
    // cy.fixture('TestData').then((user) => {
      cy.visit("https://parabank.parasoft.com/parabank/register.htm");
      cy.get('input[id="customer.firstName"]').type(user.firstName);
      cy.get('input[id="customer.lastName"]').type(user.lastName);
      cy.get('input[id="customer.address.street"]').type(user.address);
      cy.get('input[id="customer.address.city"]').type(user.city);
      cy.get('input[id="customer.address.state"]').type(user.state);
      cy.get('input[id="customer.address.zipCode"]').type(user.zipCode);
      cy.get('input[id="customer.phoneNumber"]').type(user.phoneNumber);
      cy.get('input[id="customer.ssn"]').type(user.ssn);
      // cy.get('input[id="customer.username"]').type(`username_${Date.now()}`);
      cy.get('input[id="customer.username"]').type(user.username);
      cy.get('input[id="customer.password"]').type(user.password);
      cy.get('input[id="repeatedPassword"]').type(user.repeatedPassword);
      cy.get('[colspan="2"] > .button').should('be.visible').and('not.be.disabled');
      cy.get('input[value="Register"]').click();
      cy.url().should('include', 'parabank/register.htm');
    });

  it('Verify the Open New Account page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');
    cy.get('#leftPanel > ul > :nth-child(1) > a').click();
    cy.url().should('include', 'openaccount.htm');
    cy.get('form > div > .button').should('be.visible').and('not.be.disabled');
    cy.get('select[id="type"]').select('SAVINGS');
    cy.get('select[id="fromAccountId"]').should('be.visible').and('not.be.disabled');
  });

  it('Verify the Open New Account function', () => {
    // Prevent the test from failing due to app errors
    Cypress.on('uncaught:exception', () => false);

    //Visit the page directly
    cy.visit('https://parabank.parasoft.com/parabank/openaccount.htm');

    //Select account type and account number
    cy.get('select[id="type"]').select('SAVINGS');
    cy.get('select[id="fromAccountId"]').should('be.visible').and('not.be.disabled');

    //Dynamically select the first valid account if 12345 doesn't exist
    cy.get('select[id="fromAccountId"] option').then((options) => {
      if (options.length > 1) {
        const value = options[1].value;
        cy.get('select[id="fromAccountId"]').select(value);
      }
    });

    //Click the submit button
    cy.get('input[value="Open New Account"]').should('be.visible').and('not.be.disabled').click();

    //Verify the result
    cy.url().should('include', 'openaccount.htm');
    cy.get('#openAccountResult > .title').should('contain', 'Account Opened!');
    cy.get('#openAccountResult > :nth-child(2)').should('contain', 'Congratulations, your account is now open.');
    cy.get('#newAccountId').should('be.visible');
    });

  it("Verify the Update Profile function", () => {
    Cypress.on('uncaught:exception', () => false); // prevent app errors from failing test

    cy.visit("https://parabank.parasoft.com/parabank/updateprofile.htm");
    cy.url().should('include', 'updateprofile.htm');
    // Step 2: Navigate to 'Update Contact Info'
    cy.get('#leftPanel > ul > :nth-child(6) > a').click();
    cy.url().should('include', 'updateprofile.htm');

    // Step 3: Update profile form
    cy.get('input[name="customer.firstName"]').clear().type("John");
    cy.get('input[name="customer.lastName"]').clear().type("Doe");
    cy.get('input[name="customer.address.street"]').clear().type("456 New Street");
    cy.get('input[name="customer.address.city"]').clear().type("Manila");
    cy.get('input[name="customer.address.state"]').clear().type("Metro Manila");
    cy.get('input[name="customer.address.zipCode"]').clear().type("1000");
    cy.get('input[name="customer.phoneNumber"]').clear().type("09171234567");

    // Step 4: Submit the update
    cy.get('input[value="Update Profile"]').click();

    // Step 5: Confirm update
    cy.contains("Your updated address and phone number have been added to the system.")
      .should("be.visible");
  });

    it("Should not accept blank inputs in Update Contact Info form", () => {
      Cypress.on('uncaught:exception', () => false); // Ignore app exceptions

      // Go to Update Contact Info
      cy.visit("https://parabank.parasoft.com/parabank/updateprofile.htm");
      cy.get('#leftPanel > ul > :nth-child(6) > a').click();
      cy.url().should('include', 'updateprofile.htm');

      cy.wait(3000); // Wait for the page to load

      // Clear all required fields to simulate blank inputs
      cy.get('input[name="customer.firstName"]').invoke('val').then(val => {
        cy.log('First Name value is:', val); // should be empty
      });
      cy.get('input[name="customer.lastName"]').invoke('val').then(val => {
        cy.log('Last Name value is:', val); // should be empty
      });
      cy.get('input[name="customer.firstName"]').clear();
      cy.get('input[name="customer.lastName"]').clear();
      cy.get('input[name="customer.address.street"]').clear();
      cy.get('input[name="customer.address.city"]').clear();
      cy.get('input[name="customer.address.state"]').clear();
      cy.get('input[name="customer.address.zipCode"]').clear();
      cy.get('input[name="customer.phoneNumber"]').clear();

      // Submit the form
      cy.get('input[value="Update Profile"]').click();

      // Assertions
      // Check that success message does NOT appear
      cy.get('#street-error').should('contain', 'Address is required.');
      cy.get('#city-error').should('contain', 'City is required.');
      cy.get('#state-error').should('contain', 'State is required.');
      cy.get('#zipCode-error').should('contain', 'Zip Code is required.');

      // Ensure user stays on the same page
      cy.url().should('include', 'updateprofile.htm');
  });

    it("Should not accept invalid zip code and phone number", () => {
      cy.visit("https://parabank.parasoft.com/parabank/updateprofile.htm");

      cy.get('input[name="customer.zipCode"]').clear().type("ABCDEF");
      cy.get('input[name="customer.phoneNumber"]').clear().type("notaphone");

      cy.get('input[value="Update Profile"]').click();

      cy.contains("Your updated address and phone number have been added to the system.").should("not.exist");
  });




  it.skip('Verify the Logout function', () => {
    Cypress.on('uncaught:exception', () => false); // prevent app errors from failing test
    cy.visit('https://parabank.parasoft.com/parabank/index.htm');
    cy.get('#leftPanel > ul > :nth-child(8) > a').click();
    cy.url().should('include', 'index.htm');
    
  });

});



 