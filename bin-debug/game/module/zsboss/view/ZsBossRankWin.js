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
var ZsBossRankWin = (function (_super) {
    __extends(ZsBossRankWin, _super);
    function ZsBossRankWin() {
        return _super.call(this) || this;
    }
    ZsBossRankWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZSBossJoinSkin";
        this.isTopLevel = true;
    };
    ZsBossRankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.observe(ZsBoss.ins().postRankInfo, this.refushListInfo);
        this.refushListInfo();
    };
    ZsBossRankWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeObserve();
    };
    ZsBossRankWin.prototype.refushListInfo = function () {
        this.list.dataProvider = new eui.ArrayCollection(ZsBoss.ins().bossRankList);
    };
    ZsBossRankWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ZsBossRankWin;
}(BaseEuiView));
__reflect(ZsBossRankWin.prototype, "ZsBossRankWin");
ViewManager.ins().reg(ZsBossRankWin, LayerManager.UI_Main);
//# sourceMappingURL=ZsBossRankWin.js.map