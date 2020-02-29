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
var OSATarget9Panel5 = (function (_super) {
    __extends(OSATarget9Panel5, _super);
    function OSATarget9Panel5() {
        return _super.call(this) || this;
    }
    OSATarget9Panel5.prototype.setCurSkin = function () {
        var aCon;
        if (this.actType == ActivityType.Normal) {
            aCon = GlobalConfig.ActivityConfig[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            aCon = GlobalConfig.PActivityConfig[this.activityID];
        }
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "XNluckyTurntableSkin";
    };
    OSATarget9Panel5.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        egret.Tween.removeTweens(this.tttzhi);
        this.rolling = false;
        var data;
        if (this.actType == ActivityType.Normal) {
            data = this.ins.activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = this.ins.activityData[this.activityID];
        }
        if (data && data.indexs.length == 1) {
            this.ins.sendReward(this.activityID, 1);
        }
        TimerManager.ins().removeAll(this);
    };
    OSATarget9Panel5.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.setCurSkin();
        if (this.actType == ActivityType.Normal) {
            this.ins = Activity.ins();
            this.config9 = GlobalConfig.ActivityType9Config;
        }
        else if (this.actType == ActivityType.Personal) {
            this.ins = PActivity.ins();
            this.config9 = GlobalConfig.PActivityType9Config;
        }
        this.observe(this.ins.postChangePage, this.resultCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this.choujiangBtn, this.getLottery);
        this.list.itemRenderer = NoticeListRenderer;
        this.turnten.selected = false;
        this.currentState = "resetWithKey";
        this.validateNow();
        this.updateData();
    };
    OSATarget9Panel5.prototype.onTouch = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.currentTarget) {
        }
    };
    OSATarget9Panel5.prototype.updateData = function () {
        var config = this.config9[this.activityID][0];
        var itemcfg = GlobalConfig.ItemConfig[config.item];
        if (itemcfg) {
            this.icon.source = itemcfg.icon + "_png";
            var item = UserBag.ins().getBagItemById(itemcfg.id);
            var sum = 0;
            var maxsum = 1;
            var colorStr = 0xD1C28F;
            if (item) {
                sum = item.count;
                if (sum >= maxsum)
                    colorStr = ColorUtil.GREEN;
                else
                    colorStr = ColorUtil.RED;
            }
            else {
                colorStr = ColorUtil.RED;
            }
            this.num.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + sum + "|C:0xD1C28F&T:/" + maxsum);
            this.pay0.text = config.yb + "";
        }
        for (var i in this.config9[this.activityID]) {
            if (!(+i))
                continue;
            var cfg = this.config9[this.activityID][i];
            var item = this["item" + (+i - 1)];
            item.itemIcon.data = cfg.reward[0];
            item.rewardState(false);
        }
        this.num2.visible = false;
        this.listRefush();
        this.setTime();
    };
    OSATarget9Panel5.prototype.resultCallBack = function (id) {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = this.ins.activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = this.ins.activityData[this.activityID];
        }
        if (!data || this.activityID != id)
            return;
        if (data.indexs.length > 1) {
            ViewManager.ins().open(LuckyResultWin, this.activityID, data.indexs);
        }
        else if (data.indexs.length == 1) {
            this.beginLottery(data.indexs[0]);
        }
        this.listRefush();
        this.updateData();
    };
    OSATarget9Panel5.prototype.beginLottery = function (index) {
        var _this = this;
        var rotat = 360 * 4 + (index - 1) * 36;
        var tween = egret.Tween.get(this.tttzhi);
        this.rolling = true;
        tween.to({ "rotation": rotat }, 4000, egret.Ease.circOut).call(function () {
            _this.ins.sendReward(_this.activityID, 1);
            _this.flyItem(_this["item" + (index - 1)]);
            setTimeout(function () {
                _this.rolling = false;
            }, 2000);
        }, this);
    };
    OSATarget9Panel5.prototype.flyItem = function (item) {
        var itemBase = new ItemBase();
        itemBase.x = item.x;
        itemBase.y = item.y;
        itemBase.data = item.itemIcon.data;
        itemBase.anchorOffsetX = itemBase.width / 2;
        itemBase.anchorOffsetY = itemBase.height / 2;
        item.parent.addChild(itemBase);
        GameLogic.ins().postFlyItemEx(itemBase);
    };
    OSATarget9Panel5.prototype.getLottery = function () {
        if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
            return;
        }
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        var config = this.config9[this.activityID][0];
        if (this.turnten.selected) {
            var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, config.item);
            if (item && item.count) {
                this.ins.sendReward(this.activityID, 2);
            }
            else {
                var count = 10;
                var total = config.yb * count;
                HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + "-10", this.checkSend10.bind(this), "\u662F\u5426\u6D88\u8017" + total + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[config.item].name + "*" + count);
            }
        }
        else {
            var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, config.item);
            if (item && item.count) {
                this.ins.sendReward(this.activityID, 1);
            }
            else {
                var count = 1;
                var total = config.yb * 1;
                HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + "-1", this.checkSend1.bind(this), "\u662F\u5426\u6D88\u8017" + total + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[config.item].name + "*" + count);
            }
        }
    };
    OSATarget9Panel5.prototype.checkSend10 = function () {
        if (this.ins.getIsRollTen(this.activityID)) {
            this.ins.sendReward(this.activityID, 2);
        }
        else {
            UserTips.ins().showTips("元宝不足");
        }
    };
    OSATarget9Panel5.prototype.checkSend1 = function () {
        if (this.ins.getRollSum(this.activityID) || Actor.yb >= this.config9[this.activityID][0].yb) {
            this.ins.sendReward(this.activityID, 1);
        }
        else {
            UserTips.ins().showTips("元宝不足");
        }
    };
    OSATarget9Panel5.prototype.updateRedPoint = function () {
        var config = this.config9[this.activityID][0];
        var b = false;
        for (var i = 0; i < config.reward.length; i++) {
            b = this.ins.isGetRollReward(this.activityID, i);
            if (b)
                break;
        }
    };
    OSATarget9Panel5.prototype.listRefush = function () {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = this.ins.activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = this.ins.activityData[this.activityID];
        }
        if (data) {
            var arr = [];
            for (var i = 0; i < data.noticeArr.length; i++) {
                var config = this.config9[this.activityID][data.noticeArr[i].index];
                var notice = {
                    activityID: this.activityID,
                    name: data.noticeArr[i].name,
                    index: data.noticeArr[i].index,
                    actType: this.actType,
                    des: config ? config.middleDesc : null
                };
                arr.push(notice);
            }
            this.list.dataProvider = new eui.ArrayCollection(arr);
        }
    };
    OSATarget9Panel5.prototype.setTime = function () {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = this.ins.activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = this.ins.activityData[this.activityID];
        }
        if (data)
            this.actTime.text = "剩余时间：" + data.getRemainTime();
    };
    return OSATarget9Panel5;
}(BaseView));
__reflect(OSATarget9Panel5.prototype, "OSATarget9Panel5");
//# sourceMappingURL=OSATarget9Panel5.js.map