describe("calendar", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/calendar");
    cy.intercept("GET", "https://closet-manager-be.herokuapp.com/api/v1/events", {"data":[{"id":"3","type":"event","attributes":{"outfit_date":"2023-05-11"}},{"id":"4","type":"event","attributes":{"outfit_date":"2023-05-22"}},{"id":"5","type":"event","attributes":{"outfit_date":"2023-05-14"}},{"id":"6","type":"event","attributes":{"outfit_date":"2023-05-08"}}]})
    cy.intercept("GET", "http://localhost:5173/__cypress/assets/favicon.png?v2", {})
  });
  it("Should allow the user to select a month", () => {
    cy.wait(1000)
    cy.get("select").eq(0).select(4)
    cy.get("select").should("have.value", "4")
  });
   it("Should allow the user to select a year", () => {
    cy.get("select").eq(1).select(123)
    cy.get("select").eq(1).should("have.value", "2023")
  });
  it("Should display the selected month and year", () => {
    cy.get("select").eq(0).select(4)
    cy.get("select").eq(1).select(123)
    cy.get("div").eq(7).should("have.text", "May 2023")
  });
});