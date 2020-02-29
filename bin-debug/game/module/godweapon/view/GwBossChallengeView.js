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
var GwBossChallengeView = (function (_super) {
    __extends(GwBossChallengeView, _super);
    function GwBossChallengeView() {
        var _this = _super.call(this) || this;
        _this._cdTime = 0;
        _this.skinName = "GwBossChallengeSkin";
        return _this;
    }
    GwBossChallengeView.prototype.childrenCreated = function () {
        this.reward.itemRenderer = ItemBase;
        this._awardAC = new eui.ArrayCollection();
        this.reward.dataProvider = this._awardAC;
    };
    GwBossChallengeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.notBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.challengeBtn, this.onTap);
        this._bossData = param[0];
        this.initView();
    };
    GwBossChallengeView.prototype.initView = function () {
        var data = this._bossData;
        var config = GlobalConfig.WorldBossConfig[data.id];
        this.title.text = config.showName;
        this._awardAC.source = config.showReward.concat();
        var needYb = GlobalConfig.WorldBossBaseConfig.challengeItemYb[config.type - 1];
        this.yuanbao.text = "" + needYb;
        var itemId = GlobalConfig.WorldBossBaseConfig.challengeItem[config.type - 1];
        this.ticket.source = itemId + "_png";
        var item = UserBag.ins().getBagGoodsByTypeAndId(0, itemId);
        var count = 0;
        if (item)
            count = item.count;
        this.num.text = "" + count;
        if (count)
            this.num.textColor = ColorUtil.GREEN_COLOR_N;
        else
            this.num.textColor = ColorUtil.RED_COLOR_N;
        var endTime = Math.ceil((UserBoss.ins().worldBossCd[config.type] - egret.getTimer()) / 1000);
        if (endTime > 0) {
            this.leftCDText.visible = true;
            this.updateCDTime(endTime);
        }
        else {
            this.leftCDText.visible = false;
        }
    };
    GwBossChallengeView.prototype.updateCDTime = function (cd) {
        this._cdTime = cd;
        TimerManager.ins().remove(this.updateBtnLabel, this);
        if (cd > 0)
            TimerManager.ins().doTimer(1000, cd, this.updateBtnLabel, this);
        this.updateBtnLabel();
    };
    GwBossChallengeView.prototype.updateBtnLabel = function () {
        this.leftCDText.text = "\u6311\u6218CD\uFF1A" + this._cdTime + "\u79D2";
        this._cdTime -= 1;
        if (this._cdTime <= 0)
            this.leftCDText.text = "";
    };
    GwBossChallengeView.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.notBtn || tar == this.bgClose) {
            ViewManager.ins().close(this);
        }
        else if (tar == this.challengeBtn) {
            this.onChallenge();
        }
    };
    GwBossChallengeView.prototype.onChallenge = function () {
        if (UserFb.ins().checkInFB())
            return false;
        var config = GlobalConfig.WorldBossConfig[this._bossData.id];
        if (this._bossData.canInto) {
            if (this._bossData.isDie) {
                UserTips.ins().showTips("BOSS\u672A\u590D\u6D3B");
            }
            else if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                ViewManager.ins().open(BagFullTipsWin, UserBag.BAG_ENOUGH);
            }
            else {
                var endTime = Math.ceil((UserBoss.ins().worldBossCd[config.type] - egret.getTimer()) / 1000);
                if (endTime > 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u51B7\u5374\u4E2D\uFF0C" + endTime + "\u79D2\u540E\u53EF\u8FDB\u884C\u6311\u6218|");
                    return false;
                }
                var needYb = GlobalConfig.WorldBossBaseConfig.challengeItemYb[config.type - 1];
                var itemId = GlobalConfig.WorldBossBaseConfig.challengeItem[config.type - 1];
                var item = UserBag.ins().getBagGoodsByTypeAndId(0, itemId);
                if ((!item || !item.count) && Actor.yb < needYb) {
                    UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
                    ViewManager.ins().close(this);
                    return false;
                }
                UserBoss.ins().sendChallengWorldBoss(this._bossData.id, config.type);
                ViewManager.ins().close(this);
                return true;
            }
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:等级不足，无法挑战|");
        }
        return false;
    };
    GwBossChallengeView.prototype.close = function () {
    };
    return GwBossChallengeView;
}(BaseEuiView));
__reflect(GwBossChallengeView.prototype, "GwBossChallengeView");
ViewManager.ins().reg(GwBossChallengeView, LayerManager.UI_Popup);
//# sourceMappingURL=GwBossChallengeView.js.map