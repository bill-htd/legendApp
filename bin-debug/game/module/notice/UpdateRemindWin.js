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
var UpdateRemindWin = (function (_super) {
    __extends(UpdateRemindWin, _super);
    function UpdateRemindWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "updateRemindSkin";
        return _this;
    }
    UpdateRemindWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    UpdateRemindWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.onTouch);
        var skin = param[0];
        if (skin && skin != this.skinName)
            this.skinName = skin;
    };
    UpdateRemindWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
            case this.btn:
                ViewManager.ins().close(this);
                if (e.target == this.btn)
                    ViewManager.ins().open(FuliWin, 4);
                break;
        }
    };
    return UpdateRemindWin;
}(BaseEuiView));
__reflect(UpdateRemindWin.prototype, "UpdateRemindWin");
ViewManager.ins().reg(UpdateRemindWin, LayerManager.UI_Popup);
//# sourceMappingURL=UpdateRemindWin.js.map