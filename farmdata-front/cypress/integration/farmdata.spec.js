describe('Farm data', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http//localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http//localhost:3000')
    cy.contains('Farm data')
  })

  it('chart and table mutually exclusive', function() {
    cy.get('#viewData-button').click()
    cy.get('#table').should('exist')
    cy.get('#chart').should('not.exist')

    cy.get('#tableOrChart-button').click()
    cy.get('#table').should('not.exist')
    cy.get('#chart').should('exist')
  })

  it('new measurement added successfully and success notification is shown', function() {
    cy.get('#addData-button').click()
    cy.get('#selectFarm').select('PartialTech Research Farm')
    cy.get('#selectDate').type('2022-01-07')
    cy.get('#selectType').select('rainFall')
    cy.get('#metricValue')
      .first()
      .clear()
      .type(57)
    cy.get('#submit-button').click()

    cy.wait(1000)
    cy.get('#notification').contains('New data added')

    cy.get('#viewData-button').click()
    cy.get('#selectFarmToFilter').select('PartialTech Research Farm')
    cy.get('#selectTypeToFilter').select('rainFall')
    cy.get('#selectMonthToFilter').type('2022-01')
    cy.get('#filter-button').click()

    cy.contains('57.0')
  })

  it('filter picks correct farm, type and month', function() {
    cy.get('#viewData-button').click()
    cy.get('#selectFarmToFilter').select('PartialTech Research Farm')
    cy.get('#selectTypeToFilter').select('temperature')
    cy.get('#selectMonthToFilter').type('2022-01')
    cy.get('#filter-button').click()

    cy.contains('PartialTech Research Farm, January 2022')
    cy.contains('\u00B0C')
  })

  it('correct minimum and maximum values are shown', function() {
    cy.get('#viewData-button').click()
    cy.get('#selectFarmToFilter').select('Noora\'s farm')
    cy.get('#selectTypeToFilter').select('rainFall')
    cy.get('#selectMonthToFilter').type('2022-01')
    cy.get('#filter-button').click()

    cy.contains('Minimum value: 0.0 mm')
    cy.contains('Maximum value: 120.0 mm')
  })

  it('correct average is shown', function() {
    cy.get('#viewData-button').click()
    cy.get('#selectFarmToFilter').select('Noora\'s farm')
    cy.get('#selectTypeToFilter').select('rainFall')
    cy.get('#selectMonthToFilter').type('2022-01')
    cy.get('#filter-button').click()

    cy.contains('Average: 46.3 mm')
  })

})