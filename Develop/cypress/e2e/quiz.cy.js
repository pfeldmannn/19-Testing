describe("<Quiz />", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
    cy.intercept("GET", "/api/questions/random", (req) => {
      req.reply({
        statusCode: 200,
        fixture: "questions.json",
      });
    }).as("getQuestions");
  });
  it("should show first question when the start quiz button is clicked", () => {
    
    cy.get("button").click();
    cy.get("h2").should("exist");
  });
  it("should show the next question when an answer button is clicked", () => {
    cy.get("button").click();
    cy.get("button").eq(0).click();
    cy.get("h2").should("exist");
  });
  it("should show the quiz completed page when the last question is answered", () => {
    cy.get("button").click();
    cy.get("button").eq(0).click();
    cy.get("button").eq(0).click();
    cy.get("h2").should("contain", "Quiz Completed");
  });
  it("should show the first question when the restart button is clicked", () => {
    cy.get("button").click();
    cy.get("button").eq(0).click();
    cy.get("button").eq(0).click();
    cy.get("button").click();
    cy.get("h2").should("exist");
  })
    
});

