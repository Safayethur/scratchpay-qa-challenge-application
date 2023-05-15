/// <reference types="Cypress"  />

describe("Login API", () => {
    let email = "gianna@hightable.test";
    let password = "thedantonio1";

    it("should return status 200 on successful login", () => {
        cy.login(email, password).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it("should return a valid JWT token on successful login", () => {
        cy.login(email, password).then((response) => {
            expect(response.body.data).to.have.property("session");
            expect(response.body.data.session).to.have.property("token");
        });
    });

    it("should return correct user information on successful login", () => {
        cy.login(email, password).then((response) => {
            expect(response.body.data.session).to.have.property("loggedIn", true );
            expect(response.body.data.session).to.have.property("userId");
            expect(response.body.data.session).to.have.property("role", "clinic");
        });
    });

    it("should return status 400 on unsuccessful login", () => {
        cy.request({
            method: "GET",
            url: "https://qa-challenge-api.scratchpay.com/api/auth",
            qs: {
                email: email,
                password: "wrong_password",
            },
            failOnStatusCode: false, // we are expecting a 401 status
        }).then((response) => {
            expect(response.status).to.eq(400);
        });
    });
});
