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
var LiLianWin = (function (_super) {
    __extends(LiLianWin, _super);
    function LiLianWin() {
        var _this = _super.call(this) || this;
        _this.oldIndex = LiLianWin.JUEWEI;
        _this.skinName = "LiLianWinSkin";
        _this.isTopLevel = true;
        return _this;
    }
    LiLianWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var index = LiLianWin.JUEWEI;
        if (!LiLian.ins().checkJueWeiOpen()) {
            index = LiLianWin.SHENQI;
        }
        this.viewStack.selectedIndex = index;
        this.tab.dataProvider = this.viewStack;
        this.tab.validateNow();
    };
    LiLianWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    LiLianWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var selectedIndex = param[0] == undefined ? LiLianWin.SHENQI : param[0];
        switch (selectedIndex) {
            case LiLianWin.SHENQI:
                break;
            case LiLianWin.JUEWEI:
                if (!LiLian.ins().checkJueWeiOpen()) {
                    UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u9738\u8005\u4E4B\u8BC1 \u540E\u5F00\u542F");
                    return false;
                }
                break;
            case LiLianWin.XUNZHANG:
                if (!LiLian.ins().checkXunZhangOpen()) {
                    UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u592A\u521D\u52CB\u7AE0 \u540E\u5F00\u542F");
                    return false;
                }
                break;
            case LiLianWin.BOOK:
                if (!LiLian.ins().checkBookOpen()) {
                    UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.BOOK));
                    return false;
                }
                break;
            case LiLianWin.WEIWANG:
                if (!WeiWangCC.ins().isOpen) {
                    UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.PrestigeBase.openDay + "\u5929" + GlobalConfig.PrestigeBase.openLevel + "\u7EA7\u5F00\u542F");
                    return false;
                }
                break;
        }
        return true;
    };
    LiLianWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTapTouching);
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addTouchEvent(this.help, this.onTouch);
        this.observe(LiLian.ins().postLilianData, this.delayRedPoint);
        this.observe(LiLian.ins().postNobilityData, this.delayRedPoint);
        this.observe(UserTask.ins().postTaskChangeData, this.delayRedPoint);
        this.observe(Artifact.ins().postNewArtifactUpdate, this.delayRedPoint);
        this.observe(Artifact.ins().postNewArtifactInit, this.delayRedPoint);
        this.observe(BookRedPoint.ins().postRedPoint, this.delayRedPoint);
        this.observe(BookRedPoint.ins().postLvlUp, this.delayRedPoint);
        this.observe(Box.ins().postUpdateData, this.delayRedPoint);
        this.observe(Box.ins().postUpdateFreeBox, this.delayRedPoint);
        this.observe(LiLian.ins().postJadeLv, this.delayRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.delayRedPoint);
        this.observe(UserBag.ins().postItemChange, this.delayRedPoint);
        var index = LiLianWin.JUEWEI;
        if (!LiLian.ins().checkJueWeiOpen()) {
            index = LiLianWin.SHENQI;
        }
        if (param[0]) {
            index = param[0];
        }
        this._ext = param[1];
        this.help.visible = false;
        this.setOpenTabIndex(index);
    };
    LiLianWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var num = this.viewStack.numChildren;
        for (var i = 0; i < num; i++) {
            this.viewStack.getChildAt(i).close();
        }
        var uiview2 = ViewManager.ins().getView(UIView2);
        if (uiview2)
            uiview2.closeNav(UIView2.NAV_LILIAN);
    };
    LiLianWin.prototype.setOpenTabIndex = function (index) {
        this.tab.selectedIndex = this.viewStack.selectedIndex = index;
        this.setOpenIndex(index);
        this.setRedPoint();
    };
    LiLianWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.help:
                break;
        }
    };
    LiLianWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
    };
    LiLianWin.prototype.setOpenIndex = function (selectedIndex) {
        var id = 0;
        switch (selectedIndex) {
            case LiLianWin.SHENQI:
                this.artifactWin.open();
                break;
            case LiLianWin.JUEWEI:
                if (LiLian.ins().checkJueWeiOpen()) {
                    this.liLianPanel.open();
                }
                else {
                    UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u9738\u8005\u4E4B\u8BC1 \u540E\u5F00\u542F");
                    this.tab.selectedIndex = this.oldIndex;
                }
                break;
            case LiLianWin.XUNZHANG:
                if (LiLian.ins().checkXunZhangOpen()) {
                    this.xunzhangPanel.open();
                }
                else {
                    UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u592A\u521D\u52CB\u7AE0 \u540E\u5F00\u542F");
                    this.tab.selectedIndex = this.oldIndex;
                }
                break;
            case LiLianWin.BOOK:
                if (LiLian.ins().checkBookOpen()) {
                    if (this._ext) {
                        this.bookPanel.open(this._ext);
                        this._ext = null;
                    }
                    else {
                        this.bookPanel.open();
                    }
                }
                else {
                    UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.BOOK));
                    this.tab.selectedIndex = this.oldIndex;
                }
                break;
            case LiLianWin.WEIWANG:
                if (WeiWangCC.ins().isOpen)
                    this.WeiWang.open();
                else {
                    UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.PrestigeBase.openDay + "\u5929" + GlobalConfig.PrestigeBase.openLevel + "\u7EA7\u5F00\u542F");
                    this.tab.selectedIndex = this.oldIndex;
                }
                break;
        }
        this.oldIndex = this.tab.selectedIndex;
    };
    LiLianWin.prototype.delayRedPoint = function () {
        if (!TimerManager.ins().isExists(this.setRedPoint, this))
            TimerManager.ins().doTimer(60, 1, this.setRedPoint, this);
    };
    LiLianWin.prototype.setRedPoint = function () {
        var lilian = LiLian.ins();
        this.redPoint0.visible = Artifact.ins().showRedPoint();
        this.redPoint1.visible = lilian.getLilianShenGongStast() || lilian.isGetTrainDayAwardAll();
        var isMaxLevel = LiLian.ins().getNobilityIsMaxLevel();
        this.redPoint2.visible = lilian.checkXunZhangOpen() && lilian.getNobilityIsUpGrade() && !isMaxLevel;
        this.redPoint3.visible = BookRedPoint.ins().redpoint || BookRedPoint.ins().canLvlUp;
        this.redPoint4.visible = false;
    };
    LiLianWin.prototype.onTapTouching = function (e) {
        if (!LiLianWin.openCheck(e.currentTarget.selectedIndex)) {
            e.preventDefault();
            return;
        }
        ViewManager.ins().close(LimitTaskView);
    };
    LiLianWin.SHENQI = 1;
    LiLianWin.JUEWEI = 0;
    LiLianWin.XUNZHANG = 2;
    LiLianWin.BOOK = 3;
    LiLianWin.WEIWANG = 4;
    return LiLianWin;
}(BaseEuiView));
__reflect(LiLianWin.prototype, "LiLianWin");
ViewManager.ins().reg(LiLianWin, LayerManager.UI_Main);
//# sourceMappingURL=LiLianWin.js.map