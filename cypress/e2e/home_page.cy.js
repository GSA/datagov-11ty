describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });

    it('renders the dataset shortcuts as links', () => {
        cy.get('.catalog-filters a').should('have.length.greaterThan', 0).each(($link) => {
            expect($link).to.have.attr('href').that.is.not.empty;
        });
    });

    it('renders the home logo as an accessible link', () => {
        cy.get('.usa-logo__text a')
            .should('have.attr', 'href', '/')
            .and('have.attr', 'title', 'Home')
            .and('have.attr', 'aria-label', 'Home');
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
        it('renders chart position metadata and the pie chart link', () => {
            cy.get('#datagov-bar-chart-datasets')
                .should('have.attr', 'data-position', 'bottom');
            cy.get('#datagov-pie-chart')
                .closest('a')
                .then(($link) => {
                    expect($link).to.have.attr('href', '/user-guide/#dataset-totals');
                    expect($link).to.have.attr('data-position', 'bottom');
                    expect($link).to.have.attr('aria-label');
                    expect($link.attr('aria-label').replace(/\s+/g, ' ').trim()).to.include(
                        'Click to learn more about collections in our user guide'
                    );
                });
            cy.get('#datagov-pie-chart').should('have.data', 'metric');
        });
    });

    describe('Code Repository Button', () => {
        it('has the code repository button', () => {
            cy.get('a[href*="catalog.data.gov/code"]').should('exist');
        });

        it('displays correct text for code repository button', () => {
            cy.get('a[href*="catalog.data.gov/code"]').should('contain.text', 'Code');
        });

        it('code repository button is visible', () => {
            cy.get('a[href*="catalog.data.gov/code"]').should('be.visible');
        });
    });

    describe('SHARE IT Act Section', () => {
        it('has the code repositories section', () => {
            cy.get('section.usa-section.sibling-sites').should('contain.text', 'Federal Source Code Repositories');
        });
        it('has a title mentioning source code or repositories', () => {
            cy.get('section.usa-section.sibling-sites').find('h2').should('contain.text', 'Source Code');
        });
        it('has a link to the /code page', () => {
            cy.get('section.usa-section.sibling-sites').find('a[href*="/code"]').should('exist');
        });
        it('does not display Federal Data Strategy section', () => {
            cy.get('section.usa-section.sibling-sites').should('not.contain.text', 'Strategy');
        });
    });
});
