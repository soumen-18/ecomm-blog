let productList = [];
let product_container = document.getElementById('displayProduct');

const fetchLogStatus = JSON.parse(localStorage.getItem('checkLogged')) || false;
// const fetchLogStatus = false;


async function fetch_product() {

    if(!fetchLogStatus) {

        document.getElementById('productList-container').innerHTML = `<p>Please <a href="./login.html">login</a> first to see products</p>`;
        return false;
    }
    
    try {
        product_container.innerHTML = '<div class="spinner-border text-info big mt-5 mb-5 ml-auto mr-auto"></div>';
        const fetchItems = await fetch("https://fakestoreapi.com/products");
        const items = await fetchItems.json();
        productList.push(...items);
        display_products();
    } 
    catch(err){
        console.error("Error fetching products:", err);
    }
} 

fetch_product();

function display_products() {
	items = '';
	for(let i = 0; i < productList.length; i++) {
        const product_price = productList[i].price;
        const previous_price = (product_price * 1.4).toFixed(2);
    
        const discount_percentage = ((previous_price - product_price) / previous_price) * 100;
        const fixed_discount_after_dot = discount_percentage.toFixed(2);

		items += `
			<div class="col-md-4 productListItem">
                <div class="card">
                    <a onclick="display_product(${productList[i].id})">
                        <img class="productItemImg" src="${productList[i].image}" alt="Card image" style="width:100%">
                    </a>
                    <div class="card-body">
                        <div class="topContent">
                            <div class="category-badge">
                                <span class="badge badge-light">Rating: ${productList[i].rating.rate}</span>
                                <span class="badge badge-light">Reviews: ${productList[i].rating.count}</span>
                            </div>
                            <a onclick="display_product(${productList[i].id})">
                                <h4>${productList[i].title}</h4>
                                <h6 class='category-design'>${productList[i].category}</h6>
                                <p>${productList[i].description}</p>

                                <div class="product-price">
                                    <h5>
                                        <span class="product-discountedPrice">Rs. ${productList[i].price}</span>
                                        <span class="product-strike">Rs. ${previous_price}</span>
                                    </h5>
                                    <span class="product-discountPercentage">(${fixed_discount_after_dot}% OFF)</span>
                                </div>
                            </a>
                        </div>
                        <button class="cmnBtn" onclick="add_in_cart(${productList[i].id})">Add to cart</button>
                    </div>
                </div>
            </div>
		`
	}

	product_container.innerHTML = items;
}
