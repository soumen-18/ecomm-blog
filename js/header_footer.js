
let log_status = JSON.parse(localStorage.getItem('checkLogged')) || false;

let getUserDetails = JSON.parse(localStorage.getItem('users'));
let getDetails = JSON.parse(localStorage.getItem('storeUserIndex'));

let fetch_firstname = (getUserDetails && getDetails !== null && getUserDetails[getDetails]?.name?.firstname) || 'User';

// Start header for unauthorize pages
const outer_header = `
    <a class="navbar-brand mr-md-5" href="${absolutePath}/index.html">
        <img src="${absolutePath}/images/logo.png" alt="Logo">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="${absolutePath}/index.html">Shop</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact</a>
            </li>
        </ul>
    </div>
`;
// End header for unauthorize pages

// Start header for authorize pages
const inner_header = `
    <a class="navbar-brand mr-md-5" href="${absolutePath}/index.html">
        <img src="${absolutePath}/images/logo.png" alt="Logo">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="${absolutePath}/index.html">Shop</a>
            </li>
            <li class="nav-item">
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                        Categories
                    </a>
                    <div class="dropdown-menu" id="category-list">
                    
                    </div>
                </div>
            </li>
        </ul>
        <div class="d-flex">
            <div class="dropdown">
                <button type="button" class="cmnBtn dropdown-toggle text-capitalize" id="profile-dropdown" data-toggle="dropdown">
                    ${fetch_firstname}
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="${absolutePath}/profile.html" class="dropdown-item">Profile</a>
                    <a href="${absolutePath}/cart.html" class="dropdown-item">Cart</a>
                    <a href="${absolutePath}/order.html" class="dropdown-item">Orders</a>
                    <a class="dropdown-item" onclick='logout_func()'>Logout</a>
                </div>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item headerCart">
                    <a href="${absolutePath}/cart.html">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span>26</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
`;
// End header for authorize pages

// Start footer content
const footer_content = `
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-12">
                <a href="${absolutePath}/index.html" class="logoWrap">
                    <img src="${absolutePath}/images/logo.png" alt="Logo">
                </a>
                <p class="mb-0">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus deleniti odio earum similique dicta rem amet voluptates nihil vero.
                </p>
            </div>
            <div class="col-md-6 col-12 menuList">
                <h5>Quick Links</h5>
                <ul>
                    <li>
                        <a href="${absolutePath}/index.html">Shop</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <div class="col-md-12 col-12">
                <div class="copyRightWrap">
                    <p class="mb-0">&copy; Copyright allright reserved</p>
                </div>
            </div>
        </div>
    </div>
`;
// End footer content

if (document.getElementById("outer_navbar")) {
    document.getElementById("outer_navbar").innerHTML = outer_header;
}
if (document.getElementById("inner_navbar")) {
    document.getElementById("inner_navbar").innerHTML = log_status ? inner_header : outer_header;
}
if (document.getElementById("footer-main")) {
    document.getElementById("footer-main").innerHTML = footer_content;
}

// Start logout functionality
function logout_func() {
    localStorage.setItem('checkLogged', false);
    localStorage.setItem('userData', null);
    setTimeout(function() {
        window.location.href = `${absolutePath}/login.html`;
    }, 1000);
}
// End logout functionality

// Start to fetching product categories list and click functionality
async function fetch_categories() {
    try{
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const product = await response.json();
        
        const cat_element = document.getElementById('category-list');

        product.forEach(item => {
            const encodedCategory = encodeURIComponent(item);
            if(cat_element) {
                cat_element.innerHTML+= `
                    <a class="dropdown-item" href="#" onclick="openCategory(\`${item}\`)">${item}</a>
                `;
            }
        });
    } 
    catch(error) {
        console.error('Error fetching categories:', error);
    }
}

fetch_categories();


function openCategory(category) {
    const encodedCategory = encodeURIComponent(category);
    console.log('encodedCategory', encodedCategory)
    window.location.href = `${absolutePath}/category.html?id=${encodedCategory}`;
}
// End to fetching product categories list and click functionality

// ** Start search functionality
// function searchProducts() {
//     let query = document.getElementById("searchBox").value.toLowerCase();
//     let results = allProducts.filter(product => product.title.toLowerCase().includes(query));

//     if(query.length > 0){
//         displaySearchResults(results);
//     } else {
//         display_products();
//     }
// }

// Display search results dynamically
// function displaySearchResults(results) {
//     const product_container = document.getElementById('displayProduct');
//     product_container.innerHTML = " "; // Clear previous results

//     if (results.length === 0) {
//         product_container.innerHTML = "<p>No products found.</p>";
//         return;
//     }

//     results.forEach(product => {
//         product_container.innerHTML += `
//             <div class="product-item">
//                 <img src="${product.image}" alt="${product.title}" width="50">
//                 <a href="details.html?id=${product.id}">${product.title}</a>
//                 <p>$${product.price}</p>
//             </div>
//         `;
//     });
// }
// ** End search functionality
