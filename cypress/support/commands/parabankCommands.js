

//Screenshot
Cypress.Commands.add("getScreenshotWithDate", (baseName = 'screenshot', options = {}) => {
  cy.then(() => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    const fullName = `${baseName}-${timestamp}`;
    cy.screenshot(fullName, options);
  });
});


Cypress.Commands.add("FillRegistrationForm", (user) => {
  // const user = getuserData()
        cy.visit("https://parabank.parasoft.com/parabank/register.htm");
        cy.get('input[id="customer.firstName"]').type(user.firstName);
        cy.get('input[id="customer.lastName"]').type(user.lastName);
        cy.get('input[id="customer.address.street"]').type(user.address);
        cy.get('input[id="customer.address.city"]').type(user.city);
        cy.get('input[id="customer.address.state"]').type(user.state);
        cy.get('input[id="customer.address.zipCode"]').type(user.zipCode);
        cy.get('input[id="customer.phoneNumber"]').type(user.phoneNumber);
        cy.get('input[id="customer.ssn"]').type(user.ssn);
        cy.get('input[id="customer.username"]').type(user.username);
        cy.get('input[id="customer.password"]').type(user.password);
        cy.get('input[id="repeatedPassword"]').type(user.repeatedPassword);
        cy.get('[colspan="2"] > .button').should('be.visible').and('not.be.disabled');
        cy.get('input[value="Register"]').click();
        cy.url().should('include', 'parabank/register.htm');
});   

Cypress.Commands.add("openNewAccountFunction", () => {
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

Cypress.Commands.add("updateContactInfo", () => {
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

Cypress.Commands.add("blankInputs", () => {
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

Cypress.Commands.add("billPay", () => {
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
  });
});

Cypress.Commands.add("CheckUIActivity", () => {
  cy.get('#accountDetails > .title').should('be.visible').and('not.be.disabled');
  cy.get('#accountDetails > table > tbody > :nth-child(1) > [align="right"]').should('be.visible').and('not.be.disabled');
  cy.get(':nth-child(3) > [align="right"]').should('be.visible').and('not.be.disabled');
  cy.get(':nth-child(4) > [align="right"]').should('be.visible').and('not.be.disabled');
  cy.get('#accountId').should('be.visible').and('not.be.disabled');
  cy.get('#accountType').should('be.visible').and('not.be.disabled');
  cy.get('#balance').should('be.visible').and('not.be.disabled');
  cy.get('#availableBalance').should('be.visible').and('not.be.disabled');
  cy.get('#accountActivity > .title').should('be.visible').and('not.be.disabled');
  cy.get(':nth-child(1) > [align="right"] > b').should('be.visible').and('not.be.disabled');
  cy.get(':nth-child(2) > [align="right"] > b').should('be.visible').and('not.be.disabled');
  cy.get('.form_activity > tbody > :nth-child(1) > :nth-child(2)').should('be.visible').and('not.be.disabled');
  cy.get('.form_activity > tbody > :nth-child(2) > :nth-child(2)').should('be.visible').and('not.be.disabled');
});

Cypress.Commands.add("transferfunds", () => {
  cy.get('#leftPanel > ul > :nth-child(3) > a').click();
  cy.url().should('include', 'transfer.htm');
  cy.wait(1000);
  cy.get('input[id="amount"]').type("100");
  cy.get(':nth-child(4) > .button').click();
  cy.url().should('include', 'transfer.htm');
  cy.get('#showResult > .title').should('be.visible').and('contain', 'Transfer Complete!');
});