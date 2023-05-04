describe("landing page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("should render correctly", () => {
    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
    cy.get(".home-container").find(".menu-item").its("length").should("eq", 5);
  });
  it("should have correct path for each buttons", () => {
    cy.get('.home-container > [href="/myCloset"]')
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("http://localhost:5173" + href);
      });
    cy.get("#nav-bar__home > .fa-regular").click();

    cy.get('.home-container > [href="/lists"]')
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("http://localhost:5173" + href);
      });
    cy.get("#nav-bar__home > .fa-regular").click();
    cy.get('[href="/addItem"]')
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("http://localhost:5173" + href);
      });
  });
});
