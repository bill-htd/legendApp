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
var HefuLCZBPanel = (function (_super) {
    __extends(HefuLCZBPanel, _super);
    function HefuLCZBPanel() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.openTime = [3, 5, 7];
        _this.skinName = "hefuLongchengSkin";
        _this.effs = [];
        return _this;
    }
    HefuLCZBPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HefuLCZBPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.go, this.onTap);
        this.observe(GuildWar.ins().postHeFuBelong, this.updateBelongs);
        GuildWar.ins().sendHeFuBelong();
        this.updateData();
    };
    HefuLCZBPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.go, this.onTap);
        this.removeObserve();
        for (var i = 0; i < this.effs.length; i++) {
            if (this.effs[i])
                DisplayUtils.removeFromParent(this.effs[i]);
        }
        this.effs = [];
    };
    HefuLCZBPanel.prototype.onTap = function (e) {
        var index;
        switch (e.currentTarget) {
            case this.go:
                if (Guild.ins().guildID != 0) {
                    ViewManager.ins().close(ActivityExWin);
                    GuildWar.ins().requestWinGuildInfo();
                    ViewManager.ins().close(GuildMap);
                    ViewManager.ins().open(GuildWarMainWin);
                }
                else {
                    UserTips.ins().showTips("还没加入行会");
                }
                break;
        }
    };
    HefuLCZBPanel.prototype.getTime = function (activityData) {
        return;
    };
    HefuLCZBPanel.prototype.updateData = function () {
        this.actInfo.text = GlobalConfig.ActivityBtnConfig[this.activityID].acDesc;
        var openTime = GlobalConfig.GuildBattleConst.hefuOpen;
        var hefuTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
        var str = "";
        var timeS = 0;
        var date;
        var i;
        for (i = 0; i < openTime.length; i++) {
            if (str.length > 0) {
                str += "、";
            }
            timeS = hefuTime + (openTime[i].day - 1) * DateUtils.MS_PER_DAY;
            date = new Date(timeS);
            date.setHours(openTime[i].hours, openTime[i].min || 0, 0, 0);
            var min = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes() + "";
            str += (date.getMonth() + 1) + "月" + date.getDate() + "日" + date.getHours() + ":" + min;
        }
        this.actTime.text = str;
        var b = false;
        var firstNum;
        var startIndex = 0;
        var timeE = 0;
        var dataE;
        var lastNum;
        for (i = 0; i < openTime.length; i++) {
            timeS = hefuTime + (openTime[i].day - 1) * DateUtils.MS_PER_DAY;
            timeE = hefuTime + openTime[i].day * DateUtils.MS_PER_DAY;
            date = new Date(timeS);
            date.setHours(openTime[i].hours, openTime[i].min || 0, 0, 0);
            dataE = new Date(timeE);
            dataE.setHours(0, 0, 0);
            if (i == 0) {
                firstNum = date.getTime();
            }
            if (i == openTime.length - 1) {
                lastNum = dataE.getTime();
            }
            if (GameServer.serverTime >= date.getTime() && GameServer.serverTime < dataE.getTime()) {
                b = true;
                startIndex = i;
                break;
            }
        }
        if (!b) {
            this.over.visible = true;
            if (GameServer.serverTime < firstNum) {
                this.over.text = "未开启";
            }
            else if (GameServer.serverTime >= lastNum) {
                this.over.text = "已结束";
            }
            else {
                this.over.text = "未开启";
            }
        }
        else {
            this.over.visible = false;
        }
        this.go.visible = !this.over.visible;
        var awardany = GlobalConfig.GuildBattleConst.hefuAward.leader;
        var list = awardany.award;
        this.list0.itemRenderer = ItemBase;
        this.list1.itemRenderer = ItemBase;
        this.list2.itemRenderer = ItemBase;
        this.list0.dataProvider = new eui.ArrayCollection(list[0]);
        this.list1.dataProvider = new eui.ArrayCollection(list[1]);
        this.list2.dataProvider = new eui.ArrayCollection(list[2]);
    };
    HefuLCZBPanel.prototype.updateBelongs = function () {
        for (var i = 0; i < 3; i++) {
            if (GuildWar.ins().GuildNameBelongs[i]) {
                this["guild" + i].visible = true;
                this["guild" + i].text = "\u5F52\u5C5E:" + GuildWar.ins().GuildNameBelongs[i];
            }
            else
                this["guild" + i].visible = false;
        }
    };
    return HefuLCZBPanel;
}(BaseView));
__reflect(HefuLCZBPanel.prototype, "HefuLCZBPanel");
//# sourceMappingURL=HefuLCZBPanel.js.map