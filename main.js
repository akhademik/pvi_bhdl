//! BẢO HIỂM DU LỊCH
const form = document.querySelector("#form");
const result = document.querySelector(".price");
const sum = document.querySelector(".sum");
const days = document.querySelector(".days");
const discount = document.querySelector(".discount");

sum.addEventListener("input", () => {
	onlyNumber(sum);
	AddComma(sum);
});

discount.addEventListener("focus", function () {
	discount.value = "";
	discount.type = "number";
	console.dir(discount);
});

discount.addEventListener("focusout", function () {
	const formatDiscount = `${discount.value} %`;
	discount.type = "text";
	formatNo(discount, formatDiscount);
});

form.addEventListener("submit", e => {
	e.preventDefault();
	const newSum = sum.value.replaceAll(",", "");
	const newDays = days.value;
	if (newDays === "0") return error();
	const newDiscount = discount.value.replaceAll("%", "");
	const result = tinhphi(newDays, newSum, newDiscount);
	if (newSum == "" || newDays == "") {
		return;
	}
	printOut(result);
});

function tinhphi(days, sum, discount = 1) {
	/* BIEU PHI
Tu 1 den 10: 0.015%
Tu 11 den 20: 0.012%
Tu 21 den 60: 0.010%
Tu 61 den 90: 0.008%
Tren 90: 0.005%
*/
	//

	const days10 = days - 10;
	const days20 = days - 20;
	const days60 = days - 60;
	const days90 = days - 90;
	const rateDis = 1 - discount / 100;
	const rateD10 = 0.015 * 10;
	const rateD20 = 0.012 * 10;
	const rateD60 = 0.01 * 40;
	const rateD90 = 0.008 * 30;

	const d10 = ((0.015 * days * sum) / 100) * rateDis;
	const d20 = ((rateD10 * sum) / 100) * rateDis + ((0.012 * days10 * sum) / 100) * rateDis;
	const d60 =
		((rateD10 * sum) / 100) * rateDis +
		((rateD20 * sum) / 100) * rateDis +
		((0.01 * days20 * sum) / 100) * rateDis;
	const d90 =
		((rateD10 * sum) / 100) * rateDis +
		((rateD20 * sum) / 100) * rateDis +
		((rateD60 * sum) / 100) * rateDis +
		((0.008 * days60 * sum) / 100) * rateDis;
	const lastRate =
		((rateD10 * sum) / 100) * rateDis +
		((rateD20 * sum) / 100) * rateDis +
		((rateD60 * sum) / 100) * rateDis +
		((rateD90 * sum) / 100) * rateDis +
		((0.005 * days90 * sum) / 100) * rateDis;

	if (days > 90) {
		return Math.ceil(lastRate).toLocaleString("en-US");
	} else if (60 <= days && days <= 90) {
		return Math.ceil(d90).toLocaleString("en-US");
	} else if (21 <= days && days <= 60) {
		return Math.ceil(d60).toLocaleString("en-US");
	} else if (11 <= days && days <= 20) {
		return Math.ceil(d20).toLocaleString("en-US");
	} else if (1 <= days && days <= 10) {
		return Math.ceil(d10).toLocaleString("en-US");
	}
}

function printOut(newResult) {
	result.classList.add("result");
	result.removeAttribute("style");
	result.textContent = `${newResult}`;
}

function error() {
	result.classList.remove("result");
	result.style.color = "red";
	result.style.fontSize = "1rem";
	result.textContent = `Vui lòng nhập số ngày bảo hiểm`;
}

function formatNo(element, newResult) {
	if (element.value == "") return;
	element.value = newResult;
}

// force number input only for input
function onlyNumber(element) {
	element.value = element.value.replace(/(?![0-9])./gim, "");
}

// convert numbers to have seperator
function AddComma(element) {
	element.value = element.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
