document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
    setupCartForm();
});

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Precio: $${product.price}</p>
            <p>Descripción: ${product.description}</p>
            <p>Categoría: ${product.category}</p>
        `;
        productList.appendChild(productDiv);
    });
}

function setupCartForm() {
    const cartForm = document.getElementById('cartForm');
    const cartCount = document.getElementById('cartCount');
    let itemCount = 0;

    cartForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const product = document.getElementById('producto').value.trim();
        const quantity = parseInt(document.getElementById('cantidad').value.trim(), 10);

        if (product === '' || isNaN(quantity) || quantity <= 0) {
            alert('Por favor, ingresa un producto válido y una cantidad mayor a cero.');
            return;
        }

        itemCount += quantity;
        cartCount.textContent = itemCount;
        cartForm.reset();
    });
}
