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
	// res.redirect(307,'http://xcodebin.tunnel.qydev.com/userapi/api');
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
	let select = new sqlcmd.Select('user', ['User_Id']).Where({Phone: req.body.phone}).query;
	sqlcmd.Doit(select, (a, b) => {
		if (a == null && b[0]) {
			console.log(a, b[0]);
			returnmsg.status = 101;
			returnmsg.msg.desc = "手机号已注册";
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

});

router.post('/login', function (req, res) {
	let returnmsg = {status: 200, msg: {id: 0, desc: "登录成功"}};
	let check = checkPhone.checkMobile(req.body.phone);
	if (req.body.phone == null || req.body.passwd == null || check.status != true) {
		returnmsg.status = 101;
		returnmsg.msg.desc = "请输入正确的账号/密码";
		res.send(returnmsg);
		return;
	}
	let select = new sqlcmd.Select('user', ['User_Id', 'Password']).Where({Phone: req.body.phone}).query;
	sqlcmd.Doit(select, (a, b) => {
		if (a == null && b[0]) {
			console.log(a, b[0]);
			if (b[0].Password != req.body.passwd) {
				returnmsg.status = 101;
				returnmsg.msg.desc = "密码错误";
			}
			returnmsg.msg.id = b[0].User_Id;
			res.send(returnmsg);
		} else {
			console.log('err', a, b);
			if (a == null && b.length <= 0) {
				returnmsg.status = 101;
				returnmsg.msg.desc = "请先注册";
				res.send(returnmsg);
			}
		}
	});
});


module.exports = router;