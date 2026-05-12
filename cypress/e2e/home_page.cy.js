describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });

    describe('Navigation', () => {
        it('has all the requisite nav elements', () => {
            cy.get('.usa-nav__inner')
                .children()
                .should('contain', 'Data')
                .and('contain', 'Metrics')
                .and('contain', 'Open Government')
                .and('contain', 'Contact')
                .and('contain', 'User Guide');
        });
    });

    describe('Anniversary', () => {
        it('doesn\'t have the 15 year anniversary banner', () => {
            cy.get('div.banner.padding-2.text-center').should('not.exist');
        })
        it('doesn\'t have the anniversary section', ()=> {
            cy.get('section.usa-section.anniversary').should('not.exist');
        })
    })
    describe('Hero', () => {
        it('has the expected title', () => {
            cy.get('h1').contains("The Home of the U.S. Government's Open Data");
        });

        it('has a count for catalog datasets', () => {
            cy.get('section.hero .hero__dataset-count').contains('datasets available');
        });
    });

    describe('The Metrics Widgets', () => {
        it('has the metrics section', ()=> {
            cy.get('section.usa-section.metrics').should('exist');
        })
        it('has a title', () => {
            cy.get('section.usa-section.metrics').find('h1').contains('Metrics')
        })
        it('has a description', () => {
            cy.get('section.usa-section.metrics').find('div:not([class])').contains(' Below')
        })
        it('has a bar chart by org type', () => {
            cy.get('#datagov-bar-chart-org').should('be.visible').should('have.data', 'metric');
        });
        it('has a bar chart of datasets by age', () => {
            cy.get('#datagov-bar-chart-datasets').should('be.visible').should('have.data', 'metric');
        });
        it('has a pie chart of dataset counts', () => {
            cy.get('#datagov-pie-chart').should('be.visible').should('have.data', 'metric');
        });
    });
});
