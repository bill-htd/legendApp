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
var OSATarget10Panel = (function (_super) {
    __extends(OSATarget10Panel, _super);
    function OSATarget10Panel() {
        return _super.call(this) || this;
    }
    OSATarget10Panel.prototype.childrenCreated = function () {
        if (!this.skinName)
            this.skinName = "YbTurntableSkin";
    };
    OSATarget10Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        egret.Tween.removeTweens(this.tttzhi);
        var data = Activity.ins().activityData[this.activityID];
        if (data && data.state)
            Activity.ins().sendReward(this.activityID, this.level);
        this.rolling = false;
        this.isClick = false;
        TimerManager.ins().removeAll(this);
    };
    OSATarget10Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!this.skinName)
            this.skinName = "YbTurntableSkin";
        this.observe(Activity.ins().postChangePage, this.resultCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.addTouchEvent(this.choujiangBtn, this.getLottery);
        this.list.itemRenderer = NoticeYBListRenderer;
        this.updateView();
    };
    OSATarget10Panel.prototype.updateView = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (!data)
            return;
        var config = GlobalConfig.ActivityType10Config[this.activityID];
        this.level = data.getLevel();
        var lv = this.level;
        var finish = false;
        if (!this.level) {
            lv = Object.keys(config).length;
            finish = true;
        }
        this.img_level.source = "trun_10000" + lv;
        var cfg = config[lv];
        for (var i = 0; i < cfg.info.length; i++) {
            this["multiple" + i].text = cfg.info[i].multiple + "倍";
        }
        this.pay0.text = cfg.yuanBao + "";
        var color = 0x00ff00;
        var reyb = 0;
        if (data.yb < cfg.recharge) {
            color = 0xff0000;
            reyb = cfg.recharge - data.yb;
        }
        if (finish)
            this.label_needCharge.text = "充值转盘全部抽取完毕";
        else
            this.label_needCharge.textFlow = TextFlowMaker.generateTextFlow1("\u518D\u5145\u503C|C:" + color + "&T:" + reyb + "|C:0x00ff00&T:\u5143\u5B9D\u53EF\u6FC0\u6D3B");
        this.listRefush();
        this.setTime();
        var btnCfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (btnCfg)
            this.title.source = btnCfg.title;
    };
    OSATarget10Panel.prototype.resultCallBack = function (id) {
        if (!this.isClick)
            return;
        var data = Activity.ins().activityData[this.activityID];
        if (this.activityID != id)
            return;
        if (data && data.state)
            this.beginLottery(data.index);
        this.updateView();
        this.listRefush();
    };
    OSATarget10Panel.prototype.beginLottery = function (index) {
        var _this = this;
        var rotat = 360 * 4 + (index - 1) * 36;
        var tween = egret.Tween.get(this.tttzhi);
        this.rolling = true;
        tween.to({ "rotation": rotat }, 4000, egret.Ease.circOut).call(function () {
            Activity.ins().sendReward(_this.activityID, _this.level);
            _this.flyItemEx(_this["multiple" + (index - 1)]);
            setTimeout(function () {
                _this.rolling = false;
                _this.isClick = false;
            }, 2000);
        }, this);
    };
    OSATarget10Panel.prototype.flyItemEx = function (itemicon) {
        var flyItem = new eui.Image(RewardData.getCurrencyRes(2));
        flyItem.x = itemicon.x;
        flyItem.y = itemicon.y;
        flyItem.scaleX = 1;
        flyItem.scaleY = 1;
        itemicon.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
    };
    OSATarget10Panel.prototype.getLottery = function () {
        if (!this.level) {
            UserTips.ins().showTips("充值转盘全部抽取完毕");
            this.isClick = false;
            return;
        }
        var data = Activity.ins().activityData[this.activityID];
        var cfg = GlobalConfig.ActivityType10Config[this.activityID][this.level];
        if (data && !data.getCondition(this.level)) {
            UserTips.ins().showTips("\u8FD8\u9700\u8981\u5145\u503C" + (cfg.recharge - data.yb) + "\u5143\u5B9D\u6FC0\u6D3B");
            this.isClick = false;
            return;
        }
        if (this.rolling) {
            UserTips.ins().showTips("正在抽奖，请稍候");
            return;
        }
        if (this.isClick) {
            UserTips.ins().showTips("等待抽奖结果 请稍后");
            return;
        }
        if (Activity.ins().getRollSum(this.activityID) || Actor.yb >= cfg.yuanBao) {
            this.isClick = true;
            Activity.ins().sendReward(this.activityID, this.level);
        }
        else {
            UserTips.ins().showTips("元宝不足");
            this.isClick = false;
        }
    };
    OSATarget10Panel.prototype.listRefush = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (data) {
            if (!this.list.dataProvider) {
                this.list.dataProvider = new eui.ArrayCollection();
            }
            var dataPro = this.list.dataProvider;
            var arr = [];
            for (var i = 0; i < data.noticeArr.length; i++) {
                var notice = { activityID: this.activityID, name: data.noticeArr[i].name, multiple: data.noticeArr[i].multiple, yb: data.noticeArr[i].yb };
                arr.push(notice);
            }
            dataPro.replaceAll(arr);
        }
    };
    OSATarget10Panel.prototype.setTime = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (data)
            this.actTime.text = "剩余时间：" + data.getRemainTime();
    };
    return OSATarget10Panel;
}(ActivityPanel));
__reflect(OSATarget10Panel.prototype, "OSATarget10Panel");
//# sourceMappingURL=OSATarget10Panel.js.map