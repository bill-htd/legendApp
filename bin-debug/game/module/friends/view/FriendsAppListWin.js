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
var FriendsAppListWin = (function (_super) {
    __extends(FriendsAppListWin, _super);
    function FriendsAppListWin() {
        var _this = _super.call(this) || this;
        _this.panelList = [];
        _this.name = "\u7533\u8BF7";
        return _this;
    }
    FriendsAppListWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btn_allNo, this.onTap);
        this.addTouchEvent(this.btn_allYes, this.onTap);
        this.list_appList.itemRenderer = FriendAppListItemRender;
        this.list_appList.dataProvider = Friends.ins().appList;
        this.observe(Friends.ins().postFriendChange, this.updateView);
        this.updateView();
        this.panelList = Friends.ins().appList.source;
    };
    FriendsAppListWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.btn_allNo, this.onTap);
        this.removeTouchEvent(this.btn_allYes, this.onTap);
        this.removeObserve();
        WatcherUtil.removeFromArrayCollection(this.list_appList.dataProvider);
        this.list_appList.dataProvider = null;
    };
    FriendsAppListWin.prototype.onTap = function (evt) {
        switch (evt.target) {
            case this.btn_allYes:
                for (var _i = 0, _a = this.panelList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    Friends.ins().sendAgreeApp(item.id, 1);
                }
                break;
            case this.btn_allNo:
                for (var _b = 0, _c = this.panelList; _b < _c.length; _b++) {
                    var item = _c[_b];
                    Friends.ins().sendAgreeApp(item.id, 0);
                }
                break;
        }
    };
    FriendsAppListWin.prototype.updateView = function () {
        if (this.group_shenqing)
            this.group_shenqing.visible = (Friends.ins().appList.length == 0);
    };
    return FriendsAppListWin;
}(BaseComponent));
__reflect(FriendsAppListWin.prototype, "FriendsAppListWin");
ViewManager.ins().reg(FriendsAppListWin, LayerManager.UI_Main);
//# sourceMappingURL=FriendsAppListWin.js.map