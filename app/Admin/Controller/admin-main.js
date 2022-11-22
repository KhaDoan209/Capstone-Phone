var phoneService = new PhoneData();
var phone = new Phone();
var validation = new Validation();

function getEle(id) {
	return document.getElementById(id);
}

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
	var content = '';
	array.map(function (item) {
		content += `<tr>
        <th scope="row">${item.id}</th>
        <td>
            <div
                class="product-img"
            >
                <img
                    class="img-fluid"
                    src="${item.img}"
                    alt="img-phone"
                />
            </div>
        </td>
        <td><strong>${item.name}</strong></td>
        <td><strong>${item.price}$</strong></td>
        <td>
            <button class="btn btn-success" onclick="viewPhoneInfor('${item.id}' )">Xem</button>
            <button class="btn btn-danger ml-2" onclick="removePhoneFromStore('${item.id}')">Xóa</button> 
        </td>
    </tr>`;
	});

	document.querySelector('tbody').innerHTML = content;
}

function addNewPhone() {
	var name = getEle('phone-name').value;
	var price = getEle('phone-price').value;
	var screen = getEle('phone-screen').value;
	var backCamera = getEle('phone-backCam').value;
	var frontCamera = getEle('phone-frontCam').value;
	var img = getEle('phone-img').value;
	var desc = getEle('phone-desc').value;
	var type = getEle('phone-type').value;
	var isValid = true;
	isValid &=
		validation.checkEmpty(name, `Name can't be empty`, 'name-add-error') &&
		validation.checkName(
			name,
			`Name must be less than 17 letters including white space`,
			'name-add-error'
		);

	isValid &=
		validation.checkEmpty(price, `Price can't be empty`, 'price-add-error') &&
		validation.checkPrice(
			price,
			`Price must be less than 6 numbers before and 3 numbers after the comma`,
			'price-add-error'
		);

	isValid &=
		validation.checkEmpty(screen, `Screen can't be empty`, 'screen-add-error') &&
		validation.checkScreen(screen, `Screen must be less than 30 letters`, 'screen-add-error');

	isValid &=
		validation.checkEmpty(backCamera, `Back camera can't be empty`, 'backCamera-add-error') &&
		validation.checkCamera(
			backCamera,
			`Back camera must be less than 20 letters`,
			'backCamera-add-error'
		);

	isValid &=
		validation.checkEmpty(
			frontCamera,
			`Front camera can't be empty`,
			'frontCamera-add-error'
		) &&
		validation.checkCamera(
			frontCamera,
			`Front camera must be less than 20 letters`,
			'frontCamera-add-error'
		);
	isValid &= validation.checkEmpty(img, `Image link can't be empty`, 'img-add-error');
	isValid &=
		validation.checkEmpty(desc, `Description can't be empty`, 'description-add-error') &&
		validation.checkDesc(
			desc,
			`Description must be less than 150 letters without special symbols`,
			'description-add-error'
		);

	if (isValid) {
		var newPhone = new Phone(name, price, screen, backCamera, frontCamera, img, desc, type);
		clearInputSpace();
		phoneService
			.addPhone(newPhone)
			.then((result) => {
				alert('New product is added successfully');
				getPhoneList();
				resetForm();
			})
			.catch((error) => {
				alert(`New product can't be added `);
			});
	}
}
function removePhoneFromStore(id) {
	phoneService
		.deletePhone(id)
		.then((result) => {
			alert(`Product removed sucessfully`);
			getPhoneList();
		})
		.catch((error) => {
			alert(`${error}. Cannot remove the product`);
		});
}

function updatePhoneInfor(id) {
	var newName = getEle('update-name').value;
	var newPrice = getEle('update-price').value;
	var newScreen = getEle('update-screen').value;
	var newBackCam = getEle('update-backCamera').value;
	var newFrontCam = getEle('update-frontCamera').value;
	var newImg = getEle('update-img').value;
	var newDesc = getEle('update-desc').value;
	var newType = getEle('update-type').value;
	var isValid = true;

	isValid &=
		validation.checkEmpty(newName, `Name can't be empty`, 'name-add-error') &&
		validation.checkName(
			newName,
			`Name must be less than 17 letters including white space`,
			'name-update-error'
		);

	isValid &=
		validation.checkEmpty(newPrice, `Price can't be empty`, 'price-add-error') &&
		validation.checkPrice(
			newPrice,
			`Price must be less than 6 numbers before and 3 numbers after the comma`,
			'price-update-error'
		);

	isValid &=
		validation.checkEmpty(newScreen, `Screen can't be empty`, 'screen-update-error') &&
		validation.checkScreen(
			newScreen,
			`Screen must be less than 30 letters`,
			'screen-add-error'
		);

	isValid &=
		validation.checkEmpty(
			newBackCam,
			`Back camera can't be empty`,
			'backCamera-update-error'
		) &&
		validation.checkCamera(
			newBackCam,
			`Back camera must be less than 20 letters`,
			'backCamera-update-error'
		);

	isValid &=
		validation.checkEmpty(
			newFrontCam,
			`Front camera can't be empty`,
			'frontCamera-update-error'
		) &&
		validation.checkCamera(
			newFrontCam,
			`Front camera must be less than 20 letters`,
			'frontCamera-update-error'
		);
	isValid &= validation.checkEmpty(newImg, `Image link can't be empty`, 'img-add-error');
	isValid &=
		validation.checkEmpty(newDesc, `Description can't be empty`, 'description-update-error') &&
		validation.checkDesc(
			newDesc,
			`Description must be less than 150 letters without special symbols`,
			'description-update-error'
		);
	if (isValid) {
		var updatedPhone = new Phone(
			newName,
			newPrice,
			newScreen,
			newBackCam,
			newFrontCam,
			newImg,
			newDesc,
			newType
		);
		if (confirm('Do you want to update the information ?')) {
			phoneService
				.updatePhone(id, updatedPhone)
				.then(() => {
					alert('Cập nhật sản phẩm thành công');
					document.querySelector('.close').click();
					getPhoneList();
					viewPhoneInfor(id);
				})
				.catch(() => {});
		}
	}
}

function resetForm() {
	var array = [...document.querySelectorAll('.form-row input')];
	array.forEach((item) => {
		item.value = '';
	});
}

function viewPhoneInfor(id) {
	phoneService
		.getPhoneById(id)
		.then((result) => {
			console.log(result.data.name);
			var content = ` <div class="container">
         <div class="row">
            <div class="col-5">
               <div class="img-infor">
                  <img
                     class="img-fluid"
                     src="${result.data.img}"
                     alt=""
                     srcset=""
                  />
               </div>
            </div>
            <div class="col-7">
               <h1 class="title">${result.data.name}</h1>
               <h2>Price: ${result.data.price}$</h2>
               <p>${result.data.desc}</p>
               <p><strong>Screen: </strong> ${result.data.screen}</p>
               <div>
               <span><strong>Front Camera:</strong> ${result.data.frontCamera}</span>
               <br>
               <span><strong>Back Camera:</strong>  ${result.data.backCamera}</span>
               </div>
               <button
                  class="btn-black mt-3"
                  data-toggle="modal"
                  data-target="#modal-update"
                  data-target="#staticBackdrop"
               >
                  Change Information
               </button>
            </div>
            <div
               class="modal fade"
               id="modal-update"
               tabindex="-1"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true"
               data-backdrop="static"
               data-keyboard="false"
            >
               <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
               >
                  <div class="modal-content">
                     <div class="modal-header">
                        <h5
                           class="modal-title"
                           id="exampleModalLabel"
                        >
                           Update Phone Information
                        </h5>
                        <button
                           type="button"
                           class="close"
                           data-dismiss="modal"
                           aria-label="Close"
                        >
                           <span aria-hidden="true"
                              >&times;</span
                           >
                        </button>
                     </div>
                     <div class="modal-body">
                        <form>
                           <div class="form-group">
                              <label for="update-name"
                                 >Name</label
                              >
                              <input
                                 type="text"
                                 class="form-control update-input"
                                 id="update-name"
                                 aria-describedby="emailHelp"
                              />
                              <div class="error" id="name-update-error"></div>
                              <label for="update-price"
                                 >Price</label
                              >
                              <input
                                 type="number"
                                 class="form-control  update-input"
                                 id="update-price"
                                 aria-describedby="emailHelp"
                              />
                              <div class="error" id="price-update-error"></div>
                              <label for="update-screen"
                                 >Screen</label
                              >
                              <input
                                 type="text"
                                 class="form-control  update-input"
                                 id="update-screen"
                                 aria-describedby="emailHelp"
                              />
                              <div class="error" id="screen-update-error"></div>
                              <label for="update-backCamera"
                                 >Back Camera</label
                              >
                              <input
                                 type="text"
                                 class="form-control  update-input"
                                 id="update-backCamera"
                                 aria-describedby="emailHelp"
                              />
                              <div class="error" id="backCamera-update-error"></div>
                              <label for="update-frontCamera"
                                 >Front Camera</label
                              >
                              <input
                                 type="text" 
                                 class="form-control update-input"
                                 id="update-frontCamera"
                                 aria-describedby="emailHelp"
                              />
                              <div class="error" id="frontCamera-update-error"></div>
                              <label for="update-img"
                                 >Image Link</label
                              >
                              <input
                                 type="text"
                                 class="form-control update-input"
                                 id="update-img"
                                 aria-describedby="emailHelp"
                              />
                              <div class="error" id="description-update-error"></div>
                              <label for="update-desc"
                                 >Description</label
                              >
                              <input
                                 type="text"
                                 class="form-control update-input"
                                 id="update-desc"
                                 aria-describedby="emailHelp"
                              />

                              <label for="update-type"
                                 >Type</label
                              >
                              <select
                                 id="update-type"
                                 class="form-control update-input"
                              >
                                 <option
                                    value="Iphone"
                                    selected
                                 >
                                    Iphone
                                 </option>
                                 <option value="Samsung">
                                    Samsung
                                 </option>
                              </select>
                           </div>
                        </form>
                     </div>
                     <div class="modal-footer">
                        <button
                           type="button"
                           class="btn btn-outline-danger"
                           data-dismiss="modal"
                        >
                           Close
                        </button>
                        <button
                           onclick="updatePhoneInfor('${result.data.id}')"
                           type="button"
                           class="btn btn-white"
                        >
                           Update
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>`;
			document.querySelector('.phone-infor-detail').innerHTML = content;
			document.querySelector('#nav-detail-tab').click();
			getEle('update-name').value = result.data.name;
			getEle('update-price').value = result.data.price;
			getEle('update-screen').value = result.data.screen;
			getEle('update-backCamera').value = result.data.backCamera;
			getEle('update-frontCamera').value = result.data.frontCamera;
			getEle('update-img').value = result.data.img;
			getEle('update-desc').value = result.data.desc;
			getEle('update-type').value = result.data.type;
		})
		.catch((error) => {
			console.log(error);
		});
}

function clearInputSpace() {
	var array = document.querySelectorAll('.form-group input');
	array.forEach((item) => {
		item.value.replace(/\s/g, '');
	});
}
