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
var BossHomeMainWin = (function (_super) {
    __extends(BossHomeMainWin, _super);
    function BossHomeMainWin() {
        var _this = _super.call(this) || this;
        _this.isStartTime = false;
        _this.type = 0;
        _this.restoreTime = 0;
        _this.lastIndex = -1;
        _this.isClickItem = false;
        return _this;
    }
    BossHomeMainWin.prototype.childrenCreated = function () {
        this.init();
    };
    BossHomeMainWin.prototype.init = function () {
        this.list.itemRenderer = HomeBossItem;
        this.titleList.itemRenderer = VipBossItem;
        this.setting.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.setting.text + "</u></a>");
        this.setting.touchEnabled = true;
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
        var tArr = [];
        for (var k in GlobalConfig.BossHomeConfig) {
            tArr.push(k);
        }
        this.titleList.dataProvider = new eui.ArrayCollection(tArr);
        this.setLoginView();
    };
    BossHomeMainWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setGroupVis(true);
        this.type = UserBoss.BOSS_SUBTYPE_HOMEBOSS;
        this.lastIndex = -1;
        this.titleList.selectedIndex = 0;
        this.observe(UserBoss.ins().postWorldBoss, this.setData);
        this.setting.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.titleList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickMenu, this);
        this.addTouchEvent(this.bosshome0, this.onTap);
        this.addTouchEvent(this.bosshome1, this.onTap);
        this.addTouchEvent(this.bosshome2, this.onTap);
        this.rewardList0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.rewardList1.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.rewardList2.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.setData();
    };
    BossHomeMainWin.prototype.close = function () {
        this.setting.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.rewardList0.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.rewardList1.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.rewardList2.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    BossHomeMainWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bosshome0:
                this.onRukouClick(0);
                break;
            case this.bosshome1:
                this.onRukouClick(1);
                break;
            case this.bosshome2:
                this.onRukouClick(2);
                break;
            case this.rewardList0:
            case this.rewardList1:
            case this.rewardList2:
                this.isClickItem = true;
                break;
        }
    };
    BossHomeMainWin.prototype.onRukouClick = function (num) {
        if (this.isClickItem) {
            this.isClickItem = false;
            return;
        }
        var config = GlobalConfig.BossHomeConfig[num + 1];
        if (UserVip.ins().lv < config.vip) {
            UserTips.ins().showTips("VIP" + config.vip + "\u5F00\u542F");
            return;
        }
        this.titleList.selectedIndex = num;
        this.setGroupVis(false);
        this.setData();
    };
    BossHomeMainWin.prototype.setGroupVis = function (boo) {
        this.rukou.visible = boo;
        this.mainGroup.visible = !boo;
    };
    BossHomeMainWin.prototype.onClickMenu = function (e) {
        this.setData();
    };
    BossHomeMainWin.prototype.setLoginView = function () {
        for (var i = 0; i < 3; i++) {
            var config = GlobalConfig.BossHomeConfig[i + 1];
            this["rewardList" + i].itemRenderer = ItemBase;
            this["rewardList" + i].dataProvider = new eui.ArrayCollection(config.icon);
            this["vipImg" + i].source = "vip_v" + config.vip + "_png";
        }
    };
    BossHomeMainWin.prototype.setData = function () {
        if (this.lastIndex == this.titleList.selectedIndex) {
            return;
        }
        this.lastIndex = this.titleList.selectedIndex;
        var scro = this.list.parent;
        scro.stopAnimation();
        this.list.scrollV = 0;
        var tempArr = UserBoss.ins().worldInfoList[this.type].slice();
        var bossInfos = [];
        var canPlayArr = [];
        var canPlayDieArr = [];
        var canNotPlayArr = [];
        var canNotPlayDieArr = [];
        var canNotLevel = [];
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        var index = this.titleList.selectedIndex + 1;
        var baseConfig = GlobalConfig.BossHomeConfig[index];
        var bossIdArr = baseConfig.boss;
        this.titleText.text = "BOSS\u4E4B\u5BB6 " + index + "\u5C42";
        this.vipTipTxt.text = "VIP" + baseConfig.vip + "\u65E0\u9650\u6311\u6218";
        for (var i = 0; i < tempArr.length; i++) {
            if (bossIdArr.indexOf(tempArr[i].id) == -1)
                continue;
            var isDie = (tempArr[i].bossState == 2);
            var bossConfig = GlobalConfig.WorldBossConfig[tempArr[i].id];
            var bossLv = bossConfig.zsLevel * 1000 + bossConfig.level;
            if (roleLv < bossLv) {
                canNotLevel.push(tempArr[i]);
            }
            else {
                var boo = UserBoss.ins().getBossRemindByIndex(tempArr[i].id);
                if (boo) {
                    if (isDie) {
                        canPlayDieArr.push(tempArr[i]);
                    }
                    else {
                        canPlayArr.push(tempArr[i]);
                    }
                }
                else {
                    if (isDie) {
                        canNotPlayDieArr.push(tempArr[i]);
                    }
                    else {
                        canNotPlayArr.push(tempArr[i]);
                    }
                }
            }
        }
        canPlayArr.sort(this.compareFn);
        canPlayDieArr.sort(this.compareFn);
        canNotPlayArr.sort(this.compareFn);
        canNotPlayDieArr.sort(this.compareFn);
        canNotLevel.sort(this.compareFn);
        bossInfos = canPlayArr.concat(canPlayDieArr, canNotPlayArr, canNotPlayDieArr, canNotLevel);
        this.listData.replaceAll(bossInfos);
        this.currData = bossInfos[0];
        if (!this.isStartTime) {
            TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
            this.restoreTime = UserBoss.ins().worldBossrestoreTime[this.type];
            this.isStartTime = true;
            this.updateTime();
        }
    };
    BossHomeMainWin.prototype.updateTime = function () {
        if (this.timeTxt == undefined)
            return;
        var model = this.currData;
        var time = model.relieveTime - egret.getTimer();
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.isStartTime = false;
            this.timeTxt.visible = false;
            UserBoss.ins().sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_HOMEBOSS);
        }
        else {
            if (!this.timeTxt.visible)
                this.timeTxt.visible = true;
            this.timeTxt.text = DateUtils.getFormatBySecond(Math.floor(time / 1000), 1) + "\u540E\u5237\u65B0";
        }
    };
    BossHomeMainWin.prototype.compareFn = function (a, b) {
        var configA = GlobalConfig.WorldBossConfig[a.id];
        var configB = GlobalConfig.WorldBossConfig[b.id];
        if (configA.zsLevel < configB.zsLevel) {
            return 1;
        }
        else if (configA.zsLevel > configB.zsLevel) {
            return -1;
        }
        if (configA.level < configB.level)
            return 1;
        else if (configA.level > configB.level)
            return -1;
        else
            return 0;
    };
    BossHomeMainWin.prototype.onTouch = function () {
        GameGuider.guidance(egret.getQualifiedClassName(ForgeWin), 2);
    };
    BossHomeMainWin.prototype.onLink = function () {
        ViewManager.ins().open(PubBossRemindWin, UserBoss.BOSS_SUBTYPE_HOMEBOSS);
    };
    return BossHomeMainWin;
}(BaseView));
__reflect(BossHomeMainWin.prototype, "BossHomeMainWin");
//# sourceMappingURL=BossHomeMainWin.js.map