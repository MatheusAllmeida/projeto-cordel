let cart = {}; // Usar um objeto para gerenciar produtos e suas quantidades

// Função para adicionar produto ao carrinho
function addToCart(productName, productPrice) {
    if (cart[productName]) {
        // Se o produto já existe no carrinho, aumenta a quantidade
        cart[productName].quantity += 1;
    } else {
        // Se não existe, adiciona o produto ao carrinho com quantidade inicial de 1
        cart[productName] = {
            price: productPrice,
            quantity: 1
        };
    }
    alert(`${productName} adicionado ao carrinho!`);
    updateCartModal();
}

// Função para atualizar o modal do carrinho
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Limpa os itens do carrinho
    let total = 0; // Inicializa o total

    // Atualiza os itens no modal do carrinho
    for (const product in cart) {
        const item = cart[product];
        const subtotal = item.price * item.quantity; // Calcula o subtotal
        total += subtotal; // Adiciona ao total

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.textContent = `${item.quantity} x ${product} - R$ ${subtotal.toFixed(2)}`; // Exibe a quantidade e o subtotal
        cartItems.appendChild(listItem);
    }

    document.getElementById('cartTotal').textContent = total.toFixed(2); // Atualiza o total no modal
}

// Função para gerar link de checkout no WhatsApp
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let message = "Olá, gostaria de finalizar meu pedido:\n";
    let total = 0;

    // Gera a mensagem de pedido
    for (const item in cart) {
        const product = cart[item];
        const subtotal = product.price * product.quantity;
        message += `${product.quantity} x ${item} - R$ ${subtotal.toFixed(2)}\n`;
        total += subtotal;
    }

    message += `Total: R$ ${total.toFixed(2)}\n\n`;
    message += "Aguardo as instruções para pagamento.";

    const whatsappNumber = "seunumero"; // Substitua por seu número do WhatsApp
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank"); // Abre o WhatsApp com a mensagem
}

