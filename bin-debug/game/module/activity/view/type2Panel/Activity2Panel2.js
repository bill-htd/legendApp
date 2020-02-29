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
var Activity2Panel2 = (function (_super) {
    __extends(Activity2Panel2, _super);
    function Activity2Panel2() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.skinName = "ActGiftSkin";
        _this.list.itemRenderer = ItemBase;
        return _this;
    }
    Activity2Panel2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Activity2Panel2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.buyBtn, this.onTap);
        this.addTouchEvent(this.type_1, this.onTap);
        this.addTouchEvent(this.type_2, this.onTap);
        this.addTouchEvent(this.type_3, this.onTap);
        this.addTouchEvent(this.type_4, this.onTap);
        this.updateData();
    };
    Activity2Panel2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buyBtn, this.onTap);
        this.removeTouchEvent(this.type_1, this.onTap);
        this.removeTouchEvent(this.type_2, this.onTap);
        this.removeTouchEvent(this.type_3, this.onTap);
        this.removeTouchEvent(this.type_4, this.onTap);
    };
    Activity2Panel2.prototype.onTap = function (e) {
        var _this = this;
        var index;
        switch (e.currentTarget) {
            case this.buyBtn:
                index = -1;
                if (this.config.vip && UserVip.ins().lv < this.config.vip) {
                    UserTips.ins().showTips("vip等级不足");
                }
                else {
                    if (UserBag.ins().getSurplusCount() < 1 && this._index == 3) {
                        UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                        return;
                    }
                    if (Actor.yb >= this.config.price) {
                        WarnWin.show("\u786E\u5B9A\u6D88\u8017" + this.config.price + "\u5143\u5B9D\u8D2D\u4E70\u7279\u60E0\u5546\u54C1\u5417\uFF1F", function () {
                            Activity.ins().sendReward(_this.activityID, _this._index + 1);
                        }, this);
                    }
                    else
                        UserTips.ins().showTips("元宝不足");
                }
                break;
            case this.type_1:
                index = 0;
                break;
            case this.type_2:
                index = 1;
                break;
            case this.type_3:
                index = 2;
                break;
            case this.type_4:
                index = 3;
                break;
        }
        if (index != -1)
            this.updateData(index);
    };
    Activity2Panel2.prototype.updateData = function (index) {
        if (index === void 0) { index = 0; }
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.date.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.date.text = "活动已结束";
        }
        else {
            this.date.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.config = GlobalConfig.ActivityType2Config[this.activityID][index];
        this.list.dataProvider = new eui.ArrayCollection(this.config.rewards);
        var giftName = Activity2Panel2.giftNameArr[index];
        var str = "\u82B1\u8D39<font color = '#FF964C'>" + this.config.price + "</font>\u5143\u5B9D\u5373\u53EF\u83B7\u5F97<font color = '#FF964C'>" + giftName + "</font>";
        this.desc.textFlow = new egret.HtmlTextParser().parser(str);
        this.chosen.x = 7 + index * 105;
        this._index = index;
        this.get_1.visible = activityData.buyData[0] == 1;
        this.get_2.visible = activityData.buyData[1] == 1;
        this.get_3.visible = activityData.buyData[2] == 1;
        this.get_4.visible = activityData.buyData[3] == 1;
        this.buyBtn.visible = activityData.buyData[index] == 0;
    };
    Activity2Panel2.giftNameArr = ["超值礼包", "豪华礼包", "神翅礼包", "官印礼包"];
    return Activity2Panel2;
}(BaseView));
__reflect(Activity2Panel2.prototype, "Activity2Panel2");
//# sourceMappingURL=Activity2Panel2.js.map