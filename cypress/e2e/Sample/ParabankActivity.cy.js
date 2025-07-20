import { generateUserData } from '../../support/utils/parabankutils';

describe('Parabank Registration with Dynamic Data', { testIsolation: false }, () => {
  let user;

  before(() => {
    user = generateUserData(); // create dynamic user
  });

  beforeEach(() => {
    cy.visit('https://parabank.parasoft.com/parabank/register.htm');
    cy.url().should('include', 'register.htm');

    // Clear storage to avoid state issues
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  it('Should register a new user with dynamic data', () => {
    cy.get('#customer\\.firstName').type(user.firstName);
    cy.get('#customer\\.lastName').type(user.lastName);
    cy.get('#customer\\.address\\.street').type(user.address);
    cy.get('#customer\\.address\\.city').type(user.city);
    cy.get('#customer\\.address\\.state').type(user.state);
    cy.get('#customer\\.address\\.zipCode').type(user.zipCode);
    cy.get('#customer\\.phoneNumber').type(user.phoneNumber);
    cy.get('#customer\\.ssn').type(user.ssn);
    cy.get('#customer\\.username').type(user.username);
    cy.get('#customer\\.password').type(user.password);
    cy.get('#repeatedPassword').type(user.repeatedPassword);

    cy.get('[colspan="2"] > .button').click();

    // Check if registration succeeded or internal error occurred
    cy.get('body').then(($body) => {
      if ($body.text().includes('An internal error has occurred')) {
        throw new Error('🚨 Backend error: Registration failed.');
      } else {
        cy.contains('Welcome').should('be.visible');
      }
    });
  });

  it('Should go to Open New Account page after login', () => {
    cy.get('a').contains('Open New Account').click();
    cy.url().should('include', 'openaccount.htm');
  });
});
