
cc.Class({
    extends: cc.Component,

    properties: {
        loadingLabel: cc.Label
    },

    onLoad() {
        var timeCallback = function () {
            this.loadingLabel.string += '.';
            console.log(this.loadingLabel.string)
            if (this.loadingLabel.string == 'Loading...') {
                cc.director.loadScene(window.Global.to);
            }
        }
        this.schedule(timeCallback, 1, 1, 1);
    }
});
