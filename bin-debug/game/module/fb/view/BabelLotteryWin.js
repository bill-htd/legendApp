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
var BabelLotteryWin = (function (_super) {
    __extends(BabelLotteryWin, _super);
    function BabelLotteryWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "tttZhuanpan";
        return _this;
    }
    BabelLotteryWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addCustomEvent();
        this.updateView();
    };
    BabelLotteryWin.prototype.addCustomEvent = function () {
        this.addTouchEvent(this.choujiangBtn, this.getLottery);
        this.addTouchEvent(this.closeBtn, this.close);
        this.observe(UserFb2.ins().postLotteryReward, this.onGetRewards);
        this.observe(UserFb2.ins().postUpDataInfo, this.refreshView);
    };
    BabelLotteryWin.prototype.getLottery = function () {
        if (SkyLevelModel.ins().lotteryRemainTimes == 0) {
            UserTips.ins().showTips("没有抽奖次数，每通关10层可抽取1次");
        }
        else if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
        }
        else {
            UserFb2.ins().sendBeginLottery();
        }
    };
    BabelLotteryWin.prototype.onGetRewards = function () {
        this.beginLottery(SkyLevelModel.ins().lotteryAwardIndex);
    };
    BabelLotteryWin.prototype.refreshView = function () {
        var _this = this;
        if (SkyLevelModel.ins().lotteryUseTimes % 10 == 0) {
            setTimeout(function () {
                _this.updateView();
            }, 2000);
        }
        else {
            this.updateView();
        }
    };
    BabelLotteryWin.prototype.beginLottery = function (index) {
        var _this = this;
        var rotat = 360 * 4 + (index - 1) * 36;
        var tween = egret.Tween.get(this.tttzhi);
        this.rolling = true;
        tween.to({ "rotation": rotat }, 4000, egret.Ease.circOut).call(function () {
            UserFb2.ins().sendGetReward();
            _this.flyItem(_this["item" + (index - 1)]);
            setTimeout(function () {
                _this.rolling = false;
                _this.refreshView();
            }, 2000);
        }, this);
    };
    BabelLotteryWin.prototype.flyItem = function (item) {
        var itemBase = new ItemBase();
        itemBase.x = item.x;
        itemBase.y = item.y;
        itemBase.data = item.itemIcon.data;
        itemBase.anchorOffsetX = itemBase.width / 2;
        itemBase.anchorOffsetY = itemBase.height / 2;
        item.parent.addChild(itemBase);
        GameLogic.ins().postFlyItemEx(itemBase);
    };
    BabelLotteryWin.prototype.updateView = function () {
        this.num.text = SkyLevelModel.ins().lotteryRemainTimes.toString();
        var index = SkyLevelModel.ins().lotteryUseTimes;
        var m = parseInt((index / 10).toString()) * 10 + 10;
        var cfg = GlobalConfig.FbChallengeLotteryConfig[m];
        var count = cfg.group.length;
        for (var i = 0; i < count; i++) {
            var item = this["item" + i];
            item.itemIcon.data = cfg.group[i];
            var isGet = SkyLevelModel.ins().isGetLotteryAward(i + 1);
            item.rewardState(isGet);
        }
    };
    return BabelLotteryWin;
}(BaseEuiView));
__reflect(BabelLotteryWin.prototype, "BabelLotteryWin");
ViewManager.ins().reg(BabelLotteryWin, LayerManager.UI_Main);
//# sourceMappingURL=BabelLotteryWin.js.map