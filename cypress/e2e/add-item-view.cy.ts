describe("AddItem Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/addItem");
  });

  it("should render the page correctly", () => {
    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
    cy.get(".form-title").should("be.visible");
    cy.get(".form").should("be.visible");
  });

  it("should be able to submit the form with the correct inputs", () => {
    cy.get('.img-input')
      .selectFile('cypress/fixtures/test-img.png');
    cy.get('[name="clothing_type"]').select("tops");
    cy.get('[name="color"]').select("neutral");
    cy.get('[name="season"]').select("spring");
    cy.get('label.size-input > .size-input').type('L');
    cy.get('.notes-box').type('Hand wash only');
    cy.intercept("POST", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items", {
      "data": {
          "id": "100",
          "type": "item",
          "attributes": {
              "user_id": 1,
              "season": "spring",
              "clothing_type": "tops",
              "color": "neutral",
              "size": "L",
              "image_url": "/cypress/fixtures/test-img.png",
              "notes": "Hand wash only"
          }
        }
    });
    cy.get('button.form-button').click();
    cy.url().should('include', '/itemDetails/100');
  });

  it("should be able to clear inputs in the form", () => {
    cy.get('[name="clothing_type"]').select("tops");
    cy.get('[name="color"]').select("neutral");
    cy.get('[name="season"]').select("spring");
    cy.get('label.size-input > .size-input').type('L');
    cy.get('.notes-box').type('Hand wash only');
    cy.get('input.form-button').click();
    cy.get('[name="clothing_type"]').contains("Clothing Type");
    cy.get('[name="color"]').contains('Color');
    cy.get('[name="season"]').contains('Season');
    cy.get('label.size-input > .size-input').should('have.value', '');
    cy.get('.notes-box').should('have.value', '');
  });

});

