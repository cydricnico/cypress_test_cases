///<reference types="cypress" />

import { getuserData } from '../../support/utils/parabankutils';
import { getScreenshotWithDate } from '../../support/commands/parabankCommands';

describe("Assert the Bill Payment Page", { testIsolation: false }, () => {
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

  it("Verify the Bill Payment Service", () => {
    cy.fixture('billpayfixtures').then((user) => {
        cy.get('#leftPanel > ul > :nth-child(4) > a').click();
        cy.url().should('include', 'billpay.htm');
        cy.wait(1000);
        cy.get(':nth-child(1) > [width="20%"] > .input').type(user.name);
        cy.get(':nth-child(2) > [width="20%"] > .input').type(user.address);
        cy.get(':nth-child(3) > [width="20%"] > .input').type(user.city);
        cy.get(':nth-child(4) > [width="20%"] > .input').type(user.state);
        cy.get(':nth-child(5) > [width="20%"] > .input').type(user.zipcode);
        cy.get(':nth-child(6) > [width="20%"]').type(user.phonenumber);
        cy.get(':nth-child(8) > :nth-child(2) > .input').type(user.accountnumber);
        cy.get(':nth-child(9) > [width="20%"] > .input').type(user.verifynumber);
        cy.get(':nth-child(11) > [width="20%"] > .input').type(user.amount);
        cy.get(':nth-child(13) > :nth-child(2) > .input option').eq(0).then($option => {
          const defaultAccount = $option.text();
          cy.get(':nth-child(13) > :nth-child(2) > .input').select(defaultAccount);
        });
        cy.get(':nth-child(14) > :nth-child(2) > .button').click();
        cy.url().should('include', 'billpay.htm' );
        cy.get('#billpayResult > .title').should('be.visible').and('contain', 'Bill Payment Complete');
        cy.getScreenshotWithDate();
    });
  });

  it('Verify that the text field does not accept blank inputs', () => {
    cy.get('#leftPanel > ul > :nth-child(4) > a').click();
    cy.url().should('include', 'billpay.htm');
    cy.wait(1000);
    cy.get(':nth-child(1) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(2) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(3) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(4) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(5) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(6) > [width="20%"]').type(" ");
    cy.get(':nth-child(8) > :nth-child(2) > .input').type(" ");
    cy.get(':nth-child(9) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(11) > [width="20%"] > .input').type(" ");
    cy.get(':nth-child(13) > :nth-child(2) > .input option').eq(0).then($option => {
      const defaultAccount = $option.text();
      cy.get(':nth-child(13) > :nth-child(2) > .input').select(defaultAccount);
    });
    cy.get(':nth-child(14) > :nth-child(2) > .button').click();
    cy.get('#validationModel-name').should('contain', 'Payee name is required.');
    cy.get('#validationModel-address').should('contain', 'Address is required.');
    cy.get('#validationModel-city').should('contain', 'City is required.');
    cy.get('#validationModel-state').should('contain', 'State is required.');
    cy.get('#validationModel-zipCode').should('contain', 'Zip Code is required.');
    cy.get('#validationModel-account-empty').should('contain', 'Account number is required.');
    cy.get('#validationModel-verifyAccount-empty').should('contain', 'Account number is required.');
    cy.get('#validationModel-amount-empty').should('contain', 'The amount cannot be empty.')
    cy.getScreenshotWithDate();
  });
});

