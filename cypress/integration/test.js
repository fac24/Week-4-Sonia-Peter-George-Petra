describe("homepage tests", () => {
  beforeEach(() => {
    cy.task("resetDb");
  });
  it("can find homepage", () => {
    cy.visit("/");
  });

  it("can find title on home page", () => {
    cy.visit("/");
    cy.get("h1").contains("hello world");
  });
  after(() => {
    cy.task("resetDb");
  });
});
