//! BẢO HIỂM DU LỊCH
const form = document.querySelector("#form");
const result = document.querySelector(".result");
const sum = document.querySelector(".sum");
const days = document.querySelector(".days");
const discount = document.querySelector(".discount");

sum.addEventListener("focus", function () {
	sum.value = "";
	sum.type = "number";
});

sum.addEventListener("focusout", function () {
	const newNum = parseInt(sum.value);
	const formatNum = newNum.toLocaleString();
	sum.type = "text";
	formatNo(sum, formatNum);
});

discount.addEventListener("focus", function () {
	discount.value = "";
	discount.type = "number";
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
		return lastRate.toLocaleString();
	} else if (60 <= days && days <= 90) {
		return d90.toLocaleString();
	} else if (21 <= days && days <= 60) {
		return d60.toLocaleString();
	} else if (11 <= days && days <= 20) {
		return d20.toLocaleString();
	} else if (1 <= days && days <= 10) {
		return d10.toLocaleString();
	}
}

function printOut(newResult) {
	result.textContent = `${newResult} VNĐ`;
}
function formatNo(element, newResult) {
	if (element.value == "") return;
	element.value = newResult;
}
