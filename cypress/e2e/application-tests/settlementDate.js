/// <reference types="Cypress"  />

describe("Settlement Date API", () => {
    it("should return the same date for a delay of zero", () => {
        cy.request({
            url: "/api/v1/settlementDate?initialDate=2023-05-17&delay=0",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.ok).to.eq(true);
            expect(response.body.results.businessDate).to.eq(
                "2023-05-16T04:00:00Z"
            );
        });
    });

    it("should return a future date for a positive delay", () => {
        cy.request({
            url: "/api/v1/settlementDate?initialDate=2023-05-17&delay=5",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.ok).to.eq(true);
            expect(response.body.results.businessDate).to.eq(
                "2023-05-23T04:00:00Z"
            );
        });
    });

    it("should return error for a negative delay", () => {
        cy.request({
            url: "/api/v1/settlementDate?initialDate=2023-05-17&delay=-5",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.ok).to.eq(false);
        });
    });

    it("should return error for a delay specified as a non-integer", () => {
        cy.request({
            url: "/api/v1/settlementDate?initialDate=2023-05-17&delay=3.5",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.ok).to.eq(false);
        });
    });

    it("should return error for a delay specified as a string", () => {
        cy.request({
            url: "/api/v1/settlementDate?initialDate=2023-05-17&delay=abc",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.ok).to.eq(false);
        });
    });

    it("should return error for initial date in incorrect format", () => {
        cy.request({
            url: "/api/v1/settlementDate?initialDate=17-05-2023&delay=5",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.ok).to.eq(false);
        });
    });
});
