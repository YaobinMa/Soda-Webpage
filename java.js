var cartWrappers=document.querySelector('#cartWrapper');
const addToCartBtn=document.querySelectorAll('.cartBtn');
const addedProduct = [];
const cartTotalPrices=document.querySelector('.changingCartPrice');



addToCartBtn.forEach((addProductToCartBtn) => {
    addProductToCartBtn.addEventListener("click", addToCart);
});



function openCart(){
    cartWrappers.style.display = "block";
}

function closeCart(){
    cartWrappers.style.display = "none";
}

// escape to close cart
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        closeCart();
    }
};

function addProductToCart(product){
    const htmlString = `
    
    <div class="checkoutCartProduct" data-producttitle="${product.title}">
        <img src="${product.img}" class="productImg">
        <div class="productDetail">
            <h5 class="productTitle">${product.title}</h5>
            <h5 class="productPrice">$${product.price}</h5>
        </div>
        <div class="cartButtons">
            <button class="minus">-</button>
            <input class="cartInput" value="${product.quantity}"></input>
            <button class="plus">+</button>
            <br>
            <button class="btn btn-danger delete">Delete</button>
        </div>
    </div>
    `;

    const htmlFragment = document
    .createRange()
    .createContextualFragment(htmlString);

    const deleteCartItem=htmlFragment.querySelector('.delete')
    deleteCartItem.addEventListener("click", removeElement);

    const cartNumInput=htmlFragment.querySelector('.cartInput')
    cartNumInput.addEventListener("input", addInputProduct);
       
    const minusInput=htmlFragment.querySelector('.minus')
    minusInput.addEventListener("click", minusProduct);

    const plusInput=htmlFragment.querySelector('.plus')
    plusInput.addEventListener("click", plusProduct);

    return htmlFragment;
    
}

function minusProduct(event){
    
    const inputIndex = getCartBtnIndex(event)
    let inputAmount = addedProduct[inputIndex].dataset.quantity
    if (inputAmount > 0){
        inputAmount --
        addedProduct[inputIndex].dataset.quantity = inputAmount;
        event.currentTarget.nextSibling.nextSibling.value = inputAmount;
        console.log()
        addTotalPrice()
    }
    
}

function plusProduct(event){
    
    const inputIndex = getCartBtnIndex(event)
    let inputAmount = addedProduct[inputIndex].dataset.quantity
    if (inputAmount >= 0){
        inputAmount ++
        addedProduct[inputIndex].dataset.quantity = inputAmount;
        event.currentTarget.previousSibling.previousSibling.value = inputAmount;
        console.log()
        addTotalPrice()
    }
    
}

function addInputProduct(event){
    let numInput=parseInt(event.currentTarget.value);
    if(numInput>=0){
        inputIndex = getCartBtnIndex(event)
        addedProduct[inputIndex].dataset.quantity = numInput;
        addTotalPrice()
    }

}


function addToCart(event) {
    if (!addedProduct.includes(event.currentTarget)) {
        addedProduct.push(event.currentTarget);
        const productDetails = event.currentTarget.dataset;
        
        const htmlFragment = addProductToCart(productDetails);
        cartWrappers.appendChild(htmlFragment);

        addTotalPrice();

    }
}


function removeElement(target){
    cartIndex=getCartBtnIndex(target);
    addedProduct.splice(cartIndex,1);
    const product=target.currentTarget.parentElement.parentElement;
    product.remove();
    addTotalPrice();
}

function getCartBtnIndex(event) {
    
    const productTitle =
      event.currentTarget.parentElement.parentElement.dataset.producttitle;
    
    const cartBtnIndex = addedProduct.findIndex((cart) => {
      return cart.dataset.title === productTitle;
    });

    
    return cartBtnIndex;
    
  }

function addTotalPrice() {
    let totalPrice = 0;
    addedProduct.forEach((product) => {
        totalPrice += product.dataset.price * product.dataset.quantity;
    });
    cartTotalPrices.textContent = "$"+ totalPrice.toFixed(2);
}  