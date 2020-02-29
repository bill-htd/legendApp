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
var c_launchX = 180;
var c_launchY = 500;
var c_firstX = 0;
var c_firstY = 0;
var c_distantX = 77;
var c_distantY = 93;
var c_depotX = 320;
var c_depotY = 620;
var waitTime = 50;
var HuntResultWin = (function (_super) {
    __extends(HuntResultWin, _super);
    function HuntResultWin() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.items = [];
        _this.type = 0;
        return _this;
    }
    HuntResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "HuntResult";
        this.isTopLevel = true;
    };
    HuntResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.buyBtn, this.buy);
        this.observe(Hunt.ins().postHuntResult, this.updateView);
        this.observe(Heirloom.ins().postHuntResult, this.updateView);
        this.observe(Activity.ins().postHuntResult, this.updateView);
        this.updateView([param[0], param[1], param[2], param[3]]);
    };
    HuntResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buyBtn, this.buy);
        this.removeObserve();
    };
    HuntResultWin.prototype.updateView = function (param) {
        this.canClicck = true;
        this.huntType = param[0];
        this.arr = param[1];
        this.type = param[2];
        this.activityID = param[3];
        if (this.type == 3) {
            this.currentState = "noItem";
        }
        else {
            this.currentState = "normal";
        }
        this.validateNow();
        if (this.huntType == 0) {
            var num = 0;
            if (this.type == 0)
                num = GlobalConfig.TreasureHuntConfig.huntOnce;
            else if (this.type == 1)
                num = GlobalConfig.FuwenTreasureConfig.huntOnce;
            else if (this.type == 2)
                num = GlobalConfig.HeirloomTreasureConfig.huntOnce;
            else if (this.type == 3)
                num = GlobalConfig.ActivityType18Config[this.activityID][1].yb;
            this.yb = num;
            this.buyBtn.labelDisplay.text = "\u8D2D\u4E701\u6B21";
        }
        else {
            var num = 0;
            if (this.type == 0)
                num = GlobalConfig.TreasureHuntConfig.huntTenth;
            else if (this.type == 1)
                num = GlobalConfig.FuwenTreasureConfig.huntTenth;
            else if (this.type == 2)
                num = GlobalConfig.HeirloomTreasureConfig.huntTenth;
            else if (this.type == 3)
                num = GlobalConfig.ActivityType18Config[this.activityID][2].yb;
            this.yb = num;
            this.buyBtn.labelDisplay.text = "\u8D2D\u4E7010\u6B21";
        }
        this.zwHunt.visible = true;
        var itemId;
        if (this.type == 0)
            itemId = GlobalConfig.TreasureHuntConfig.huntItem;
        else if (this.type == 1)
            itemId = GlobalConfig.FuwenTreasureConfig.huntItem;
        else if (this.type == 2)
            itemId = GlobalConfig.HeirloomTreasureConfig.huntItem;
        else if (this.type == 3)
            itemId = GlobalConfig.ActivityType18Config[this.activityID][1].item;
        this.zw.text = this.yb + "";
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, itemId);
        var times = this.huntType ? 10 : 1;
        var sum = item ? item.count : 0;
        this.zwNum1.textFlow = TextFlowMaker.generateTextFlow("<font color=" + (sum >= times ? ColorUtil.GREEN_COLOR : ColorUtil.RED_COLOR) + ">" + sum + "</font> ");
        this.icon.source = GlobalConfig.ItemConfig[itemId].icon + "_png";
        this.zwNum2.text = this.huntType == 0 ? "/1\uFF09" : "/10\uFF09";
        this.playResult();
    };
    HuntResultWin.prototype.playResult = function (fun) {
        var _this = this;
        this.releaseAllItem();
        var count = this.arr.length;
        for (var i = 0; i < count; i++) {
            this.items[i] = this.createItem(this.arr[i]);
            var t = egret.Tween.get(this.items[i]);
            this.items[i].x = (i % 5) * c_distantX + c_firstX;
            this.items[i].y = Math.floor(i / 5) * c_distantY + c_firstY;
            this.items[i].alpha = 0;
            t.wait(i * waitTime).to({ alpha: 1 }, 200).call(function () {
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
    HuntResultWin.prototype.playGet = function (fun) {
        var _this = this;
        var count = this.arr.length;
        for (var i = 0; i < count; i++) {
            if (!this.items[i])
                continue;
            var t = egret.Tween.get(this.items[i]);
            t.to({
                "y": c_depotY,
                "x": c_depotX,
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
    HuntResultWin.prototype.createItem = function (data) {
        var item = new ItemBase();
        this.listCon.addChild(item);
        var cfg = GlobalConfig.ItemConfig[data[0]];
        if (cfg) {
            item.num = data[1];
            item.data = data[0];
        }
        else {
            item.data = { type: 0, count: data[1], id: data[0] };
        }
        item.x = c_launchX;
        item.y = c_launchY;
        return item;
    };
    HuntResultWin.prototype.releaseAllItem = function () {
        for (var k in this.items) {
            this.items[k].destruct();
            this.listCon.removeChild(this.items[k]);
        }
        this.items = [];
    };
    HuntResultWin.prototype.closeCB = function (e) {
        var _this = this;
        if (!this.canClicck) {
            return;
        }
        this.canClicck = false;
        var func = function () {
            ViewManager.ins().close(_this);
        };
        this.playGet(func);
    };
    HuntResultWin.prototype.buy = function (e) {
        var _this = this;
        if (this.type == 3) {
            if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                ViewManager.ins().open(BagFullTipsWin);
                return;
            }
        }
        if (!this.canClicck) {
            return;
        }
        if (this.type == 2 && this.huntType == 0 && Heirloom.ins().huntFreeTimes > 0) {
            Heirloom.ins().sendHunt(this.huntType);
            return;
        }
        var itemId = 0;
        if (this.type == 3)
            itemId = GlobalConfig.ActivityType18Config[this.activityID][1].item;
        else if (this.type == 2)
            itemId = GlobalConfig.HeirloomTreasureConfig.huntItem;
        else if (this.type == 1)
            itemId = GlobalConfig.FuwenTreasureConfig.huntItem;
        else
            itemId = GlobalConfig.TreasureHuntConfig.huntItem;
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, itemId);
        if (item && item.count) {
            var func = function () {
                if (_this.type == 0)
                    Hunt.ins().sendHunt(_this.huntType);
                else if (_this.type == 1)
                    Rune.ins().sendHuntRune(_this.huntType);
                else if (_this.type == 2)
                    Heirloom.ins().sendHunt(_this.huntType);
                else if (_this.type == 3)
                    Activity.ins().sendReward(_this.activityID, _this.huntType == 0 ? 1 : 2);
            };
            this.playGet(func);
            this.canClicck = false;
        }
        else {
            var times = this.huntType ? 10 : 1;
            HuntWarnBuyWin.showBuyWarn(this.getPanelNameByType(this.type) + "-HuntResultWin" + this.huntType, this.huntWarnFun.bind(this), "\u662F\u5426\u6D88\u8017" + this.yb + "\u5143\u5B9D\u8D2D\u4E70" + GlobalConfig.ItemConfig[itemId].name + "*" + times);
        }
    };
    HuntResultWin.prototype.getPanelNameByType = function (type) {
        if (this.type == 3)
            return "OSATarget18Panel1";
        else if (this.type == 2)
            return "TreasureChuanshiPanel";
        else if (this.type == 1)
            return "TreasureRunePanel";
        else
            return "TreasureHuntPanel";
    };
    HuntResultWin.prototype.huntWarnFun = function () {
        var _this = this;
        if (Actor.yb >= this.yb) {
            var func = function () {
                if (_this.type == 0)
                    Hunt.ins().sendHunt(_this.huntType);
                else if (_this.type == 1)
                    Rune.ins().sendHuntRune(_this.huntType);
                else if (_this.type == 2)
                    Heirloom.ins().sendHunt(_this.huntType);
                else if (_this.type == 3)
                    Activity.ins().sendReward(_this.activityID, _this.huntType == 0 ? 1 : 2);
            };
            this.playGet(func);
            this.canClicck = false;
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    return HuntResultWin;
}(BaseEuiView));
__reflect(HuntResultWin.prototype, "HuntResultWin");
ViewManager.ins().reg(HuntResultWin, LayerManager.UI_Main);
//# sourceMappingURL=HuntResultWin.js.map