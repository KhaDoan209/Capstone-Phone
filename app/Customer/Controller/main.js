var phoneService = new PhoneData();
var phone = new Phone();

const listItemInCart = new CartList();

function setLocalStorage() {
   localStorage.setItem('CartList', JSON.stringify(listItemInCart.cartList));
}
function getLocalStorage() {
   if (localStorage.getItem('CartList') != null) {
      listItemInCart.cartList = JSON.parse(localStorage.getItem('CartList'));
      if (listItemInCart.cartList.length > 0) {
         displayCartEmpty('.empty-cart', 'hidden', '0', 'absolute', 0, 0);
      }
      calTotalPrice(listItemInCart.cartList);
      cartDisplay(listItemInCart.cartList);
   }
}
getLocalStorage();

function getPhoneList() {
   phoneService
      .getPhone()
      .then(function (result) {
         return displayPhoneList(result.data);
      })
      .catch(function (error) {
         alert(`Cannot get data. 
		 Error:${error}`);
      });
}
getPhoneList();

function displayPhoneList(array) {
   count = 1;
   var content = '';
   array.map(function (item) {
      content += `
        <div class="col-12 col-sm-6 col-lg-3 mx-auto my-3">
        <div class="product p-3 border">
            <div class="product-header d-flex justify-content-between">
                <i class="fa-brands fa-apple"></i>
                <span>In Stock</span>
            </div>
            <div class="product-img">
                <img
                    class="img-fluid"
                    src="${item.img}"
                    alt=""
                />
            </div>
            <div class="product-detail">
                <div class="product-name d-flex justify-content-between">
                    <strong>${item.name}</strong>
                    <button id="heart-${count}" onclick="likeBtn(${count})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
                <div class="wrapper">
                    <p>
                        ${item.desc}
                    </p>
                    <p>
                        ${item.screen}, Front Camera: ${item.frontCamera}, Back Camera: ${item.backCamera}
                    </p>
                </div>
                <div class="purchase d-flex justify-content-between">
                    <p class="price">${item.price} $</p>
                    <span>
                        <div class="d-flex">
                            <button id= "add-${item.id}" onclick="addToCart(${item.id})">
                                Add
                                <i class="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </div>`;
      count++;
   });

   document.querySelector('.main-card').innerHTML = content;
}
function filterPhone(array) {
   var selection = document.getElementById('select-product').value;

   if (selection == 'All brands') {
      displayPhoneList(array);
   } else {
      var filterResult = array.filter((item) => {
         if (item.type.toLowerCase() === selection.toLowerCase()) return item;
      });
      displayPhoneList(filterResult);
   }
}
function addToCart(id) {
   var isExisted = false;
   listItemInCart.cartList.forEach((item) => {
      if (item.id == id) {
         isExisted = true;
      }
      calTotalPrice(listItemInCart.cartList);
      cartDisplay(listItemInCart.cartList);
      document.querySelector('#cart').click();
   });

   if (isExisted) {
      listItemInCart.cartList.forEach((item) => {
         if (item.id == id) {
            item.quantity += 1;
         }
         setLocalStorage();
      });
      cartDisplay(listItemInCart.cartList);
      document.querySelector('#cart').click();
      isExisted = false;
   } else {
      phoneService
         .getPhone()
         .then(function (result) {
            var listOfProduct = result.data;
            listOfProduct.forEach((item) => {
               if (item.id == id) {
                  var quantity = 1;
                  var productToAdd = new ProductInCart(
                     item.id,
                     item.name,
                     item.price,
                     item.img,
                     quantity
                  );
                  listItemInCart.addToCart(productToAdd);
                  document.querySelector('#cart').click();
               }
            });
            cartDisplay(listItemInCart.cartList);
            calTotalPrice(listItemInCart.cartList);
            displayCartEmpty('.empty-cart', 'hidden', '0', 'absolute', 0, 0);
            setLocalStorage();
         })
         .catch(function () {});
   }
}
function cartDisplay(array) {
   var content = '';
   array.map((item) => {
      content += ` <tr class="cart-item">
      <th scope="row" class="cart-img">
        <img
            class="img-fluid img-cart"
            src="${item.img}"
            alt=""
            srcset=""
         />
      </th>
      <td><strong class="name text-wrap">${item.name}</strong></td>
      <td><span class="quantity"
      ><div>
         <button onclick="decreaseCartItem(${item.id})">-</button>
         <p>${item.quantity}</p>
         <button onclick="increaseCartItem(${item.id})">+</button>
      </div></span
   ></td>
      <td><p class="price">${item.price} $</p></td>
      <td><button onclick="removeItemFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button></td>
   </tr>`;
   });
   document.querySelector('.cart-items').innerHTML = content;
}
function decreaseCartItem(id) {
   listItemInCart.cartList.forEach((item) => {
      if (item.id == id) {
         if (item.quantity > 0) {
            item.quantity -= 1;
         } else {
            alert('Shop bán chứ không mua lại');
         }
      }
      setLocalStorage();
      calTotalPrice(listItemInCart.cartList);
      cartDisplay(listItemInCart.cartList);
   });
}
function increaseCartItem(id) {
   listItemInCart.cartList.forEach((item) => {
      if (item.id == id) {
         if (item.quantity < 20) {
            item.quantity += 1;
         }
      }
      setLocalStorage();
      calTotalPrice(listItemInCart.cartList);
      cartDisplay(listItemInCart.cartList);
   });
}
function calTotalPrice(array) {
   var content = '';
   var price = 0;
   array.map((item) => {
      price += Number(item.price) * Number(item.quantity);
   });
   content += `<strong>Total: <span class="ml-2">${price} $</span></strong>`;
   document.querySelector('.footer-total-price').innerHTML = content;
   return price;
}
function removeItemFromCart(id) {
   listItemInCart.cartList.forEach((item) => {
      if (item.id == id) {
         var index = listItemInCart.cartList.indexOf(item);
         listItemInCart.cartList.splice(index, 1);
         if (listItemInCart.cartList.length <= 0) {
            displayCartEmpty('.empty-cart', 'visible', '0.7', 'relative', 0, 0);
         }
      }
      cartDisplay(listItemInCart.cartList);
      calTotalPrice(listItemInCart.cartList);
      setLocalStorage();
   });
}
function displayCartEmpty(className, visib, opa, posit, top, left) {
   var element = document.querySelector(className);
   element.style.visibility = visib;
   element.style.opacity = opa;
   element.style.position = posit;
   element.style.top = top;
   element.style.left = left;
}
function clearCart() {
   while (listItemInCart.cartList.length > 0) {
      listItemInCart.cartList.forEach((item) => {
         listItemInCart.cartList.pop(item);
      });
   }
   displayCartEmpty('.empty-cart', 'visible', '0.7', 'relative', 0, 0);
   calTotalPrice(listItemInCart.cartList);
   setLocalStorage();
   cartDisplay(listItemInCart.cartList);
}
