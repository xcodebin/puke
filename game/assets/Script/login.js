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
        home: cc.Node,
        loginContain: cc.Node,
        registerContain: cc.Node,
        message: cc.Node,
        messageLabel: {
            default: null,
            type: cc.Label
        },
        back: cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
        window.socket.on('addChat', function (data) {
            console.log(data);
        });
    },

    // called every frame
    update: function (dt) {

    },
    registerBtnClicked: function () {
        this.loginContain.active = false;
        this.registerContain.active = true;
    },
    login: function () {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://xcodebin.tunnel.qydev.com/userapi/login", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        let json = {
            phone: this.userName.string,
            passwd: this.userPw.string
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
                    self.messageLabel.string = '登录成功！';
                    var timeCallback = function () {
                        self.message.active = false;
                        self.loginContain.active = true;
                        self.registerContain.active = false;
                        cc.director.loadScene("loading")
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
    },
    backHome: function () {
        this.home.active = true;
        this.loginContain.active = false;
    },
    goToLogin: function () {
        this.loginContain.active = true;
        this.home.active = false;
    }
});
