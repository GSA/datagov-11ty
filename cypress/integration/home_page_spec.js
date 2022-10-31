describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })

  it('has the expected title', () => {
    cy.get('h1').contains('The home of the U.S. Government\'s open data')
  })

  // because the home page is variable and outside of the control of this test
  // we cannot check specific titles, presence of authors, etc
  it('has three updates', () => {
    cy.get('section.updates article.update').should('have.length', 3)
  })

  it('has a link to more updates', () => {
    cy.get('a.updates-link').contains('Browse all updates')
  })

  it('the link to more updates successfully loads', () => {
    cy.get('a.updates-link')
      .should('have.attr', 'href')
      .and('include', './updates/1')
      .then((href) => {
        cy.visit(href)
      })
  })
})
