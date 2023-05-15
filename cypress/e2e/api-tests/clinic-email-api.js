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

    it("should prevent a logged-in user from getting the email list of practice id 2", () => {
        cy.request({
            method: "GET",
            url: "https://qa-challenge-api.scratchpay.com/api/clinics/2/emails",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false // we are expecting a 403 status
        }).then((response) => {
            expect(response.status).to.eq(400); // odd, but it sends a 400 for bad request instead of 403
        });
    });

    it("should return error when attempting to get the email list of a practice id that doesn't exist", () => {
        cy.request({
            method: "GET",
            url: "https://qa-challenge-api.scratchpay.com/api/clinics/9999/emails", // assuming 9999 is a non-existent id
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false // we are expecting a 404 status
        }).then((response) => {
            expect(response.status).to.eq(400); // 404 expect since it doesn't exist but sends 400
        });
    });
});