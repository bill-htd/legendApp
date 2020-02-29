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
var OSATarget18Panel1 = (function (_super) {
    __extends(OSATarget18Panel1, _super);
    function OSATarget18Panel1(id) {
        var _this = _super.call(this) || this;
        _this.addBoxEvent = false;
        _this.huntType = 1;
        _this.activityID = id;
        _this.setCurSkin();
        return _this;
    }
    OSATarget18Panel1.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "CETreasureSkin";
    };
    OSATarget18Panel1.prototype.childrenCreated = function () {
        this.init();
    };
    OSATarget18Panel1.prototype.init = function () {
        var configs = GlobalConfig.ActivityType18Config[this.activityID];
        var config = configs[0];
        var len = config.showDrop.length;
        var gift;
        for (var i = 0; i < len && i < 16; i++) {
            gift = this["gift" + i];
            gift.data = config.showDrop[i];
            if (i <= 1)
                gift.setItemHeirloomBgImg(true, "csbk03");
        }
        this.list.itemRenderer = HuntListRenderer;
        this.jpList.itemRenderer = HuntListRenderer;
        for (var k in configs) {
            if (configs[k].count == 1)
                this.yb1.text = configs[k].yb + "";
            else if (configs[k].count == 10)
                this.yb10.text = configs[k].yb + "";
        }
    };
    OSATarget18Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.addTouchEvent(this.buy1, this.onBuy);
        this.addTouchEvent(this.buy10, this.onBuy);
        this.observe(Activity.ins().postChangePage, this.updateData);
        var data = Activity.ins().getActivityDataById(this.activityID);
        this.endedTime = data.getLeftTime();
        this.timeClock();
        TimerManager.ins().remove(this.timeClock, this);
        TimerManager.ins().doTimer(1000, 0, this.timeClock, this);
        this.addBoxEvent = true;
        Activity.ins().sendChangePage(this.activityID);
    };
    OSATarget18Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buy1, this.onBuy);
        this.removeTouchEvent(this.buy10, this.onBuy);
        this.removeObserve();
        TimerManager.ins().remove(this.timeClock, this);
        this.addBoxEvent = false;
    };
    OSATarget18Panel1.prototype.updateData = function () {
        this.listRefush();
        this.updateBox();
        this.updateMaterial();
    };
    OSATarget18Panel1.prototype.timeClock = function () {
        if (this.endedTime >= 0)
            this.leftTimeTxt.text = DateUtils.getFormatBySecond(this.endedTime, DateUtils.TIME_FORMAT_5, 4);
        this.endedTime -= 1;
    };
    OSATarget18Panel1.prototype.listRefush = function () {
        var data = Activity.ins().getActivityDataById(this.activityID);
        this.list.dataProvider = new eui.ArrayCollection(data.logs);
        this.jpList.dataProvider = new eui.ArrayCollection(data.bestlogs);
    };
    OSATarget18Panel1.prototype.onBuy = function (e) {
        switch (e.target) {
            case this.buy1:
                this.buyHunt(1);
                break;
            case this.buy10:
                this.buyHunt(2);
                break;
            default:
                break;
        }
    };
    OSATarget18Panel1.prototype.buyHunt = function (index) {
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        this.huntType = index;
        var configs = GlobalConfig.ActivityType18Config[this.activityID];
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, configs[index].item);
        if (item && item.count) {
            Activity.ins().sendReward(this.activityID, index);
        }
        else {
            var times = index > 1 ? 10 : 1;
            var huntOnce = configs[index].yb;
            HuntWarnBuyWin.showBuyWarn("OSATarget18Panel1-HuntResultWin" + (times == 10 ? 1 : 0), this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + huntOnce + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[configs[index].item].name + "*" + times);
        }
    };
    OSATarget18Panel1.prototype.huntWarnFun = function () {
        var huntOnce = GlobalConfig.ActivityType18Config[this.activityID][this.huntType].yb;
        if (Actor.yb >= huntOnce) {
            Activity.ins().sendReward(this.activityID, this.huntType);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    OSATarget18Panel1.prototype.updateBox = function () {
        var configs = GlobalConfig.ActivityType18Config[this.activityID];
        var boxConfig = [];
        for (var i_1 in configs) {
            if (configs[i_1].dbCount)
                boxConfig.push(configs[i_1]);
        }
        boxConfig.sort(function (a, b) {
            if (a.dbCount < b.dbCount)
                return -1;
            return 1;
        });
        var data = Activity.ins().getActivityDataById(this.activityID);
        var state;
        var config;
        var i = 0;
        var lenBox = boxConfig.length;
        var lastCount = 0;
        for (var k in boxConfig) {
            config = boxConfig[k];
            this["time" + i].text = config.dbCount + "次";
            this["time" + i].visible = true;
            this["done" + i].visible = false;
            this["boxPoint" + i].visible = false;
            this["bar" + i].value = 0;
            this["bar" + i].maximum = 100;
            this["box" + i].source = "200116_0_png";
            this["box" + i].name = "box" + (config.index);
            if (!this.addBoxEvent)
                this.addTouchEvent(this["box" + i], this.onGetAward);
            if (i < lenBox) {
                state = data.getStateByIndex(config.index);
                if (state == 2) {
                    this["box" + i].source = "200116_png";
                    this["bar" + i].value = 100;
                    this["boxPoint" + i].visible = true;
                }
                else if (state == 1) {
                    this["time" + i].visible = false;
                    this["done" + i].visible = true;
                    this["bar" + i].value = 100;
                }
                else {
                    var value = Math.floor((data.num - lastCount) / (config.dbCount - lastCount) * 100);
                    if (value < 0)
                        value = 0;
                    else if (value > 100)
                        value = 100;
                    this["bar" + i].value = value;
                }
            }
            lastCount = config.dbCount;
            i++;
        }
        this.icon10.source = this.icon1.source = GlobalConfig.ItemConfig[configs[1].item].icon + "_png";
    };
    OSATarget18Panel1.prototype.onGetAward = function (e) {
        var index = e.target.name.slice(3, 4);
        var data = Activity.ins().getActivityDataById(this.activityID);
        var state = data.getStateByIndex(index);
        if (state == 2)
            Activity.ins().sendReward(this.activityID, index);
        else
            ViewManager.ins().open(HuntBoxsTips, index, 3, this.activityID);
    };
    OSATarget18Panel1.prototype.updateMaterial = function () {
        var item = UserBag.ins().getBagGoodsByTypeAndId(0, GlobalConfig.ActivityType18Config[this.activityID][1].item);
        var count = item ? item.count : 0;
        this.num.textFlow = TextFlowMaker.generateTextFlow1("|C:" + (count ? ColorUtil.GREEN_COLOR_N : ColorUtil.RED_COLOR_N) + "&T:" + count + "|");
        this.num10.textFlow = TextFlowMaker.generateTextFlow1("|C:" + (count >= 10 ? ColorUtil.GREEN_COLOR_N : ColorUtil.RED_COLOR_N) + "&T:" + count + "|");
    };
    return OSATarget18Panel1;
}(BaseView));
__reflect(OSATarget18Panel1.prototype, "OSATarget18Panel1");
//# sourceMappingURL=OSATarget18Panel1.js.map