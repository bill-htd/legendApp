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
var WorldBossMainPanel = (function (_super) {
    __extends(WorldBossMainPanel, _super);
    function WorldBossMainPanel() {
        var _this = _super.call(this) || this;
        _this.endTime = 0;
        return _this;
    }
    WorldBossMainPanel.prototype.childrenCreated = function () {
        this.init();
    };
    WorldBossMainPanel.prototype.init = function () {
        this.list.itemRenderer = WorldBossItemMain;
        this.dropRewardList.itemRenderer = ItemBase;
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.scaleY = 1;
        this.bossImage.x = 78;
        this.bossImage.y = 165;
        this.bossGroup.touchEnabled = this.bossGroup.touchChildren = false;
        this.getItemTxt.textFlow = new egret.HtmlTextParser().parser("<u>" + this.getItemTxt.text + "</u>");
        this.remindTpis.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.remindTpis.text + "</u></a>");
        this.remindTpis.touchEnabled = true;
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
    };
    WorldBossMainPanel.prototype.open = function () {
        var dataList = [];
        var type = UserBoss.BOSS_SUBTYPE_WORLDBOSS;
        var canPlayList = UserBoss.ins().worldBossPlayList[type].slice();
        if (!canPlayList.length) {
            UserBoss.ins().updateBossPlayList(type);
            canPlayList = UserBoss.ins().worldBossPlayList[type].slice();
        }
        canPlayList.sort(this.sortList);
        dataList.push({ type: type, arr: canPlayList, selectIndex: 0, clickCall: this.onClickList.bind(this) });
        if (UserZs.ins().lv >= 5 && GameServer.serverOpenDay >= GlobalConfig.WorldBossBaseConfig.canSeeDarkBossDay - 1) {
            type = UserBoss.BOSS_SUBTYPE_DARKBOSS;
            canPlayList = UserBoss.ins().worldBossPlayList[type].slice();
            if (!canPlayList.length) {
                UserBoss.ins().updateBossPlayList(type);
                canPlayList = UserBoss.ins().worldBossPlayList[type].slice();
            }
            canPlayList.sort(this.sortList);
            dataList.push({ type: type, arr: canPlayList, selectIndex: -1, clickCall: this.onClickList.bind(this) });
        }
        if (this.bossImage && !this.bossImage.parent) {
            this.bossGroup.addChild(this.bossImage);
        }
        this.observe(UserBoss.ins().postWorldBoss, this.setWin);
        this.observe(UserBoss.ins().postWorldBoss, this.joinWorldBoss);
        this.observe(UserBag.ins().postItemCountChange, this.UseToItem);
        this.listData.source = dataList;
        this.list.scrollV = 0;
        this.list.selectedIndex = 0;
        this.currData = dataList[0].arr[0];
        this.addTouchEvent(this.challengeBtn, this.onTap);
        this.addTouchEvent(this.getItemTxt, this.onTap);
        this.remindTpis.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickMenu, this);
        this.setWin();
    };
    WorldBossMainPanel.prototype.sortList = function (a, b) {
        if (a.id < b.id)
            return -1;
        return 1;
    };
    WorldBossMainPanel.prototype.onClickMenu = function (e) {
        var data = this.list.dataProvider.getItemAt(e.itemIndex);
        if (data.type == UserBoss.BOSS_SUBTYPE_DARKBOSS && data.arr.length == 0) {
            UserTips.ins().showTips("6\u8F6C\u5373\u53EF\u5F00\u542F\u6697\u4E4B\u79D8\u5883");
        }
    };
    WorldBossMainPanel.prototype.onClickList = function (data) {
        this.currData = data;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        for (var i = 0; i < this.listData.length; i++) {
            var source = this.listData.getItemAt(i);
            if (config.type == source.type) {
                source.selectIndex = source.arr.indexOf(data);
            }
            else {
                source.selectIndex = -1;
                this.listData.itemUpdated(source);
            }
        }
        this.setWin();
    };
    WorldBossMainPanel.prototype.setWin = function () {
        if (!this.currData)
            return;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
        var lvStr = config.zsLevel > 0 ? config.zsLevel + "\u8F6C" : config.level + "\u7EA7";
        this.nameTxt.text = bossBaseConfig.name + "(" + config.zslook[0] + "\u8F6C-" + config.zslook[config.zslook.length - 1] + "\u8F6C)";
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
        if (!this.dropRewardList.dataProvider) {
            this.dropRewardList.dataProvider = new eui.ArrayCollection(config.showReward.concat());
        }
        else {
            this.dropRewardList.dataProvider['source'] = config.showReward.concat();
        }
        this.playerNameTxt.text = str;
        var count = UserBoss.ins().worldBossLeftTime[config.type];
        var txt = config.type == UserBoss.BOSS_SUBTYPE_WORLDBOSS ? "秘境BOSS" : "暗之秘境BOSS";
        this.leftText.text = txt + "\u5269\u4F59\u6B21\u6570:" + count + "\u6B21";
        this.getItemTxt.visible = (count > 0 || config.type == UserBoss.BOSS_SUBTYPE_DARKBOSS) ? false : true;
        this.endTime = Math.floor((UserBoss.ins().worldBossCd[config.type] - egret.getTimer()) / 1000);
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
        if (config.type == UserBoss.BOSS_SUBTYPE_WORLDBOSS) {
            var itemData = UserBag.ins().getBagItemById(ItemConst.WORLDBOSS);
            this.showJuan(itemData);
        }
        else {
            this.showJuan(null);
        }
    };
    WorldBossMainPanel.prototype.showJuan = function (itemData) {
        if (!itemData) {
            this.juan.visible = false;
            return;
        }
        this.juan.visible = true;
        this.jicon.source = itemData.itemConfig.icon + "_png";
        this.jcount.text = itemData.count + "";
    };
    WorldBossMainPanel.prototype.updateTime = function () {
        if (!this.currData)
            return;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        var time = Math.floor((UserBoss.ins().worldBossCd[config.type] - egret.getTimer()) / 1000);
        this.leftCDText.text = "\u6311\u6218CD:" + DateUtils.getFormatBySecond(time, 5, 3);
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.leftCDText.text = "";
            this.challengeBtn.visible = true;
        }
    };
    WorldBossMainPanel.prototype.showTips = function () {
        if (!this.currData)
            return;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        var count = UserBoss.ins().worldBossLeftTime[config.type];
        if (count > 0) {
            return true;
        }
        if (config.type == UserBoss.BOSS_SUBTYPE_DARKBOSS) {
            UserTips.ins().showTips("\u6697\u4E4B\u79D8\u5883BOSS\u6311\u6218\u6B21\u6570\u5DF2\u7528\u5B8C");
            return;
        }
        var tipText = "";
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, ItemConst.WORLDBOSS);
        if (item) {
            tipText = "\u786E\u5B9A\u4F7F\u75281\u4E2A<font color='#FFB82A'>\u79D8\u5883boss</font>\u9053\u5177\u8FDB\u5165\u6311\u6218\uFF1F\n";
            WarnWin.show(tipText, function () {
                this.isUse = true;
                UserBag.ins().sendUseItem(item.configID, 1);
            }, this);
        }
        else {
            var vipConfig = GlobalConfig.VipConfig[UserVip.ins().lv];
            if (!vipConfig) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u6210\u4E3AVIP\u53EF\u8D2D\u4E70\u6311\u6218\u6B21\u6570|");
                return false;
            }
            if (!vipConfig.boss2buy) {
                UserTips.ins().showTips("|C:0xf3311e&T:VIP\u7B49\u7EA7\u4E0D\u8DB3\uFF0C\u63D0\u5347VIP\u7B49\u7EA7\u53EF\u8D2D\u4E70\u6311\u6218\u6B21\u6570|");
                return false;
            }
            var currentUse = UserBoss.ins().worldChallengeTime[config.type];
            if (count <= 0 && currentUse >= vipConfig.boss2buy) {
                UserTips.ins().showTips("|C:0xff0000&T:\u6311\u6218\u6B21\u6570\u4E0D\u8DB3,\u65E0\u6CD5\u6311\u6218");
                return;
            }
            if (Actor.yb < GlobalConfig.WorldBossBaseConfig.buyCountPrice[config.type - 1]) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                return false;
            }
            tipText = "\u786E\u5B9A\u82B1\u8D39<font color='#FFB82A'>" + GlobalConfig.WorldBossBaseConfig.buyCountPrice[config.type - 1] + "\u5143\u5B9D</font>\u8D2D\u4E701\u6B21\u6311\u6218\u6B21\u6570\u5417\uFF1F\n" +
                ("\u4ECA\u65E5\u5DF2\u8D2D\u4E70\uFF1A" + currentUse + "/" + vipConfig.boss2buy);
            WarnWin.show(tipText, function () {
                UserBoss.ins().sendBuyChallengeTimes(config.type);
            }, this);
        }
        return false;
    };
    WorldBossMainPanel.prototype.UseToItem = function () {
        if (!this.currData)
            return;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        if (this.isUse) {
            this.isUse = false;
            UserBoss.ins().sendWorldBossInfo(config.type);
        }
    };
    WorldBossMainPanel.prototype.joinWorldBoss = function () {
        if (!this.isJoin || !this.currData)
            return;
        var config = GlobalConfig.WorldBossConfig[this.currData.id];
        this.isJoin = false;
        if (UserFb.ins().checkInFB())
            return;
        if (Math.floor((UserBoss.ins().worldBossCd[config.type] - egret.getTimer()) / 1000) > 0) {
            UserTips.ins().showTips("\u6311\u6218CD\u4E2D");
            return;
        }
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
        var bossLv = config.zsLevel * 1000 + config.level;
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
            UserBoss.ins().sendChallengWorldBoss(this.currData.id, config.type);
        }
        ViewManager.ins().close(LimitTaskView);
    };
    WorldBossMainPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.challengeBtn:
                this.isJoin = true;
                if (!this.showTips())
                    return;
                this.joinWorldBoss();
                break;
            case this.getItemTxt:
                if (!this.showTips())
                    return;
                break;
        }
    };
    WorldBossMainPanel.prototype.onLink = function () {
        ViewManager.ins().open(PubBossRemindWin, UserBoss.BOSS_SUBTYPE_DARKBOSS);
    };
    WorldBossMainPanel.prototype.close = function () {
        this.removeObserve();
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickMenu, this);
        this.removeTouchEvent(this.challengeBtn, this.onTap);
        this.removeTouchEvent(this.getItemTxt, this.onTap);
        this.remindTpis.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    };
    return WorldBossMainPanel;
}(BaseView));
__reflect(WorldBossMainPanel.prototype, "WorldBossMainPanel");
//# sourceMappingURL=WorldBossMainPanel.js.map