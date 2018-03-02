var mysql=require("mysql");
var sqlcmd=require("./sqlcmd");
function coverDate() {
	var date = new Date();
	var fullYear = date.getFullYear();
	var fullMonth = date.getMonth() + 1;
	if (fullMonth < 10) {
		fullMonth = 0 + "" + fullMonth + "";
	};
	var fullDay = date.getDate();
	if (fullDay < 10) {
		fullDay = 0 + "" + fullDay;
	};
	var hours = date.getHours();
	if (hours < 10) {
		hours = 0 + "" + hours;
	};
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = 0 + "" + minutes;
	};
	var seconds = date.getSeconds();
	if (seconds < 10) {
		seconds = 0 + "" + seconds;
	}
	return fullYear + "-" + fullMonth + "-" + fullDay + " " + hours + ":" + minutes + ":" + seconds;
};

function save_msg(param,callback){
   var insertuser=sqlcmd.Insert({fromid:param.fromid,toid:param.toid,msg:param.msg,createTime:coverDate()},'message');
    sqlcmd.Doit(insertuser, (a, b) => {
       if(a==null){
           var id=b.insertId;
            callback({status:true,msg:id});
       }else{
            callback({status:false,msg:'保存失败'});
       }
    })
}
//
function Update_isread(id,callback){
    try{
      var insert = sqlcmd.Update({ isRead:1 }, 'message',{id:id });
             sqlcmd.Doit(insert,(a,b)=>{
                if(a==null){
                    
                     callback({status:true,msg:'修改成功'});
                 }else{
                     callback({status:false,msg:'查询错误'});
                 }
             })
    }catch(e){
        callback({status:false,msg:'sql语句错误'});
    }
}
//查用户状态
function select_Status(userid,callback){
    try{
       var select=new sqlcmd.Select('user',['Status']).Where({User_Id:userid}).query;
             sqlcmd.Doit(select,(a,b)=>{
                 if(a==null){
                     var Status=b[0].Status
                     callback({status:true,msg:Status});
                 }else{
                     callback({status:false,msg:'查询错误'});
                 }
             })
    }catch(e){
        callback({status:false,msg:'sql语句错误'});
    }
}

 function  setReturnJson(status, msg){ 
        if(typeof status !== 'boolean' && typeof status !== 'number'){
            status = false;
        }
        if(typeof msg !== 'string'){
            msg = '';
        }
        return {
            'status': status,
              'msg': msg
        };
    }

 module.exports.save_msg=save_msg;
 module.exports.Update_isread=Update_isread;
 module.exports.select_Status=select_Status;
