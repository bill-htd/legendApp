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
var FBChallengeRankWin = (function (_super) {
    __extends(FBChallengeRankWin, _super);
    function FBChallengeRankWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChuangtianguanRankSkin";
        return _this;
    }
    FBChallengeRankWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    FBChallengeRankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.bgClose, this.onClick);
        this.rankModel = param[0];
        this.list0.itemRenderer = FBChallengeRankItem;
        this.init();
    };
    FBChallengeRankWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    FBChallengeRankWin.prototype.init = function () {
        var copyList = this.rankModel.getDataList();
        var rankDataList = [];
        for (var i in copyList) {
            if (!copyList[i].count)
                break;
            rankDataList.push(copyList[i]);
        }
        this.list0.dataProvider = new eui.ArrayCollection(rankDataList);
        var myRankData = rankDataList[this.rankModel.selfPos - 1];
        var info;
        var nameCfg;
        if (myRankData) {
            info = GlobalConfig.FbChallengeConfig[myRankData.count];
            nameCfg = GlobalConfig.FbChNameConfig[info.group];
            this.myRank.text = "我的排名：" + this.rankModel.selfPos;
        }
        else {
            var skModel = SkyLevelModel.ins();
            info = GlobalConfig.FbChallengeConfig[skModel.cruLevel];
            nameCfg = GlobalConfig.FbChNameConfig[info.group];
            this.myRank.text = "我的排名：未上榜";
        }
        if (info && nameCfg)
            this.myNum.text = "" + nameCfg.name + info.layer + "\u5C42";
    };
    FBChallengeRankWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return FBChallengeRankWin;
}(BaseEuiView));
__reflect(FBChallengeRankWin.prototype, "FBChallengeRankWin");
ViewManager.ins().reg(FBChallengeRankWin, LayerManager.UI_Popup);
//# sourceMappingURL=FBChallengeRankWin.js.map