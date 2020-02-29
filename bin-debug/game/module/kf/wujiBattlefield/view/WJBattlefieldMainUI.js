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
var WJBattlefieldMainUI = (function (_super) {
    __extends(WJBattlefieldMainUI, _super);
    function WJBattlefieldMainUI() {
        var _this = _super.call(this) || this;
        _this.flagRes = ["wj_gray_flag", "wj_green_flag", "wj_red_flag"];
        _this.skinName = "WJBattleMainUISkin";
        return _this;
    }
    WJBattlefieldMainUI.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.sChatBtn, this.onTouch);
        this.addTouchEvent(this.flag1, this.onTouch);
        this.addTouchEvent(this.flag2, this.onTouch);
        this.addTouchEvent(this.flag3, this.onTouch);
        this.addTouchEvent(this.sChatList, this.sendChat);
        this.addTouchEvent(this.viewArea, this.onTouch);
        this.observe(WJBattlefieldSys.ins().postChatInfo, this.pushChatInfo);
        this.observe(WJBattlefieldSys.ins().postMyData, this.upMydata);
        this.observe(WJBattlefieldSys.ins().postRefCampScores, this.refScores);
        this.observe(WJBattlefieldSys.ins().postRefCampFlag, this.refFlag);
        this.minMap.open(SmallSceneType.WJBattle);
        this.startActTime();
        this.upMydata();
        this.refScores();
        this.refFlag();
        if (ViewManager.ins().isShow(UIView2))
            ViewManager.ins().getView(UIView2).isHideNavBtn(false);
    };
    WJBattlefieldMainUI.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.minMap.close();
        ViewManager.ins().close(TargetListPanel);
        TimerManager.ins().removeAll(this);
        if (ViewManager.ins().isShow(UIView2))
            ViewManager.ins().getView(UIView2).isHideNavBtn(true);
    };
    WJBattlefieldMainUI.prototype.initUI = function () {
        this.sChatList.itemRenderer = WJBattleSChatItem;
        this.chatList.itemRenderer = WJBattleChatItem;
        this.minMap = new SmallMapPanel();
        this.smallMapGroup.addChild(this.minMap);
        this._sChatData = new eui.ArrayCollection;
        this.sChatList.dataProvider = this._sChatData;
        this._chatData = new eui.ArrayCollection;
        this.chatList.dataProvider = this._chatData;
        this.winTermLabel.text = "\u79EF\u5206\u7387\u5148\u8FBE\u5230" + GlobalConfig.WujiBaseConfig.winScore + "\u83B7\u80DC";
        this._sChatData.replaceAll(GlobalConfig.WujiBaseConfig.quickChat);
        this.myScoreBar.maximum = GlobalConfig.WujiBaseConfig.winScore;
        this.enemyScoreBar.maximum = GlobalConfig.WujiBaseConfig.winScore;
    };
    WJBattlefieldMainUI.prototype.upMydata = function (data) {
        this.killTxt.text = !data ? "0" : data.killNum + "";
        this.deadTxt.text = !data ? "0" : data.killedNum + "";
        this.collectTxt.text = !data ? "0" : data.collectFlagNum + "";
        this.assistsTxt.text = !data ? "0" : data.assistsNum + "";
    };
    WJBattlefieldMainUI.prototype.refScores = function () {
        this.myScoreLabel.text = WJBattlefieldSys.ins().campAScores + "";
        this.enemyScoreLabel.text = WJBattlefieldSys.ins().campBScores + "";
        this.myScoreBar.value = WJBattlefieldSys.ins().campAScores;
        this.enemyScoreBar.value = WJBattlefieldSys.ins().campBScores;
    };
    WJBattlefieldMainUI.prototype.refFlag = function () {
        for (var i = 0; i < 3; i++) {
            var camp = WJBattlefieldSys.ins().flagInfos[i];
            if (camp) {
                this["flag" + (i + 1)].icon = camp == WJBattlefieldSys.ins().myCampId ? this.flagRes[1] : this.flagRes[2];
            }
            else
                this["flag" + (i + 1)].icon = this.flagRes[0];
        }
    };
    WJBattlefieldMainUI.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.sChatBtn:
                this.sChatGroup.visible = !this.sChatGroup.visible;
                break;
            case this.flag1:
                GameLogic.ins().postChangeAttrPoint(WJBattlefieldSys.ins().flagHandle[1]);
                break;
            case this.flag2:
                GameLogic.ins().postChangeAttrPoint(WJBattlefieldSys.ins().flagHandle[2]);
                break;
            case this.flag3:
                GameLogic.ins().postChangeAttrPoint(WJBattlefieldSys.ins().flagHandle[3]);
                break;
            case this.viewArea:
                WJBattlefieldSys.ins().sendViewDataInfo();
                break;
        }
    };
    WJBattlefieldMainUI.prototype.sendChat = function (e) {
        if (e.target instanceof WJBattleSChatItem) {
            var item = e.target;
            item.bg.scaleX = item.bg.scaleY = .9;
            WJBattlefieldSys.ins().sendChatInfo(e.target.data);
            this.sChatGroup.visible = false;
        }
    };
    WJBattlefieldMainUI.prototype.startActTime = function () {
        TimerManager.ins().doTimer(1000, 0, this.onTick, this);
    };
    WJBattlefieldMainUI.prototype.onTick = function () {
        var time = WJBattlefieldSys.ins().getEndTime();
        this.overTimerLabel.text = DateUtils.getFormatBySecond(time);
    };
    WJBattlefieldMainUI.prototype.pushChatInfo = function (msg) {
        this._chatData.addItem(msg);
        if (this._chatData.length > 3)
            this._chatData.removeItemAt(0);
    };
    return WJBattlefieldMainUI;
}(BaseEuiView));
__reflect(WJBattlefieldMainUI.prototype, "WJBattlefieldMainUI");
ViewManager.ins().reg(WJBattlefieldMainUI, LayerManager.UI_Popup);
//# sourceMappingURL=WJBattlefieldMainUI.js.map