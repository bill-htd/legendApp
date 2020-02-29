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
var WingAttrWin = (function (_super) {
    __extends(WingAttrWin, _super);
    function WingAttrWin() {
        return _super.call(this) || this;
    }
    WingAttrWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WingAttrSkin";
    };
    WingAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curRole = param[0];
        this.setRoleAttr(this.curRole);
        this.addTouchEndEvent(this, this.otherClose);
        this.addTouchEvent(this.closeBtn, this.onClose);
    };
    WingAttrWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
        this.removeTouchEvent(this.closeBtn, this.onClose);
    };
    WingAttrWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    WingAttrWin.prototype.otherClose = function (e) {
        if (e.target == this.bg || e.target instanceof eui.Button)
            return;
        ViewManager.ins().close(this);
    };
    WingAttrWin.prototype.setRoleAttr = function (roleId) {
        this.wingsData = SubRoles.ins().getSubRoleByIndex(roleId).wingsData;
        var config = GlobalConfig.WingLevelConfig[this.wingsData.lv];
        this.attr.text = AttributeData.getAttStr(config.attr, 1);
    };
    return WingAttrWin;
}(BaseEuiView));
__reflect(WingAttrWin.prototype, "WingAttrWin");
ViewManager.ins().reg(WingAttrWin, LayerManager.UI_Main);
//# sourceMappingURL=WingAttrWin.js.map