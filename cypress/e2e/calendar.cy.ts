describe("calendar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
     cy.get('.home-container > [href="/calendar"]')
      .invoke("attr", "href")
      .then((href) => {
        cy.visit("http://localhost:5173" + href);
      });
  });
  it("Should display a calendar", () => {
    
  });
 
});