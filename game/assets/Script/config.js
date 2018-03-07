cc.Class({
  extends: cc.Component,
  onLoad: function () {
    window.socket = io.connect('http://xcodebins.tunnel.qydev.com');
  },
  // socket: function () {
  //   return window.io.connect('http://xcodebins.tunnel.qydev.com');
  //   //   return window.io.connect('http://192.168.2.155:7777');
  // }

});