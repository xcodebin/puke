var socket
cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        // // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!'
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
});
