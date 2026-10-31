function acessarAreaAssinatura() {
    cy.get('footer').scrollIntoView()
    cy.get('.single-widget h2').should('contain', 'Subscription')
}

function assinar(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
}

function verificarAssinaturaRealizadaComSucesso() {
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
}

module.exports = {
    acessarAreaAssinatura,
    assinar,
    verificarAssinaturaRealizadaComSucesso
}
