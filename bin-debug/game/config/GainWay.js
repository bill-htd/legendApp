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
var GainWay = (function (_super) {
    __extends(GainWay, _super);
    function GainWay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GainWay.prototype, "gainName", {
        get: function () {
            return this[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GainWay.prototype, "winName", {
        get: function () {
            return this[1] ? this[1] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GainWay.prototype, "page", {
        get: function () {
            return this[2] ? this[2] : 0;
        },
        enumerable: true,
        configurable: true
    });
    return GainWay;
}(Array));
__reflect(GainWay.prototype, "GainWay");
//# sourceMappingURL=GainWay.js.map