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
var HunShouSweepWin = (function (_super) {
    __extends(HunShouSweepWin, _super);
    function HunShouSweepWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "hunshouSweepSkin";
        return _this;
    }
    HunShouSweepWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
    };
    HunShouSweepWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._id = args[0];
        this._rewards = args[1];
        this.addTouchEvent(this, this.onTouch);
        this.update();
    };
    HunShouSweepWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
    };
    HunShouSweepWin.prototype.update = function () {
        this.reward.dataProvider = new ArrayCollection(this._rewards);
        this.times.textFlow = TextFlowMaker.generateTextFlow("|c:" + (Hungu.ins().hunShouFBTimes ? 0x35E62B : 0xFF0000) + "&T:" + Hungu.ins().hunShouFBTimes + "|");
        this.fbName.text = GlobalConfig.FsFbConfig[this._id].fbName;
    };
    HunShouSweepWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.nextBtn:
                if (!Hungu.ins().hunShouFBTimes) {
                    UserTips.ins().showTips("\u5269\u4F59\u6B21\u6570\u4E0D\u8DB3");
                    return;
                }
                Hungu.ins().sweepHunShouFB();
                break;
        }
    };
    return HunShouSweepWin;
}(BaseEuiView));
__reflect(HunShouSweepWin.prototype, "HunShouSweepWin");
ViewManager.ins().reg(HunShouSweepWin, LayerManager.UI_Popup);
//# sourceMappingURL=HunShouSweepWin.js.map