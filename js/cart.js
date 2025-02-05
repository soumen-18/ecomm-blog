
const fetch_cart_product = JSON.parse(localStorage.getItem('cart')) || [];
const products = [];

const cartTable = document.getElementById('cart-product-list');
const loader = document.getElementById('cart-loader');
const cart_update_box = document.getElementById('cart-update-wrap');
const cart_list_form = document.getElementById('cart-list-form')

let cart_item_content = '';

async function fetch_product(item) {
    try{
        loader ? loader.style.display = 'block' : null;

        const fetchItems = await fetch("https://fakestoreapi.com/products");
        const items = await fetchItems.json();
        products.push(...items);

        loader ? loader.style.display = 'none' : null;
        cart_update_box ? cart_update_box.style.display = 'flex' : null;
    } catch(error) {
        console.error('Error fetching products:', error)
    }
}
// Call the function and wait for it to finish
(async () => {
    await fetch_product();
    generate_cart_list();
    product_summary();
})();


// Start - add to cart product functionality
function add_to_cart(product_id) {
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
    update_cart_counter();
}

// Update cart counter in header
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
function generate_cart_list(){

    let cart_item_content = '';

    if(fetch_cart_product.length < 1) {
        cart_item_content += `
            <tr class="not-found">
                <td colspan="6" style="padding: 50px;">
                    <p>Product not available in your Cart</p>
                </td>
            </tr>
        `;
        cart_update_box ? cart_update_box.style.display = 'none' : null;
    }

    fetch_cart_product.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) return;
        
        const total = product.price.toFixed(2) * cartItem.quantity;

        cart_item_content += `
            <tr>
                <td>
                    <a onclick="display_product(${product.id})" class="cart-img-wrap">
                        <img src="${product.image}" class="product-img" width="50"/>
                    </a>
                </td>
                <td>
                    <a onclick="display_product(${product.id})">
                        <h4>${product.title}</h4>
                    </a>
                </td>
                <td>Rs. ${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" name="Quantity" class="quantity-input" data-product-id=${cartItem.id} value="${cartItem.quantity}" min="1">
                </td>
                <td>Rs. ${total.toFixed(2)}</td>
                <td>
                    <button class="icon-round-btn red-btn" onclick="remove_item(${cartItem.id})">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
            <tr class="table-divider">
                <td colspan="6">
                    <div></div>
                </td>
            </tr>
        `;
    });
    if(cartTable) {
        cartTable.innerHTML = cart_item_content;
    }
}
generate_cart_list();

// Start to remove product form cart list
function remove_item(id){
    const index = fetch_cart_product.findIndex(item => item.id === id);
    fetch_cart_product.splice(index, 1);
    if(index !== -1) {
        localStorage.setItem('cart', JSON.stringify(fetch_cart_product));
        generate_cart_list();
        update_cart_counter();
        product_summary();
    }
}

// Start update quantity in cart

if(cart_list_form){
    cart_list_form.addEventListener('submit', function(event) {
        event.preventDefault();
        update_cart_quantity();
        product_summary();
    });
}

function update_cart_quantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const quantityInputs = document.querySelectorAll('.quantity-input');

    quantityInputs.forEach(item => {
        const product_id = parseInt(item.getAttribute('data-product-id')); 
        const new_quantity = parseInt(item.value); 
        
        const cart_item = cart.find(index => index.id === product_id);

        if(cart_item && new_quantity > 0) {
            cart_item.quantity = new_quantity;
            item.value = new_quantity;
        }

    })
    
    localStorage.setItem('cart', JSON.stringify(cart));

    fetch_cart_product.length = 0; // Clear array without breaking old one (referrences)
    fetch_cart_product.push(...cart); 
    
    generate_cart_list();
    update_cart_counter();
    product_summary();
}


// Start product summary functionality
function product_summary() {
    const summary_wrapper = document.getElementById('product-summary');
    let subtotal_price = 0;
    let discount_price = 0;
    let total_price = 0;

    if (!summary_wrapper) return;

    for (let i = 0; i < fetch_cart_product.length; i++) {
        let price = parseFloat(fetch_cart_product[i].price) || 0;
        let quantity = parseInt(fetch_cart_product[i].quantity) || 1;

        subtotal_price += price * quantity;
    }

    total_price = subtotal_price - discount_price;

    summary_wrapper.innerHTML = `
        <li>
            <h4>Subtotal: </h4>
            <p>Rs. <span id="subtotal_price">${subtotal_price.toFixed(2)}</span></p>
        </li>
        <li>
            <h4>Discount: </h4>
            <p>Rs. <span id="discount_price">${discount_price.toFixed(2)}</span></p>
        </li>
        <li class="total-price">
            <h4>Total: </h4>
            <p>Rs. <span id="total_price">${total_price.toFixed(2)}</span></p>
        </li>
    `;
}
