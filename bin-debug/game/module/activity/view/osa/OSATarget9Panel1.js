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
var OSATarget9Panel1 = (function (_super) {
    __extends(OSATarget9Panel1, _super);
    function OSATarget9Panel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "luckyTurntableSkin";
        return _this;
    }
    OSATarget9Panel1.prototype.close = function () {
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
        var data;
        var ins;
        if (this.actType == ActivityType.Normal) {
            ins = Activity.ins();
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            ins = PActivity.ins();
            data = PActivity.ins().activityData[this.activityID];
        }
        if (data && data.indexs.length == 1) {
            ins.sendReward(this.activityID, 1);
        }
        TimerManager.ins().removeAll(this);
    };
    OSATarget9Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        var ins;
        if (this.actType == ActivityType.Normal) {
            ins = Activity.ins();
        }
        else if (this.actType == ActivityType.Personal) {
            ins = PActivity.ins();
        }
        this.observe(ins.postChangePage, this.resultCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this.choujiangBtn, this.getLottery);
        for (var i = 0; i < 3; i++) {
            this.addTouchEvent(this["isget" + i], this.onGiftClick);
        }
        this.list.itemRenderer = NoticeListRenderer;
        this.turnten.selected = false;
        this.currentState = "unReset";
        this.validateNow();
        this.updateData();
    };
    OSATarget9Panel1.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.getkey:
                break;
        }
    };
    OSATarget9Panel1.prototype.updateData = function () {
        var data;
        var config;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().activityData[this.activityID];
            config = GlobalConfig.ActivityType9Config[this.activityID][0];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().activityData[this.activityID];
            config = GlobalConfig.PActivityType9Config[this.activityID][0];
        }
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
        var configList;
        if (this.actType == ActivityType.Normal) {
            configList = GlobalConfig.ActivityType9Config;
        }
        else if (this.actType == ActivityType.Personal) {
            configList = GlobalConfig.PActivityType9Config;
        }
        for (var i in configList[this.activityID]) {
            if (!(+i))
                continue;
            var cfg = configList[this.activityID][i];
            var item = this["item" + (+i - 1)];
            item.itemIcon.data = cfg.reward[0];
            item.rewardState(false);
        }
        this.num2.visible = false;
        this.updateProgress();
        this.listRefush();
        this.setTime();
    };
    OSATarget9Panel1.prototype.resultCallBack = function (id) {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().activityData[this.activityID];
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
    };
    OSATarget9Panel1.prototype.beginLottery = function (index) {
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
    OSATarget9Panel1.prototype.flyItem = function (item) {
        var itemBase = new ItemBase();
        itemBase.x = item.x;
        itemBase.y = item.y;
        itemBase.data = item.itemIcon.data;
        itemBase.anchorOffsetX = itemBase.width / 2;
        itemBase.anchorOffsetY = itemBase.height / 2;
        item.parent.addChild(itemBase);
        GameLogic.ins().postFlyItemEx(itemBase);
    };
    OSATarget9Panel1.prototype.flyItemEx = function (itemicon) {
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
    OSATarget9Panel1.prototype.getLottery = function () {
        if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
            return;
        }
        var ins;
        var cfg;
        if (this.actType == ActivityType.Normal) {
            ins = Activity.ins();
            cfg = GlobalConfig.ActivityType9Config[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            ins = PActivity.ins();
            cfg = GlobalConfig.PActivityType9Config[this.activityID];
        }
        if (this.turnten.selected) {
            if (ins.getIsRollTen(this.activityID)) {
                ins.sendReward(this.activityID, 2);
            }
            else {
                UserTips.ins().showTips("元宝不足");
            }
        }
        else {
            if (ins.getRollSum(this.activityID) || Actor.yb >= cfg[0].yb) {
                ins.sendReward(this.activityID, 1);
            }
            else {
                UserTips.ins().showTips("元宝不足");
            }
        }
    };
    OSATarget9Panel1.prototype.onGiftClick = function (e) {
        for (var i = 0; i < 3; i++) {
            if (e.currentTarget == this["isget" + i]) {
                var itemicon = this["gift" + i].getItemIcon();
                this.flyItemEx(itemicon);
                Activity.ins().sendReward(this.activityID, 0, i + 1);
                break;
            }
        }
    };
    OSATarget9Panel1.prototype.updateProgress = function () {
        var cfg;
        var data;
        if (this.actType == ActivityType.Normal) {
            cfg = GlobalConfig.ActivityType9Config[this.activityID];
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            cfg = GlobalConfig.PActivityType9Config[this.activityID];
            data = PActivity.ins().activityData[this.activityID];
        }
        var config = cfg[0];
        if (config && data) {
            this.turntime.text = data.count + "";
            for (var i = 0; i < 3; i++) {
                this["turntime" + i].text = config.reward[i].times;
                this["gift" + i].data = { id: config.reward[i].id, type: config.reward[i].type, count: config.reward[i].count };
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
    OSATarget9Panel1.prototype.updateRedPoint = function (activityID, idx) {
        var ins;
        if (this.actType == ActivityType.Normal) {
            ins = Activity.ins();
        }
        else if (this.actType == ActivityType.Personal) {
            ins = PActivity.ins();
        }
        var b = ins.isGetRollReward(activityID, idx);
        this["redPoint" + idx].visible = b;
    };
    OSATarget9Panel1.prototype.listRefush = function () {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().activityData[this.activityID];
        }
        if (data) {
            var arr = [];
            for (var i = 0; i < data.noticeArr.length; i++) {
                var notice = { activityID: this.activityID, name: data.noticeArr[i].name, index: data.noticeArr[i].index, actType: this.actType };
                arr.push(notice);
            }
            this.list.dataProvider = new eui.ArrayCollection(arr);
        }
    };
    OSATarget9Panel1.prototype.setTime = function () {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().activityData[this.activityID];
        }
        if (data)
            this.actTime.text = "剩余时间：" + data.getRemainTime();
    };
    return OSATarget9Panel1;
}(BaseView));
__reflect(OSATarget9Panel1.prototype, "OSATarget9Panel1");
//# sourceMappingURL=OSATarget9Panel1.js.map