
const fetch_final_product = JSON.parse(localStorage.getItem('cart')) || [];
const products_list = [];

const checkout_table = document.getElementById('checkout-product-list');
const checkout_loader = document.getElementById('checkout-loader');
// const cart_update_box = document.getElementById('cart-update-wrap');
const checkout_list_form = document.getElementById('checkout-list-form')

let checkout_item_content = '';

async function fetch_product(item) {
    try{
        checkout_loader ? checkout_loader.style.display = 'block' : null;

        const fetchItems = await fetch("https://fakestoreapi.com/products");
        const items = await fetchItems.json();
        products_list.push(...items);

        checkout_loader ? checkout_loader.style.display = 'none' : null;
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

// Call update_cart_counter on page load
document.addEventListener('DOMContentLoaded', () => {
    update_cart_counter();
});

// Start to Display cart items in table
function generate_cart_list(){

    let checkout_item_content = '';

    if(fetch_final_product.length < 1) {
        checkout_item_content += `
            <tr class="not-found">
                <td colspan="6" style="padding: 50px;">
                    <p>Product not available in your Cart</p>
                </td>
            </tr>
        `;
        cart_update_box ? cart_update_box.style.display = 'none' : null;
    }

    fetch_final_product.forEach(cartItem => {
        const product = products_list.find(p => p.id === cartItem.id);
        if (!product) return;
        
        const total = product.price.toFixed(2) * cartItem.quantity;

        checkout_item_content += `
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
                    <p>Rs. ${product.price.toFixed(2)} * ${cartItem.quantity}</p>
                </td>
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
    if(checkout_table) {
        checkout_table.innerHTML = checkout_item_content;
    }
}
generate_cart_list();

// Start to remove product form cart list
function remove_item(id){
    const index = fetch_final_product.findIndex(item => item.id === id);
    fetch_final_product.splice(index, 1);
    if(index !== -1) {
        localStorage.setItem('cart', JSON.stringify(fetch_final_product));
        generate_cart_list();
        update_cart_counter();
        product_summary();
    }
}

// Start update quantity in cart

if(checkout_list_form){
    checkout_list_form.addEventListener('submit', function(event) {
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

    fetch_final_product.length = 0; // Clear array without breaking old one (referrences)
    fetch_final_product.push(...cart); 
    
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

    for (let i = 0; i < fetch_final_product.length; i++) {
        let price = parseFloat(fetch_final_product[i].price) || 0;
        let quantity = parseInt(fetch_final_product[i].quantity) || 1;

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
