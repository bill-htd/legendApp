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
var KfRankRewardPanel = (function (_super) {
    __extends(KfRankRewardPanel, _super);
    function KfRankRewardPanel() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        return _this;
    }
    KfRankRewardPanel.prototype.childrenCreated = function () {
    };
    KfRankRewardPanel.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    KfRankRewardPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.activityID = param[0];
        this.list.itemRenderer = KfCostRankRewardItemRender;
        this.listdata = new eui.ArrayCollection;
        this.list.dataProvider = this.listdata;
        this.updateData();
    };
    KfRankRewardPanel.prototype.updateData = function () {
        var actData = Activity.ins().activityData[this.activityID];
        if (!actData)
            return;
        var config = GlobalConfig.ActivityType19Config[this.activityID];
        var arr = [];
        for (var k in config) {
            var rank = "";
            rank = (config[k].range[0] == config[k].range[1]) ? "" + config[k].range[0] : config[k].range[0] + "-" + config[k].range[1];
            var desc = config[k].condition ? "\uFF08\u6D88\u8D39\u2265" + config[k].condition + "\u5143\u5B9D\u5373\u53EF\u53C2\u4E0E\u672C\u6392\u884C\uFF09" : "";
            var rewards = config[k].rewards;
            var arrdata = {
                rank: rank,
                desc: desc,
                rewards: rewards
            };
            arr.push(arrdata);
        }
        this.listdata.replaceAll(arr);
        this._time = actData.getleftTime();
        var scro = this.list.parent;
        scro.stopAnimation();
        this.list.scrollV = 0;
        this.setTime();
        var actConfig = GlobalConfig.ActivityConfig[this.activityID];
        this.actInfo.textFlow = TextFlowMaker.generateTextFlow1("" + actConfig.desc);
    };
    KfRankRewardPanel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    return KfRankRewardPanel;
}(BaseComponent));
__reflect(KfRankRewardPanel.prototype, "KfRankRewardPanel");
//# sourceMappingURL=KfRankRewardPanel.js.map