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
var PlayWayPanel = (function (_super) {
    __extends(PlayWayPanel, _super);
    function PlayWayPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u73A9\u6CD5";
        return _this;
    }
    PlayWayPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        for (var i = 1; i <= 4; i++) {
            var str_1 = this["info" + i].text;
            TextFlowMaker.generateTextFlow1("|U:&T:" + str_1);
        }
        var str = this.time1.text;
        if (!GameServer.serverOpenDay) {
        }
        else {
            var tmp = str.split("每天");
            this.time1.textFlow = TextFlowMaker.generateTextFlow1("\u6BCF\u5929" + tmp[1]);
        }
        this.time4.text = GlobalConfig.PassionPointConfig.openTips;
        for (var i = 1; i <= 4; i++)
            this["info" + i].textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this["info" + i].text);
    };
    PlayWayPanel.prototype.open = function () {
        this.addTouchEvent(this, this.onTap);
        this.observe(Millionaire.ins().postMillionaireInfo, this.callbackMillionaireInfo);
        this.observe(Millionaire.ins().postTurnDice, this.callbackRedPoint);
        this.observe(Millionaire.ins().postRoundReward, this.callbackRedPoint);
        this.observe(Millionaire.ins().postMillionaireUpdate, this.callbackRedPoint);
        this.observe(BattleCC.ins().postOpenInfo, this.updateBattleRed);
        this.observe(Actor.ins().postLevelChange, this.updateBattleRed);
        this.observe(Actor.ins().postLevelChange, this.updatePaoDianRed);
        this.observe(PaoDianCC.ins().postOpenInfo, this.updatePaoDianRed);
        this.redPoint2.visible = Millionaire.ins().getRedPoint();
        this.updateBattleRed();
        this.updatePaoDianRed();
    };
    PlayWayPanel.prototype.updateBattleRed = function () {
        this.redPoint3.visible = BattleCC.ins().checkRedPoint();
    };
    PlayWayPanel.prototype.updatePaoDianRed = function () {
        this.redPoint0.visible = PaoDianCC.ins().checkRedPoint();
    };
    PlayWayPanel.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
    };
    PlayWayPanel.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btn1:
                if (!UserBoss.ins().newWorldBossData.isOpen) {
                    UserTips.ins().showTips("\u4E16\u754CBOSS\u672A\u5F00\u542F");
                    return;
                }
                if (UserBoss.ins().newWorldBossData.startTime > GameServer.serverTime) {
                    var date = new Date(UserBoss.ins().newWorldBossData.startTime);
                    var time = date.getHours() + "\u70B9" + (date.getMinutes() ? date.getMinutes() + "分" : "");
                    UserTips.ins().showTips("\u6BCF\u5929" + time + "\u5F00\u542F\uFF0C\u8BF7\u6309\u65F6\u53C2\u52A0");
                    return;
                }
                if (!UserBoss.ins().checkNewWorldBossOpen()) {
                    UserTips.ins().showTips(GlobalConfig.NewWorldBossBaseConfig.openLv + "\u7EA7\u624D\u53EF\u4EE5\u53C2\u52A0");
                    return;
                }
                UserBoss.ins().sendIntoNewBoss();
                break;
            case this.btn2:
                Millionaire.ins().sendMillionaireInfo();
                break;
            case this.btn3:
                if (Actor.level <= GlobalConfig.CampBattleConfig.openLevel) {
                    UserTips.ins().showTips(GlobalConfig.CampBattleConfig.openLevel + "\u7EA7\u53EF\u53C2\u4E0E\u8840\u6218\u6BD4\u5947\u57CE");
                    return;
                }
                if (!BattleCC.ins().isOpen) {
                    UserTips.ins().showTips(GlobalConfig.CampBattleConfig.openTips);
                    return;
                }
                if (CityCC.ins().enterCD < 1) {
                    if (CityCC.ins().isCity) {
                        GameMap.myMoveTo(GlobalConfig.CampBattleConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.CampBattleConfig.npcPos[1] * GameMap.CELL_SIZE, BattleCC.ins().findComplete);
                        GameMap.moveTo(GlobalConfig.CampBattleConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.CampBattleConfig.npcPos[1] * GameMap.CELL_SIZE);
                    }
                    else {
                        BattleCC.ins().gotoNpc = true;
                        CityCC.ins().sendEnter();
                    }
                }
                else
                    UserTips.ins().showTips("\u51B7\u5374\u4E2D\uFF0C" + CityCC.ins().enterCD + "\u79D2\u540E\u53EF\u8FDB\u5165\u4E3B\u57CE");
                break;
            case this.btn4:
                if (!PaoDianCC.ins().isOpen) {
                    UserTips.ins().showTips(GlobalConfig.PassionPointConfig.openTips);
                    return;
                }
                var openLevel = GlobalConfig.PassionPointConfig.openLv;
                if (Actor.level + UserZs.ins().lv * 1000 < openLevel) {
                    UserTips.ins().showTips((openLevel < 1000 ? openLevel + "级" : (openLevel % 1000 == 0 ?
                        openLevel / 1000 + "转" : openLevel / 1000 + "转" + openLevel % 1000 + "级")) + "\u53EF\u53C2\u4E0E\u6FC0\u60C5\u6CE1\u70B9");
                    return;
                }
                if (CityCC.ins().enterCD < 1) {
                    if (CityCC.ins().isCity) {
                        GameMap.myMoveTo(GlobalConfig.PassionPointConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.PassionPointConfig.npcPos[1] * GameMap.CELL_SIZE, PaoDianCC.ins().findComplete);
                        GameMap.moveTo(GlobalConfig.PassionPointConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.PassionPointConfig.npcPos[1] * GameMap.CELL_SIZE);
                    }
                    else {
                        PaoDianCC.ins().gotoNpc = true;
                        CityCC.ins().sendEnter();
                    }
                }
                else
                    UserTips.ins().showTips("\u51B7\u5374\u4E2D\uFF0C" + CityCC.ins().enterCD + "\u79D2\u540E\u53EF\u8FDB\u5165\u4E3B\u57CE");
                break;
            case this.info1:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[18].text);
                break;
            case this.info2:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[19].text);
                break;
            case this.info3:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[17].text);
                break;
            case this.info4:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[20].text);
                break;
        }
    };
    PlayWayPanel.prototype.callbackMillionaireInfo = function () {
        var view = ViewManager.ins().getView(MillionaireWin);
        if (!view)
            ViewManager.ins().open(MillionaireWin);
        this.redPoint2.visible = Millionaire.ins().getRedPoint();
    };
    PlayWayPanel.prototype.callbackRedPoint = function () {
        this.redPoint2.visible = Millionaire.ins().getRedPoint();
    };
    return PlayWayPanel;
}(BaseView));
__reflect(PlayWayPanel.prototype, "PlayWayPanel");
//# sourceMappingURL=PlayWayPanel.js.map