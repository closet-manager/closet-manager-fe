describe("date view", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/calendar");
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/events", {"data":[{"id":"3","type":"event","attributes":{"outfit_date":"2023-05-11"}},{"id":"4","type":"event","attributes":{"outfit_date":"2023-05-22"}},{"id":"5","type":"event","attributes":{"outfit_date":"2023-05-14"}},{"id":"6","type":"event","attributes":{"outfit_date":"2023-05-08"}}]})
    cy.intercept("GET", "http://localhost:5173/__cypress/assets/favicon.png?v2", {})
    cy.wait(1000)
    cy.get("select").eq(0).select(4)
    cy.get("select").eq(1).select(123)
    cy.get("div").eq(30).click()
  });
  it("Should display the date", () => {
    cy.get("h2").should("have.text", "May 8th, 2023")
  });
  
});