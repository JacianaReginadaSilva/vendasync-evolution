const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para LISTAR (GET)
router.get('/', produtoController.getProdutos);

// Rota para CRIAR (POST)
router.post('/', produtoController.criarProduto);

// ROTA PARA DELETAR (DELETE) - Verifique se tem o "/:id"
// O erro 404 ocorre se você esquecer os dois pontos ":" ou a barra "/"
router.delete('/:id', produtoController.deletarProduto);

// Rota para ATUALIZAR (PUT)
router.put('/:id', produtoController.atualizarProduto);

module.exports = router;