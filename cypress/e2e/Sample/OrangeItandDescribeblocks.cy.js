///<reference types="cypress" />

it("Launch Website", () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  cy.url("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  cy.get('.orangehrm-login-branding > img').should('be.visible');
  cy.get('.oxd-text--h5').should('be.visible');
  cy.get(':nth-child(2) > .oxd-input-group').should('be.visible');
  cy.get(':nth-child(3) > .oxd-input-group').should('be.visible');
  cy.get('.oxd-button').should('be.visible');
  cy.get('.orangehrm-login-forgot > .oxd-text').should('be.visible');
  cy.get('.orangehrm-copyright-wrapper > :nth-child(1)').should('be.visible');
  cy.get('.orangehrm-copyright-wrapper > :nth-child(1)').should('be.visible');
  cy.get('.orangehrm-login-slot').should('be.visible');
  cy.get('.orangehrm-login-slot-wrapper').should('be.visible');
  cy.get('.orangehrm-login-layout-blob').should('be.visible');
});

describe("Login Successfully", () => {
    it("Login with valid credentials", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.get('input[name="username"]').type("Admin");
        cy.get('input[name="password"]').type("admin123");
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it("Login with invalid credentials", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.get('input[name="username"]').type("InvalidUser");
        cy.get('input[name="password"]').type("wrongpassword");
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
        cy.url().should('include', '/auth/login');
    });
});
