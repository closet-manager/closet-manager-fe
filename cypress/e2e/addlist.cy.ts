describe("AddList Page", () => {
  it("should render correctly", () => {
    cy.visit("http://localhost:5173/addlist");
    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
    cy.get(".form--list").should("be.visible");
    cy.get(".form-button").should("be.visible");
    cy.get("#root > main > div > form > label > input[type=text]").should(
      "have.attr",
      "placeholder"
    );
    cy.get('[placeholder="Type List Name Here"]').should("be.visible");
  });

  describe("form submission", () => {
    it("should display the form with the correct input", () => {
      cy.visit("http://localhost:5173/addlist");
      cy.get("#root > main > div > form > label > input[type=text]")
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
      cy.get("#root > main > div > form > label > input[type=text]").type(
        "Random place to visit"
      );

      cy.get("#root > main > div > form > button").click();
      cy.url().should("include", "/lists/45");
    });
  });
});
