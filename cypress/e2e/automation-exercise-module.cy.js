import { novoUsuario } from '../factories/userFactory'
const cadastro = require('../modules/cadastro/index')
const login = require('../modules/login/index')
const produtos = require('../modules/produtos/index')
const assinatura = require('../modules/assinatura/index')

const usuarioValido = novoUsuario();

describe('Automation Exercise', () => {
    before(() => {
        cy.visit('/')
        cadastro.acessarPaginaCadastro()
        cadastro.iniciarCadastro(usuarioValido.nome, usuarioValido.email)
        cadastro.preencherCadastro(usuarioValido.nome, usuarioValido.senha)
        cadastro.finalizarCadastro()
        cadastro.verificarSeCadastroFoiRealizadoComSucesso(usuarioValido.nome)
        login.efetuarLogout()
        login.verificarSeUsuarioFoiDeslogado()
    })

    it('01 - Cadastrar um novo usuário com sucesso', () => {
        const usuario = novoUsuario();
        cy.visit('/')
        cadastro.acessarPaginaCadastro()
        cadastro.iniciarCadastro(usuario.nome, usuario.email)
        cadastro.preencherCadastro(usuario.nome, usuario.senha)
        cadastro.finalizarCadastro()
        cadastro.verificarSeCadastroFoiRealizadoComSucesso(usuario.nome)
        cadastro.excluirConta()
        cadastro.verificarSeContaFoiExcluida()
    })

    it('02 - Logar com credenciais válidas', () => {
        cy.visit('/')
        login.acessarPaginaLogin()
        login.logarComCredenciais(usuarioValido.email, usuarioValido.senha)
        login.verificarSeLoginFoiRealizadoComSucesso(usuarioValido.nome)
    })

    it('03 - Logar com credenciais inválidas', () => {
        cy.visit('/')
        login.acessarPaginaLogin()
        login.logarComCredenciais('incorrect@example.com', 'wrongpassword')
        login.verificarSeLoginFalhou()
    })

    it('04 - Logar e sair da conta', () => {
        cy.visit('/')
        login.acessarPaginaLogin()
        login.logarComCredenciais(usuarioValido.email, usuarioValido.senha)
        login.verificarSeLoginFoiRealizadoComSucesso(usuarioValido.nome)
        login.efetuarLogout()
        login.verificarSeUsuarioFoiDeslogado()
    })

    it('05 - Cadastrar usuário com email já existente', () => {
        cy.visit('/')
        cadastro.acessarPaginaCadastro()
        cadastro.iniciarCadastro(usuarioValido.nome, usuarioValido.email)
        cadastro.verificarSeIniciarCadastroFalhou()
    })

    it('08 - Verificar produtos e detalhes do produto', () => {
        cy.visit('/')
        produtos.acessarPaginaProdutos()
        produtos.verificarListaDeProdutos()
        produtos.acessarDetalhesDoPrimeiroProduto()
        produtos.verificarDetalhesDoProduto()
    })

    it('09 - Pesquisar produto', () => {
        cy.visit('/')
        produtos.acessarPaginaProdutos()
        produtos.verificarListaDeProdutos()
        produtos.pesquisarProduto('Dress')
        produtos.verificarResultadosDaPesquisa()
    })

    it('10 - Verificar assinatura na página inicial', () => {
        cy.visit('/')
        assinatura.acessarAreaAssinatura()
        assinatura.assinar(usuarioValido.email)
        assinatura.verificarAssinaturaRealizadaComSucesso()
    })

    it('15 - Finalizar pedido: cadastrar-se antes de finalizar a compra.', () => {
        const usuario = novoUsuario();
        cy.visit('/')
        cadastro.acessarPaginaCadastro()
        cadastro.iniciarCadastro(usuario.nome, usuario.email)
        cadastro.preencherCadastro(usuario.nome, usuario.senha)
        cadastro.finalizarCadastro()
        cadastro.verificarSeCadastroFoiRealizadoComSucesso(usuario.nome)
        produtos.adicionarPrimeiroProdutoAoCarrinho()
        produtos.acessarCarrinho()
        produtos.finalizarCompra()
        produtos.verificarEnderecoERevisaoDoPedido()
        produtos.verificarInformacoesDoCheckout()
        produtos.preencherMensagemDoPedido('Please deliver between 9 AM and 5 PM.')
        produtos.acessarPagamento()
        produtos.preencherDadosDoPagamento(usuario.nome)
        produtos.confirmarPagamento()
        produtos.verificarPedidoRealizadoComSucesso()
        cadastro.excluirConta()
        cadastro.verificarSeContaFoiExcluida()
    })

    it('16 - Finalizar pedido: logar-se antes de finalizar a compra.', () => {
        cy.visit('/')
        login.acessarPaginaLogin()
        login.logarComCredenciais(usuarioValido.email, usuarioValido.senha)
        login.verificarSeLoginFoiRealizadoComSucesso(usuarioValido.nome)
        produtos.adicionarPrimeiroProdutoAoCarrinho()
        produtos.acessarCarrinho()
        produtos.finalizarCompra()
        produtos.verificarInformacoesDoCheckout()
        produtos.preencherMensagemDoPedido('Please deliver between 9 AM and 5 PM.')
        produtos.acessarPagamento()
        produtos.preencherDadosDoPagamento(usuarioValido.nome)
        produtos.confirmarPagamento()
        produtos.verificarPedidoRealizadoComSucesso()
        login.efetuarLogout()
        login.verificarSeUsuarioFoiDeslogado()
    })
})