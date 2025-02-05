const productDetails = document.getElementById('productDetails');

// Extract the product ID from the URL or localStorage
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id'); // Try getting productId from URL first

if (!productId) {
    // If no productId in URL, try localStorage
    const clickedProduct = localStorage.getItem('clickedProduct');
    productId = clickedProduct ? JSON.parse(clickedProduct) : null;
}

if (productId) {
    fetch_product_details();
} else {
    productDetails.innerHTML = '<p>Unable to load product details. Please try again later.</p>';
}

async function fetch_product_details() {
    try {
        productDetails.innerHTML = '<div class="spinner-border text-info big mt-5 mb-5 ml-auto mr-auto"></div>';
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) throw new Error('Product not found');
        const product = await response.json();
        display_product_details(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        productDetails.innerHTML = '<p>Unable to load product details. Please try again later.</p>';
    }
}

function display_product_details(product) {
    const generateStars = generate_star_fuc(product.rating.rate);

    const product_price = product.price;
    const previous_price = (product_price * 1.4).toFixed(2);

    const discount_percentage = ((previous_price - product_price) / previous_price) * 100;
    const fixed_discount_after_dot = discount_percentage.toFixed(2);

    productDetails.innerHTML = `
        <div class="col-md-5">
            <img class="bannerImg" id="product-img" src="${product.image}" alt="${product.title}" />
        </div>
        <div class="col-md-7 pl-5">
            <div class="topContent">
                <div class="category-badge">
                    <span class="badge badge-light" onclick="openCategory(\`${product.category}\`)">${product.category}</span>
                </div>
                <div class="product-price">
                    <h5>
                        <span class="product-discountedPrice">Rs. ${product.price}</span>
                        <span class="product-strike">Rs. ${previous_price}</span>
                    </h5>
                    <span class="product-discountPercentage">(${fixed_discount_after_dot}% OFF)</span>
                </div>
                <h2>${product.title}</h2>

                <div class="detailsBtnWrap">
                    <button class="cmnBtn" onclick="add_to_cart(${product.id})">
                        Add to Cart <span class="spinner-border"></span>
                    </button>
                    <button class="cmnBtn greyBtn ml-2">Buy Now</button>
                </div>
                <div class="category-badge ratingReviewBox d-flex align-items-center mb-2">
                    <span class="badge badge-light align-items-center m-0">Review: ${product.rating.count}</span>
                    <div class="d-flex align-items-center ratingBox ml-2">
                        Rating: &nbsp; ${generateStars}</div>
                </div>
                
                <div class="productDetailsCntnt">
                    <p>${product.description}</p>
                </div>
            </div>
        </div>
    `;
}

function generate_star_fuc(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '<i class="fa fa-star" aria-hidden="true"></i>'.repeat(fullStars) +
        '<i class="fa fa-star-half-o" aria-hidden="true"></i>'.repeat(halfStar) +
        '<i class="fa fa-star-o" aria-hidden="true"></i>'.repeat(emptyStars);
}

