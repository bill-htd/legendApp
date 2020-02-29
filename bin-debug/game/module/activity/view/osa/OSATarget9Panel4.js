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
var OSATarget9Panel4 = (function (_super) {
    __extends(OSATarget9Panel4, _super);
    function OSATarget9Panel4() {
        var _this = _super.call(this) || this;
        _this.huntType = 1;
        _this.skinName = "luckyTurntableSkin";
        return _this;
    }
    OSATarget9Panel4.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.menuScroller.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
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
    OSATarget9Panel4.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        if (this.actType == ActivityType.Normal) {
            this.ins = Activity.ins();
            this.config9 = GlobalConfig.ActivityType9Config;
        }
        else if (this.actType == ActivityType.Personal) {
            this.ins = PActivity.ins();
            this.config9 = GlobalConfig.PActivityType9Config;
        }
        this.observe(this.ins.postChangePage, this.resultCallBack);
        this.addEvent(eui.UIEvent.CHANGE_END, this.menuScroller, this.onChange);
        this.addTouchEvent(this.rightBtn, this.onTouch);
        this.addTouchEvent(this.leftBtn, this.onTouch);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this.choujiangBtn, this.getLottery);
        this.list.itemRenderer = NoticeListRenderer;
        this.menuList.itemRenderer = OSATarget9Panel3ItemRender;
        this.menuListData = new eui.ArrayCollection();
        this.menuList.dataProvider = this.menuListData;
        this.turnten.selected = false;
        this.currentState = "resetWithKey";
        this.validateNow();
        this.updateData();
    };
    OSATarget9Panel4.prototype.onTouch = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.currentTarget) {
            case this.leftBtn:
                scrollH = this.menuList.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.menuList.scrollH = scrollH;
                this.updateBtn();
                break;
            case this.rightBtn:
                scrollH = this.menuList.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.menuList.contentWidth - this.menuScroller.width) {
                    scrollH = this.menuList.contentWidth - this.menuScroller.width;
                }
                this.menuList.scrollH = scrollH;
                this.updateBtn();
                break;
        }
    };
    OSATarget9Panel4.prototype.updateData = function () {
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
        this.updateProgress();
        this.listRefush();
        this.setTime();
    };
    OSATarget9Panel4.prototype.resultCallBack = function (id) {
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
    OSATarget9Panel4.prototype.beginLottery = function (index) {
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
    OSATarget9Panel4.prototype.flyItem = function (item) {
        var itemBase = new ItemBase();
        itemBase.x = item.x;
        itemBase.y = item.y;
        itemBase.data = item.itemIcon.data;
        itemBase.anchorOffsetX = itemBase.width / 2;
        itemBase.anchorOffsetY = itemBase.height / 2;
        item.parent.addChild(itemBase);
        GameLogic.ins().postFlyItemEx(itemBase);
    };
    OSATarget9Panel4.prototype.getLottery = function () {
        if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
            return;
        }
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        this.huntType = this.turnten.selected ? 2 : 1;
        var config = this.config9[this.activityID][0];
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, config.item);
        if (item && item.count) {
            this.ins.sendReward(this.activityID, this.huntType);
        }
        else {
            var times = this.huntType == 2 ? 10 : 1;
            HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + (times == 10 ? "-10" : "-1"), this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + config.yb * times + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[config.item].name + "*" + times);
        }
    };
    OSATarget9Panel4.prototype.huntWarnFun = function () {
        var config = this.config9[this.activityID][0];
        var times = this.huntType == 2 ? 10 : 1;
        if (Actor.yb >= config.yb * times) {
            this.ins.sendReward(this.activityID, this.huntType);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    OSATarget9Panel4.prototype.updateProgress = function () {
        var _this = this;
        var config = this.config9[this.activityID][0];
        var data;
        if (this.actType == ActivityType.Normal) {
            data = this.ins.activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = this.ins.activityData[this.activityID];
        }
        var arr = [];
        if (config && data) {
            for (var i = 0; i < config.reward.length; i++) {
                var arrdata = { index: i, config: config, actType: this.actType };
                arr.push(arrdata);
            }
            this.menuListData.replaceAll(arr);
        }
        this.menuList.validateNow();
        TimerManager.ins().doNext(function () {
            var startX = 0;
            for (var i = 1; i <= _this.menuListData.length; i++) {
                if (data.getStateByIndex(i) == 0) {
                    startX = 90 * (i - 1);
                    break;
                }
            }
            if (startX > _this.menuList.contentWidth - _this.menuList.width)
                startX = _this.menuList.contentWidth - _this.menuList.width;
            _this.menuList.scrollH = startX;
            _this.updateBtn();
        }, this);
    };
    OSATarget9Panel4.prototype.updateBtn = function () {
        if (this.menuListData.length <= 5) {
            this.rightBtn.visible = this.rightRed.visible = this.leftBtn.visible = this.leftRed.visible = false;
        }
        else {
            this.onChange();
        }
    };
    OSATarget9Panel4.prototype.onChange = function () {
        if (this.menuList.scrollH < 46) {
            this.leftBtn.visible = this.leftRed.visible = false;
            this.rightBtn.visible = this.rightRed.visible = true;
        }
        else if (this.menuList.scrollH >= this.menuList.contentWidth - this.menuList.width - 46) {
            this.leftBtn.visible = this.leftRed.visible = true;
            this.rightBtn.visible = this.rightRed.visible = false;
        }
        else {
            this.leftBtn.visible = this.leftRed.visible = true;
            this.rightBtn.visible = this.rightRed.visible = true;
        }
        this.updateRedPoint();
    };
    OSATarget9Panel4.prototype.updateRedPoint = function () {
        var config = this.config9[this.activityID][0];
        var b = false;
        for (var i = 0; i < config.reward.length; i++) {
            b = this.ins.isGetRollReward(this.activityID, i);
            if (b)
                break;
        }
        if (this.leftBtn.visible)
            this.leftRed.visible = b;
        if (this.rightBtn.visible)
            this.rightRed.visible = b;
    };
    OSATarget9Panel4.prototype.listRefush = function () {
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
                var notice = {
                    activityID: this.activityID,
                    name: data.noticeArr[i].name,
                    index: data.noticeArr[i].index,
                    actType: this.actType
                };
                arr.push(notice);
            }
            this.list.dataProvider = new eui.ArrayCollection(arr);
        }
    };
    OSATarget9Panel4.prototype.setTime = function () {
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
    return OSATarget9Panel4;
}(BaseView));
__reflect(OSATarget9Panel4.prototype, "OSATarget9Panel4");
//# sourceMappingURL=OSATarget9Panel4.js.map