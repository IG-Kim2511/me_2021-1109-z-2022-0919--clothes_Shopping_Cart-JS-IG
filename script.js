// const

const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal')
const totalItemsInCartEl = document.querySelector('.total-items-in-cart');

// products.js
console.log(products)


// js090. render  products

/* 
productsData

innerHTML
onclick

*/

function renderProducts() {
    products.forEach((p_product)=>{
        productsEl.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${p_product.imgSrc}" alt="${p_product.name}">
                    </div>
                    <div class="desc">
                        <h2>${p_product.name}</h2>
                        <h2><small>$</small>${p_product.price}</h2>
                        <p>
                            ${p_product.description}
                        </p>
                    </div>              
                    <div class="add-to-cart" onclick="addToCart(${p_product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `
    });
    
}
renderProducts();


// js13. add to cart

// js13-10. js13-20

//cart
// let cart = [];

// js45-3-, 40. ~60. local Storage

let cart = JSON.parse(localStorage.getItem("CART")) ||[];

/* object id

~.find(()=> ~~)
*/

/* 
    js13
    10. array
    20. click id !==product. id

    array.find

    ...spread operator

    numberOfUnits:1 

    click id === product . id

    changeNumberOf Units

    array.some

    updatecart->< renderCartItems
*/

function addToCart(p_id) {
    
    // js13-30
    if (cart.some((pp_item)=>pp_item.id ===p_id)) {
        chageNumberOfUnits('plus',p_id);
        
    } else {
        // products: data.js
    
        const item = products.find((product)=> product.id ===p_id);

        // cart.push(item);
        cart.push(
            {
                ...item,
                numberOfUnits:1,
            }
        );
        
    }

    console.log(cart)
    updateCart();
}
addToCart();

/* 
localstorage
localStorage.setItem
json.stringify
getItem
json.pars
updeCsrt
*/
function updateCart() {
    renderCartItems();
    renderSubtotal();

    localStorage.setItem("CART",JSON.stringify(cart));
    
}
updateCart();

function renderCartItems() {

    cartItemsEl.innerHTML="";

    cart.forEach((pp_item)=>{
        cartItemsEl.innerHTML +=`
            <div class="cart-item">
                <div class="item-info" onclick="removeItemFromCart(${pp_item.id})">
                    <img src="${pp_item.imgSrc}" alt="${pp_item.name}">
                    <h4>${pp_item.name}</h4>
                </div>
                <div class="unit-price">
                    <small>$</small>${pp_item.price}
                    <img src="./img/icons8-delete-128.png" alt="" class="delete"  onclick="removeItemFromCart(${pp_item.id})">
                </div>
                <div class="units">
                    <div class="btn plus" onclick="changeNumberOfUnits('plus', ${pp_item.id})">+</div>           
                    <div class="number">${pp_item.numberOfUnits}</div>
                    <div class="btn minus" onclick="changeNumberOfUnits('minus', ${pp_item.id})">-</div>
                </div>
            </div>
        
        `;

    });


    
}


/* 
return {~}
actin, id



*/
function chageNumberOfUnits(action, id) {
    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;

        if(item.id ===id){
            if (action === 'minus'&& numberOfUnits >1) {
                numberOfUnits--;
                
            } else if(action==='plus'&& numberOfUnits<item.inStock) {
                numberOfUnits++;
                
            }
        }

        return{
            ...item,
            numberOfUnits:numberOfUnits,
        }
    })
    
    updateCart();
}

//🦄 🍀js35. calculate, renderSubtotal 

/*
🦄 🍄 calculate - add, remove 모두 한번에 간단하게!!!

10. price (products.js의 오브젝트)

20. number of units 를 동적으로 products.js의 오브젝트 목록에 넣음

30 price * number of units 하면 자동으로 계산이 됨 
*/

/* 🦄
.toFixed(2)
*/


function renderSubtotal() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((pp_item)=>{
        totalPrice += pp_item.price * pp_item.numberOfUnits;
        totalItems += pp_item.numberOfUnits;
    });

    // subtotalEl.innerHTML =  `Subtotal (0 items): $0`;
    subtotalEl.innerHTML =  `Subtotal (${totalItems} items): $ ${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML= totalItems;    
}

/* js41. remover item from  cart

remove ite object-araay
render html - onclick
filter
cart array
filster

*/

function removeItemFromCart(p_id) {
    cart = cart.filter(pp_item => pp_item.id !== p_id);
    updateCart();
    
}

//🍀localStorage.clear(); /  location.reload();    
// 🥒js13-10,

const deleteAllBtn = document.querySelector('.delete-all-btn');
const checkoutBtn = document.querySelector('.checkoutBtn');


deleteAllBtn.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();
});

checkoutBtn.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();

    alert(`thank you`);
});