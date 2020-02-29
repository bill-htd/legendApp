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
var DailyGiftPanel = (function (_super) {
    __extends(DailyGiftPanel, _super);
    function DailyGiftPanel() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        return _this;
    }
    DailyGiftPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gift.itemRenderer = DailyGiftItemRender;
        this.actDesc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
    };
    DailyGiftPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.update);
        this.observe(UserVip.ins().postUpdateVipData, this.update);
        this.observe(UserVip.ins().postUpdataExp, this.update);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.update();
    };
    DailyGiftPanel.prototype.update = function () {
        var data = Activity.ins().getDoubleElevenDataByID(this.activityID);
        var configs = GlobalConfig.ActivityType2Config[this.activityID];
        var config;
        var datas = [];
        var i = 0;
        var state = 0;
        var leftTimes = 0;
        for (var k in configs) {
            config = configs[k];
            state = data.buyData[i + 1] >= config.count ? 2 : 1;
            leftTimes = config.count - data.buyData[i + 1];
            if (leftTimes < 0)
                leftTimes = 0;
            datas[i] = [config, state, leftTimes, this.activityID, data.sumRMB];
            i++;
        }
        datas.sort(this.sort);
        this.gift.dataProvider = new eui.ArrayCollection(datas);
        this._time = data.getLeftTime();
        this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
    };
    DailyGiftPanel.prototype.sort = function (a, b) {
        if (a[1] == 1 && b[1] != 1)
            return -1;
        if (a[1] == 2 && b[1] != 2)
            return 1;
        if (a[0].index < b[0].index)
            return -1;
        if (a[0].index > b[0].index)
            return 1;
        return 0;
    };
    DailyGiftPanel.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    DailyGiftPanel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        }
    };
    return DailyGiftPanel;
}(BaseView));
__reflect(DailyGiftPanel.prototype, "DailyGiftPanel");
//# sourceMappingURL=DailyGiftPanel.js.map