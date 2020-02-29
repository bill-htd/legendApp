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
var FriendsAddWin = (function (_super) {
    __extends(FriendsAddWin, _super);
    function FriendsAddWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendsAddWinSkin";
        return _this;
    }
    FriendsAddWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btn_add, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.shadow, this.onTap);
        this.observe(Friends.ins().postFriendChange, this.updateView);
    };
    FriendsAddWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    FriendsAddWin.prototype.onTap = function (evt) {
        switch (evt.target) {
            case this.closeBtn0:
                ViewManager.ins().close(FriendsAddWin);
                break;
            case this.btn_add:
                if (this.editText_name.text == Actor.myName) {
                    UserTips.ins().showTips("不能添加自己为好友");
                    return;
                }
                if (this.editText_name.text != "") {
                    Friends.ins().sendAddFriend(0, this.editText_name.text);
                }
                ViewManager.ins().close(FriendsAddWin);
                break;
            case this.shadow:
                ViewManager.ins().close(this);
                break;
        }
    };
    FriendsAddWin.prototype.updateView = function () {
    };
    return FriendsAddWin;
}(BaseEuiView));
__reflect(FriendsAddWin.prototype, "FriendsAddWin");
ViewManager.ins().reg(FriendsAddWin, LayerManager.UI_Popup);
//# sourceMappingURL=FriendsAddWin.js.map