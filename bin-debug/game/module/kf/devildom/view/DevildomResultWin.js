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
var DevildomResultWin = (function (_super) {
    __extends(DevildomResultWin, _super);
    function DevildomResultWin() {
        var _this = _super.call(this) || this;
        _this.quitTime = 30;
        _this.skinName = "KFInvasionResultSkin";
        return _this;
    }
    DevildomResultWin.prototype.childrenCreated = function () {
        this.saleList.itemRenderer = ItemBase;
        this.rewardList.itemRenderer = ItemBase;
    };
    DevildomResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onCloseWin);
        var winer = EntityManager.ins().getEntityByHandle(param[0]);
        if (winer) {
            var info = winer.infoModel;
            var tname = info.name;
            tname = StringUtils.replaceStr(tname, "0xffffff", ColorUtil.ROLENAME_COLOR_GREEN + "");
            this.belongTxt.textFlow = TextFlowMaker.generateTextFlow1(tname + "\u3010" + info.guildName + "\u3011");
            this.roleIcon.icon = "yuanhead" + info.job + info.sex;
        }
        else {
            this.belongTxt.textFlow = TextFlowMaker.generateTextFlow1("" + param[1]);
        }
        this.roleIcon['jobImg'].visible = false;
        if (!param[2]) {
            this.rewardLabel.text = "\u6211\u7684\u53C2\u4E0E\u5956\uFF1A";
        }
        var saleRewards = param[3];
        this.saleList.dataProvider = new eui.ArrayCollection(saleRewards);
        if (saleRewards.length == 0)
            this.saleLabel.text = "\u884C\u4F1A\u62CD\u5356\u54C1\uFF1A\u65E0";
        var rewards = param[4];
        this.rewardList.dataProvider = new eui.ArrayCollection(rewards);
        TimerManager.ins().doTimer(1000, this.quitTime + 1, this.onTimer, this);
        this.onTimer();
    };
    DevildomResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
    };
    DevildomResultWin.prototype.onCloseWin = function () {
        ViewManager.ins().close(this);
        UserFb.ins().sendExitFb();
    };
    DevildomResultWin.prototype.onTimer = function () {
        this.closeBtn.label = "\u786E\u5B9A(" + --this.quitTime + ")";
        if (this.quitTime <= 0) {
            this.onCloseWin();
        }
    };
    return DevildomResultWin;
}(BaseEuiView));
__reflect(DevildomResultWin.prototype, "DevildomResultWin");
ViewManager.ins().reg(DevildomResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=DevildomResultWin.js.map