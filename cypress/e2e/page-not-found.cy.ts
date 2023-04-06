describe("When route doesn't", () => {
  it("Should have error message", () => {
    cy.visit("http://localhost:5173/qqqqqq");
    cy.get("h2").should("contain", "Oops!");
    cy.get(".image").should("be.visible");
  });
});
