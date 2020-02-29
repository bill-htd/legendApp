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
var PaoDianResultWin = (function (_super) {
    __extends(PaoDianResultWin, _super);
    function PaoDianResultWin() {
        var _this = _super.call(this) || this;
        _this._time = 5;
        _this.skinName = "PointResultSkin";
        return _this;
    }
    PaoDianResultWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.rankList.itemRenderer = PaoDianResultItemRender;
        this.myRewarrd.itemRenderer = PaoDianIconItemRender;
        this._arrayCollect = new ArrayCollection();
        this.myRewarrd.dataProvider = this._arrayCollect;
    };
    PaoDianResultWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.observe(PaoDianCC.ins().postMyInfo, this.updateMyScore);
        this.timerGroup.visible = true;
        this.info.text = this._time + "";
        TimerManager.ins().doTimer(1000, 5, this.repeat, this);
        this.updateMyScore();
        this.rankList.dataProvider = new eui.ArrayCollection(args[0]);
    };
    PaoDianResultWin.prototype.updateMyScore = function () {
        this._arrayCollect.source = [["ZSprestige", PaoDianCC.ins().jadeChips], ["ZSexp", PaoDianCC.ins().shenBingExp]];
    };
    PaoDianResultWin.prototype.repeat = function () {
        this._time--;
        if (this._time > 0)
            this.info.text = this._time + "";
        else
            this.timerGroup.visible = false;
    };
    PaoDianResultWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    PaoDianResultWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                UserFb.ins().sendExitFb();
                ViewManager.ins().close(this);
                break;
        }
    };
    return PaoDianResultWin;
}(BaseEuiView));
__reflect(PaoDianResultWin.prototype, "PaoDianResultWin");
ViewManager.ins().reg(PaoDianResultWin, LayerManager.UI_Main);
//# sourceMappingURL=PaoDianResultWin.js.map