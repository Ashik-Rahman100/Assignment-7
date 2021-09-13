const loadProducts = () =>{
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR2jidAFdaAe8rgSe1WyhAC1LzkntcVSWTtHFCv-7mSDPw4Io7Byb993UZM`;
  fetch(url)
  .then(res => res.json())
  .then(data => showProducts(data))
}
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p> <span class = 'fw-bold'>Category:</span> ${product.category}</p>
      <p> <span class = 'fw-bold'>Rating:</span> ${product?.rating?.rate} <span class ='text-warning'><i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      </span></p>
      <p> <span class = 'fw-bold'>Avarage-Count: </span>${product?.rating?.count}</p>
      <h4><span class = 'fw-bold'>Price: $</span>  ${product.price}</h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" onclick ="singleProduct(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// Product Count
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
// convert  innerText
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2) ;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);

};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = 
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// single product item 
const singleProduct = (id) =>{
   const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>displaySingleData(data))
}

const displaySingleData = (product) =>{
  const cardContainer = document.getElementById('single-card');
  const div = document.createElement('div');

  div.innerHTML =`
      <img src="${product.image}" class="card-img-top w-25 mt-5" alt="...">
          <div class="card-body">
              <h3 class="card-title">${product.title}</h3>
              <p class="card-text"><span class = "fw-bold text-primary">Price : $</span> ${product.price}</p>
              <p class="card-text"><span class = "fw-bold text-primary">Category : </span>${product.category}</p>
              <p class="card-text"><span class = "fw-bold text-primary">rate : </span>${product.rating.rate} <span class ='text-warning'> <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              </span></p>
              <p class="card-text"><span class = "fw-bold text-primary">Average : </span>${product.rating.count}</p>
              
            <a href="#" class="btn btn-primary">Read More</a>
          </div>
  `
  cardContainer.appendChild(div)
} 