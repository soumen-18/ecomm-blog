
const order_list = JSON.parse(localStorage.getItem('final_order')) || [];
const order_list_wrap = document.getElementById('orders-list');


console.log('order_list', order_list);

// document.addEventListener('DOMContentLoaded', () => {
//     update_cart_counter();
// });

(async () => {
    await fetchAllProducts();
    renderOrders();  // Call function AFTER fetching
})();

function renderOrders() {
    let order_content = '';
    let paid_by = '';

    console.log('allProducts', allProducts)

    if (!order_list || order_list.length === 0){
        order_content += `
            <tr class="not-found">
                <td colspan="5" style="padding: 50px;">
                    <p>You don't have any order</p>
                </td>
            </tr>
        `;
    }

    for(i = 0; i < order_list.length; i++) {

        paid_by = order_list[i].payment.cash ? 'Cash on Delivery' : 'Paid by Card';
        let card_info = order_list[i].payment.card 
            ? `<strong>Card Holder:</strong> ${order_list[i].payment.card.name}<br />
                <strong>Card Number:</strong> ${order_list[i].payment.card.number}<br />`
            : '';

        // Generate product list
        let productList = order_list[i].order_items.map(item => {
            let product = allProducts.find(p => p.id === item.id);
            let productImage = product ? product.image : '';

            return `
                <li class="product-details">
                    <a href="#" onclick="display_product(${item.id})">
                        <img src="${productImage}" alt="${item.title}" width="50" height="50">
                    </a>
                    <div>
                        <a href="#" onclick="display_product(${item.id})">${item.title}</a><br /><br />
                        <strong>QTY:</strong> ${item.quantity}, <strong>Price:</strong> ${item.price} <br />
                    </div>
                </li>
            `;
        }).join('');

        
        if(order_list.length > 0) {
            order_content += `
                <tr>
                    <td>${order_list[i].date}</td>
                    <td>${order_list[i].order_id}</td>
                    <td>
                        <ul class="list-style">
                            ${productList}
                            <li><strong>Total Price:</strong> ${order_list[i].price}</li>
                        </ul>
                    </td>
                    <td>
                        <strong>Name:</strong> ${order_list[i].name} <br />
                        <strong>Email:</strong> ${order_list[i].email} <br />
                        <strong>Phone:</strong> ${order_list[i].phone} <br />
                        <strong>Address:</strong> ${order_list[i].address} <br />
                    </td>
                    <td>
                        <span>${paid_by}</span><br /><br />
                        <span>${card_info}</span>
                    </td>
                </tr>
            `;
        }
    }
    order_list_wrap.innerHTML = order_content;
}