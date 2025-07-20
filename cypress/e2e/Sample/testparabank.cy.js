import { getParaBankTestData } from '../../support/utils/paraBankFaker';
describe("Assert Registration data using FAKER",{testIsolation : false},()=> {
    before(()=>{
         cy.visit("https://parabank.parasoft.com/parabank/register.htm");
         cy.url().should('contain','register.htm')
    })

     it("Verify the UI", () => {
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

        //Input fields
        it("Input Fields", () => {
        const user = getParaBankTestData()
            cy.get('input[id="customer.firstName"]').type(user.firstName);
            cy.get('input[id="customer.lastName"]').type(user.lastName);
            cy.get('input[id="customer.address.street"]').type(user.address);
            cy.get('input[id="customer.address.state"]').type(user.state);
            cy.get('input[id="customer.address.city"]').type(user.city);
            cy.get('input[id="customer.address.zipCode"]').type(user.zipcode);
            cy.get('input[id="customer.phoneNumber"]').type(user.phone);
            cy.get('input[id="customer.ssn"]').type(user.SSN);
            cy.get('input[id="customer.username"]').type(user.username);
            cy.get('input[id="customer.password"]').type(user.password);
            cy.get('input[id="repeatedPassword"]').type(user.password);
         
        });

        //Click Register
        it("Click Register and View Confirmation", () => {
            cy.get('[colspan="2"] > .button').should('be.visible').and('not.be.disabled');
        //Input 
            cy.get('[colspan="2"] > .button').click();
        //View Confirmation 
        cy.url().should('contain','parabank/register.htm');
       cy.get('.title').should('be.visible').and('contain','Welcome' )
        cy.get('#rightPanel > p').should('be.visible').and('contain','Your account was created successfully. You are now logged in')
        });

});
