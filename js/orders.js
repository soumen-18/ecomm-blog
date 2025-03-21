
const order_list = JSON.parse(localStorage.getItem('final_order')) || [];
// const order_list_wrap = document.getElementById('order-product-list');


// document.addEventListener('DOMContentLoaded', () => {
//     update_cart_counter();
// });


for(i = 0; i < order_list.length; i++) {
    let order_content = '';
    
    order_content = `
        <li>Order: id${order_list[i].order_id}</li>
    `;
    // console.log('order_id', order_list[i].order_id);
    // console.log('date', order_list[i].date);
    // console.log('name', order_list[i].name);
}
