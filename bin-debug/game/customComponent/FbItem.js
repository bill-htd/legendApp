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
var FbItem = (function (_super) {
    __extends(FbItem, _super);
    function FbItem() {
        var _this = _super.call(this) || this;
        _this.isDouble = 0;
        _this.skinName = "DailyFbItemSkin";
        return _this;
    }
    FbItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.item.isShowName(false);
        this.starValue = 0;
    };
    FbItem.prototype.starSaoDang = function (isDouble) {
        if (isDouble === void 0) { isDouble = 0; }
        this.isDouble = isDouble;
        TimerManager.ins().doTimer(50, 20, this.refushBar, this, this.overPlay, this);
        this.barGaroup.visible = true;
        if (this.isDouble) {
            this.doublePrice.visible = false;
            this.barGaroup.x = this.doublePrice.x;
        }
        else {
            this.price.visible = false;
            this.barGaroup.x = this.price.x;
        }
        this.bar.labelFunction = function () {
            return "扫荡中";
        };
    };
    FbItem.prototype.refushBar = function () {
        if (this.isDouble) {
            this.doubleChallengeBtn.enabled = false;
        }
        else {
            this.challengeBtn.enabled = false;
        }
        this.starValue += 7;
        this.bar.value = this.starValue;
    };
    FbItem.prototype.overPlay = function () {
        if (this.starValue != 0) {
            this.barGaroup.visible = false;
            if (this.isDouble) {
                this.doublePrice.visible = true;
                this.doubleChallengeBtn.enabled = true;
            }
            else {
                this.price.visible = true;
                this.challengeBtn.enabled = true;
            }
            this.starValue = 0;
            UserFb.ins().sendAddCount(this.data, this.isDouble);
        }
    };
    FbItem.prototype.dataChanged = function () {
        this.bg.source = this.data + "bg";
        var config = GlobalConfig.DailyFubenConfig[this.data];
        this.item.data = config.showItem;
        if (config.zsLevel > 0) {
            var str = config.zsLevel + "转开启";
            var flag = UserZs.ins().lv >= config.zsLevel;
            if (config.id == GlobalConfig.ZhanLingConfig.fbIndex) {
                str = "开服" + GlobalConfig.ZhanLingConfig.openserverday + "天并达到" + config.zsLevel + "转开启";
                flag = UserZs.ins().lv >= config.zsLevel && GameServer.serverOpenDay + 1 >= GlobalConfig.ZhanLingConfig.openserverday;
            }
            this.levelRequire.text = flag ? "" : str;
            this.currentState = flag ? 'canChallenge' : 'noChallenge';
        }
        else {
            this.levelRequire.text = config.levelLimit + "级开启";
            this.currentState = Actor.level >= config.levelLimit ? 'canChallenge' : 'noChallenge';
        }
        this.levelRequire.visible = true;
        var fbInfos = UserFb.ins().getFbDataById(this.data);
        var count = fbInfos.getCount();
        var color = count > 0 ? "#40D016" : "#DFD1B5";
        this.redPoint.visible = count > 0;
        var resetCount = fbInfos.getResetCount();
        if (count > 0)
            this.count.textFlow = (new egret.HtmlTextParser()).parser("\u4ECA\u65E5\u6311\u6218\u6B21\u6570\uFF1A<font color=\"" + color + "\">1\u6B21</font>");
        else {
            this.count.textFlow = (new egret.HtmlTextParser()).parser("\u4ECA\u65E5\u53EF\u626B\u8361\u6B21\u6570\uFF1A<font color=\"" + color + "\">" + resetCount + "\u6B21</font>");
            this.redPoint.visible = DieGuide.ins().dieFbRedPoint(resetCount, this.data);
        }
        this.price.visible = (count == 0 && this.currentState == "canChallenge");
        if (Recharge.ins().franchise && fbInfos.isPass) {
            this.challengeBtn.label = count ? "\u5FEB\u901F\u6311\u6218" : "\u626B  \u8361";
        }
        else {
            if (UserZs.ins().lv >= config.sweepLevel && fbInfos.isPass)
                this.challengeBtn.label = count ? "\u5FEB\u901F\u6311\u6218" : "\u626B  \u8361";
            else
                this.challengeBtn.label = count ? "\u6311  \u6218" : "\u626B  \u8361";
        }
        this.challengeBtn.name = count ? "" : "add";
        this.challengeBtn.enabled = true;
        this.doublePrice.visible = this.doubleChallengeBtn.visible = false;
        this.doubleChallengeBtn.name = "double";
        var colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        this.challengeBtn.filters = [];
        this.count.verticalCenter = -45;
        this.count.right = 20;
        var nextCount = fbInfos.getNextVip();
        var price = 0;
        var doublePrice = 0;
        var discount = GlobalConfig.MonthCardConfig.sweepPrecent / 100;
        var addValue = Recharge.ins().monthDay > 0 ? 1 - discount : 1;
        if (count == 0) {
            if (resetCount <= 0) {
                switch (nextCount) {
                    case -1:
                        this.count.text = "\u4ECA\u65E5\u626B\u8361\u6B21\u6570\u5DF2\u7ECF\u7528\u5B8C";
                        this.count.verticalCenter = 0;
                        this.count.right = 50;
                        this.challengeBtn.visible = false;
                        this.price.visible = false;
                        this.doublePrice.visible = false;
                        this.levelRequire.visible = false;
                        break;
                    default:
                        if (UserVip.ins().lv < nextCount) {
                            this.count.textFlow = (new egret.HtmlTextParser()).parser(StringUtils.addColor("VIP" + nextCount, 0xe40202) + "可额外扫荡1次");
                            this.challengeBtn.filters = [new egret.ColorMatrixFilter(colorMatrix)];
                            this.doubleChallengeBtn.enabled = this.challengeBtn.enabled = false;
                        }
                        else {
                            this.count.text = "VIP" + nextCount + "\u53EF\u989D\u5916\u626B\u83611\u6B21";
                            this.doubleChallengeBtn.enabled = this.challengeBtn.enabled = true;
                        }
                        break;
                }
            }
            price = Math.floor(config.buyPrice[fbInfos.vipBuyCount] * addValue);
            this.price.setPrice(price);
            if (resetCount > 0 && config.buyDoublePrice) {
                if (Actor.level >= config.levelLimit)
                    this.doublePrice.visible = this.doubleChallengeBtn.visible = true;
                if (config.buyDoublePrice) {
                    doublePrice = config.buyDoublePrice[fbInfos.vipBuyCount] * addValue;
                    this.doublePrice.setPrice(doublePrice);
                }
            }
        }
        else {
            if (this.currentState == 'canChallenge') {
                this.challengeBtn.visible = true;
            }
        }
    };
    return FbItem;
}(BaseItemRender));
__reflect(FbItem.prototype, "FbItem");
//# sourceMappingURL=FbItem.js.map