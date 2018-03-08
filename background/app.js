var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index'); //正常的post请求以及后台管理页面路由
var userapi = require('./routes/userapi');
var cors = require('cors');
var app = express();
app.use(cors());//配置跨域

var config = require('./public/tools/config');
var cards = require('./model/card');
// var clisent = require("redis"), redis = clisent.createClient(config.redis.port, config.redis.host, config.redis.opts); // todo 链接redis

var savemsg = require('./public/tools/savemsg');//链接mysql

var servers = require('http').Server(app);//启动后台websocket服务器
var io = require('socket.io')(servers);

servers.listen(8866);
io.on('connection', function (socket) {
	console.info('a connecter connected');
	socket.emit('to custom', {hello: 'world'});
	socket.on('to server', function (data) {
		// console.log('Toserver', data); //测试链接
	});
	socket.on('sendChat', function (data) {
		var name = data.name;
		if (name) {
			var param = {
				user: data.name,
				id: data.content,
				msg: data.content
			};
			console.log(param);
			savemsg.save_msg(param, (res) => {
				console.log(res);
				if (res.status == true) {
					io.emit('addChat', {name: name, text: name + '说:' + data.content});
				}
			});
		}
	});
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/userapi', userapi);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
