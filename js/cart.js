
const cartTable = document.getElementById('cart-product-list');
const fetch_cart_product = JSON.parse(localStorage.getItem('cart')) || [];
let cart_item_content = '';
const products = [];

async function fetch_product(item) {
    try{
        const fetchItems = await fetch("https://fakestoreapi.com/products");
        const items = await fetchItems.json();
        products.push(...items);
    } catch(error) {
        console.error('Error fetching products:', error)
    }
}
// Call the function and wait for it to finish
(async () => {
    await fetch_product();
    console.log('Products after fetch:', products);
})();



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


// Start to Display cart items in table

for(i = 0; i < fetch_cart_product.length; i++) {
    cart_item_content+= `
        <tr>
            <td>
                <a href="#">
                    <img src="./images/blog-1.jpg" class="product-img" />
                </a>
            </td>
            <td>
                <a href="#">
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam expedita odit dolore quia cumque nisi blanditiis corporis quaerat aperiam maiores nam, fugiat optio delectus doloremque minus laudantium explicabo numquam voluptatem.</p>
                </a>
            </td>
            <td>Rs. 120</td>
            <td>
                <input type="number" name="Quantity" class="quantity-input" id="quantity-input">
            </td>
            <td>Rs. 360</td>
            <td>
                <button class="icon-round-btn red-btn">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </td>
        </tr>
    `;
}
cartTable.innerHTML = cart_item_content;
