describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });

    it('has the expected title', () => {
        cy.get('h1').contains("The Home of the U.S. Government's Open Data");
    });

    it('has a count for catalog datasets', () => {
        cy.get('section.hero .hero__dataset-count').contains('datasets available');
    });

    it('has all the requisite nav elements', () => {
        cy.get('.usa-nav__inner')
            .children()
            .should('contain', 'Data')
            .and('contain', 'Reports')
            .and('contain', 'Open Government')
            .and('contain', 'Contact')
            .and('contain', 'User Guide');
    });
    // it.skip('has a link to more updates', () => {
    //     cy.get('a.updates-link').contains('Browse all updates');
    // });

    // it.skip('the link to more updates successfully loads', () => {
    //     cy.get('a.updates-link')
    //         .should('have.attr', 'href')
    //         .and('include', './updates/1')
    //         .then((href) => {
    //             cy.visit(href);
    //         });
    // });
});
