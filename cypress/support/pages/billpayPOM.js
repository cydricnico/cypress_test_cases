
export class parabankBillPayPage {
    UICheckBillPay() {
        cy.get('#billpayForm > .title').should('be.visible').and('contain', 'Bill Payment Service');
        cy.get('#billpayForm > p').should('be.visible').and('contain', 'Enter payee information');
        cy.get(':nth-child(1) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(2) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(3) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(4) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(5) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(6) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(8) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(9) > [align="right"]').should('be.visible');
        cy.get(':nth-child(11) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(13) > [align="right"] > b').should('be.visible');
        cy.get(':nth-child(1) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(2) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(3) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(4) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(5) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(6) > [width="20%"]').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(8) > :nth-child(2) > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(9) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(11) > [width="20%"] > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(13) > :nth-child(2) > .input').should('be.visible').and('not.be.disabled');
        cy.get(':nth-child(14) > :nth-child(2) > .button').should('be.visible').and('not.be.disabled');
    }
}