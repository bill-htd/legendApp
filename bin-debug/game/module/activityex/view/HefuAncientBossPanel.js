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
var HefuAncientBossPanel = (function (_super) {
    __extends(HefuAncientBossPanel, _super);
    function HefuAncientBossPanel() {
        var _this = _super.call(this) || this;
        _this.openTime = [0, 1, 3, 5];
        _this._aryTime = [];
        _this.skinName = "hefuBoss";
        _this.bossEffect = new MovieClip;
        _this.bossEffect.scaleX = -1;
        _this.bossEffect.scaleY = 1;
        _this.bossEffect.x = 78 + 50;
        _this.bossEffect.y = 160;
        _this.Boss.addChild(_this.bossEffect);
        _this.bossImage = new MovieClip;
        _this.bossImage.scaleX = -1;
        _this.bossImage.scaleY = 1;
        _this.bossImage.x = 78 + 50;
        _this.bossImage.y = 160;
        _this.Boss.addChild(_this.bossImage);
        _this.bossImg.visible = false;
        return _this;
    }
    HefuAncientBossPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HefuAncientBossPanel.prototype.close = function () {
        this.removeTouchEvent(this.goBtn, this.onTap);
    };
    HefuAncientBossPanel.prototype.open = function () {
        this.addTouchEvent(this.goBtn, this.onTap);
        this.rewardList.itemRenderer = ItemBase;
        this.initView();
    };
    HefuAncientBossPanel.prototype.initView = function () {
        this._aryTime = [];
        this.actInfo.text = GlobalConfig.ActivityBtnConfig[this.activityID].acDesc;
        var hefuTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
        var str = "";
        var timeS = 0;
        var date;
        var i;
        for (i = 0; i < this.openTime.length; i++) {
            if (str.length > 0) {
                str += "、";
            }
            timeS = hefuTime + this.openTime[i] * DateUtils.MS_PER_DAY;
            date = new Date(timeS);
            str += (date.getMonth() + 1) + "月" + date.getDate() + "日";
            this._aryTime.push((date.getMonth() + 1) + "月" + date.getDate() + "日");
        }
        str += "\u7684" + HefuAncientBossPanel.timer + "\u5F00\u542F";
        this.actTime.text = str;
        var b = false;
        var startIndex = -1;
        var timeE;
        var dateE;
        var firstNum;
        var endNum;
        for (i = this.openTime.length - 1; i >= 0; i--) {
            timeS = hefuTime + this.openTime[i] * DateUtils.MS_PER_DAY;
            date = new Date(timeS);
            date.setHours(20, 30, 0);
            timeE = hefuTime + (this.openTime[i] + 1) * DateUtils.MS_PER_DAY;
            dateE = new Date(timeE);
            if (i == 0) {
                firstNum = date.getTime();
            }
            if (i == this.openTime.length - 1) {
                endNum = dateE.getTime();
            }
            if (!i) {
                if (GameServer.serverTime >= date.getTime()) {
                    b = true;
                }
                startIndex = i;
                break;
            }
            var idx = i - 1;
            if (idx >= 0) {
                var cityBoss = this.getBossConfig(i);
                var killBossId = cityBoss.killBossId;
                timeS = hefuTime + this.openTime[i] * DateUtils.MS_PER_DAY;
                var predate = new Date(timeS);
                predate.setHours(0, 0, 0);
                if (CityCC.ins().bossKillNumData[killBossId][1] != 1 && GameServer.serverTime < predate.getTime()) {
                    continue;
                }
                else {
                    if (GameServer.serverTime >= date.getTime()) {
                        b = true;
                    }
                    startIndex = i;
                    break;
                }
            }
        }
        if (!b) {
            if (GameServer.serverTime < firstNum) {
                startIndex = -1;
                this.selectCurBoss(GlobalConfig.CityBossConfig[1].bossId, startIndex);
            }
            else if (GameServer.serverTime >= endNum) {
                startIndex = -2;
                this.selectCurBoss(GlobalConfig.CityBossConfig[4].bossId, startIndex);
            }
            else {
                var bossid = this.getBossConfig(startIndex + 1).bossId;
                this.selectCurBoss(bossid, startIndex, true);
            }
        }
        else {
            this.selectCurBoss(GlobalConfig.CityBossConfig[startIndex + 1].bossId, startIndex);
        }
        var cbid;
        if (startIndex == -1) {
            cbid = 1;
        }
        else if (startIndex == -2) {
            cbid = 4;
        }
        else {
            cbid = startIndex + 1;
        }
        var cbcfg = GlobalConfig.CityBossConfig[cbid];
        if (cbcfg) {
            this.rewardList.dataProvider = new eui.ArrayCollection(cbcfg.showReward);
        }
    };
    HefuAncientBossPanel.prototype.selectCurBoss = function (bossId, startIndex, b) {
        if (b === void 0) { b = false; }
        var monster = GlobalConfig.MonstersConfig[bossId];
        if (startIndex >= 0) {
            var bid = GlobalConfig.CityBossConfig[startIndex + 1].bossId;
            monster = GlobalConfig.MonstersConfig[bid];
        }
        var effectPath = GlobalConfig.EffectConfig[monster.effect].fileName;
        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + monster.avatar + "_3s"), -1);
        this.bossEffect.playFile(RES_DIR_EFF + effectPath, -1);
        var str;
        var act = Activity.ins().getActivityDataById(this.activityID);
        this.redPoint.visible = act.specialState();
        if (startIndex >= 0) {
            if (!b) {
                str = this._aryTime[startIndex];
                this.time.text = str + (" " + HefuAncientBossPanel.timer);
                var cityBoss = this.getBossConfig(startIndex + 1);
                var killBossId = cityBoss.killBossId;
                if (CityCC.ins().bossKillNumData && CityCC.ins().bossKillNumData[killBossId] != undefined && CityCC.ins().bossKillNumData[killBossId][1] != 1) {
                    this._btnB = true;
                }
                else {
                    this._btnB = false;
                    str = this._aryTime[startIndex + 1];
                    if (str) {
                        this.time.text = str + (" " + HefuAncientBossPanel.timer);
                        var bid = GlobalConfig.CityBossConfig[startIndex + 1].bossId;
                        monster = GlobalConfig.MonstersConfig[bid];
                        var effectPath_1 = GlobalConfig.EffectConfig[monster.effect].fileName;
                        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + monster.avatar + "_3s"), -1);
                        this.bossEffect.playFile(RES_DIR_EFF + effectPath_1, -1);
                    }
                }
            }
            else {
                str = this._aryTime[startIndex];
                this.time.text = str + (" " + HefuAncientBossPanel.timer);
                this._btnB = false;
            }
        }
        else {
            this._btnB = false;
            if (startIndex == -2) {
                this.time.text = "已结束";
            }
            else if (startIndex == -1) {
                str = this._aryTime[0] + ("\u7684" + HefuAncientBossPanel.timer + "\u5F00\u542F");
                this.time.text = str;
            }
        }
    };
    HefuAncientBossPanel.getCityBossConfig = function (bossId) {
        var cfg;
        for (var i in GlobalConfig.CityBossConfig) {
            if (GlobalConfig.CityBossConfig[i].bossId == bossId && GlobalConfig.CityBossConfig[i].killBossId <= 999) {
                cfg = GlobalConfig.CityBossConfig[i];
                break;
            }
        }
        return cfg;
    };
    HefuAncientBossPanel.prototype.getNextBossId = function () {
        var hefuTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
        var bossId = 0;
        var timeE;
        var dateE;
        var timeS;
        var date;
        var startIndex = 0;
        for (var i = 0; i < this.openTime.length; i++) {
            timeS = hefuTime + (this.openTime[i]) * DateUtils.MS_PER_DAY;
            date = new Date(timeS);
            if (GameServer.serverTime >= date.getTime()) {
                startIndex = i;
            }
        }
        return startIndex;
    };
    HefuAncientBossPanel.prototype.getBossConfig = function (index) {
        return GlobalConfig.CityBossConfig[index];
    };
    HefuAncientBossPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.goBtn:
                if (this._btnB) {
                }
                else {
                    UserTips.ins().showTips("BOSS\u672A\u5F00\u542F\uFF0C\u8BF7\u51C6\u65F6\u53C2\u52A0");
                    return;
                }
                if (CityCC.ins().enterCD > 0) {
                    UserTips.ins().showTips("\u51B7\u5374\u4E2D\uFF0C" + CityCC.ins().enterCD + "\u79D2\u540E\u53EF\u8FDB\u5165\u4E3B\u57CE");
                    return;
                }
                else {
                    if (CityCC.ins().isCity) {
                        TimerManager.ins().doNext(function () {
                            var win = ViewManager.ins().getView(BossBelongPanel);
                            if (win) {
                                win.attrBoss();
                            }
                        }, this);
                    }
                    else {
                        CityCC.ins().isChallenge = true;
                        CityCC.ins().sendEnter();
                    }
                }
                ViewManager.ins().close(ActivityExWin);
                break;
        }
    };
    HefuAncientBossPanel.timer = "20:30";
    return HefuAncientBossPanel;
}(BaseView));
__reflect(HefuAncientBossPanel.prototype, "HefuAncientBossPanel");
//# sourceMappingURL=HefuAncientBossPanel.js.map