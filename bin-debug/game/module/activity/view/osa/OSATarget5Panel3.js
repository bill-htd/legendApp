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
var OSATarget5Panel3 = (function (_super) {
    __extends(OSATarget5Panel3, _super);
    function OSATarget5Panel3() {
        var _this = _super.call(this) || this;
        _this.itemary = [];
        _this.itemList = [];
        _this.dayindex = 1;
        return _this;
    }
    Object.defineProperty(OSATarget5Panel3.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
            this.setCurSkin();
        },
        enumerable: true,
        configurable: true
    });
    OSATarget5Panel3.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "NYLogSkin";
    };
    OSATarget5Panel3.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        var config = GlobalConfig.ActivityType5Config[this.activityID];
        this.actInfo1.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        this.itemList = [];
        this.maxNum = Object.keys(config).length;
        for (var i = 0; i < this.maxNum; i++) {
            this.itemList[i] = this['dayNum' + (i + 1)];
            this.addTouchEvent(this.itemList[i], this.itemTouch);
            this.itemList[i].item.hideName();
        }
        this._activityData = Activity.ins().getActivityDataById(this.activityID);
        this.addTouchEvent(this.suerBtn, this.onTouch);
        this.observe(Activity.ins().postActivityIsGetAwards, this.changeList);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.updateData();
        var dayNum = param[0];
        if (dayNum)
            this.setList(dayNum);
    };
    OSATarget5Panel3.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.suerBtn, this.onTouch);
        DisplayUtils.removeFromParent(this.btnMC);
        for (var i = 0; i < this.maxNum; i++)
            this.removeTouchEvent(this.itemList[i], this.itemTouch);
        this.itemList.length = 0;
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget5Panel3.prototype.changeList = function () {
        var day = 1;
        var dayNum = this._activityData.getCurDay();
        if (!dayNum)
            dayNum = day;
        if (dayNum >= this.maxNum)
            day = this.maxNum;
        else
            day = dayNum;
        for (var i = 1; i <= day; i++) {
            var config = GlobalConfig['ActivityType5Config'][this.activityID][(i) + ""];
            if (dayNum >= config.day) {
                if ((this._activityData.recrod >> config.day & 1) == 0) {
                    this.setList(i);
                    return;
                }
            }
        }
        this.setList(day + 1);
    };
    OSATarget5Panel3.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.suerBtn:
                if (this._activityData.getCurDay() >= this.day)
                    Activity.ins().sendReward(this.activityID, this.day);
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:登陆天数不足，无法领取|");
                break;
        }
    };
    OSATarget5Panel3.prototype.itemTouch = function (e) {
        this.setList(e.currentTarget.data);
    };
    OSATarget5Panel3.prototype.setList = function (index) {
        if (index === void 0) { index = -1; }
        if (index == -1) {
            index = this.dayindex;
        }
        if (index > this.maxNum) {
            index = this.maxNum;
        }
        this.dayindex = index;
        var conf = GlobalConfig['ActivityType5Config'][this.activityID][(index) + ""];
        var list = conf.rewards;
        this.day = conf.day;
        var today = 1;
        today = this._activityData.getCurDay();
        this.daylabel.text = "\u767B\u9646\u5929\u6570\uFF1A" + today;
        var flag = ((this._activityData.recrod >> this.day & 1) == 1);
        this.dayaward.text = "\u7B2C" + TextFlowMaker.getCStr(index) + "\u5929\u5956\u52B1\u8BE6\u60C5";
        this.suerBtn.visible = true;
        this.done.visible = false;
        if (today >= this.day) {
            if (!flag) {
                this.btnMC = this.btnMC || new MovieClip;
                this.btnMC.x = this.suerBtn.width / 2;
                this.btnMC.y = this.suerBtn.height / 2;
                this.btnMC.playFile(RES_DIR_EFF + "chargeff1", -1);
                this.suerBtn.addChild(this.btnMC);
                this.redPoint.visible = true;
            }
            else {
                this.suerBtn.visible = false;
                this.redPoint.visible = false;
                this.done.visible = true;
            }
        }
        else {
            DisplayUtils.removeFromParent(this.btnMC);
            this.suerBtn.visible = false;
            this.redPoint.visible = false;
        }
        this.itemary.forEach(function (element) {
            if (element.parent) {
                element.parent.removeChild(element);
                element = null;
            }
        });
        this.itemary = [];
        for (var i = 0; i < list.length; i++) {
            var item = new ItemBase();
            this.group1.addChild(item);
            item.data = list[i];
            this.itemary.push(item);
        }
        for (var i = 0; i < this.maxNum; i++) {
            this.itemList[i].activityID = this.activityID;
            this.itemList[i].data = i + 1;
            if (i + 1 == index || (i + 1 == this.maxNum && index == this.maxNum)) {
                this.itemList[i].setSelectImg(true);
            }
            else {
                this.itemList[i].setSelectImg(false);
            }
        }
    };
    OSATarget5Panel3.prototype.updateData = function () {
        this.changeList();
        this.setTime();
    };
    OSATarget5Panel3.prototype.setTime = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this._activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this._activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.actTime1.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime1.text = "活动已结束";
        }
        else {
            this.actTime1.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    return OSATarget5Panel3;
}(BaseView));
__reflect(OSATarget5Panel3.prototype, "OSATarget5Panel3");
//# sourceMappingURL=OSATarget5Panel3.js.map