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
var ProgressBarEff = (function (_super) {
    __extends(ProgressBarEff, _super);
    function ProgressBarEff() {
        var _this = _super.call(this) || this;
        _this.isFisrt = true;
        _this.maxValue = 0;
        _this.value = 0;
        _this.isPlayMc = true;
        _this.group = new eui.Group();
        _this.bgmc = new MovieClip();
        _this.xianmc = new MovieClip();
        _this.bordermc = new MovieClip();
        _this.lbvalue = new eui.Label;
        _this.offSetX = 23;
        _this.mcWidth = 460;
        _this.bgWidth = 525;
        _this.bgimg = new eui.Image;
        _this.oldMaxValue = 0;
        _this.oldValue = 0;
        _this.iniUi();
        return _this;
    }
    ProgressBarEff.prototype.iniUi = function () {
        this.touchEnabled = this.touchChildren = false;
        this.group.x = 50;
        this.group.y = 22;
        this.group.width = 0;
        this.group.height = 50;
        this.group.scrollEnabled = true;
        this.bgmc.playFile(RES_DIR_EFF + "jindutiaoeff", -1);
        this.group.addChild(this.bgmc);
        this.addChild(this.group);
        this.xianmc.playFile(RES_DIR_EFF + "jindutiaotoueff", -1);
        this.xianmc.x = this.group.x + this.group.width - this.offSetX;
        this.xianmc.y = 10;
        this.xianmc.scrollRect = new egret.Rectangle(0, 0, 24, 39);
        this.addChild(this.xianmc);
        this.bgimg.x = 14;
        this.bgimg.y = 13;
        this.bgimg.source = "jingyantiao1";
        this.bgimg.scale9Grid = new egret.Rectangle(54, 0, 13, 37);
        this.bgimg.width = this.bgWidth;
        this.addChild(this.bgimg);
        this.lbvalue.x = this.bgimg.x + (this.bgimg.width - 200) / 2;
        this.lbvalue.y = 22;
        this.lbvalue.size = 16;
        this.lbvalue.width = 200;
        this.lbvalue.textAlign = "center";
        this.lbvalue.textColor = 0xffebc8;
        this.lbvalue.fontFamily = "黑体";
        this.addChild(this.lbvalue);
    };
    ProgressBarEff.prototype.setData = function (value, maxValue) {
        this.value = value;
        this.maxValue = maxValue;
        this.setui();
    };
    ProgressBarEff.prototype.testbtn1 = function () {
        this.xianmc.visible = false;
        this.bgmc.visible = true;
    };
    ProgressBarEff.prototype.testbtn2 = function () {
        this.xianmc.visible = true;
        this.bgmc.visible = false;
    };
    ProgressBarEff.prototype.setWidth = function (value) {
        this.bgWidth = value;
        this.bgimg.width = this.bgWidth;
        this.lbvalue.x = this.bgimg.x + (this.bgimg.width - 200) / 2;
        var scale = value / ProgressBarEff.DEFAULT_WIDTH;
        this.bgmc.scaleX = scale;
        this.mcWidth = ProgressBarEff.DEFAULT_MC_WIDTH * scale;
    };
    ProgressBarEff.prototype.setValue = function (value) {
        this.value = value;
        this.setui();
    };
    ProgressBarEff.prototype.getValue = function () {
        return this.value;
    };
    ProgressBarEff.prototype.getMaxValue = function () {
        return this.maxValue;
    };
    ProgressBarEff.prototype.reset = function () {
        this.isFisrt = true;
        this.oldValue = this.oldMaxValue = this.value = this.maxValue = 0;
    };
    ProgressBarEff.prototype.setMaxValue = function (maxValue) {
        this.maxValue = maxValue;
        this.setui();
    };
    ProgressBarEff.prototype.setui = function () {
        var _this = this;
        egret.Tween.removeTweens(this.group);
        var t = this;
        if (this.maxValue == 0) {
            this.value = 100;
            this.maxValue = 100;
            this.lbvalue.visible = false;
        }
        else {
            this.lbvalue.visible = true;
        }
        if ((this.maxValue > this.oldMaxValue && this.oldMaxValue != 0 || this.maxValue == 0 || this.value < this.oldValue) && !this.isFisrt) {
            var w = (this.oldMaxValue / this.oldMaxValue * this.mcWidth);
            var w2 = (this.value / this.oldMaxValue * this.mcWidth);
            var timer_1 = 30;
            var curX_1 = this.group.x;
            var curCurWidth_1 = this.group.width;
            var t1 = egret.Tween.get(this.group, {
                onChange: function () {
                    if (_this.group.width >= _this.mcWidth - 3 || _this.group.width < 3) {
                        _this.xianmc.visible = false;
                    }
                    else {
                        _this.xianmc.visible = true;
                    }
                    _this.xianmc.x = curX_1 + curCurWidth_1 - _this.offSetX;
                }
            });
            t1.to({
                width: w
            }, 150 + timer_1).call(function () {
                var t2 = egret.Tween.get(_this.group);
                var w1 = (_this.value / _this.maxValue * _this.mcWidth);
                _this.group.width = 0;
                _this.oldValue = _this.value;
                _this.oldMaxValue = _this.maxValue;
                t2.to({
                    width: w1
                }, 150 + timer_1).call(function () {
                    _this.xianmc.x = _this.group.x + w1 - _this.offSetX;
                });
            });
        }
        else {
            this.oldValue = this.value;
            var width = 0;
            if (this.value <= 0) {
                width = 0;
            }
            else {
                var newVal = this.value > this.maxValue ? this.maxValue : this.value;
                width = (newVal / this.maxValue * this.mcWidth);
            }
            var t1 = egret.Tween.get(this.group, {
                onChange: function () {
                    if (_this.group.width >= _this.mcWidth - 3 || _this.group.width < 3) {
                        _this.xianmc.visible = false;
                    }
                    else {
                        _this.xianmc.visible = true;
                    }
                    _this.xianmc.x = _this.group.x + _this.group.width - _this.offSetX;
                }
            });
            t1.to({
                width: width
            }, 200).call(function () {
                _this.oldMaxValue = _this.maxValue;
            });
        }
        this.lbvalue.text = this.value + "/" + this.maxValue;
        if (this.isFisrt) {
            this.isFisrt = false;
            return;
        }
    };
    ProgressBarEff.prototype.max = function () {
        this.maxValue = 0;
        this.setui();
        this.lbvalue.visible = true;
        this.lbvalue.text = "";
    };
    ProgressBarEff.prototype.setLbValueText = function (text) {
        this.setui();
        this.lbvalue.visible = true;
        this.lbvalue.text = text;
    };
    ProgressBarEff.DEFAULT_WIDTH = 525;
    ProgressBarEff.DEFAULT_MC_WIDTH = 460;
    return ProgressBarEff;
}(egret.DisplayObjectContainer));
__reflect(ProgressBarEff.prototype, "ProgressBarEff");
//# sourceMappingURL=ProgressBarEff.js.map