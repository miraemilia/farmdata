describe('Farm data', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http//localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http//localhost:3000')
    cy.contains('Farm data')
  })

  it('added measurement is shown on "View data"', function() {
    cy.get('#addData-button').click()
    cy.get('#selectFarm').select('PartialTech Research Farm')
    cy.get('#selectType').select('rainFall')
    cy.get('#metricValue')
      .first()
      .clear()
      .type(57)
    cy.get('#submit-button').click()

    cy.get('#viewData-button').click()
    cy.contains('PartialTech Research Farm')
  })
})