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
var Recharge2Win = (function (_super) {
    __extends(Recharge2Win, _super);
    function Recharge2Win() {
        var _this = _super.call(this) || this;
        _this.skinName = "DailyChargeSkin2";
        _this.isTopLevel = true;
        return _this;
    }
    Recharge2Win.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.totalPower = BitmapNumber.ins().createNumPic(0, "vip_v", 5);
        this.totalPower.x = 0;
        this.totalPower.y = 0;
        this.moneyGroup.addChild(this.totalPower);
        this.eff = new MovieClip;
        this.eff.x = this.goUpBtn.x + 103;
        this.eff.y = this.goUpBtn.y + 24;
        this.eff.scaleX = 1.45;
        this.eff.touchEnabled = false;
    };
    Recharge2Win.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.goUpBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(Recharge.ins().postUpdateRechargeEx, this.setWinData);
        var playPunView = ViewManager.ins().getView(PlayFunView);
        if (playPunView) {
            playPunView.preRecharge = playPunView.recharge.visible = false;
        }
        this.setWinData();
    };
    Recharge2Win.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.goUpBtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        DisplayUtils.removeFromParent(this.eff);
        egret.Tween.removeTweens(this);
        this.removeObserve();
    };
    Recharge2Win.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(Recharge2Win);
                break;
            case this.goUpBtn:
                if (this.goUpBtn.label == "\u9886\u53D6\u5927\u793C\u5305") {
                    if (this.currData) {
                        this.getReward();
                    }
                }
                else if (this.goUpBtn.label == "\u5145\u70B9\u5C0F\u94B1\u73A9\u73A9") {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                ViewManager.ins().close(Recharge2Win);
                break;
        }
    };
    Recharge2Win.prototype.getReward = function () {
        this.playGet(undefined, this.currData);
        Recharge.ins().getDayReward(this.currData.index);
    };
    Recharge2Win.prototype.playGet = function (fun, infoData) {
        var uiView2 = ViewManager.ins().getView(UIView2);
        var bagBtn = uiView2.getBagBtn();
        var targetX = bagBtn.x - 50;
        var targetY = bagBtn.y - this.mainGroup.y - 110;
        var _loop_1 = function (i) {
            var item = new ItemBase();
            item.data = this_1["item" + (i + 1)].data;
            item.x = this_1["item" + (i + 1)].x;
            item.y = this_1["item" + (i + 1)].y;
            this_1["item" + (i + 1)].parent.addChild(item);
            var t = egret.Tween.get(item);
            t.to({ x: targetX, y: targetY, scaleX: 0, scaleY: 0 }, 500).call(function () {
                DisplayUtils.removeFromParent(item);
            });
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    Recharge2Win.prototype.setWinData = function () {
        var data = Recharge.ins().getRechargeData(0);
        var config = Recharge.ins().getCurRechargeConfig();
        this.currData = null;
        var minRecharge = Number.MAX_VALUE;
        for (var k in config) {
            var state = ((data.isAwards >> config[k].index) & 1);
            if (!state && minRecharge > config[k].pay) {
                minRecharge = config[k].pay;
                this.currData = config[k];
            }
        }
        if (!this.currData)
            this.currData = config[0];
        if (this.currData) {
            var cost = this.currData.pay - data.curDayPay;
            if (cost > 0) {
                this.goUpBtn.label = "\u5145\u70B9\u5C0F\u94B1\u73A9\u73A9";
                DisplayUtils.removeFromParent(this.eff);
            }
            else {
                this.goUpBtn.label = "\u9886\u53D6\u5927\u793C\u5305";
                if (!this.eff.parent) {
                    this.goUpBtn.parent.addChildAt(this.eff, this.getChildIndex(this.goUpBtn));
                    this.eff.playFile(RES_DIR_EFF + "chongzhi", -1);
                }
            }
            this.setItem();
            BitmapNumber.ins().changeNum(this.totalPower, cost < 0 ? 0 : cost, "vip_v", 3);
        }
        this.initPos();
    };
    Recharge2Win.prototype.setItem = function () {
        for (var j = 0; j < this.currData.awardList.length; j++) {
            var d = this.currData.awardList[j];
            this["item" + (j + 1)].data = d;
            this["item" + (j + 1)].visible = true;
            this["item" + (j + 1)].scaleX = this["item" + (j + 1)].scaleY = 1;
            this["item" + (j + 1)].x = 90 * j;
            this["item" + (j + 1)].y = 0;
        }
    };
    Recharge2Win.prototype.initPos = function () {
        this.totalPower.x = (this.moneyGroup.width - this.totalPower.width) / 2;
    };
    return Recharge2Win;
}(BaseEuiView));
__reflect(Recharge2Win.prototype, "Recharge2Win");
ViewManager.ins().reg(Recharge2Win, LayerManager.UI_Popup);
//# sourceMappingURL=Recharge2Win.js.map