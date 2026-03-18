const Produto = require('../models/produtoModel');

// 1. Listar todos os produtos
exports.getProdutos = (req, res) => {
    const produtos = Produto.listarTodos();
    res.json(produtos);
};

// 2. Criar um novo produto
exports.criarProduto = (req, res) => {
    const novoProduto = req.body;
    
    // Aplicando a validação
    const erro = Produto.validar(novoProduto);
    if (erro) return res.status(400).json({ message: erro });

    const produtos = Produto.listarTodos();
    novoProduto.id = Date.now(); // Gera um ID único
    produtos.push(novoProduto);
    Produto.salvar(produtos);
    
    res.status(201).json(novoProduto);
};

// ... (mantenha o getProdutos e criarProduto como estão)

exports.deletarProduto = (req, res) => {
    const { id } = req.params;
    const sucesso = Produto.deletar(id);
    
    if (sucesso) {
        res.json({ message: "Produto removido com sucesso!" });
    } else {
        res.status(404).json({ message: "Erro: Produto não encontrado." });
    }
}; // <-- FECHA AQUI O DELETAR

exports.atualizarProduto = (req, res) => { // <-- AGORA O ATUALIZAR ESTÁ LIVRE
    const { id } = req.params;
    const dadosNovos = req.body;
    
    const produtoAtualizado = Produto.atualizar(id, dadosNovos);
    
    if (produtoAtualizado) {
        res.json(produtoAtualizado);
    } else {
        res.status(404).json({ message: "Produto não encontrado para atualização." });
    }
};