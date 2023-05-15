/// <reference types="Cypress"  />

describe("Clinic Email API", () => {
    let token = ' ';
    
        beforeEach(() => {
            cy.login("gianna@hightable.test", "thedantonio1").then((response) => {
                token = response.body.data.session.token;
            }).then(() => {
                cy.log(token)
            })
        });

        it('should return status 200 when searching for clinics with the word "veterinary" in their name', () => {
            cy.request({
                method: 'GET',
                url: 'https://qa-challenge-api.scratchpay.com/api/clinics',
                qs: {
                    term: "veterinary"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });

        it('should return status 403 when a non-logged-in user tries to search for clinics', () => {
            cy.request({
                method: 'GET',
                url: 'https://qa-challenge-api.scratchpay.com/api/clinics',
                qs: {
                    term: "veterinary"
                },
                failOnStatusCode: false, // we are expecting a 403 status
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        });
    
    
    });