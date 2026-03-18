const fs = require('fs');
const path = require('path');

// Caminho exato para o JSON
const caminhoArquivo = path.join(__dirname, '..', '..', 'data', 'produtos.json');

class Produto {
    // 1. Listar
    static listarTodos() {
        if (!fs.existsSync(caminhoArquivo)) return [];
        const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
        return JSON.parse(dados || "[]");
    }

    // 2. Salvar
    static salvar(produtos) {
        fs.writeFileSync(caminhoArquivo, JSON.stringify(produtos, null, 2));
    }

    // 3. Validação
    static validar(produto) {
        if (!produto.nome || produto.preco <= 0) {
            return "Nome é obrigatório e o preço deve ser maior que zero.";
        }
        return null;
    }

    // 4. Deletar (CORRIGIDO)
    static deletar(id) {
        let produtos = this.listarTodos();
        // Garantimos que a comparação ignore se o ID é texto ou número
        const listaFiltrada = produtos.filter(p => String(p.id) !== String(id));
        
        if (produtos.length === listaFiltrada.length) {
            console.log("Nenhum produto encontrado com o ID:", id);
            return false;
        }

        this.salvar(listaFiltrada);
        return true;
    }
    // Método para atualizar um produto existente
    static atualizar(id, dadosAtualizados) {
        const produtos = this.listarTodos();
        const index = produtos.findIndex(p => String(p.id) === String(id));

        if (index !== -1) {
            // Mantemos o ID original e atualizamos o restante
            produtos[index] = { ...produtos[index], ...dadosAtualizados, id: produtos[index].id };
            this.salvar(produtos);
            return produtos[index];
        }
        return null;
    }
}

module.exports = Produto;