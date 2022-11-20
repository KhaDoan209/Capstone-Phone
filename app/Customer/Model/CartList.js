function CartList() {
   this.cartList = [];
   this.addToCart = (item) => {
      this.cartList.push(item);
   };
}
