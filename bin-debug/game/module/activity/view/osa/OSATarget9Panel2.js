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
var OSATarget9Panel2 = (function (_super) {
    __extends(OSATarget9Panel2, _super);
    function OSATarget9Panel2() {
        var _this = _super.call(this) || this;
        _this._curAwardPage = 1;
        _this._maxAwardPages = 1;
        return _this;
    }
    OSATarget9Panel2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget9Panel2.prototype.init = function () {
        this.list.itemRenderer = ItemBase;
        this.list0.itemRenderer = NoticeListRenderer;
        var config;
        var reward;
        var datas = [];
        for (var i = 1; i <= 8; i++) {
            if (this.actType == ActivityType.Normal) {
                config = GlobalConfig.ActivityType9Config[this.activityID][i];
            }
            else if (this.actType == ActivityType.Personal) {
                config = GlobalConfig.PActivityType9Config[this.activityID][i];
            }
            reward = new RewardData();
            reward.type = config.reward[0].type;
            reward.id = config.reward[0].id;
            reward.count = config.reward[0].count;
            datas[i - 1] = reward;
        }
        this.list.dataProvider = new ArrayCollection(datas);
    };
    Object.defineProperty(OSATarget9Panel2.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
            if (isNaN(this.actType)) {
                this.actType = ActivityPanel.getActivityTypeFromId(this._activityID);
            }
            this.setCurSkin();
        },
        enumerable: true,
        configurable: true
    });
    OSATarget9Panel2.prototype.setCurSkin = function () {
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
            this.skinName = "NYFireworkerSkin";
    };
    OSATarget9Panel2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.init();
        var ins;
        if (this.actType == ActivityType.Normal) {
            ins = Activity.ins();
            this.actInfo1.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        }
        else if (this.actType == ActivityType.Personal) {
            ins = PActivity.ins();
            this.actInfo1.text = GlobalConfig.PActivityConfig[this.activityID].desc;
        }
        this.observe(ins.postActivityIsGetAwards, this.updateData);
        this.observe(ins.postChangePage, this.resultCallBack);
        this.addTouchEvent(this, this.onTouch);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.updateData();
    };
    OSATarget9Panel2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
        TimerManager.ins().removeAll(this);
        DisplayUtils.removeFromParent(this._fireEff);
        this.turnten.selected = false;
    };
    OSATarget9Panel2.prototype.updateMaterial = function () {
        var item = UserBag.ins().getBagGoodsByTypeAndId(0, this.config.item);
        var count = item ? item.count : 0;
        this.costNum.textFlow = TextFlowMaker.generateTextFlow1("|C:" + (count ? ColorUtil.GREEN_COLOR_N : ColorUtil.RED_COLOR_N) + "&T:" + count + "|");
    };
    OSATarget9Panel2.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.buyBtn:
                var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, this.config.item);
                if (item && item.count) {
                    this.onSend();
                }
                else {
                    var times = this.turnten.selected ? 10 : 1;
                    var total = this.config.yb * times;
                    HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + (times == 10 ? "-10" : "-1"), this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + total + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[this.config.item].name + "*" + times);
                }
                break;
            case this.reward0:
            case this.reward1:
            case this.reward2:
            case this.reward3:
                var data = e.target.data;
                if (data.state == 0)
                    ViewManager.ins().open(ItemDetailedWin, 0, data.id, data.count);
                else if (data.state == 1) {
                    this.flyItemEx(e.target);
                    this.ins.sendReward(this.activityID, 0, data.index);
                }
                break;
            case this.arrowleft:
                if (this._curAwardPage > 1) {
                    this._curAwardPage--;
                    this.updateAwardPage();
                }
                break;
            case this.arrowright:
                if (this._curAwardPage < this._maxAwardPages) {
                    this._curAwardPage++;
                    this.updateAwardPage();
                }
                break;
        }
    };
    OSATarget9Panel2.prototype.huntWarnFun = function () {
        var times = this.turnten.selected ? 10 : 1;
        var total = this.config.yb * times;
        if (Actor.yb >= total) {
            this.onSend();
        }
        else {
            UserTips.ins().showTips("元宝不足");
        }
    };
    OSATarget9Panel2.prototype.onSend = function () {
        if (this.turnten.selected)
            this.ins.sendReward(this.activityID, 2);
        else {
            this.ins.sendReward(this.activityID, 1);
            this.ins.sendReward(this.activityID, 1);
            if (!this._fireEff)
                this._fireEff = new MovieClip();
            if (!this._fireEff.parent) {
                this.effLocation.addChild(this._fireEff);
                this._fireEff.scaleX = this.effLocation.scaleX;
                this._fireEff.scaleY = this.effLocation.scaleY;
            }
            this._fireEff.playFile(RES_DIR_EFF + "yanhuaeff", 1);
        }
    };
    OSATarget9Panel2.prototype.setCurAwardPage = function () {
        var config;
        var data;
        if (this.actType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType9Config[this.activityID][0];
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            config = GlobalConfig.PActivityType9Config[this.activityID][0];
            data = PActivity.ins().activityData[this.activityID];
        }
        this._maxAwardPages = config.reward.length / 4;
        if (!data) {
            this._curAwardPage = 1;
            return;
        }
        var len = config.reward.length;
        for (var i = 0; i < len; i++) {
            if (!(data.record >> (i + 1) & 1)) {
                this._curAwardPage = Math.floor(i / 4) + 1;
                return;
            }
        }
        this._curAwardPage = 1;
    };
    OSATarget9Panel2.prototype.updateData = function () {
        var data;
        var config9;
        if (this.actType == ActivityType.Normal) {
            this.ins = Activity.ins();
            this.config = GlobalConfig.ActivityType9Config[this.activityID][0];
            data = Activity.ins().activityData[this.activityID];
            config9 = GlobalConfig.ActivityType9Config;
        }
        else if (this.actType == ActivityType.Personal) {
            this.ins = PActivity.ins();
            this.config = GlobalConfig.PActivityType9Config[this.activityID][0];
            data = PActivity.ins().activityData[this.activityID];
            config9 = GlobalConfig.PActivityType9Config;
        }
        this.price.setText(this.config.yb + "");
        this.price.setType(MoneyConst.yuanbao);
        this.costIcon.source = GlobalConfig.ItemConfig[this.config.item].icon + '_png';
        this.setCurAwardPage();
        this.updateAwardPage();
        if (!this._recordCollect) {
            this._recordCollect = new ArrayCollection();
            this.list0.dataProvider = this._recordCollect;
        }
        if (data) {
            var arr = [];
            var len = data.noticeArr.length;
            var notice = void 0;
            for (var i = 0; i < len; i++) {
                var config = config9[this.activityID][data.noticeArr[i].index];
                notice = {
                    activityID: this.activityID,
                    name: data.noticeArr[i].name,
                    index: data.noticeArr[i].index,
                    des: config ? config.middleDesc : null
                };
                arr.push(notice);
            }
            this._recordCollect.source = arr;
        }
        else
            this._recordCollect.source = null;
        this.setTime();
        this.updateMaterial();
    };
    OSATarget9Panel2.prototype.updateAwardPage = function () {
        var config9;
        var data;
        if (this.actType == ActivityType.Normal) {
            config9 = GlobalConfig.ActivityType9Config;
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            config9 = GlobalConfig.PActivityType9Config;
            data = PActivity.ins().activityData[this.activityID];
        }
        this.arrowleft.visible = this._curAwardPage > 1;
        this.arrowright.visible = this._curAwardPage < this._maxAwardPages;
        var config = config9[this.activityID][0];
        this.redPointLeft.visible = this.redPointRight.visible = false;
        if (!data)
            return;
        var curTimes = data.count;
        var index = 0;
        var state = 0;
        var cTimes = 0;
        var pTimes = 0;
        for (var i = 1; i <= this._maxAwardPages; i++) {
            for (var j = 0; j < 4; j++) {
                index = (i - 1) * 4 + j;
                if (data.record >> (index + 1) & 1)
                    state = 2;
                else if (curTimes >= config.reward[index].times)
                    state = 1;
                else
                    state = 0;
                if (i == this._curAwardPage) {
                    this["reward" + j].data = {
                        id: config.reward[index].id,
                        type: config.reward[index].type,
                        count: config.reward[index].count,
                        index: index + 1,
                        state: state,
                        times: config.reward[index].times,
                        curTimes: curTimes
                    };
                    if (j > 0) {
                        cTimes = this["reward" + j].data.times;
                        if (curTimes >= cTimes) {
                            this["bar" + (j - 1)].maximum = 100;
                            this["bar" + (j - 1)].value = 100;
                        }
                        else {
                            pTimes = this["reward" + (j - 1)].data.times;
                            this["bar" + (j - 1)].maximum = cTimes - pTimes;
                            this["bar" + (j - 1)].value = curTimes <= pTimes ? 0 : curTimes - pTimes;
                        }
                    }
                }
                else if (i < this._curAwardPage) {
                    if (state == 1) {
                        this.redPointLeft.visible = true;
                        break;
                    }
                }
                else {
                    if (state == 1) {
                        this.redPointRight.visible = true;
                        break;
                    }
                }
            }
        }
    };
    OSATarget9Panel2.prototype.resultCallBack = function (id) {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().activityData[this.activityID];
        }
        if (!data || this.activityID != id)
            return;
        if (data.indexs.length > 1)
            ViewManager.ins().open(LuckyResultWin, this.activityID, data.indexs);
        this.updateMaterial();
    };
    OSATarget9Panel2.prototype.flyItemEx = function (itemicon) {
        var flyItem = new eui.Image(itemicon.box.source);
        flyItem.x = itemicon.box.x;
        flyItem.y = itemicon.box.y;
        flyItem.width = itemicon.box.width;
        flyItem.height = itemicon.box.height;
        flyItem.scaleX = itemicon.box.scaleX;
        flyItem.scaleY = itemicon.box.scaleY;
        itemicon.box.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
    };
    OSATarget9Panel2.prototype.setTime = function () {
        var data;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().activityData[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().activityData[this.activityID];
        }
        this.actTime1.text = data.getRemainTime();
    };
    return OSATarget9Panel2;
}(BaseView));
__reflect(OSATarget9Panel2.prototype, "OSATarget9Panel2");
//# sourceMappingURL=OSATarget9Panel2.js.map