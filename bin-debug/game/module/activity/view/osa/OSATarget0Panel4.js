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
var OSATarget0Panel4 = (function (_super) {
    __extends(OSATarget0Panel4, _super);
    function OSATarget0Panel4() {
        var _this = _super.call(this) || this;
        _this.skinName = "LoopRechargeSkin";
        return _this;
    }
    OSATarget0Panel4.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget0Panel4.prototype.open = function () {
        this.setData();
        this.observe(Recharge.ins().postMuchDayRecReward, this.setData);
    };
    OSATarget0Panel4.prototype.close = function () {
        this.removeObserve();
    };
    OSATarget0Panel4.prototype.setData = function () {
        var confing = GlobalConfig.MultiDayRechargeConfig;
        var awardIndex = 0;
        for (var i in confing[1].awardList) {
            if (awardIndex <= GameServer.serverOpenDay && GameServer.serverOpenDay < parseInt(i)) {
                break;
            }
            awardIndex = parseInt(i);
        }
        var index = 0;
        var dayNum = Recharge.ins().mDayNum;
        if (Recharge.ins().mRecNum >= confing[dayNum].num) {
            dayNum = Recharge.ins().mDayNum;
        }
        else {
            dayNum = Recharge.ins().mDayNum - 1;
        }
        for (var i in confing) {
            var conf = confing[i];
            this["reward" + index].itemRenderer = ItemBase;
            this["reward" + index].dataProvider = new eui.ArrayCollection(conf.awardList[awardIndex]);
            var str = StringUtils.addColor("\uFF08" + (dayNum > (index + 1) ? i : dayNum) + "/" + i + "\uFF09", dayNum >= parseInt(i) ? 0x00FF00 : 0xFF9900);
            this["target" + index].textFlow = new egret.HtmlTextParser().parser("\u7D2F\u8BA1" + i + "\u5929" + str + "\u5145\u503C" + conf.num + "\u5143\u5B9D");
            this["redPoint" + index].visible = false;
            if (Recharge.ins().mDayNum > parseInt(i)) {
                this["get" + index];
                this["get" + index].enabled = false;
            }
            else if (Recharge.ins().mDayNum == parseInt(i) && Recharge.ins().mRecNum >= conf.num && Recharge.ins().mReward == 0) {
                this["redPoint" + index].visible = true;
                this["get" + index].label = "\u7ACB\u5373\u9886\u53D6";
                this["get" + index].enabled = true;
                this.addTouchEvent(this["get" + index], this.onTap);
            }
            else {
                this["get" + index].enabled = false;
            }
            index++;
        }
        this.todayRecharge.text = "\u672C\u65E5\u7D2F\u8BA1\u5145\u503C\uFF1A" + Recharge.ins().mRecNum;
        var data = Activity.ins().getbtnInfo(this.activityID);
        this.actInfo0.text = data.acDesc;
    };
    OSATarget0Panel4.prototype.onTap = function () {
        Recharge.ins().sendMuchDayRecReward();
    };
    return OSATarget0Panel4;
}(BaseView));
__reflect(OSATarget0Panel4.prototype, "OSATarget0Panel4");
//# sourceMappingURL=OSATarget0Panel4.js.map