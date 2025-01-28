
function add_to_cart(product_id) {
    // Get the cart from localStorage or initialize it
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const productInCart = cart.find(item => item.id === product_id);

    if (productInCart) {
        // Increment quantity if product already exists
        productInCart.quantity += 1;
    } else {
        // Add new product to cart
        fetch(`https://fakestoreapi.com/products/${product_id}`)
            .then(response => response.json())
            .then(product => {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                });

                // Save the updated cart to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));

                // Optionally update the cart UI (e.g., update cart counter)
                update_cart_counter();
            })
            .catch(error => console.error('Error adding product to cart:', error));
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart counter (example)
function update_cart_counter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Ensure the cart counter element exists before updating
    const cartCounterElement = document.querySelector('.headerCart span');
    if (cartCounterElement) {
        cartCounterElement.innerText = totalItems;
    }
}

// Call update_cart_counter on page load
document.addEventListener('DOMContentLoaded', () => {
    update_cart_counter();
});