const express = require('express');
const path = require('path');
const cors = require('cors');

const express = require('express');
const app = express();
const PORT = 3000;

// Esta é a linha mágica que você adicionou:
app.use(express.static('public')); 

app.use(express.json()); // Para o servidor entender quando você envia dados JSON

// 1. Middlewares (Configurações básicas)
app.use(cors());
app.use(express.json()); // Essencial para o formulário de cadastro funcionar
app.use(express.static(path.join(__dirname, 'src', 'public'))); // Entrega o index.html e script.js

// 2. Importação das Rotas
// Importante: O caminho deve bater com a pasta que criamos
const produtoRoutes = require(path.join(__dirname, 'src', 'routes', 'produtoRoutes'));

// 3. Definição das Rotas da API
// É aqui que o erro 404 é resolvido. O endereço será: http://localhost:3000/api/produtos
app.use('/api/produtos', produtoRoutes);

// 4. Rota principal para carregar o Front-end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// 5. Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`
    ✅ Rotas de produtos carregadas com sucesso!
    
    🚀 ==========================================
       VendaSync Evolution - Sistema Iniciado!
       📍 Servidor: http://localhost:3000
       📂 Pasta Base: ${__dirname}
       ========================================== 🚀
    `);
});