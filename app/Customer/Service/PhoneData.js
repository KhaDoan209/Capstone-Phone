function PhoneData() {
   this.getPhone = function () {
      return axios({
         method: 'get',
         url: 'https://6368be3d28cd16bba70b46ec.mockapi.io/Phone',
      });
   };

   this.getPhoneById = function (id) {
      return axios({
         method: 'get',
         url: `https://6368be3d28cd16bba70b46ec.mockapi.io/Phone/${id}`,
      });
   };
}
