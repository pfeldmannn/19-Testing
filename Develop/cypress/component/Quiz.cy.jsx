//I wasn't able to figure out why this path was not working, but the application is still able to run.
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
    //checks if the button is displayed with the text "Start Quiz"
    cy.get("button").should("have.text", "Start Quiz");
  });
    it("should get a random question and the answer buttons and then render it when the start button is clicked", () => {
        cy.mount(<Quiz />);
        //the start button is clicked
        cy.get("button").click();
        //waits until the application fetches the questions and verifies the response status code
        cy.wait("@getQuestions").its("response.statusCode").should("eq", 200);
        //checks if the question is displayed
        cy.get("h2").should("contain", "Which of the following is a mutable data type in Python?");
        //checks if the answer buttons are displayed
        cy.get("button").should("have.length", 4);
    });
    it("should display the Quiz completed page after the last question is answered", () => {
        cy.mount(<Quiz />);
        //the start qui button is clicked
        cy.get("button").click();
        //waits until the application fetches the questions and verifies the response status code
        cy.wait("@getQuestions").its("response.statusCode").should("eq", 200);
        //the first questions' answer button is clicked
        cy.get("button").eq(0).click();
        //the second questions' answer button is clicked
        cy.get("button").eq(1).click();
        //the third questions' answer button is clicked
        cy.get("button").eq(2).click();
        //then the quiz completed page is displayed
        cy.get("h2").should("contain", "Quiz Completed");
        //the quiz completed page is displayed along with the score
        cy.get("div").should("contain", "Your score:")
        //the quiz completed page is displayed along with the take new quiz button
        cy.get("button").should("have.text", "Take New Quiz");
    })
  });
