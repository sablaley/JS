if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //display menu 
    document.getElementsByClassName('mobile-icon')[0].addEventListener('click', function () {
        var main_ul = document.getElementById('check-class');
        if (main_ul.style.display == "none") {
            main_ul.style.display = "block";
        } else {
            main_ul.style.display = "none";
        }
    });
    
    // validation
    let regexForText = /^[a-z A-Z]+$/;
    let regexForEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let selectedCoffe = document.getElementsByName('cofee_select');
    let nameEl = document.getElementById('name');
    let phoneEl = document.getElementById('phone');
    let emailEl = document.getElementById('email');
    let dateEL = document.getElementById('dat');
    let timeEL = document.getElementById('tim');
    let addrEl = document.getElementById('addr');
    let btnEl = document.getElementById('sub');
    let msg = document.getElementsByClassName('msg')[0];
    let form = document.getElementsByName('form')[0];
    let properDate = new Date(dateEL.value);
    let currentDate = new Date();
    
    btnEl.addEventListener('click', function (e) {
        e.preventDefault();
        checkFields();
    });
    
    function checkFields() {
        let cartItems = document.getElementsByClassName('cart-items')[0];
        console.log(cartItems.childElementCount);
        if (cartItems.childElementCount == 0) {
            alert('Your Cart is Empty');
            return false;
        }
        else if (nameEl.value.trim() == '') {
            alert('Enter Your Full Name');
            return false;
        } 
        else if (!nameEl.value.trim().match(regexForText)) {
            alert('Enter valid Name');
            return false;
        } 
        else if(isNaN(phoneEl.value.trim())) {
            alert('Enter valid Phone Number');
            return false;
        }
        else if (emailEl.value.trim() == '') {
            alert('Enter Your Email');
            return false;
        } 
        else if (!emailEl.value.trim().match(regexForEmail)) {
            alert('Enter valid Email');
            return false;
        }
        else if (dateEL.value == '') {
            alert('Enter Delivery Date');
            return false;
        } 
        else if(properDate <= currentDate) {
            alert('Enter Valid Delivery Date');
            return false;
        }
        else if (timeEL.value == '') {
            alert('Enter Delivery Time');
            return false;
        } 
        else if (addrEl.value == '') {
            alert('Enter Your Current Address');
            return false;
        } 
        else {
            msg.innerHTML = "Congratulations!! Your Order is Placed Successfull!! 😇";
            msg.classList.add('show-msg');
            let cofeePriceEl = document.getElementsByClassName('coffe-price');
            for (let i = 0; i < cofeePriceEl.length; i++) {
                cofeePriceEl[i].style.display = 'none';
            }
            //form values reset
            form.reset();
            return true;
        }
    }
    
    //display cart-price when we click on checkbox
    let inputCheckbox = document.getElementsByName('cofee_select');
    // console.log(inputCheckbox);
    for (let i = 0; i < inputCheckbox.length; i++) {
        const  checkedInput = inputCheckbox[i];
        // console.log('checkedInput',checkedInput);
        checkedInput.addEventListener('click',function(e) {
            let price = e.target.nextElementSibling.nextElementSibling;
            price.style.display = 'flex';
        })
    }

    //coffe info display in modal
    let coffeImg = document.getElementsByClassName('cofee');
    let closeDetail = document.getElementsByClassName('close-detail');
    let html = document.getElementsByTagName('html')[0];
    for (let j = 0; j < coffeImg.length; j++) {
        coffeImg[j].addEventListener('click', function (e) {
            let showData = this.parentElement.nextElementSibling;
            showData.classList.add('show-data');
            html.style.overflow = "hidden";
        });
    }
    for (i = 0; i < closeDetail.length; i++) {
        closeDetail[i].addEventListener('click', function (e) {
            let hideData = this.parentElement;
            hideData.classList.remove('show-data');
            html.style.overflow = "auto";
        });
    }
    
    //==========================calculation===============================//

    //remove cart items when we click on remove button
    let removeBtnEl = document.getElementsByClassName('remove-btn');
    // console.log(removeBtnEl);
    for (let i = 0; i < removeBtnEl.length; i++) {
        // console.log(removeBtnEl[i]);
        let btn = removeBtnEl[i];
        btn.addEventListener('click', removeCartRow);
    }
    //when we change quantity..total bill change
        let inputQunatityEl = document.getElementsByClassName('count');
        for (let j = 0; j < inputQunatityEl.length; j++) {
            let selectedQuantity = inputQunatityEl[j];
            selectedQuantity.addEventListener('change', totalBillChanged);
        }
    // when we click on add to cart button , get info about price,item-name,quantity,image
    let addToCartEl = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addToCartEl.length; i++) {
        let selectedBtn = addToCartEl[i];
        selectedBtn.addEventListener('click', getInfo);
    }
}

//outside ready function

function removeCartRow(event) {
    let btnSelected = event.target;
    //clear cart-row
    let cartRow = btnSelected.parentElement;
    cartRow.remove();
    //update Total Bill
    updateCartTotal();
}


function totalBillChanged(event) {
    console.log("selectedCartCount=",event.target);
    let input = event.target;
    if ((input.value <= 0) || (isNaN(input.value))) {
        input.value = 1;
    } 
    updateCartTotal();
}

function getInfo(event) {
    event.preventDefault();
    // alert('item added to cart');
    document.getElementById('bill_entry').style.display = 'block';
    let listsEl = event.target.parentElement.parentElement;
    // console.log(listsEl);
    let price = listsEl.getElementsByClassName('price')[0].innerHTML;
    let imgEl = listsEl.getElementsByClassName('cofee')[0].src;
    let nameEl = listsEl.getElementsByClassName('coffe-detail')[0].firstElementChild.innerText;
    // console.log(price,imgEl,nameEl);
    addInfoItemToCart(price, imgEl, nameEl);
    updateCartTotal();
    // addEventListenerToCount();
}

function addInfoItemToCart(price, imgEl, nameEl) {
    //create new div to store cart-rows
    let newEl = document.createElement('div');
    let cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItemsContainer.getElementsByTagName('figcaption');
    for (let i = 0; i < cartItemNames.length; i++) {
        let selectedName = cartItemNames[i].innerText;
        if (selectedName == nameEl) {
            alert('Item is already added to the Cart.Please check the Cart');
            return;
        }
    }
    newEl.classList.add('cart-row');
    newEl.innerHTML = ` <figure>
                            <img src="${imgEl}" alt="">
                            <figcaption>${nameEl}</figcaption>
                        </figure>
                        <span class="cart-price">${price}</span>
                        <input type="number" value="1" class="count">
                        <button type="button" class="remove-btn">remove</button>`;
    cartItemsContainer.append(newEl);
    newEl.getElementsByClassName('remove-btn')[0].addEventListener('click', removeCartRow);
    
    // newEl.getElementsByClassName('count')[0].addEventListener('change',totalBillChanged);

    // console.log(cartItemsContainer.getElementsByClassName('count'));
   for (let i = 0; i < cartItemsContainer.getElementsByClassName('count').length; i++) {
    let element = cartItemsContainer.getElementsByClassName('count')[i];
        // console.log(element);
        element.addEventListener('change',totalBillChanged);
   }

}

//update total Bill 
function updateCartTotal() {
    let total = 0;
    //grab cart-items container
    let cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    // console.log(cartItemsContainer);
    //grab cart-row to pick values of price and quantity of cart-row
    let cartRowEl = cartItemsContainer.getElementsByClassName('cart-row');
    // console.log("row",cartRowEl);
    for (let i = 0; i < cartRowEl.length; i++) {
        let selectedCartRow = cartRowEl[i];
        // console.log('selecetsrow',selectedCartRow);
        let priceEl = selectedCartRow.getElementsByClassName('cart-price')[0].innerText.replace('$', '');
        let quantityEl = selectedCartRow.getElementsByClassName('count')[0];
        // console.log("qqqq",quantityEl);
        quantityEl = Number(quantityEl.value);
        console.log("priceEl",priceEl,"quantityEl",quantityEl);
        total = total + (priceEl * quantityEl);
    }
    document.getElementById('bill_entry').innerHTML = 'Total Price: $' + total;
}
