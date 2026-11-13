describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });

    it('shows a focus outline on the dataset shortcut links', () => {
        cy.visit('/');

        cy.get('.catalog-filters a').first().focus().should(($link) => {
            expect($link).to.have.css('outline-style', 'solid');
            expect($link).to.have.css('outline-color', 'rgb(36, 145, 255)');
            expect(parseFloat($link.css('outline-width'))).to.be.greaterThan(0);
        });
    });

    it('does not clip the desktop logo focus outline', () => {
        cy.viewport(1280, 900);
        cy.visit('/');

        cy.get('.usa-logo__text a').focus().should(($link) => {
            expect($link).to.have.css('outline-style', 'solid');
            expect($link).to.have.css('outline-color', 'rgb(36, 145, 255)');
        });
        cy.get('.usa-navbar').should(($navbar) => {
            expect(getComputedStyle($navbar[0]).overflow).to.equal('visible');
        });
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
        it('preserves chart tooltip and pie link keyboard focus', () => {
            cy.get('#datagov-bar-chart-org').should('have.prop', 'tabIndex', -1);
            cy.get('#datagov-bar-chart-datasets')
                .should('have.prop', 'tabIndex', 0)
                .focus();
            cy.get('#datagov-bar-chart-datasets')
                .closest('.usa-tooltip')
                .find('.usa-tooltip__body')
                .should('contain.text', 'Datasets grouped by when metadata was last modified')
                .and('have.attr', 'aria-hidden', 'false');
            cy.get('#datagov-pie-chart').should('have.prop', 'tabIndex', -1);
            cy.get('#datagov-pie-chart')
                .closest('a')
                .should('have.prop', 'tabIndex', 0)
                .should('have.attr', 'href', '/user-guide/#dataset-totals')
                .focus()
                .should(($link) => {
                    expect($link).to.have.class('metrics__card-link');
                    expect($link).to.have.css('display', 'block');
                    expect($link).to.have.css('outline-style', 'solid');
                    expect($link).to.have.css('outline-color', 'rgb(36, 145, 255)');
                    expect(parseFloat($link.css('outline-width'))).to.be.greaterThan(0);
                    expect($link.text()).not.to.include('class="usa-tooltip"');
                });
            cy.get('.usa-tooltip__body')
                .last()
                .should(($tooltip) => {
                    expect($tooltip.attr('aria-hidden')).to.equal('false');
                    expect($tooltip.text().replace(/\s+/g, ' ')).to.include(
                        'Click to learn more about collections in our user guide'
                    );
                });
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
