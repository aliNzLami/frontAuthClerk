describe('template spec', () => {

    it('page: backend works', () => {
      cy.visit('http://localhost:3000/frontAuthClerk#/login')
      cy.get(`[data-testid='title']`)
      .should('exist');
    })
  
    it('img must not be empty', () => {
      cy.visit('http://localhost:3000/frontAuthClerk#/login')
  
      cy.get(`[data-testid="img"]`)
      .should('exist');
  
      cy.get(`[data-testid="img"]`)
      .should('have.attr', 'src')
      .and('not.be.empty');
    })
  
    it('inputs must exist', () => {
      cy.visit('http://localhost:3000/frontAuthClerk#/login')
  
      cy.get('input').each(($input) => {
        cy.wrap($input).should('be.visible');
      });
    })
  
    it('buttons must exist', () => {
      cy.visit('http://localhost:3000/frontAuthClerk#/login')
  
      cy.get('button').each(($button) => {
        cy.wrap($button).should('be.visible');
      });
    })

    it('click on signUp button, goes to sign up page', () => {
        cy.visit('http://localhost:3000/frontAuthClerk#/login')

        cy.get(`[data-testid='loginPage_signUpBtn']`).click();
        cy.url().should('include', '/register');
        cy.contains('Create Account').should('be.visible');
    })
  })