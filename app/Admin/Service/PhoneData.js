function PhoneData() {
   this.getPhone = function () {
      return axios({
         method: 'get',
         url: 'https://6368be3d28cd16bba70b46ec.mockapi.io/Phone',
      });
   };
   this.addPhone = function (newPhone) {
      return axios({
         method: 'post',
         url: 'https://6368be3d28cd16bba70b46ec.mockapi.io/Phone',
         data: newPhone,
      });
   };

   this.deletePhone = function (id) {
      return axios({
         method: 'delete',
         url: `https://6368be3d28cd16bba70b46ec.mockapi.io/Phone/${id}`,
      });
   };

   this.getPhoneById = function (id) {
      return axios({
         method: 'get',
         url: `https://6368be3d28cd16bba70b46ec.mockapi.io/Phone/${id}`,
      });
   };

   this.updatePhone = function (id, newPhone) {
      return axios({
         method: 'put',
         url: `https://6368be3d28cd16bba70b46ec.mockapi.io/Phone/${id}`,
         data: newPhone,
      });
   };
}
