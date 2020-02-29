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
var BoostPowerView = (function (_super) {
    __extends(BoostPowerView, _super);
    function BoostPowerView() {
        var _this = _super.call(this) || this;
        _this.defaultValue = 0;
        _this.touchEnabled = _this.touchChildren = false;
        return _this;
    }
    BoostPowerView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.horizontalCenter = 100;
        this.bottom = -100;
        this.imgBg = new eui.Image;
        this.imgBg.source = "zhandoulibg";
        this.imgBg.x = 50;
        this.imgBg.y = 438;
        this.addChild(this.imgBg);
        this.imgBg.alpha = 1;
        this.imgBg.touchEnabled = false;
        this.img = new eui.Image;
        this.img.source = "zjmzhandouli";
        this.img.x = 100;
        this.img.y = 450;
        this.addChild(this.img);
        this.img.alpha = 1;
        this.img.touchEnabled = false;
        this.sp = new egret.Sprite();
        this.sp.x = 180;
        this.sp.y = 474;
        this.addChild(this.sp);
        this.lastTime = 0;
        this.lastPower = 0;
        this.clearShow();
    };
    BoostPowerView.prototype.showBoostPower = function (currentValue, lastValue) {
        this.defaultValue = lastValue;
        if (this.lastPower == 0) {
            this.lastPower = lastValue;
        }
        TimerManager.ins().doTimer(500, 1, this.delayPowerUp, this);
    };
    BoostPowerView.prototype.clearShow = function () {
        this.sp.removeChildren();
        egret.Tween.removeTweens(this.img);
        this.img.visible = false;
        egret.Tween.removeTweens(this.imgBg);
        this.imgBg.visible = false;
        TimerManager.ins().removeAll(this);
        egret.clearTimeout(this.ii);
        this.ii = 0;
    };
    BoostPowerView.prototype.delayPowerUp = function () {
        var lastPower = this.lastPower ? this.lastPower : this.defaultValue;
        var currentPower = Actor.power;
        if (currentPower > lastPower)
            this.showPowerUp(lastPower, currentPower);
    };
    BoostPowerView.prototype.showPowerUp = function (lasterPower, nowPower) {
        var _this = this;
        this.clearShow();
        this.img.visible = true;
        this.img.alpha = 1;
        this.imgBg.visible = true;
        this.imgBg.alpha = 1;
        var currentPower = BitmapNumber.ins().createNumPic(lasterPower, "8", 5);
        currentPower.y = -17;
        this.sp.addChild(currentPower);
        var numBoostPower = nowPower - lasterPower;
        TimerManager.ins().doTimer(20, 25, function () {
            var num = numBoostPower;
            num += Math.round(Math.random() * num);
            var firstNum = lasterPower.toString();
            var lastNum = "";
            if (num.toString().length == firstNum.length)
                lastNum = num.toString().slice(1);
            else
                lastNum = num + "";
            firstNum = firstNum.charAt(0);
            firstNum += lastNum;
            BitmapNumber.ins().changeNum(currentPower, firstNum, "8", 5);
        }, this, function () {
            BitmapNumber.ins().changeNum(currentPower, Actor.power, "8", 5);
            var numStr = "+" + numBoostPower;
            var boostPower = BitmapNumber.ins().createNumPic(numStr, "r0", 5);
            BitmapNumber.ins().changeNum(boostPower, numStr, "r0", 5);
            boostPower.x = currentPower.x + currentPower.width + 10;
            boostPower.y = currentPower.y + 30;
            _this.sp.addChild(boostPower);
            var moveTime = 200;
            var hideTime = 2000;
            _this.lastPower = 0;
            var t = egret.Tween.get(boostPower);
            t.to({ "y": boostPower.y - 30 }, moveTime).to({ "alpha": 0 }, hideTime).call(function () {
                DisplayUtils.removeFromParent(boostPower);
            }, _this);
            var tt = egret.Tween.get(currentPower);
            tt.wait(moveTime).to({ "alpha": 0 }, hideTime).call(function () {
                DisplayUtils.removeFromParent(currentPower);
            }, _this);
            var ttt = egret.Tween.get(_this.img);
            ttt.wait(moveTime).to({ "alpha": 0 }, hideTime).call(function () {
                _this.img.visible = false;
            }, _this);
            var tttt = egret.Tween.get(_this.imgBg);
            tttt.wait(moveTime).to({ "alpha": 0 }, hideTime).call(function () {
                _this.imgBg.visible = false;
            }, _this);
        }, this);
    };
    return BoostPowerView;
}(BaseEuiView));
__reflect(BoostPowerView.prototype, "BoostPowerView");
ViewManager.ins().reg(BoostPowerView, LayerManager.UI_Tips);
//# sourceMappingURL=BoostPowerView.js.map