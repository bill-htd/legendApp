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
var DoubleTwelveLottery = (function (_super) {
    __extends(DoubleTwelveLottery, _super);
    function DoubleTwelveLottery() {
        return _super.call(this) || this;
    }
    DoubleTwelveLottery.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        for (var i = 0; i < 3; i++) {
            this.removeTouchEvent(this["isget" + i], this.onGiftClick);
        }
        egret.Tween.removeTweens(this.tttzhi);
        this.rolling = false;
        var data = Activity.ins().doubleTwelveData[this.activityID];
        if (data.indexs.length == 1) {
            Activity.ins().sendReward(this.activityID, 1);
        }
        TimerManager.ins().removeAll(this);
    };
    DoubleTwelveLottery.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postChangePage, this.resultCallBack);
        this.observe(Activity.ins().postChangePage, this.updateView);
        this.observe(Activity.ins().postRewardResult, this.updateView);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateView);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this.choujiangBtn, this.getLottery);
        for (var i = 0; i < 3; i++) {
            this.addTouchEvent(this["isget" + i], this.onGiftClick);
        }
        this.list.itemRenderer = NoticeListRenderer;
        this.turnten.selected = false;
        this.updateView();
    };
    DoubleTwelveLottery.prototype.onTouch = function (e) {
    };
    DoubleTwelveLottery.prototype.updateView = function () {
        var data = Activity.ins().doubleTwelveData[this.activityID];
        var config = GlobalConfig.ActivityType9Config[this.activityID][0];
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
        for (var i in GlobalConfig.ActivityType9Config[this.activityID]) {
            if (!(+i))
                continue;
            var cfg = GlobalConfig.ActivityType9Config[this.activityID][i];
            var item = this["item" + (+i - 1)];
            item.itemIcon.data = cfg.reward[0];
            item.rewardState(false);
        }
        this.num2.visible = false;
        this.updateProgress();
        this.listRefush();
        this.setTime();
    };
    DoubleTwelveLottery.prototype.resultCallBack = function () {
        var data = Activity.ins().doubleTwelveData[this.activityID];
        if (data.indexs.length > 1) {
            ViewManager.ins().open(LuckyResultWin, this.activityID, data.indexs);
        }
        else if (data.indexs.length == 1) {
            this.beginLottery(data.indexs[0]);
        }
        this.listRefush();
    };
    DoubleTwelveLottery.prototype.beginLottery = function (index) {
        var _this = this;
        var rotat = 360 * 4 + (index - 1) * 36;
        var tween = egret.Tween.get(this.tttzhi);
        this.rolling = true;
        tween.to({ "rotation": rotat }, 4000, egret.Ease.circOut).call(function () {
            Activity.ins().sendReward(_this.activityID, 1);
            _this.flyItem(_this["item" + (index - 1)]);
            setTimeout(function () {
                _this.rolling = false;
            }, 2000);
        }, this);
    };
    DoubleTwelveLottery.prototype.flyItem = function (item) {
        var itemBase = new ItemBase();
        itemBase.x = item.x;
        itemBase.y = item.y;
        itemBase.data = item.itemIcon.data;
        itemBase.anchorOffsetX = itemBase.width / 2;
        itemBase.anchorOffsetY = itemBase.height / 2;
        item.parent.addChild(itemBase);
        GameLogic.ins().postFlyItemEx(itemBase);
    };
    DoubleTwelveLottery.prototype.flyItemEx = function (itemicon) {
        var flyItem = new eui.Image(itemicon.imgIcon.source);
        flyItem.x = itemicon.imgIcon.x;
        flyItem.y = itemicon.imgIcon.y;
        flyItem.width = itemicon.imgIcon.width;
        flyItem.height = itemicon.imgIcon.height;
        flyItem.scaleX = itemicon.imgIcon.scaleX;
        flyItem.scaleY = itemicon.imgIcon.scaleY;
        itemicon.imgIcon.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
    };
    DoubleTwelveLottery.prototype.getLottery = function () {
        if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
            return;
        }
        if (this.turnten.selected) {
            if (Activity.ins().getIsRollTen(this.activityID)) {
                Activity.ins().sendReward(this.activityID, 2);
            }
            else {
                UserTips.ins().showTips("元宝不足");
            }
        }
        else {
            if (Activity.ins().getRollSum(this.activityID) || Actor.yb >= GlobalConfig.ActivityType9Config[this.activityID][0].yb) {
                Activity.ins().sendReward(this.activityID, 1);
            }
            else {
                UserTips.ins().showTips("元宝不足");
            }
        }
    };
    DoubleTwelveLottery.prototype.onGiftClick = function (e) {
        for (var i = 0; i < 3; i++) {
            if (e.currentTarget == this["isget" + i]) {
                var itemicon = this["gift" + i].getItemIcon();
                this.flyItemEx(itemicon);
                Activity.ins().sendReward(this.activityID, 0, i + 1);
                break;
            }
        }
    };
    DoubleTwelveLottery.prototype.updateProgress = function () {
        var config = GlobalConfig.ActivityType9Config[this.activityID][0];
        var data = Activity.ins().doubleTwelveData[this.activityID];
        if (config && data) {
            this.turntime.text = data.count + "";
            for (var i = 0; i < 3; i++) {
                this["turntime" + i].text = config.reward[i].times;
                this["gift" + i].data = {
                    id: config.reward[i].id, type: config.reward[i].type, count: config.reward[i].count
                };
                this["gift" + i].isShowName(false);
                this["bar" + i].maximum = 100;
                this["lingqu" + i].touchEnabled = false;
                if (data.record >> (i + 1) & 1) {
                    this["bar" + i].value = 100;
                    this["lingqu" + i].visible = true;
                    this["isget" + i].touchEnabled = false;
                }
                else {
                    this["lingqu" + i].visible = false;
                    if (data.count >= config.reward[i].times) {
                        this["bar" + i].value = 100;
                        this["isget" + i].touchEnabled = true;
                    }
                    else {
                        var prerewards = config.reward[i - 1];
                        var curCount = data.count;
                        var totalCount = config.reward[i].times;
                        if (prerewards) {
                            curCount = data.count - prerewards.times;
                            totalCount = config.reward[i].times - prerewards.times;
                        }
                        curCount = curCount > 0 ? curCount : 0;
                        this["bar" + i].value = Math.floor(curCount / totalCount * 100);
                        this["isget" + i].touchEnabled = false;
                    }
                }
                this.updateRedPoint(this.activityID, i);
            }
        }
    };
    DoubleTwelveLottery.prototype.updateRedPoint = function (activityID, idx) {
        var b = Activity.ins().isGetRollReward(activityID, idx);
        this["redPoint" + idx].visible = b;
    };
    DoubleTwelveLottery.prototype.listRefush = function () {
        var data = Activity.ins().doubleTwelveData[this.activityID];
        if (data) {
            var arr = [];
            for (var i = 0; i < data.noticeArr.length; i++) {
                var notice = {
                    activityID: this.activityID, name: data.noticeArr[i].name, index: data.noticeArr[i].index
                };
                arr.push(notice);
            }
            this.list.dataProvider = new eui.ArrayCollection(arr);
        }
    };
    DoubleTwelveLottery.prototype.setTime = function () {
        var data = Activity.ins().doubleTwelveData[Activity.ins().doubleTwelveIDAry[2]];
        this.actTime.text = "剩余时间：" + data.getLastTime();
    };
    return DoubleTwelveLottery;
}(ActivityPanel));
__reflect(DoubleTwelveLottery.prototype, "DoubleTwelveLottery");
//# sourceMappingURL=DoubleTwelveLottery.js.map