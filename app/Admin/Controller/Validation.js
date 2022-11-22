function Validation() {
	this.checkEmpty = function (valueInput, msgErr, spanID) {
		if (valueInput.trim() == '') {
			document.getElementById(spanID).innerHTML = msgErr;
			return false;
		}
		document.getElementById(spanID).innerHTML = '';
		return true;
	};
	this.checkPrice = function (valueInput, msgErr, spanID) {
		var pattern = /^(\d{1,5}(\.\d{1,2})?)$/;

		if (valueInput >= 0 && valueInput <= 99999 && valueInput.match(pattern)) {
			document.getElementById(spanID).innerHTML = '';
			return true;
		}
		document.getElementById(spanID).innerHTML = msgErr;
		return false;
	};

	this.checkName = function (valueInput, msgErr, spanID) {
		var pattern = /^[(A-Z)(a-z)(0-9)\s]{1,17}$/;
		if (valueInput.match(pattern)) {
			document.getElementById(spanID).innerHTML = '';
			return true;
		}
		document.getElementById(spanID).innerHTML = msgErr;
		return false;
	};

	this.checkScreen = function (valueInput, msgErr, spanID) {
		var pattern = /^[(A-Z)(a-z)(0-9)\s]{1,31}$/;
		if (valueInput.match(pattern)) {
			document.getElementById(spanID).innerHTML = '';
			return true;
		}
		document.getElementById(spanID).innerHTML = msgErr;
		return false;
	};

	this.checkCamera = function (valueInput, msgErr, spanID) {
		var pattern = /^[(A-Z)(a-z)(0-9)\s]{1,21}$/;
		if (valueInput.match(pattern)) {
			document.getElementById(spanID).innerHTML = '';
			return true;
		}
		document.getElementById(spanID).innerHTML = msgErr;
		return false;
	};

	this.checkDesc = function (valueInput, msgErr, spanID) {
		var pattern =
			/^[(a-z A-Z-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ)(0-9)\s]{1,149}$/;
		if (valueInput.match(pattern)) {
			document.getElementById(spanID).innerHTML = '';
			return true;
		}
		document.getElementById(spanID).innerHTML = msgErr;
		return false;
	};
}
