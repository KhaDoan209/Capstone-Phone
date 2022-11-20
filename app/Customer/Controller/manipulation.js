document.getElementById('select-product').onchange = function () {
   phoneService.getPhone().then(function (result) {
      return filterPhone(result.data);
   });
};

document.querySelector('.side-nav-header button').onclick = () => {
   document.querySelector('.side-navbar').style.right = '-800px';
   document.querySelector('.side-navbar').style.opacity = '0';
   document.querySelector('.side-navbar').style.visibility = 'hidden';
};

document.querySelector('.nav-link i').onclick = () => {
   document.querySelector('.side-navbar').style.right = '0';
   document.querySelector('.side-navbar').style.opacity = '1';
   document.querySelector('.side-navbar').style.visibility = 'visible';
};

function likeBtn(id) {
   var content = 'heart-' + id;
   document.getElementById(content).classList.toggle('heart-red');
}

function checkOut() {
   if (listItemInCart.cartList.length <= 0) {
      alert(`Có gì đâu mà thanh toán ???`);
   } else {
      clearCart();
      alert(`MB Bank - Doan Tran Vinh Kha - 2009199987720`);
   }
}
