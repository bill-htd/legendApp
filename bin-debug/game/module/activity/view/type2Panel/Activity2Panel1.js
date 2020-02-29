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
var Activity2Panel1 = (function (_super) {
    __extends(Activity2Panel1, _super);
    function Activity2Panel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "LimitGiftActSkin";
        return _this;
    }
    Activity2Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    Activity2Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateData();
        this.addTouchEvent(this.buy0, this.onTap);
        this.addTouchEvent(this.buy1, this.onTap);
        this.addTouchEvent(this.buy2, this.onTap);
    };
    Activity2Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        debug.log("close");
        this.removeTouchEvent(this.buy0, this.onTap);
        this.removeTouchEvent(this.buy1, this.onTap);
        this.removeTouchEvent(this.buy2, this.onTap);
    };
    Activity2Panel1.prototype.onTap = function (e) {
        var _this = this;
        var config;
        var index;
        switch (e.currentTarget) {
            case this.buy0:
                index = 0;
                break;
            case this.buy1:
                index = 1;
                break;
            case this.buy2:
                index = 2;
                break;
        }
        var activityData = Activity.ins().activityData[this.activityID];
        config = GlobalConfig.ActivityType2Config[this.activityID][index];
        var buyData = activityData.buyData[index] || 0;
        var myMoney = (config.currencyType == 1 ? Actor.gold : Actor.yb);
        var typeName = (config.currencyType == 1 ? "金币" : "元宝");
        if (config.vip && UserVip.ins().lv < config.vip) {
            UserTips.ins().showTips("vip等级不足");
        }
        else {
            var id = this.configList[index].rewards[0].id;
            var type = ItemConfig.getType(GlobalConfig.ItemConfig[id]);
            if (UserBag.ins().getSurplusCount() < 1 && type == 0) {
                UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                return;
            }
            if (myMoney >= config.price) {
                WarnWin.show("\u786E\u5B9A\u6D88\u8017" + config.price + typeName + "\u8D2D\u4E70\u7279\u60E0\u5546\u54C1\u5417\uFF1F", function () {
                    Activity.ins().sendReward(_this.activityID, index + 1);
                }, this);
            }
            else
                UserTips.ins().showTips(typeName + "不足");
        }
    };
    Activity2Panel1.prototype.updateData = function () {
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
            var day = Math.floor(endedTime / (3600 * 24));
            var hour = Math.floor((endedTime % (3600 * 24)) / 3600);
            var minu = Math.floor((endedTime % 3600) / 60);
            this.date.text = day + "天" + hour + "小时" + minu + "分";
        }
        this.desc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        this.configList = GlobalConfig.ActivityType2Config[this.activityID];
        if (this.group_item0)
            this.group_item0.visible = false;
        if (this.group_item1)
            this.group_item1.visible = false;
        if (this.group_item2)
            this.group_item2.visible = false;
        for (var i = 0; i < this.configList.length; i++) {
            var config = this.configList[i];
            var buyData = activityData.buyData[i] || 0;
            var item = this["item" + i];
            var itemCount = this["itemCount" + i];
            var label_title = this["label_title" + i];
            var price = this["price" + i];
            var desc = this["desc" + i];
            var buy = this["buy" + i];
            var redPoint = this["redPoint" + i];
            var group_item = this["group_item" + i];
            var imgDiscount = this["imgDiscount" + i];
            var nameLabel = this["itemname" + i];
            var title = this["title" + i];
            var itemCfg = GlobalConfig.ItemConfig[config.rewards[0].id];
            if (item) {
                item.setData(itemCfg);
                itemCount.text = config.rewards[0].count + "";
            }
            if (nameLabel) {
                nameLabel.text = itemCfg.name;
            }
            if (label_title) {
                label_title.text = config.vip ? "VIP" + config.vip + "\u7279\u6743" : "全民特惠";
            }
            if (price) {
                price.setText(config.price + "");
                price.setType((config.currencyType == 1 ? MoneyConst.gold : MoneyConst.yuanbao));
            }
            if (desc) {
                desc.text = "今日购买次数：" + (config.count - buyData);
            }
            if (title) {
                title.source = "tq_" + (config.vip < 10 ? "0" + config.vip : config);
            }
            if (buy) {
                buy.enabled = (config.count - buyData) > 0;
            }
            if (redPoint) {
                redPoint.visible = Activity.ins().getisCanBuyXianGouItem(this.activityID + "", i);
            }
            if (group_item) {
                group_item.visible = true;
            }
            if (imgDiscount) {
            }
        }
    };
    return Activity2Panel1;
}(BaseView));
__reflect(Activity2Panel1.prototype, "Activity2Panel1");
//# sourceMappingURL=Activity2Panel1.js.map