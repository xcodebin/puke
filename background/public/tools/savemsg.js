let mysql = require("mysql");
let sqlcmd = require("./sqlcmd");
let common = require("./commonTools");


function save_msg(param, callback) {
	let insertuser = sqlcmd.Insert({user: param.user, msg: param.msg, time: common.coverDate(), id: param.id}, 'chat');
	sqlcmd.Doit(insertuser, (a, b) => {
		// console.info(a); //输出错误
		if (a == null) {
			let id = b.insertId;
			callback({status: true, msg: id});
		} else {
			callback({status: false, msg: '保存失败'});
		}
	})
}
//
function Update_isread(id, callback) {
	try {
		let insert = sqlcmd.Update({isRead: 1}, 'message', {id: id});
		sqlcmd.Doit(insert, (a, b) => {
			if (a == null) {

				callback({status: true, msg: '修改成功'});
			} else {
				callback({status: false, msg: '查询错误'});
			}
		})
	} catch (e) {
		callback({status: false, msg: 'sql语句错误'});
	}
}
//查用户状态
function select_Status(userid, callback) {
	try {
		let select = new sqlcmd.Select('user', ['Status']).Where({User_Id: userid}).query;
		sqlcmd.Doit(select, (a, b) => {
			if (a == null) {
				let Status = b[0].Status
				callback({status: true, msg: Status});
			} else {
				callback({status: false, msg: '查询错误'});
			}
		})
	} catch (e) {
		callback({status: false, msg: 'sql语句错误'});
	}
}

function setReturnJson(status, msg) {
	if (typeof status !== 'boolean' && typeof status !== 'number') {
		status = false;
	}
	if (typeof msg !== 'string') {
		msg = '';
	}
	return {
		'status': status,
		'msg': msg
	};
}

module.exports.save_msg = save_msg;
module.exports.Update_isread = Update_isread;
module.exports.select_Status = select_Status;
