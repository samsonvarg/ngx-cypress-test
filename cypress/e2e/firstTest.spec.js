//This enables intelli sense about cypress commands
/// <reference types="cypress" />

describe("First test suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
  });
  it("First test", () => {
    //by tag name
    cy.get("input");

    //by ID
    cy.get("#inputEmail");

    //by class
    cy.get(".input-full-width");

    //by attribute name
    cy.get("[fullwidth]");

    //by attribute and value
    cy.get('[placeholder="Email"]');

    //by entire class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by two attributes
    cy.get('[fullwidth][placeholder="Email"]');

    //by tag, ID, attribute and class
    cy.get("input#inputEmail[fullwidth].input-full-width");

    //by cypress test ID
    cy.get('[data-cy="imputEmail1"]');
  });

  it("Second test", () => {
    /**
     * cy.get() - finds elements on the page by locator GLOBALLY (even when it is chained)
     * cy.contains() - finds elements on the page by 'HTML text' / 'Locator & HTML text', finds elements locally
     * cy.find() - finds child elements. Should be chained to cy.get() or cy.contains().
     */
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains('[status="warning"]', "sigN iN", { matchCase: false });
    cy.contains("nb-card", "Horizontal form").find('[status="warning"]');
    cy.contains("nb-card", "Horizontal form").contains("Sign in");
    cy.get("nb-card").find("button");
    cy.get("nb-card").contains("button", "Sign in");

    // Chains & DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });

  it("Save subject of the command", () => {
    /*     let usingTheGrid = cy.contains('nb-card', 'Using the Grid');
    usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
    usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password'); */

    //1. Using alias
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    //2. Using then() & wrap() methods
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGridForm)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });

  it("Extract and verify text values", () => {
    //1. Using should('contain') method
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2. Using text() method
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      // Or
      cy.wrap(labelText).should("contain", "Email address");
    });

    //3. Using invoke() method
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    //4. Check attr. value using invoke() method
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });

    //**** IMPORTANT *****
    //5. Check typed value using invoke() method
    cy.get("#exampleInputEmail1")
      .type("email@email.com")
      .invoke("prop", "value")
      .then((email) => {
        expect(email).to.equal("email@email.com");
      });
  });

  it("Radio buttons", () => {
    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        //Check 1st radio button and verify whether it is checked
        //Use {force: true} when the elements are "visually hidden"
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        //Check 2nd radio button and verify whether 1st one is unchecked
        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
      });
  });

  it("Checkboxes", () => {
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();
    cy.get('[type="checkbox"]').then((checkboxes) => {
      // cy.wrap(checkboxes).check({ force: true }); //check all checkboxes at once
      cy.wrap(checkboxes).eq(0).check();
      cy.wrap(checkboxes).eq(0).uncheck({ force: true });
      cy.wrap(checkboxes).eq(2).click({ force: true }); //can use .click() also
    });
    cy.get('[type="checkbox"]').eq(0).check({ force: true });
  });

  it.only("Date pickers", () => {
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 20);
    let futureDate = date.getDate();
    let dateToAssert = `Nov ${futureDate}, 2024`;

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((datePicker) => {
        cy.wrap(datePicker).click();
        cy.get(".day-cell")
          .not(".bounding-month")
          .contains(`${futureDate}`)
          .click();
        //Assert using invoke() method
        cy.wrap(datePicker)
          .invoke("prop", "value")
          .should("contain", dateToAssert);
        //Or by using should('have.value', ...) method
        cy.wrap(datePicker).should("have.value", dateToAssert);
      });
  });
});
