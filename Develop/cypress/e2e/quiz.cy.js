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
    //the start quiz button is clicked
    cy.get("button").click();
    //the question is displayed 
    cy.get("h2").should("exist");
  });
  it("should show the next question when an answer button is clicked", () => {
    //start quiz button is clicked
    cy.get("button").click();
    //then the first questions' answer button is clicked
    cy.get("button").eq(0).click();
    //then the next question is displayed
    cy.get("h2").should("exist");
  });
  it("should show the quiz completed page when the last question is answered", () => {
    //the start quiz button is clicked
    cy.get("button").click();
    //the first questions' answer button is clicked
    cy.get("button").eq(0).click();
    //the second questions' answer button is clicked
    cy.get("button").eq(0).click();
    //the third questions' answer button is clicked
    cy.get("button").eq(0).click();
    //then the quiz completed page is displayed
    cy.get("h2").should("contain", "Quiz Completed");
  });
  it("should show the first question when the take new quiz button is clicked", () => {
    //the start quiz button is clicked
    cy.get("button").click();
    //the first questions' answer button is clicked
    cy.get("button").eq(0).click();
    //the second questions' answer button is clicked
    cy.get("button").eq(0).click();
    //the third questions' answer button is clicked
    cy.get("button").eq(0).click();
    //the quiz completed page is displayed along with the take new quiz button and the button is clicked
    cy.get("button").click();
    //then the first question is displayed again
    cy.get("h2").should("exist");
  })
    
});

