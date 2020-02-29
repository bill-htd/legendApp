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
var NewWorldBossResultPanel = (function (_super) {
    __extends(NewWorldBossResultPanel, _super);
    function NewWorldBossResultPanel() {
        return _super.call(this) || this;
    }
    NewWorldBossResultPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "wpkResultSkin";
        this.winnerEff = new MovieClip;
        this.winnerEff.x = 41;
        this.winnerEff.y = 41;
        this.winnerEff.touchEnabled = false;
    };
    NewWorldBossResultPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.init();
    };
    NewWorldBossResultPanel.prototype.init = function () {
        if (!this.winnerEff.parent)
            this.effGroup.addChild(this.winnerEff);
        this.winnerEff.playFile(RES_DIR_EFF + "yanhuaeff", 1);
        this.s = 20;
        var data = UserBoss.ins().newWorldBossData;
        this.myrank.text = data.rank ? data.rank + "" : "没上榜";
        this.rankList.itemRenderer = NewWorldBossResultRender;
        this.rankList.itemRendererSkinName = "wpkResultRenderSkin";
        var rankData = data.rankList.concat();
        rankData.length > 3 ? rankData.length = 3 : null;
        for (var i = 0; i < rankData.length; i++) {
            rankData[i].rank = i + 1;
        }
        this.rankList.dataProvider = new eui.ArrayCollection(rankData);
        this.time.text = DateUtils.getFormatBySecond(data.totalTime, DateUtils.TIME_FORMAT_10);
        this.weidao.text = data.lastKillRoleName;
        if (data.randomRoleName && data.randomAwards && data.randomAwards.length) {
            this.lucky.visible = true;
            this.luckyName.text = data.randomRoleName;
            this.luckyGift.text = GlobalConfig.ItemConfig[data.randomAwards[0].id].name;
        }
        else {
            this.lucky.visible = false;
        }
        this.updateBtn();
        TimerManager.ins().doTimer(1000, this.s, this.updateCloseBtnLabel, this);
        UserFb.ins().isQuite = true;
    };
    NewWorldBossResultPanel.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
        UserFb.ins().sendExitFb();
    };
    NewWorldBossResultPanel.prototype.updateCloseBtnLabel = function () {
        this.s > 0 && this.s--;
        if (this.s <= 0) {
            ViewManager.ins().close(this);
            UserFb.ins().sendExitFb();
        }
        this.updateBtn();
    };
    NewWorldBossResultPanel.prototype.updateBtn = function () {
        this.closeBtn.label = "\u79BB\u5F00(" + this.s + "s)";
    };
    NewWorldBossResultPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        TimerManager.ins().removeAll(this);
    };
    return NewWorldBossResultPanel;
}(BaseEuiView));
__reflect(NewWorldBossResultPanel.prototype, "NewWorldBossResultPanel");
ViewManager.ins().reg(NewWorldBossResultPanel, LayerManager.UI_Popup);
//# sourceMappingURL=NewWorldBossResultPanel.js.map