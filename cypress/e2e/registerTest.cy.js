describe('template spec', () => {

  it('page: backend works', () => {
    cy.visit('http://localhost:3000/frontAuthClerk#/register')
    cy.get(`[data-testid='title']`)
    .should('exist');
  })

  it('img must not be empty', () => {
    cy.visit('http://localhost:3000/frontAuthClerk#/register')

    cy.get(`[data-testid="img"]`)
    .should('exist');

    cy.get(`[data-testid="img"]`)
    .should('have.attr', 'src')
    .and('not.be.empty');
  })

  it('inputs must exist', () => {
    cy.visit('http://localhost:3000/frontAuthClerk#/register')

    cy.get('input').each(($input) => {
      cy.wrap($input).should('be.visible');
    });
  })

  it('buttons must exist', () => {
    cy.visit('http://localhost:3000/frontAuthClerk#/register')

    cy.get('button').each(($button) => {
      cy.wrap($button).should('be.visible');
    });
  })

  it('click on login button, goes to login page', () => {
    cy.visit('http://localhost:3000/frontAuthClerk#/register')

    cy.get(`[data-testid='registerPage_loginBtn']`).click();
    cy.url().should('include', '/login');
    cy.contains('Login').should('be.visible');
  })
})