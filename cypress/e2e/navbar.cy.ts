describe("Navbar Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items", {fixture: "closet"})
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/1", {fixture: "details"})
    cy.intercept("DELETE", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/1", {fixture: "deletedItem"})
    cy.visit("http://localhost:5173/");
    cy.get('.home-container > [href="/myCloset"]').click();
  })

   it("Should be visible", () => {
    cy.get("#nav-bar").should("be.visible");
  });
  
  it("Should display a hanger icon, house icon, and list icon", () => {
    cy.get(".nav-bar > a").eq(0).should("be.visible");
    cy.get(".nav-bar > a").eq(0).invoke('html').should("contain", "fa-clothes-hanger");

    cy.get(".nav-bar > a").eq(1).should("be.visible");
    cy.get(".nav-bar > a").eq(1).invoke('html').should("contain", "fa-house-chimney-blank");

    cy.get(".nav-bar > a").eq(2).should("be.visible");
    cy.get(".nav-bar > a").eq(2).invoke('html').should("contain", "fa-square-list");
  });

  it("Should redirect the user to their closet when the hanger icon is clicked", () => {
    cy.get(".nav-bar > a").eq(0).click()
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/myCloset");
    });
  });

  it("Should redirect the user to the home page when the house icon is clicked", () => {
    cy.get(".nav-bar > a").eq(1).click()
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/");
    });
  });

  it("Should redirect the user to the list page when the list icon is clicked", () => {
    cy.get(".nav-bar > a").eq(2).click()
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/lists");
    });
  });

});