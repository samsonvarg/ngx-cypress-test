describe("Second test suite", () => {
  it("Should - Length Assertion", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=common/home"
    );
    /* Verify the number of categories on the page */
    cy.visit("https://ecommerce-playground.lambdatest.io/");
    cy.get(".navbar-nav.horizontal>li").should("have.length", 6);
    /* Verify the number of top products on the page */
    cy.get(".swiper-wrapper").eq(0).find(">div").should("have.length", 10);
  });
});
