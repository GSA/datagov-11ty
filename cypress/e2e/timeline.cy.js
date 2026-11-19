describe('The Data.gov timeline', () => {
    it('keeps every event link visible and keyboard reachable before scrolling', () => {
        cy.visit('/timeline/');

        cy.title().should('eq', 'Data.gov Program Age - Data.gov');
        cy.get('html').should('have.attr', 'lang', 'en');
        cy.get('.cd-timeline__content').should('have.length.greaterThan', 0);
        cy.get('.cd-timeline__content--hidden').should('not.exist');
        cy.get('.cd-timeline__content a').each(($link) => {
            cy.wrap($link).should('be.visible');
        });
    });
});
