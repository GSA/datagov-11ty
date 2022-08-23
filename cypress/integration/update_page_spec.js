describe('A blog post', () => {
  it('successfully loads', () => {
    cy.visit('/food/introducing-new-rural-housing-data-from-usda/')
  })

  it('has the expected title', () => {
    cy.get('h1.title').contains('Introducing New Rural Housing Data from USDA')
  })

  it('has the expected author', () => {
    cy.get('span[rel="author"]').contains('admin')
  })

  it('has the expected date', () => {
    cy.get('time').contains('July 26, 2016')
    cy.get('time').invoke('attr', 'datetime')
      .should('eq', '2016-07-26')
  })

  it('has an image which loads', () => {
    cy.get('a img').invoke('attr', 'src')
      .should('eq', 'https://s3-us-gov-west-1.amazonaws.com/cg-0817d6e3-93c4-4de8-8b32-da6919464e61/unnamed-1024x386.jpg')
      .then((href) => {
        cy.request(href)
      })
  })

  it('has an image with expected alt text', () => {
    cy.get('a img').invoke('attr', 'alt')
      .should('eq', 'Mapping applications like PolicyMap are incorporating USDA’s rural housing data and overlaying them with other indicators.')
  })
})
