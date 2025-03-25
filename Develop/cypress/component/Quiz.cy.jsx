import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/questions/random", (req) => {
      req.reply({
        statusCode: 200,
        fixture: "questions.json",
      });
    }).as("getQuestions");
  });
  it("should initially render with a start button", () => {
    cy.mount(<Quiz />);
    cy.get("button").should("have.text", "Start Quiz");
  });
    it("should get a random question and its answer buttons and then render it when start button is clicked", () => {
        cy.mount(<Quiz />);
        cy.get("button").click();
        cy.wait("@getQuestions").its("response.statusCode").should("eq", 200);
        cy.get("h2").should("contain", "Which of the following is a mutable data type in Python?");
        cy.get("button").should("have.length", 4);
    });
    it("should display the Quiz completed page after the last question is answered", () => {
        cy.mount(<Quiz />);
        cy.get("button").click();
        cy.wait("@getQuestions").its("response.statusCode").should("eq", 200);
        cy.get("button").eq(0).click();
        cy.get("h2").should("contain", "Quiz Completed");
    })
});
