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
var TimeBuyPanel = (function (_super) {
    __extends(TimeBuyPanel, _super);
    function TimeBuyPanel() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this._selectIndex = 0;
        _this._openLeftTime = 0;
        _this._arrayCollect = new eui.ArrayCollection();
        return _this;
    }
    TimeBuyPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gift.itemRenderer = TimeBuyItemRender;
        this.gift.dataProvider = this._arrayCollect;
        this.actDesc.text = GlobalConfig.ActivityConfig[this.activityIDs[0]].desc;
    };
    TimeBuyPanel.prototype.open = function () {
        var arges = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arges[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.update);
        this.addTouchEvent(this, this.onTop);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        TimerManager.ins().doTimer(30000, 0, this.getServerTimes, this);
        this.update();
        this.getServerTimes();
    };
    TimeBuyPanel.prototype.getServerTimes = function () {
        var len = this.activityIDs.length;
        for (var i = 0; i < len; i++)
            Activity.ins().sendChangePage(this.activityIDs[i]);
    };
    TimeBuyPanel.prototype.update = function () {
        var len = this.activityIDs.length;
        var data;
        var config;
        var leftTime = 0;
        this._openLeftTime = 0;
        for (var i = 0; i < len; i++) {
            config = GlobalConfig.ActivityType2Config[this.activityIDs[i]][1];
            data = Activity.ins().getDoubleElevenDataByID(this.activityIDs[i]);
            this["timeItem" + i].setData(config, data ? data.isSpecialOpen() : false);
            this["timeItem" + i].setSelected(false);
            this["timeItem" + i].setRedPoint(data && data.isSpecialOpen() && data.canReward());
            this["timeItem" + i].name = i;
            leftTime = data ? data.getSpecialOpenLeftTime() : 0;
            if (leftTime > 0 && this._openLeftTime == 0)
                this._openLeftTime = leftTime;
            if (this._openLeftTime > 0 && leftTime > 0 && leftTime < this._openLeftTime)
                this._openLeftTime = leftTime;
        }
        this._time = data ? data.getLeftTime() : 0;
        this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        this.updateSelected();
    };
    TimeBuyPanel.prototype.updateSelected = function () {
        this["timeItem" + this._selectIndex].setSelected(true);
        var configs = GlobalConfig.ActivityType2Config[this.activityIDs[this._selectIndex]];
        var data = Activity.ins().getDoubleElevenDataByID(this.activityIDs[this._selectIndex]);
        var config;
        var datas = [];
        var i = 0;
        var state = 0;
        var lv = UserVip.ins().lv;
        var leftTimes = 0;
        var fake = 0;
        var scount = 0;
        for (var k in configs) {
            config = configs[k];
            state = data ? (data.buyData[i + 1] >= config.count ? 2 : (data.isSpecialOpen() && data.serverBuyData[i + 1] < config.scount ? 1 : 0)) : 0;
            leftTimes = data ? config.count - data.buyData[i + 1] : 0;
            if (leftTimes < 0)
                leftTimes = 0;
            scount = data ? config.scount - data.serverBuyData[i + 1] : 0;
            fake = data ? Math.floor(Math.max(Math.min(scount / config.scount * config.shamScount, config.shamScount - data.getSpecialStrikeTimes()), 0)) : 0;
            if (scount <= 5 && fake > 5)
                fake = 5;
            if (scount == 0)
                fake = 0;
            datas[i] = [config, state, leftTimes, this.activityIDs[this._selectIndex], scount + fake];
            i++;
        }
        datas.sort(this.sort);
        this._arrayCollect.source = datas;
    };
    TimeBuyPanel.prototype.sort = function (a, b) {
        if (a[1] == 1)
            return -1;
        if (b[1] == 1)
            return 1;
        if (a[0].index < b[0].index)
            return -1;
        if (a[0].index > b[0].index)
            return 1;
        return 0;
    };
    TimeBuyPanel.prototype.close = function () {
        TimerManager.ins().removeAll(this);
        this.removeTouchEvent(this, this.onTop);
        this.removeObserve();
    };
    TimeBuyPanel.prototype.onTop = function (e) {
        switch (e.target) {
            case this.timeItem0:
            case this.timeItem1:
            case this.timeItem2:
            case this.timeItem3:
                this["timeItem" + this._selectIndex].setSelected(false);
                this._selectIndex = Number(e.target.name);
                this.updateSelected();
                break;
        }
    };
    TimeBuyPanel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        }
        if (this._openLeftTime > 0) {
            this._openLeftTime--;
            if (this._openLeftTime == 0)
                this.update();
        }
    };
    return TimeBuyPanel;
}(BaseView));
__reflect(TimeBuyPanel.prototype, "TimeBuyPanel");
//# sourceMappingURL=TimeBuyPanel.js.map