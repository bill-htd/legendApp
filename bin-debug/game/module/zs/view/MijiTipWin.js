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
var MijiTipWin = (function (_super) {
    __extends(MijiTipWin, _super);
    function MijiTipWin() {
        return _super.call(this) || this;
    }
    MijiTipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "MijiTipSkin";
        this.isTopLevel = true;
    };
    MijiTipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.item.data = param[0].id;
        var data = GlobalConfig.ItemConfig[GlobalConfig.MiJiSkillConfig[param[0].id].item];
        this.info.textFlow = TextFlowMaker.generateTextFlow1(data.name + "\n\n" + data.desc);
        this.power.text = "评分：" + GlobalConfig.MiJiSkillConfig[param[0].id].power;
        this.addTouchEvent(this, this.onClose);
    };
    MijiTipWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    MijiTipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onClose);
    };
    return MijiTipWin;
}(BaseEuiView));
__reflect(MijiTipWin.prototype, "MijiTipWin");
ViewManager.ins().reg(MijiTipWin, LayerManager.UI_Main);
//# sourceMappingURL=MijiTipWin.js.map