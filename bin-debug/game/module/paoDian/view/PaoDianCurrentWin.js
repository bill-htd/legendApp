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
var PaoDianCurrentWin = (function (_super) {
    __extends(PaoDianCurrentWin, _super);
    function PaoDianCurrentWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PointCurrentTipsSkin";
        return _this;
    }
    PaoDianCurrentWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PaoDianCurrentWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClose);
        this.observe(PaoDianCC.ins().postMyInfo, this.update);
        this.observe(PaoDianCC.ins().postAreaChange, this.update);
        this.update();
    };
    PaoDianCurrentWin.prototype.update = function () {
        this.yupeiNum.text = "威望" + PaoDianCC.ins().jadeChips;
        this.gwexpNum.text = "经验" + PaoDianCC.ins().shenBingExp;
        var cfg = GlobalConfig.PassionPointAwardConfig[PaoDianCC.ins().areaId];
        this.currentArea.text = cfg ? cfg.times + "倍区域" : "";
        var num = cfg ? cfg.reward[1].count : 0;
        num = Math.floor(num / 1000) / 10;
        this.Speed.text = GlobalConfig.PassionPointConfig.efficiencyDesc.replace("{0}", (cfg ? cfg.reward[0].count : 0) + "").replace("{1}", num + "");
        this.currentArea.textColor = this.yupeiNum.textColor = this.gwexpNum.textColor = this.Speed.textColor = cfg ? cfg.color : this.Speed.textColor;
    };
    PaoDianCurrentWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onClose);
        this.removeObserve();
    };
    PaoDianCurrentWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    return PaoDianCurrentWin;
}(BaseEuiView));
__reflect(PaoDianCurrentWin.prototype, "PaoDianCurrentWin");
ViewManager.ins().reg(PaoDianCurrentWin, LayerManager.Main_View);
//# sourceMappingURL=PaoDianCurrentWin.js.map