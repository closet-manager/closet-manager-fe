// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe("AddItem Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/addItem");
  });

  it("should render correctly", () => {
    cy.get(".logo-img").should("be.visible");
    cy.get("#nav-bar").should("be.visible");
    cy.get(".form-title").should("be.visible");
    cy.get(".form").should("be.visible");
  });

  it("should display the form with the correct input", () => {
    cy.get(".form")
  })

})

//   describe("form submission", () => {
//     it("should display the form with the correct input", () => {
//       cy.visit("http://localhost:5173/addlist");
//       cy.get("#root > main > div > form > label > input[type=text]")
//         .type("Hawaii Trip")
//         .should("have.value", "Hawaii Trip");
//     });
//     it("should submit the form correctly", () => {
//       cy.visit("http://localhost:5173/addlist");
//       //intercept and fixture
//       cy.intercept(
//         {
//           method: "POST",
//           url: "https://closet-manager-be.herokuapp.com/api/v1/users/1/lists",
//         },
//         { name: "Random place to visit" }
//       );
//       cy.get("#root > main > div > form > label > input[type=text]").type(
//         "Random place to visit"
//       );
//       cy.get("#root > main > div > form > button").click();
//       cy.get(".alert-msg").should("contain", "YOUR CUSTOM LIST IS CREATED");
//     });
//   });
// });
