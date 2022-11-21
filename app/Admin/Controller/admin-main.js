var phoneService = new PhoneData();
var phone = new Phone();

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
        <td class="text-wrap">${item.desc}</td>
        <td class="text-center">
        <p class="text-wrap">Front Camera: ${item.frontCamera}</p>
        <p class="text-wrap">Back Camera: ${item.backCamera}</p>
        </td>
        <td>
            <button class="btn btn-success">Xem</button>
            <button class="btn btn-danger mt-2" onlick="removePhoneFromStore('${item.id}')">Xóa</button> 
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

	var newPhone = new Phone(name, price, screen, backCamera, frontCamera, img, desc, type);

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

function resetForm() {
	var array = [...document.querySelectorAll('.form-row input')];
	array.forEach((item) => {
		item.value = '';
	});
}
