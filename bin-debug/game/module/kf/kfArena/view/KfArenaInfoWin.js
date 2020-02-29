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
var KfArenaInfoWin = (function (_super) {
    __extends(KfArenaInfoWin, _super);
    function KfArenaInfoWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KfArenaInfoSkin";
        return _this;
    }
    KfArenaInfoWin.prototype.childrenCreated = function () {
        this.list.itemRenderer = KfArenaDataItem;
        this.itemDt = new eui.ArrayCollection();
        this.list.dataProvider = this.itemDt;
    };
    KfArenaInfoWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.sureBtn, this.onTouch);
        this.observe(KfArenaSys.ins().postRankInfo, this.updata);
        this.updata(param[0]);
    };
    KfArenaInfoWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
            case this.sureBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    KfArenaInfoWin.prototype.updata = function (dt) {
        var modeSys = KfArenaSys.ins();
        this.blueScore.text = modeSys.scoreA + "";
        this.redScore.text = modeSys.scoreB + "";
        this.itemDt.replaceAll(dt);
    };
    return KfArenaInfoWin;
}(BaseEuiView));
__reflect(KfArenaInfoWin.prototype, "KfArenaInfoWin");
ViewManager.ins().reg(KfArenaInfoWin, LayerManager.UI_Popup);
//# sourceMappingURL=KfArenaInfoWin.js.map