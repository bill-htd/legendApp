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
var BattleResultWin = (function (_super) {
    __extends(BattleResultWin, _super);
    function BattleResultWin() {
        var _this = _super.call(this) || this;
        _this._time = 5;
        _this.skinName = "BattleResultSkin";
        return _this;
    }
    BattleResultWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.rankList.itemRenderer = BattleResultItemRender;
        this.myRewarrd.itemRenderer = ItemBase;
    };
    BattleResultWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.observe(BattleCC.ins().postRankInfo, this.updateRank);
        this.observe(BattleCC.ins().postScoreChange, this.updateMyScore);
        this.timerGroup.visible = true;
        this.info.text = this._time + "";
        TimerManager.ins().doTimer(1000, 5, this.repeat, this);
        this.updateMyScore();
        this.updateRank();
    };
    BattleResultWin.prototype.updateRank = function () {
        this.rankList.dataProvider = new eui.ArrayCollection(BattleCC.ins().getRankTop(5));
    };
    BattleResultWin.prototype.updateMyScore = function () {
        var myRank = BattleCC.ins().myRank;
        this.myScore.text = BattleCC.ins().myScore + "";
        this.myRanking.text = myRank + "";
        var maxLen = Object.keys(GlobalConfig.CampBattlePersonalRankAwardConfig).length;
        var cfg = GlobalConfig.CampBattlePersonalRankAwardConfig[myRank > 0 && myRank <= maxLen ? myRank : maxLen];
        this.myRewarrd.dataProvider = new eui.ArrayCollection(cfg.award);
    };
    BattleResultWin.prototype.repeat = function () {
        this._time--;
        if (this._time > 0)
            this.info.text = this._time + "";
        else
            this.timerGroup.visible = false;
    };
    BattleResultWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    BattleResultWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                UserFb.ins().sendExitFb();
                ViewManager.ins().close(this);
                break;
        }
    };
    return BattleResultWin;
}(BaseEuiView));
__reflect(BattleResultWin.prototype, "BattleResultWin");
ViewManager.ins().reg(BattleResultWin, LayerManager.UI_Main);
//# sourceMappingURL=BattleResultWin.js.map