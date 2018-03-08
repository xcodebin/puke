let express = require('express');
let router = express.Router();
let common = require("../public/tools/commonTools");
let sqlcmd = require('../public/tools/sqlcmd');

let checkPhone = require('../public/tools/Mobile');

let config = require('../public/tools/config');

router.get('/', function (req, res, next) {
	res.send('{"status":"success"}');
});

router.post('/phone', function (req, res) {
	res.send({status: 200, code: 123});
});

router.post('/regist', function (req, res) {
	let returnmsg = {status: 200, msg: {id: 0, desc: ""}};
	let check = checkPhone.checkMobile(req.body.phone);
	if (req.body.phone == null || req.body.passwd == null || req.body.code == null || check.status != true) {
		returnmsg.status = 101;
		returnmsg.msg.desc = "上传参数错误";
		res.send(returnmsg);
		return;
	}
	let uid = common.createUserId();
	let sqlstr = sqlcmd.Insert({
		User_Id: uid, Password: req.body.passwd, Phone: req.body.phone, CreateDate: common.coverDate()
	}, "user");
	sqlcmd.Doit(sqlstr, function (err, result, fields) {
		// console.log(err, result, fields);
		returnmsg.msg.id = uid;
		res.send(returnmsg);
	});

});
router.post('/login', function (req, res) {
	let returnmsg = {status: 200, msg: {id: 0, desc: ""}};
	let check = checkPhone.checkMobile(req.body.phone);
	if (req.body.phone == null || req.body.passwd == null || req.body.code == null || check.status != true) {
		returnmsg.status = 101;
		returnmsg.msg.desc = "上传参数错误";
		res.send(returnmsg);
		return;
	}
	let uid = common.createUserId();
	let sqlstr = sqlcmd.Insert({
		User_Id: uid, Password: req.body.passwd, Phone: req.body.phone, CreateDate: common.coverDate()
	}, "user");
	sqlcmd.Doit(sqlstr, function (err, result, fields) {
		// console.log(err, result, fields);
		returnmsg.msg.id = uid;
		res.send(returnmsg);
	});

});


module.exports = router;