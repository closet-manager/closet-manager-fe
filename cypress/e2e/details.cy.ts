describe("Details View", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items", {fixture: "closet"})
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/1", {fixture: "details"})
    cy.visit("http://localhost:5173/");
    cy.get('.home-container > [href="/myCloset"]').click();
    cy.get('img').eq(1).click();
  })
  it("Should be able to navigate to the closet from the landing page", () => {
    
  });
  
});