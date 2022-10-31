describe('The updates index page 1', () => {
  it('successfully loads', () => {
    cy.visit('/updates/1')
  })

  it('has the expected title', () => {
    cy.get('h1').contains('Updates')
  })

  it('has 10 article entries', () => {
    cy.get('article.update').should('have.length', 10)
  })

  describe('pagination', () => {
    let paginationNav = null;

    beforeEach(() => {
      // there are two pagination nav elements, just grabbing the first
      paginationNav = cy.get('nav.usa-pagination').first()
    })

    it('has three page number links', () => {
      paginationNav
        .find('li.usa-pagination__page-no')
        .should('have.length', 3)
    })

    it('has a link to the second page', () => {
      paginationNav
        .find('li.usa-pagination__page-no a')
        .contains('2')
    })

    it('has a next button with a link to the second page', () => {
      paginationNav
        .find('usa-pagination__item')
        .should('have.attr', 'href')
        .and('include', 'updates/2')
        .then((href) => {
          cy.visit(href)
        })
    })
  })
})

describe('The updates index page 2', () => {
  it('successfully loads', () => {
    cy.visit('/updates/2')
  })

  it('has the expected title', () => {
    cy.get('h1').contains('Updates')
  })

  it('has 10 article entries', () => {
    cy.get('article.update').should('have.length', 10)
  })

  describe('pagination', () => {
    let paginationNav = null;

    beforeEach(() => {
      // there are two pagination nav elements, just grabbing the first
      paginationNav = cy.get('nav.usa-pagination').first()
    })

    it('has four page number links', () => {
      paginationNav
        .find('li.usa-pagination__page-no')
        .should('have.length', 4)
    })

    it('has a link to the third page', () => {
      paginationNav
        .find('li.usa-pagination__page-no a')
        .contains('3')
    })

    it('has a next button with a link to the third page', () => {
      paginationNav
        .find('usa-pagination__item')
        .should('have.attr', 'href')
        .and('include', 'updates/3')
        .then((href) => {
          cy.visit(href)
        })
    })
  })
})
