/**
 * Created by admin on 2018/3/8.
 */
function coverDate() {
	let date = new Date();
	let fullYear = date.getFullYear();
	let fullMonth = date.getMonth() + 1;
	if (fullMonth < 10) {
		fullMonth = 0 + "" + fullMonth + "";
	}
	let fullDay = date.getDate();
	if (fullDay < 10) {
		fullDay = 0 + "" + fullDay;
	}
	let hours = date.getHours();
	if (hours < 10) {
		hours = 0 + "" + hours;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = 0 + "" + minutes;
	}
	let seconds = date.getSeconds();
	if (seconds < 10) {
		seconds = 0 + "" + seconds;
	}
	return fullYear + "-" + fullMonth + "-" + fullDay + " " + hours + ":" + minutes + ":" + seconds;
};

//userid
function addZero(v) {
	if (v < 10) return '0' + v;
	return v.toString()
}
function createUserId() {
	let d = new Date();
	let time = d.getFullYear().toString() + addZero(d.getMonth() + 1) + addZero(d.getDate()) + addZero(d.getHours()) + addZero(d.getMinutes()) + addZero(d.getSeconds());
	let redom = Math.round(Math.random() * 100);
	return time + addZero(redom);
}
module.exports.createUserId = createUserId;
module.exports.coverDate = coverDate;