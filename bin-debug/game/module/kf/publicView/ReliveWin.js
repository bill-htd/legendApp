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
var ReliveWin = (function (_super) {
    __extends(ReliveWin, _super);
    function ReliveWin() {
        var _this = _super.call(this) || this;
        _this.remainM = 0;
        _this.skinName = "ReliveSkin";
        return _this;
    }
    ReliveWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.remainM = param[0];
        var killer = param[1];
        if (killer)
            this.killTips.textFlow = new egret.HtmlTextParser().parser("\u4F60\u88AB" + StringUtils.addColor("" + killer, "#23C42A") + "\u51FB\u8D25");
        this.reliveTimesTxt.text = this.remainM + "秒";
        TimerManager.ins().doTimer(1000, this.remainM, this.refushLabel, this, this.overTime, this);
    };
    ReliveWin.prototype.refushLabel = function () {
        this.remainM--;
        this.reliveTimesTxt.text = this.remainM + "秒";
        if (this.remainM <= 0)
            this.overTime();
    };
    ReliveWin.prototype.overTime = function () {
        ViewManager.ins().close(this);
    };
    return ReliveWin;
}(BaseEuiView));
__reflect(ReliveWin.prototype, "ReliveWin");
ViewManager.ins().reg(ReliveWin, LayerManager.UI_Popup);
//# sourceMappingURL=ReliveWin.js.map