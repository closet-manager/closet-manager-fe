describe("Details View", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items", {fixture: "closet"})
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/1", {fixture: "details"})
    cy.intercept("DELETE", "https://closet-manager-be.herokuapp.com/api/v1/users/1/items/1", {fixture: "deletedItem"})
    cy.visit("http://localhost:5173/");
    cy.get('.home-container > [href="/myCloset"]').click();
    cy.get('img').eq(1).click();
  })
  
  it("Should display the Closet Collection logo and navbar", () => {
    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
  });
  
  it("Should contain a header", () => {
    cy.get("h2").should("contain", "Item Details");
  });
  
  it("Should display the item's color, size, season, and type", () => {
    cy.get("p[class='item-details']").eq(0).should("have.text", "orange");
    cy.get("p[class='item-details']").eq(1).should("have.text", "summer");
    cy.get("p[class='item-details']").eq(2).should("have.text", "tops");
    cy.get("p[class='item-details']").eq(3).should("have.text", "size small");
  });

  it("Should redirect the user to an edit page when the item's color is clicked", () => {
    cy.get("p[class='item-details']").eq(0).should("be.visible");
    cy.get("p[class='item-details']").eq(0).click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/edit/1");
    });
  });
  
  it("Should redirect the user to an edit page when the item's season is clicked", () => {
    cy.get("p[class='item-details']").eq(1).should("be.visible");
    cy.get("p[class='item-details']").eq(1).click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/edit/1");
    });
  });
  
  it("Should redirect the user to an edit page when the item's type is clicked", () => {
    cy.get("p[class='item-details']").eq(2).should("be.visible");
    cy.get("p[class='item-details']").eq(2).click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/edit/1");
    });
  });
  
  it("Should redirect the user to an edit page when the item's size is clicked", () => {
    cy.get("p[class='item-details']").eq(3).should("be.visible");
    cy.get("p[class='item-details']").eq(3).click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/edit/1");
    });
  });

  it("Should display an image of the item", () => {
    cy.get("img[class='details-image']").should("be.visible");
    cy.get("img[class='details-image']").should("have.attr", "src").should("eq", "https://closet-manager-be.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBEdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f992d19ee8a075a2504c274ce72a7b33b98e7851/orange-top.avif") 
  });

  it("Should display an item's notes", () => {
    cy.get("h2[class='item-notes-header']").should("have.text", "Notes");
    cy.get("p[class='item-notes']").should("have.text", "Wash on cold only");
  });

  it("Should have an edit button, an add to list button, and a delete button", () => {
    cy.get("button[class='details-edit-button']").should("be.visible");
    cy.get("button[class='details-edit-button']").should("have.text", "Edit");

    cy.get('.add-to-list-container > button').should("be.visible");
    cy.get('.add-to-list-container > button').should("have.text", "Add to List");

    cy.get("button[class='details-delete-button']").should("be.visible");
    cy.get("button[class='details-delete-button']").should("have.text", "Delete");
  });

  it("Should redirect the user to an edit page when the edit button is clicked", () => {
    cy.get("button[class='details-edit-button']").click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/edit/1");
    });
  });

  it("Should delete the item when the user clicks the delete button and redirect the user to the Closet view", () => {
    cy.get("button[class='details-delete-button']").click();
    cy.on("url:changed", (newUrl) => {
      expect(newUrl).to.contain("/");
    });
  });

  it("Add tests for when a user clicks on the add to list button lists", () => {
    // 
  });
});