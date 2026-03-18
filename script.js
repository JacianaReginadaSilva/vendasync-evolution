let products = [];
let selectedPrice = 0;

// 1. Carregar produtos do servidor (API)
async function carregarProdutosDoServidor() {
    try {
        const response = await fetch('/api/produtos');
        if (!response.ok) throw new Error('Erro na rede');
        products = await response.json();
        renderCatalog();
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        const container = document.getElementById('catalog-container');
        if (container) container.innerHTML = "<p class='text-red-400 text-center py-10'>Erro ao conectar com o servidor.</p>";
    }
}

// 2. Renderizar Catálogo
function renderCatalog() {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    
    document.getElementById('items-count').textContent = `${products.length} itens no sistema`;

    container.innerHTML = products.map(product => `
        <div class="product-card glass-card p-6 rounded-[2rem] flex items-center justify-between transition-all cursor-pointer group border-2 border-transparent"
             onclick="selectProduct(${product.preco}, this)">
            <div class="flex items-center gap-4">
                <div class="bg-slate-800 p-4 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                    <i class="fas fa-${product.icone || 'box'} text-slate-500 group-hover:text-emerald-400"></i>
                </div>
                <div>
                    <h4 class="font-bold text-slate-100">${product.nome}</h4>
                    <p class="text-[9px] text-slate-500 font-black uppercase tracking-widest">${product.categoria}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="text-right mr-2">
                    <span class="block text-lg font-bold text-emerald-400">R$ ${Number(product.preco).toFixed(2)}</span>
                </div>
                
                <button onclick="event.stopPropagation(); editarPreco(${product.id}, '${product.nome}')" 
                        class="text-slate-600 hover:text-blue-500 p-2 transition-colors" title="Editar Preço">
                    <i class="fas fa-edit"></i>
                </button>

                <button onclick="event.stopPropagation(); excluirProduto(${product.id})" 
                        class="text-slate-600 hover:text-red-500 p-2 transition-colors" title="Excluir Produto">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// 3. Seleção e Cálculos da Calculadora
function selectProduct(price, element) {
    document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected-card'));
    element.classList.add('selected-card');
    selectedPrice = price;
    updateTotals();
}

function updateTotals() {
    const subtotal = selectedPrice;
    const discountInput = document.getElementById('discount-input');
    const discountPercent = discountInput ? (parseFloat(discountInput.value) || 0) : 0;
    const total = subtotal - (subtotal * discountPercent / 100);

    const subLabel = document.getElementById('subtotal-val');
    const totLabel = document.getElementById('total-val');
    
    if (subLabel) subLabel.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (totLabel) totLabel.textContent = `R$ ${total.toFixed(2)}`;
}

// 4. Cadastro de novo produto (Formulário)
const form = document.getElementById('form-produto');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const novo = {
            nome: document.getElementById('nome').value,
            preco: parseFloat(document.getElementById('preco').value),
            categoria: document.getElementById('categoria').value,
            icone: "box"
        };

        try {
            const response = await fetch('/api/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novo)
            });
            
            if (response.ok) {
                form.reset();
                carregarProdutosDoServidor();
            }
        } catch (err) {
            alert("Erro ao salvar produto.");
        }
    });
}

// 5. Função de Excluir
async function excluirProduto(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
        const response = await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
        if (response.ok) {
            carregarProdutosDoServidor();
        } else {
            alert("Erro ao excluir o produto.");
        }
    } catch (error) {
        console.error("Erro ao excluir:", error);
    }
}

// 6. Função de Editar Preço (UPDATE)
async function editarPreco(id, nomeAtual) {
    const novoPreco = prompt(`Digite o novo preço para: ${nomeAtual}`);
    
    if (novoPreco === null || novoPreco === "" || isNaN(novoPreco)) return;

    try {
        const response = await fetch(`/api/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ preco: parseFloat(novoPreco) })
        });

        if (response.ok) {
            carregarProdutosDoServidor();
        }
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
}

// 7. Finalizar Pedido
window.finalizar = function() {
    if(selectedPrice === 0) return alert("Por favor, selecione um produto primeiro!");
    const toast = document.getElementById('toast');
    if(toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', carregarProdutosDoServidor);

// --- LÓGICA DE BUSCA DE CEP (BRASIL API) ---
const cepField = document.getElementById('cep-field');
const apiResult = document.getElementById('api-result');

if (cepField) {
    cepField.addEventListener('blur', async () => {
        const cep = cepField.value.replace(/\D/g, ''); 
        
        if (cep.length !== 8) {
            apiResult.textContent = "CEP inválido (digite 8 números).";
            return;
        }

        apiResult.textContent = "Buscando endereço...";

        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
            if (!response.ok) throw new Error('Não encontrado');
            const data = await response.json();
            
            apiResult.innerHTML = `
                <span class="text-emerald-400 font-bold">Endereço Encontrado:</span><br>
                ${data.street || 'Rua não informada'}, ${data.neighborhood || ''}<br>
                ${data.city} - ${data.state}
            `;
        } catch (error) {
            apiResult.textContent = "Erro ao buscar CEP ou não encontrado.";
            console.error("Erro na API de CEP:", error);
        }
    });
} // <--- FECHA AQUI A LÓGICA DO CEP

// --- LÓGICA PARA ATUALIZAR O DESCONTO EM TEMPO REAL ---
const discountInput = document.getElementById('discount-input');

if (discountInput) {
    // Escuta a digitação no campo de desconto
    discountInput.addEventListener('input', () => {
        updateTotals();
    });
}