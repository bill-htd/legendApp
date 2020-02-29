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
var cc_launchX = 180;
var cc_launchY = 500;
var cc_firstX = 0;
var cc_firstY = 0;
var cc_distantX = 77;
var cc_distantY = 93;
var cc_depotX = 320;
var cc_depotY = 620;
var cwaitTime = 50;
var LuckyResultWin = (function (_super) {
    __extends(LuckyResultWin, _super);
    function LuckyResultWin() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.items = [];
        _this.type = 0;
        return _this;
    }
    LuckyResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "HuntResult";
        this.isTopLevel = true;
    };
    LuckyResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.buyBtn, this.buy);
        this.observe(Activity.ins().postRewardResult, this.updateView);
        this.activityID = param[0];
        this.indexs = param[1];
        this.updateView();
    };
    LuckyResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buyBtn, this.buy);
        this.removeObserve();
    };
    LuckyResultWin.prototype.updateView = function () {
        this.canClicck = true;
        this.zwHunt.visible = true;
        var config9;
        if (GlobalConfig.PActivityBtnConfig[this.activityID]) {
            config9 = GlobalConfig.PActivityType9Config;
        }
        else {
            config9 = GlobalConfig.ActivityType9Config;
        }
        var config = config9[this.activityID];
        this.arr = [];
        for (var i = 0; i < this.indexs.length; i++) {
            if (!this.indexs[i])
                continue;
            for (var j = 0; j < config[this.indexs[i]].reward.length; j++) {
                this.arr.push(config[this.indexs[i]].reward[j]);
            }
        }
        this.title.text = "\u83B7\u5F97\u5982\u4E0B\u5B9D\u7269";
        this.buyBtn.labelDisplay.text = "\u62BD10\u6B21";
        this.yb = config[0].yb * 10;
        this.zw.text = this.yb + "";
        var itemcfg = GlobalConfig.ItemConfig[config[0].item];
        this.icon.source = itemcfg ? (itemcfg.icon + "_png") : null;
        this.itemId = config[0].item;
        this.updateDesc();
        this.playResult();
        this.zwNum2.text = "/10\uFF09";
    };
    LuckyResultWin.prototype.updateDesc = function () {
        var item = UserBag.ins().getBagItemById(this.itemId);
        var colorStr = ColorUtil.WHITE_COLOR;
        var sum = 0;
        var maxsum = 10;
        if (item) {
            sum = item.count;
            if (item.count >= maxsum) {
                colorStr = ColorUtil.GREEN_COLOR;
            }
            else {
                colorStr = ColorUtil.RED_COLOR;
            }
        }
        this.zwNum1.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + sum + "</font> ");
    };
    LuckyResultWin.prototype.playResult = function (fun) {
        var _this = this;
        this.releaseAllItem();
        var count = this.arr.length;
        for (var i = 0; i < count; i++) {
            this.items[i] = this.createItem(this.arr[i]);
            var t = egret.Tween.get(this.items[i]);
            this.items[i].x = (i % 5) * cc_distantX + cc_firstX;
            this.items[i].y = Math.floor(i / 5) * cc_distantY + cc_firstY;
            this.items[i].alpha = 0;
            t.wait(i * cwaitTime).to({ alpha: 1 }, 200).call(function () {
                count--;
                if (count == 0) {
                    if (fun != undefined) {
                        fun();
                    }
                    _this.canClicck = true;
                }
            });
        }
    };
    LuckyResultWin.prototype.playGet = function (fun) {
        var _this = this;
        var count = this.arr.length;
        for (var i = 0; i < count; i++) {
            if (!this.items[i])
                continue;
            var t = egret.Tween.get(this.items[i]);
            t.to({
                "y": cc_depotY,
                "x": cc_depotX,
                "scaleX": 0,
                "scaleY": 0
            }, 300 - Math.floor(i / 5) * 50).call(function () {
                count--;
                if (count == 0) {
                    if (fun != undefined) {
                        fun();
                    }
                    _this.releaseAllItem();
                }
            });
        }
    };
    LuckyResultWin.prototype.createItem = function (data) {
        var item = new ItemBase();
        this.listCon.addChild(item);
        var cfg = GlobalConfig.ItemConfig[data.id];
        if (cfg) {
            item.num = data.count;
            item.data = data;
        }
        else {
            item.data = { type: 0, count: data.count, id: data.id };
        }
        item.x = cc_launchX;
        item.y = cc_launchY;
        return item;
    };
    LuckyResultWin.prototype.releaseAllItem = function () {
        for (var k in this.items) {
            this.items[k].destruct();
            this.listCon.removeChild(this.items[k]);
        }
        this.items = [];
    };
    LuckyResultWin.prototype.buy = function (e) {
        if (!this.canClicck) {
            return;
        }
        if (GlobalConfig.PActivityBtnConfig[this.activityID]) {
            this.ins = PActivity.ins();
            this.config9 = GlobalConfig.PActivityType9Config;
        }
        else {
            this.ins = Activity.ins();
            this.config9 = GlobalConfig.ActivityType9Config;
        }
        var config = this.config9[this.activityID][0];
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, config.item);
        if (item && item.count) {
            this.ins.sendReward(this.activityID, 2);
        }
        else {
            var times = 10;
            HuntWarnBuyWin.showBuyWarn("LuckyResultWin" + this.activityID + "-10", this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + config.yb * times + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[config.item].name + "*" + times);
        }
    };
    LuckyResultWin.prototype.huntWarnFun = function () {
        var config = this.config9[this.activityID][0];
        if (Actor.yb >= config.yb * 10) {
            this.ins.sendReward(this.activityID, 2);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    return LuckyResultWin;
}(BaseEuiView));
__reflect(LuckyResultWin.prototype, "LuckyResultWin");
ViewManager.ins().reg(LuckyResultWin, LayerManager.UI_Main);
//# sourceMappingURL=LuckyResultWin.js.map