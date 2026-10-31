function acessarPaginaProdutos() {
    cy.get('a[href*=products]').first().click()
}

function verificarListaDeProdutos() {
    cy.url().should('include', '/products')
    cy.get('.features_items').should('be.visible')
}

function acessarDetalhesDoPrimeiroProduto() {
    cy.get('.features_items .product-image-wrapper')
        .first()
        .find('a')
        .contains('View Product')
        .click()
}

function verificarDetalhesDoProduto() {
    cy.url().should('include', '/product_details')
    cy.get('.product-information')
        .should('contain', 'Category:')
        .and('contain', 'Availability:')
        .and('contain', 'Condition:')
        .and('contain', 'Brand:')
}

function pesquisarProduto(nome) {
    cy.get('#search_product').type(nome)
    cy.get('#submit_search').click()
}

function verificarResultadosDaPesquisa() {
    cy.get('.title.text-center')
        .should('be.visible')
        .and('contain.text', 'Searched Products')
    cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($product) => {
            cy.wrap($product).should('be.visible')
        })
}

function adicionarPrimeiroProdutoAoCarrinho() {
    cy.get('.features_items .product-image-wrapper')
        .first()
        .find('a')
        .contains('Add to cart')
        .click()
}

function acessarCarrinho() {
    cy.get('#cartModal')
        .should('be.visible')
        .contains('a[href="/view_cart"]', 'View Cart')
        .click()
    cy.url().should('include', '/view_cart')
}

function finalizarCompra() {
    cy.get('.check_out').click()
}

function verificarInformacoesDoCheckout() {
    cy.get('.checkout-information').should('be.visible')
}

function verificarEnderecoERevisaoDoPedido() {
    cy.contains('h2', 'Address Details').should('be.visible')
    cy.contains('h2', 'Review Your Order').should('be.visible')
}

function preencherMensagemDoPedido(mensagem) {
    cy.get('textarea[name=message]').type(mensagem)
}

function acessarPagamento() {
    cy.get('a[href*=payment]').first().click()
}

function preencherDadosDoPagamento(nome) {
    cy.get('input[name=name_on_card]').type(nome)
    cy.get('input[name=card_number]').type('4111111111111111')
    cy.get('input[name=cvc]').type('123')
    cy.get('input[name=expiry_month]').type('12')
    cy.get('input[name=expiry_year]').type('2025')
}

function confirmarPagamento() {
    cy.get('#submit').click()
}

function verificarPedidoRealizadoComSucesso() {
    cy.contains('h2', 'Order Placed!').should('be.visible')
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}

module.exports = {
    acessarPaginaProdutos,
    verificarListaDeProdutos,
    acessarDetalhesDoPrimeiroProduto,
    verificarDetalhesDoProduto,
    pesquisarProduto,
    verificarResultadosDaPesquisa,
    adicionarPrimeiroProdutoAoCarrinho,
    acessarCarrinho,
    finalizarCompra,
    verificarInformacoesDoCheckout,
    verificarEnderecoERevisaoDoPedido,
    preencherMensagemDoPedido,
    acessarPagamento,
    preencherDadosDoPagamento,
    confirmarPagamento,
    verificarPedidoRealizadoComSucesso
}