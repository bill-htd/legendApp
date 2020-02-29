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
var LevelImage = (function (_super) {
    __extends(LevelImage, _super);
    function LevelImage() {
        var _this = _super.call(this) || this;
        _this._value = 1;
        _this.skinName = "jiejiSkin";
        return _this;
    }
    LevelImage.prototype.getValue = function () {
        return this._value;
    };
    LevelImage.prototype.setValue = function (val) {
        if (val <= 0)
            val = 1;
        this._value = val;
        var str = val + "";
        if (val <= 10) {
            this.currentState = '1';
            this.num1.source = "jieji0" + str + "_png";
        }
        else if (val <= 20 || val % 10 == 0) {
            this.currentState = '2';
            if (str.charAt(0) == '1') {
                this.num21.source = "jieji010_png";
                this.num22.source = "jieji0" + str.charAt(1) + "_png";
            }
            else {
                this.num21.source = "jieji0" + str.charAt(0) + "_png";
                this.num22.source = "jieji010_png";
            }
        }
        else if (val < 100) {
            this.currentState = '3';
            this.num31.source = "jieji0" + str.charAt(0) + "_png";
            this.num32.source = "jieji010_png";
            this.num33.source = "jieji0" + str.charAt(1) + "_png";
        }
    };
    return LevelImage;
}(BaseComponent));
__reflect(LevelImage.prototype, "LevelImage");
//# sourceMappingURL=LevelImage.js.map