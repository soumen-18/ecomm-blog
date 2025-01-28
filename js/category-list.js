let cat_product_container = document.getElementById('displayProduct');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let productId = urlParams.get('id'); 

async function fetch_cat_product() {
    try{
        cat_product_container.innerHTML = '<div class="spinner-border text-info big mt-5 mb-5 ml-auto mr-auto"></div>';
        const response = await fetch(`https://fakestoreapi.com/products/category/${productId}`);
        const cat_products = await response.json();
        
        display_cat_product(cat_products);
    } catch(error) {
        console.error('Error fetching category products:', error)
    }
}

fetch_cat_product()


function display_cat_product(products) {
    let content = '';
    for(i = 0; i < products.length; i++) {
        const product_price = products[i].price;
        const previous_price = (product_price * 1.4).toFixed(2);
    
        const discount_percentage = ((previous_price - product_price) / previous_price) * 100;
        const fixed_discount_after_dot = discount_percentage.toFixed(2);

        content+= `
            <div class="col-md-4 productListItem">
                <div class="card">
                    <a onclick="display_product(${products[i].id})">
                        <img class="productItemImg" src="${products[i].image}" alt="Card image" style="width:100%">
                    </a>
                    <div class="card-body">
                        <div class="topContent">
                            <div class="category-badge">
                                <span class="badge badge-light">Rating: ${products[i].rating.rate}</span>
                                <span class="badge badge-light">Reviews: ${products[i].rating.count}</span>
                            </div>
                            <a onclick="display_product(${products[i].id})">
                                <h4>${products[i].title}</h4>
                                <h6 class='category-design'>${products[i].category}</h6>
                                <p>${products[i].description}</p>

                                <div class="product-price">
                                    <h5>
                                        <span class="product-discountedPrice">Rs. ${products[i].price}</span>
                                        <span class="product-strike">Rs. ${previous_price}</span>
                                    </h5>
                                    <span class="product-discountPercentage">(${fixed_discount_after_dot}% OFF)</span>
                                </div>
                            </a>
                        </div>
                        <button class="cmnBtn" onclick="add_to_cart(${products[i].id})">Add to cart</button>
                    </div>
                </div>
            </div>
        `
    }

    cat_product_container.innerHTML = content;
}