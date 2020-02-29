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
var OSATarget17Panel2 = (function (_super) {
    __extends(OSATarget17Panel2, _super);
    function OSATarget17Panel2() {
        var _this = _super.call(this) || this;
        _this.skinName = "luckyTurntableSkin2";
        return _this;
    }
    OSATarget17Panel2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        egret.Tween.removeTweens(this.tttzhi);
        TimerManager.ins().removeAll(this);
        this.rolling = false;
        this.isClick = false;
    };
    OSATarget17Panel2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postRewardResult, this.resultCallBack);
        this.addTouchEvent(this.choujiangBtn, this.startLottery);
        this.addTouchEvent(this.back, this.gotoHome);
        this.list.itemRenderer = NoticeListRenderer;
        this.updateView();
        this.updateData();
    };
    OSATarget17Panel2.prototype.updateView = function () {
        var data = Activity.ins().activityData[this.activityID];
        var config2 = GlobalConfig.ActivityType17_2Config[this.activityID];
        var config3 = GlobalConfig.ActivityType17_3Config[this.activityID];
        var showAwards = config3[CommonUtils.getObjectLength(config3)].group;
        var max = showAwards.length;
        for (var i = 0; i < max; i++) {
            this["item" + i].itemIcon.data = showAwards[i];
            this["item" + i].rewardState((data.recrod >> (i + 1) & 1));
        }
        this.listRefush();
        var btnCfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (btnCfg)
            this.title.source = btnCfg.title;
    };
    OSATarget17Panel2.prototype.updateData = function () {
        var data = Activity.ins().activityData[this.activityID];
        this.inte.text = "\u5F53\u524D\u79EF\u5206 " + data.score;
    };
    OSATarget17Panel2.prototype.resultCallBack = function (id) {
        if (!Activity.ins().isSuccee)
            return;
        if (!this.isClick)
            return;
        if (this.activityID != id)
            return;
        var data = Activity.ins().activityData[this.activityID];
        var index = data.awardIndex;
        if (index)
            this.beginLottery(index);
        this.updateView();
        this.listRefush();
    };
    OSATarget17Panel2.prototype.beginLottery = function (index) {
        var _this = this;
        var rotat = 360 * 4 + (index - 1) * (360 / 12);
        var tween = egret.Tween.get(this.tttzhi);
        this.rolling = true;
        tween.to({ "rotation": rotat }, 4000, egret.Ease.circOut).call(function () {
            Activity.ins().sendReward(_this.activityID, 0);
            Activity.ins().isSuccee = false;
            _this.flyItemEx(_this["item" + (index - 1)]);
            setTimeout(function () {
                _this.rolling = false;
                _this.isClick = false;
            }, 2000);
        }, this);
    };
    OSATarget17Panel2.prototype.flyItemEx = function (itemicon) {
        var flyItem = new eui.Image(itemicon.itemIcon.getItemSoure());
        flyItem.x = itemicon.x;
        flyItem.y = itemicon.y;
        flyItem.scaleX = 1;
        flyItem.scaleY = 1;
        itemicon.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
    };
    OSATarget17Panel2.prototype.startLottery = function () {
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        var data = Activity.ins().activityData[this.activityID];
        var cfg2 = GlobalConfig.ActivityType17_2Config[this.activityID];
        if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
            return;
        }
        if (this.isClick) {
            UserTips.ins().showTips("等待抽奖结果 请稍后");
            return;
        }
        if (Activity.ins().getRollSum(this.activityID) || data.score >= cfg2.score) {
            this.isClick = true;
            Activity.ins().sendReward(this.activityID, 1);
        }
        else {
            UserTips.ins().showTips("\u79EF\u5206\u4E0D\u591F");
            this.isClick = false;
        }
    };
    OSATarget17Panel2.prototype.listRefush = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (data) {
            var arr = [];
            for (var i = 0; i < data.noticeArr.length; i++) {
                var notice = { activityID: this.activityID, activityType: ActivityDataFactory.ACTIVITY_TYPE_17, name: data.noticeArr[i].name, index: data.noticeArr[i].index };
                arr.push(notice);
            }
            this.list.dataProvider = new eui.ArrayCollection(arr);
        }
    };
    OSATarget17Panel2.prototype.gotoHome = function () {
        if (this.showPanel)
            this.showPanel(1);
    };
    return OSATarget17Panel2;
}(ActivityPanel));
__reflect(OSATarget17Panel2.prototype, "OSATarget17Panel2");
//# sourceMappingURL=OSATarget17Panel2.js.map