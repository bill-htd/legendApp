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
var PublicBossMainWin = (function (_super) {
    __extends(PublicBossMainWin, _super);
    function PublicBossMainWin() {
        var _this = _super.call(this) || this;
        _this.endTime = 0;
        _this.actLevel = 0;
        return _this;
    }
    PublicBossMainWin.prototype.childrenCreated = function () {
        this.init();
    };
    PublicBossMainWin.prototype.init = function () {
        this.list.itemRenderer = WorldBossItem;
        this.dropRewardList.itemRenderer = ItemBase;
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.scaleY = 1;
        this.bossImage.x = 78;
        this.bossImage.y = 165;
        this.bossGroup.touchEnabled = this.bossGroup.touchChildren = false;
    };
    PublicBossMainWin.prototype.open = function () {
        var canPlayList = UserBoss.ins().worldBossPlayList[UserBoss.BOSS_SUBTYPE_QMBOSS].slice();
        if (this.bossImage && !this.bossImage.parent) {
            this.bossGroup.addChild(this.bossImage);
        }
        this.observe(UserZs.ins().postZsData, this.setActLevel);
        this.observe(Actor.ins().postLevelChange, this.setActLevel);
        this.setActLevel();
        this.list.dataProvider = new eui.ArrayCollection(canPlayList);
        this.list.selectedIndex = 0;
        this.currData = this.list.dataProvider.getItemAt(0);
        this.addTouchEvent(this.challengeBtn, this.onTap);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickMenu, this);
        this.setWin();
    };
    PublicBossMainWin.prototype.onClickMenu = function (e) {
        this.currData = this.list.dataProvider.getItemAt(e.itemIndex);
        this.setWin();
    };
    PublicBossMainWin.prototype.setWin = function () {
        if (!this.currData)
            return;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
        var lvStr = config.zsLevel > 0 ? config.zsLevel + "\u8F6C" : config.level + "\u7EA7";
        this.nameTxt.text = bossBaseConfig.name + "(" + lvStr + ")";
        var str = "无";
        if (this.currData.roleName != "") {
            str = this.currData.roleName;
            if (this.currData.guildName != "")
                str = str + "(" + this.currData.guildName + ")";
        }
        if (this.currData.bossState == 2) {
            this.stateImage.source = "zdbossyijisha";
        }
        else if (this.currData.bossState == 1) {
            this.stateImage.source = "zdbosskejisha";
        }
        else {
            this.stateImage.source = "";
        }
        this.dropRewardList.dataProvider = new eui.ArrayCollection(config.showReward);
        this.playerNameTxt.text = str;
        var count = UserBoss.ins().worldBossLeftTime[UserBoss.BOSS_SUBTYPE_QMBOSS];
        this.leftText.text = "\u6311\u6218\u5269\u4F59\u6B21\u6570:" + count + "\u6B21";
        this.endTime = Math.floor((UserBoss.ins().worldBossCd[UserBoss.BOSS_SUBTYPE_QMBOSS] - egret.getTimer()) / 1000);
        if (this.endTime > 0) {
            this.challengeBtn.visible = false;
            this.updateTime();
            TimerManager.ins().doTimer(100, 0, this.updateTime, this);
            str = DateUtils.getFormatBySecond(this.endTime, 5, 3);
            this.leftCDText.text = "\u6311\u6218CD:" + str;
        }
        else {
            this.leftCDText.text = "";
        }
        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + bossBaseConfig.avatar + "_3s"), -1);
        for (var i = 0; i < 4; i++) {
            var item = void 0;
            switch (i) {
                case 0:
                    item = GlobalConfig.ItemConfig[config.joinReward];
                    break;
                case 1:
                    item = GlobalConfig.ItemConfig[config.shieldReward];
                    break;
                case 2:
                    item = GlobalConfig.ItemConfig[config.belongReward];
                    break;
                case 3:
                    item = GlobalConfig.ItemConfig[config.killReward];
                    break;
            }
        }
    };
    PublicBossMainWin.prototype.updateTime = function () {
        var time = Math.floor((UserBoss.ins().worldBossCd[UserBoss.BOSS_SUBTYPE_QMBOSS] - egret.getTimer()) / 1000);
        this.leftCDText.text = "\u6311\u6218CD:" + DateUtils.getFormatBySecond(time, 5, 3);
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.leftCDText.text = "";
            this.challengeBtn.visible = true;
        }
    };
    PublicBossMainWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.challengeBtn:
                if (Math.floor((UserBoss.ins().worldBossCd[UserBoss.BOSS_SUBTYPE_QMBOSS] - egret.getTimer()) / 1000) > 0) {
                    UserTips.ins().showTips("\u6311\u6218CD\u4E2D");
                    return;
                }
                var roleLv = UserZs.ins().lv * 1000 + Actor.level;
                var config = GlobalConfig.WorldBossConfig[this.currData.id];
                var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
                var bossLv = (config.zsLevel || 0) * 1000 + config.level;
                if (bossLv > roleLv) {
                    var str = config.zsLevel > 0 ? config.zsLevel + "\u8F6C" : config.level + "\u7EA7";
                    UserTips.ins().showTips("\u53EA\u6709" + str + "\u624D\u53EF\u4EE5\u6311\u6218\u3002");
                    return;
                }
                if (UserBag.ins().getSurplusCount() < UserBoss.WB_BAG_ENOUGH) {
                    ViewManager.ins().open(BagFullTipsWin, UserBoss.WB_BAG_ENOUGH);
                }
                else {
                    ViewManager.ins().close(BossWin);
                    UserBoss.ins().sendChallengWorldBoss(this.currData.id, UserBoss.BOSS_SUBTYPE_QMBOSS);
                }
                break;
        }
    };
    PublicBossMainWin.prototype.setActLevel = function () {
        this.actLevel = UserZs.ins().lv * 10000 + Actor.level;
    };
    PublicBossMainWin.prototype.close = function () {
        this.removeObserve();
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickMenu, this);
        this.removeTouchEvent(this.challengeBtn, this.onTap);
    };
    return PublicBossMainWin;
}(BaseView));
__reflect(PublicBossMainWin.prototype, "PublicBossMainWin");
//# sourceMappingURL=PublicBossMainWin.js.map