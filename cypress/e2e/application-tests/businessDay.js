/// <reference types="Cypress"  />

describe('Business Day API', () => {
    it('should return true for a business day', () => {
        cy.request({
            method: 'GET',
            url: '/api/v1/isBusinessDay',
            qs: {
              date: '2023-05-16'
            }
          })
          .then((response) => {
            expect(response.body).to.have.property('ok', true)
            expect(response.body).to.have.property('results', true)
          })
    });
  
    it('should return false for a weekend day', () => {
        cy.request({
            method: 'GET',
            url: '/api/v1/isBusinessDay',
            qs: {
              date: '2023-05-20'
            }
          })
          .then((response) => {
            expect(response.body).to.have.property('ok', true)
            expect(response.body).to.have.property('results', false)
          })
    });
  
    it('should return false for a holiday', () => {
        cy.request({
            method: 'GET',
            url: '/api/v1/isBusinessDay',
            qs: {
              date: '2023-12-25',
              country: 'US'
            }
          })
          .then((response) => {
            expect(response.body).to.have.property('ok', true)
            expect(response.body).to.have.property('results', false)
          })
    });
  
    it('should return error for a non-existent date', () => {
        cy.request({
            method: 'GET',
            url: '/api/v1/isBusinessDay',
            qs: {
              date: '2023-02-30'
            },
            failOnStatusCode: false
          })
          .then((response) => {
            expect(response.body).to.have.property('ok', false)
          })
    });
  
    it('should return error for a date in incorrect format', () => {
        cy.request({
            method: 'GET',
            url: '/api/v1/isBusinessDay',
            qs: {
              date: '16-05-2023'
            },
            failOnStatusCode: false
          })
          .then((response) => {
            expect(response.body).to.have.property('ok', false)
          })
    });
  });
  