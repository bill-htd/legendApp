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
var MonsterCityWarView = (function (_super) {
    __extends(MonsterCityWarView, _super);
    function MonsterCityWarView() {
        return _super.call(this) || this;
    }
    MonsterCityWarView.prototype.childrenCreated = function () {
        this.init();
    };
    MonsterCityWarView.prototype.open = function () {
        this.addCustomEvent();
        this.initView();
    };
    MonsterCityWarView.prototype.init = function () {
        if (!this.isInit) {
            this.list.itemRenderer = BossListRender;
            this.rewardList.itemRenderer = ItemBase;
            this.canChallengeTxt.text = "\u672A\u5237\u65B0";
            this.bossEffect = new MovieClip;
            this.bossEffect.scaleX = -1;
            this.bossEffect.scaleY = 1;
            this.bossEffect.x = 78;
            this.bossEffect.y = 160;
            this.bossGroup.addChild(this.bossEffect);
            this.bossImage = new MovieClip;
            this.bossImage.scaleX = -1;
            this.bossImage.scaleY = 1;
            this.bossImage.x = 78;
            this.bossImage.y = 160;
            this.bossGroup.addChild(this.bossImage);
            this.isInit = true;
        }
    };
    MonsterCityWarView.prototype.addCustomEvent = function () {
        this.observe(CityCC.ins().postBossInfo, this.checkState);
        this.observe(CityCC.ins().postCityBossId, this.checkState);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChange, this);
        this.addTouchEvent(this.challengeBtn, this.onChallenge);
        this.bossName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBossWin, this);
    };
    MonsterCityWarView.prototype.openBossWin = function (e) {
        var bossId = this.list.dataProvider.getItemAt(this.list.selectedIndex);
        var cityBoss = CityCC.ins().getCityBossConfig(bossId);
        var killBossId = cityBoss.killBossId;
        ViewManager.ins().open(BossWin, 1, killBossId);
    };
    MonsterCityWarView.prototype.initView = function () {
        this.list.dataProvider = CityCC.ins().getBossList();
        var index = this.getBossIndex();
        this.list.selectedIndex = index;
        this.updateView(index);
    };
    MonsterCityWarView.prototype.getBossIndex = function () {
        var bossId = CityCC.ins().getShowBossId();
        var index = 0;
        if (bossId > 0) {
            var count = this.list.dataProvider.length;
            for (var i = 0; i < count; i++) {
                if (bossId == this.list.dataProvider.getItemAt(i)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    MonsterCityWarView.prototype.onChallenge = function (e) {
        if (CityCC.ins().enterCD > 0) {
            UserTips.ins().showTips("\u51B7\u5374\u4E2D\uFF0C" + CityCC.ins().enterCD + "\u79D2\u540E\u53EF\u8FDB\u5165\u4E3B\u57CE");
        }
        else {
            if (CityCC.ins().isCity) {
                TimerManager.ins().doNext(function () {
                    var win = ViewManager.ins().getView(BossBelongPanel);
                    win.attrBoss();
                }, this);
            }
            else {
                CityCC.ins().isChallenge = true;
                CityCC.ins().sendEnter();
            }
        }
        ViewManager.ins().close(this);
    };
    MonsterCityWarView.prototype.checkState = function () {
        this.list.dataProvider = CityCC.ins().getBossList();
        this.updateView(this.list.selectedIndex);
    };
    MonsterCityWarView.prototype.onListChange = function (e) {
        this.updateView(e.itemIndex);
    };
    MonsterCityWarView.prototype.updateView = function (index) {
        var bossId = this.list.dataProvider.getItemAt(index);
        var monster = GlobalConfig.MonstersConfig[bossId];
        var cityBoss = CityCC.ins().getCityBossConfig(bossId);
        var killNum = CityCC.ins().getKillBossNum(bossId);
        var maxKillNum = CityCC.ins().getNeedKillBossNum(bossId);
        var isOpen = killNum >= maxKillNum;
        var effectPath = GlobalConfig.EffectConfig[monster.effect].fileName;
        this.bossName.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + GlobalConfig.MonstersConfig[cityBoss.killBossId].name + "</u></a>");
        this.bossName.touchEnabled = true;
        var time = CityCC.ins().getRefreshTime(bossId);
        if (time && time.length > 0) {
            this.nextTime.text = "最快将于" + CityCC.ins().getRefreshTime(bossId) + "刷新";
        }
        else {
            this.nextTime.text = "";
        }
        this.nextTime.visible = true;
        this.nameTxt.text = monster.name + "(" + monster.level + "\u7EA7)";
        this.killProgressBar.minimum = 0;
        this.killProgressBar.maximum = maxKillNum;
        this.killProgressBar.value = killNum;
        this.rewardList.dataProvider = new eui.ArrayCollection(cityBoss.showReward);
        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + monster.avatar + "_3s"), -1);
        this.bossEffect.playFile(RES_DIR_EFF + effectPath, -1);
        this.updateState(isOpen);
    };
    MonsterCityWarView.prototype.updateState = function (isOpen) {
        this.canChallengeTxt.visible = !isOpen;
        this.challengeBtn.visible = isOpen;
        this.redPoint.visible = isOpen;
        this.stateImage.visible = isOpen;
        this.nextTime.visible = !isOpen;
    };
    return MonsterCityWarView;
}(BaseView));
__reflect(MonsterCityWarView.prototype, "MonsterCityWarView");
//# sourceMappingURL=MonsterCityWarView.js.map