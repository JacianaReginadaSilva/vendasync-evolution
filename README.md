🚀 VendaSync Evolution - Sistema de Gestão de Vendas
O VendaSync Evolution é uma aplicação web completa para gestão de produtos e vendas, desenvolvida com foco em arquitetura limpa (MVC) e uma interface moderna (Glassmorphism). O sistema permite o gerenciamento total de itens através de uma API robusta e persistência de dados em tempo real.

🛠️ Tecnologias Utilizadas
Backend: Node.js com Framework Express.

Arquitetura: MVC (Model-View-Controller).

Frontend: HTML5, CSS3 (Tailwind CSS) e JavaScript Vanilla.

Persistência: Arquivo JSON para armazenamento de dados (NoSQL style).

Ícones: Font Awesome 6.0.

Protocolo: API RESTful (GET, POST, PUT, DELETE).

✨ Funcionalidades (CRUD)
Cadastrar (Create): Adição de novos produtos com validação de nome, preço e categoria.

Listar (Read): Visualização dinâmica do catálogo de produtos consumindo a API.

Atualizar (Update): Edição rápida de preços diretamente pela interface.

Excluir (Delete): Remoção de produtos com confirmação de segurança.

Calculadora de Vendas: Seleção de produtos com cálculo de subtotal e aplicação de descontos em tempo real.

📁 Estrutura do Projeto
Plaintext
vendas_app.html/
├── src/
│   ├── controllers/
│   │   └── produtoController.js   # Lógica das rotas
│   ├── models/
│   │   └── produtoModel.js        # Lógica de dados (JSON)
│   ├── routes/
│   │   └── produtoRoutes.js       # Definição dos endpoints
│   └── public/
│       ├── index.html             # Interface do usuário
│       └── script.js              # Lógica do Frontend
├── data/
│   └── produtos.json              # "Banco de dados" do sistema
├── server.js                      # Inicialização do servidor Node.js
└── package.json                   # Dependências do projeto
🚀 Como Executar o Projeto
Certifique-se de ter o Node.js instalado.

Abra o terminal na pasta raiz do projeto.

Execute o comando:

Bash
node server.js
Acesse no seu navegador: http://localhost:3000

👩‍💻 Desenvolvido por:
J. Regina da Silva Projeto Acadêmico - Terceiro Semestre