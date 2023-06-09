describe("AddList Page", () => {
  it("should render correctly", () => {
    cy.visit("http://localhost:5173/addlist");
    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
    cy.get(".form--list").should("be.visible");
    cy.get(".form-button").should("be.visible");
    cy.get("input[type=text]").should(
      "have.attr",
      "placeholder"
    );
    cy.get('[placeholder="List Name"]').should("be.visible");
  });

  it("should display the form with the correct input", () => {
    cy.visit("http://localhost:5173/addlist");
    cy.get("input[type=text]")
      .type("Hawaii Trip")
      .should("have.value", "Hawaii Trip");
  });
  
  it("should submit the form correctly", () => {
    cy.visit("http://localhost:5173/addlist");
    cy.intercept(
      "POST",
      "https://closet-manager-be.herokuapp.com/api/v1/users/1/lists",
      {
        statusCode: 201,
        body: { name: "Random place to visit", data: { id: 45 } },
      }
    );
    cy.get("input[type=text]").type(
      "Random place to visit"
    );
    cy.get("button").click();
    cy.url().should("include", "/lists");
  });
});
