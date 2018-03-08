cc.Class({
  extends: cc.Component,
  onLoad: function () {
    if (cc.sys.isNative) {
      window.io = SocketIO;
    } else {
      // window.io = require('./socket.io');
    }
    window.socket = io.connect('http://xcodebins.tunnel.qydev.com');
  },
  // socket: function () {
  //   return window.io.connect('http://xcodebins.tunnel.qydev.com');
  //   //   return window.io.connect('http://192.168.2.155:7777');
  // }

});