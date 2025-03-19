const absolutePath = 'file:///D:/ecomm-blog';
let allProducts = [];

(function() {
    // Define a list of pages that should trigger the redirect if logged in
    const redirectPages = ['login.html', 'register.html'];

    // Get the current page's filename
    const currentPage = window.location.pathname.split('/').pop(); // Extract filename from URL

    // Check if the current page is in the redirectPages list and if the user is logged in
    if (redirectPages.includes(currentPage) && localStorage.getItem('checkLogged') === 'true') {
        // Redirect to the shop page if the user is logged in
        window.location.href = 'index.html';  // Ensure this is the correct path to your shop page
    }
})();

// Start to Get Current Date & Time
const fetch_date = new Date();
let fetch_day = fetch_date.getDate();
let fetch_month = fetch_date.getMonth() + 1;
let fetch_year = fetch_date.getFullYear();

let currentDate = `${fetch_day}-${fetch_month}-${fetch_year}`;
// End to Get Current Date & Time

// Start to Fetch all products from FakeStore API
async function fetchAllProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
// End to Fetch all products from FakeStore API

function display_product(fetch_id) {
    localStorage.setItem('clickedProduct', fetch_id)
    // window.location.href = `${absolutePath}/details.html?id=${fetch_id}`;
    window.location.href = `${absolutePath}/details.html`;
}
function add_to_cart(productId) {
    handleAddToCart(productId);
    update_cart_counter();
}
