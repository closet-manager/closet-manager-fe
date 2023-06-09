describe("Custom List Page", () => {
  it("should render correctly", () => {
    cy.visit("http://localhost:5173/lists");

    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
  });
  it("should render button correctly", () => {

    cy.visit("http://localhost:5173/lists").intercept(
      "get",
      "https://closet-manager-be.herokuapp.com/api/v1/users/1/lists",
      {
        body: {
          data: [{ id: 44, attributes: { name: "random place" } }],
        },
      }
    );
    cy.get(".list-button").contains("random place");
  });
});
