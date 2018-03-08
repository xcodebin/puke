cc.Class({
	extends: cc.Component,

	properties: {
		userName: {
			default: null,
			type: cc.EditBox
		},
		userPw: {
			default: null,
			type: cc.EditBox
		},
		userPw1: {
			default: null,
			type: cc.EditBox
		},

		code: {
			default: null,
			type: cc.EditBox
		},
		GVCLabel: {
			default: null,
			type: cc.Label
		},
		codeBtn: {
			default: null,
			type: cc.Button
		},
		showLabel: {
			default: null,
			type: cc.Label
		},
		message: cc.Node,
		messageLabel: {
			default: null,
			type: cc.Label
		},
		loginContain: cc.Node,
		registerContain: cc.Node,
		back: cc.Node,
		DTime: 60,
	},

	// use this for initialization
	onLoad: function () {
		this.GVCLabel.string = "获取验证码";
		//    this.GVCLabel1.string="获取验证码";
		this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
			console.log(111);
		}, this)
	},
	buttonClicked: function () {
		var self = this;
		if (this.userPw.string !== this.userPw1.string) {
			this.showLabel.string = '二次输入密码不一致';
		} else if (this.userName.string == "" || this.userPw.string == "" || this.userPw1.string == "" || this.code.string == "") {
			this.showLabel.string = '请填写完整资料';
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://xcodebin.tunnel.qydev.com/userapi/regist", true);
			xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
			let json = {
				phone: this.userName.string,
				passwd: this.userPw.string,
				code: this.code.string
			}
			xhr.send(JSON.stringify(json));
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && (xhr.status >= 0 && xhr.status < 400)) {
					var response = xhr.responseText;
					console.log(response);
					var a = JSON.parse(response);
					if (a.status === 200) {
						cc.sys.localStorage.setItem("id", JSON.stringify(a.msg.id));
						self.message.active = true;
						self.messageLabel.string = '注册成功！';
						var timeCallback = function () {
							self.message.active = false;
							self.loginContain.active = true;
							self.registerContain.active = false;
						}
						self.schedule(timeCallback, 1.5, 0, 1.5);


					}
					else {
						self.message.active = true;

						self.messageLabel.string = a.msg.desc;
						var timeCallback = function () {
							self.message.active = false;
						}
						self.schedule(timeCallback, 1.5, 0, 1.5);

					}
				}
			}
		}
		var timeCallback = function () {
			this.showLabel.string = '';
		}
		self.schedule(timeCallback, 1.5, 0, 1.5);
	},

	ReduceTime: function () {
		var ccc = this;
		if (ccc.DTime > 0) {
			ccc.DTime--;
			ccc.GVCLabel.string = ccc.DTime + "s";
			this.codeBtn.interactable = false;
		}
		else {
			ccc.GVCLabel.string = "获取验证码";
			this.codeBtn.interactable = true;
			//this.DTime=60;
		}

	},

	//发送短信接口
	SendMessage: function () {

		var self = this;
		var phone = this.userName.string;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://xcodebin.tunnel.qydev.com/userapi/phone", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
		xhr.send(JSON.stringify({ "phone": phone }));
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status >= 0 && xhr.status < 400)) {
				var response = xhr.responseText;
				console.log(JSON.parse(response));
				var a = JSON.parse(response);
				if (a.status === 200) {
					if (self.DTime === 60) {
						self.schedule(function () {
							self.ReduceTime();
						}, 1);
					}
					self.DTime = 60;
					self.messageLabel.string = '发送成功！';
					self.message.active = true;

					var timeCallback = function () {
						self.message.active = false;
					}
					self.schedule(timeCallback, 1.5, 0, 1.5);
				}
				else {

					console.log("error--->" + a);
				}


			}

		};

	},

	backLogin: function () {
		this.loginContain.active = true;
		this.registerContain.active = false;
	}
});
