var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BlackListWin = (function (_super) {
    __extends(BlackListWin, _super);
    function BlackListWin() {
        var _this = _super.call(this) || this;
        _this.name = "\u9ED1\u540D\u5355";
        return _this;
    }
    BlackListWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.list_blackList.itemRenderer = BlackListItemRender;
        this.list_blackList.dataProvider = Friends.ins().blackList;
        this.observe(Friends.ins().postFriendChange, this.updateView);
        Friends.ins().sendBlackList();
        this.updateView();
    };
    BlackListWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeObserve();
        WatcherUtil.removeFromArrayCollection(this.list_blackList.dataProvider);
        this.list_blackList.dataProvider = null;
    };
    BlackListWin.prototype.onTap = function (evt) {
        switch (evt.target) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(BlackListWin);
                break;
        }
    };
    BlackListWin.prototype.updateView = function () {
        this.label_num.text = +this.list_blackList.dataProvider.length + "/" + GlobalConfig.FriendLimit.blacklistLen;
        if (this.group_pingbi)
            this.group_pingbi.visible = (Friends.ins().blackList.length == 0);
    };
    return BlackListWin;
}(BaseComponent));
__reflect(BlackListWin.prototype, "BlackListWin");
ViewManager.ins().reg(BlackListWin, LayerManager.UI_Main);
//# sourceMappingURL=BlackListWin.js.map