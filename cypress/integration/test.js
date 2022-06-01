before(() => {
  cy.task("resetDb");
});

describe("Sign Up actions", () => {
  it("user can navigate to Sign Up page from home page", () => {
    cy.visit("/");
    cy.get("#sign-up-link").click();
    cy.url().should("include", "/sign-up");
  });

  it("user is redirected to Dishboard page with a stored cookie after sign up", () => {
    cy.get("form").find("input[name='email']").type("email@gmail.com");
    cy.get("form").find("input[name='password']").type("password1");
    cy.get("form").find("button[type='submit']").click();
    cy.url().should("include", "/posts");
  });
});

describe("Login actions", () => {
  it("home page shows login form", () => {
    cy.visit("/");
    cy.get("#login-form");
  });

  it("user is redirected to Dishboard page with a stored cookie after login", () => {
    cy.get("form").find("input[name='email']").type("email@gmail.com");
    cy.get("form").find("input[name='password']").type("password1");
    cy.get("form").find("button[type='submit']").click();
    cy.url().should("include", "/posts");
  });

  /*   it("user access to Dishboard is denied without cookie", () => {
    cy.visit("/");
    cy.clearCookies();
    cy.visit("/posts").find("a").should("include", "Log");
  }); */
});

describe("Add post actions", () => {
  it("user can fill out and submit a post, browser redirects to root Dishboard", () => {
    cy.visit("/add-post");
    cy.get("form").find("input[name='dish']").type("Fish Pie");
    cy.get("form").find("input[value='recipeURL']").check();
    cy.get("form").find("input[name='recipeURL']").type("http://fishpie.com");
    cy.get("form")
      .find("input[name='joke']")
      .type(
        "Thought I could put dolphin in my fish pie. Until I noticed I was using all porpoise flour."
      );
    cy.get("form").find("button[type='submit']").click();
    cy.url().should("include", "/posts");
  });

  /*   it("browser redirects to root Dishboard", () => {
    cy.visit("/posts");
  }); */
});

describe("Show posts", () => {
  it("user can see the new post on Dishboard", () => {
    cy.visit("/posts");
  });

  it("user can delete their posts", () => {
    cy.visit("/posts");
  });
});

after(() => {
  cy.task("resetDb");
});
