cc.Class({
    extends: cc.Component,

    properties: {
        loginContain: cc.Node,
        registerContain: cc.Node,
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
        
    }
});
