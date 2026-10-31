function acessarPaginaCadastro() {
    // cy.get('a[href*=login]').click()
    cy.visit('/login')
    cy.get('[data-qa="signup-name"]').should('be.visible')
}

function iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
}
function preencherCadastro(nome, senha) {
    cy.get('#id_gender2').check()

    cy.get('#password').type(senha)
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('1990')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('[data-qa="first_name"]').type(nome.split(' ')[0])
    cy.get('[data-qa="last_name"]').type(nome.split(' ')[1])
    cy.get('[data-qa="company"]').type('PGATS')
    cy.get('[data-qa="address"]').type('123 Main St')
    cy.get('[data-qa="address2"]').type('p1')
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('New York')
    cy.get('[data-qa="city"]').type('New York')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('+1-123-456-7890')
}

function finalizarCadastro() {
    cy.get('[data-qa="create-account"]').click()
}

function verificarSeCadastroFoiRealizadoComSucesso(nome) {
    cy.contains('b', 'Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('contain.text', 'Logged in as ' + nome)
}

function verificarSeIniciarCadastroFalhou() {
    cy.contains('p', 'Email Address already exist!').should('be.visible')
}

function excluirConta() {
    cy.get('a[href*=delete_account]').click()
}

function verificarSeContaFoiExcluida() {
    cy.contains('b', 'Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
}

module.exports = {
    acessarPaginaCadastro,
    iniciarCadastro,
    preencherCadastro,
    finalizarCadastro,
    verificarSeCadastroFoiRealizadoComSucesso,
    verificarSeIniciarCadastroFalhou,
    excluirConta,
    verificarSeContaFoiExcluida
}