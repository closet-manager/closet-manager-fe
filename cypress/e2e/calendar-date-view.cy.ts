describe("date view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/date/2023-05-08");
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/event_items/find_all?date=2023-05-08", {"data":[{"id":"39","type":"item","attributes":{"user_id":1,"season":"all_season","clothing_type":"accessories","color":"neutral","size":"","image_url":"https://closet-manager-be.herokuapp.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ae3a8ce6ac5aa716c3475265c9e90e5f22992e9c/image.jpg","notes":"","favorite":false}}]})
    cy.intercept("GET", "http://localhost:5173/__cypress/assets/favicon.png?v2", {})
  });
  it("Should display the date", () => {
    cy.get("h2").should("have.text", "May 8th, 2023")
  });
  it("Should display any items saved for the date", () => {
    cy.get("img[class='card-image']")
  });
  
});