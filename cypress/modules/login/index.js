function acessarPaginaLogin() {
    cy.get('a[href*=login]').click()
}

function logarComCredenciais(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)
    cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginFoiRealizadoComSucesso(nome) {
    cy.get(':nth-child(10) > a').should('contain.text', 'Logged in as ' + nome)
}

function verificarSeLoginFalhou() {
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
}

function efetuarLogout() {
    cy.get('a[href*=logout]').should('be.visible').click()
}

function verificarSeUsuarioFoiDeslogado() {
    cy.get('a[href*=logout]').should('not.exist')
    cy.url().should('include', '/login')
}

module.exports = {
    acessarPaginaLogin,
    logarComCredenciais,
    verificarSeLoginFoiRealizadoComSucesso,
    verificarSeLoginFalhou,
    efetuarLogout,
    verificarSeUsuarioFoiDeslogado
}