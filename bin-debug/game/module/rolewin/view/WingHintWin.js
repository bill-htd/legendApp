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
var WingHintWin = (function (_super) {
    __extends(WingHintWin, _super);
    function WingHintWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    WingHintWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WingWarnTips";
    };
    WingHintWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.up, this.onClick);
        this.addTouchEvent(this.BG, this.onClick);
        this.type = param[0];
        this.index = param[1];
        this.data = param[2];
        this.lastTimeDown = Math.floor((DateUtils.formatMiniDateTime(this.data.clearTime) - GameServer.serverTime) / 1000);
        this.lastTimeDown = (DateUtils.formatMiniDateTime(this.data.clearTime) - GameServer.serverTime) / 1000;
        this.lastTimeDown = Math.max(0, this.lastTimeDown);
        this.desc.textFlow = TextFlowMaker.generateTextFlow("\u4F60\u7684\u7FBD\u7FFC\u6709\u795D\u798F\u503C\uFF1A|C:0xf8b141&T:" + this.data.exp + "|,\u5C06\u5728|C:0xf3311e&T:" + DateUtils.getFormatBySecond(this.lastTimeDown, 1) + "|\u6E05\u7A7A\uFF0C\u8BF7\u5C3D\u5FEB\u5347\u9636?");
    };
    WingHintWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onClick);
        this.removeTouchEvent(this.up, this.onClick);
        this.removeTouchEvent(this.BG, this.onClick);
    };
    WingHintWin.prototype.onClick = function (e) {
        ViewManager.ins().close(WingHintWin);
        switch (e.currentTarget) {
            case this.closeBtn:
                if (this.type == 1) {
                    var view = ViewManager.ins().getView(RoleWin);
                    view.setTabSelectedIndex(this.index);
                }
                else if (this.type == 2) {
                    ViewManager.ins().close(RoleWin);
                }
                break;
        }
        Wing.hint = !this.nextHint.selected;
    };
    return WingHintWin;
}(BaseEuiView));
__reflect(WingHintWin.prototype, "WingHintWin");
ViewManager.ins().reg(WingHintWin, LayerManager.UI_Popup);
//# sourceMappingURL=WingHintWin.js.map