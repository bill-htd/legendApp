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
var HappySevenDayBtnItemRender = (function (_super) {
    __extends(HappySevenDayBtnItemRender, _super);
    function HappySevenDayBtnItemRender() {
        var _this = _super.call(this) || this;
        _this.day = 0;
        _this.touchChildren = false;
        return _this;
    }
    HappySevenDayBtnItemRender.prototype.dataChanged = function () {
        this.dayImg.source = this.data.res;
        this.isOpen = this.data.isOpen;
        this.day = this.data.day;
        this.currentState = !this.isOpen ? "lock" : "unlock";
        this.redpoint.visible = this.data.showRed;
    };
    Object.defineProperty(HappySevenDayBtnItemRender.prototype, "selected", {
        set: function (value) {
            this.currentState = this.isOpen ? (value ? "unlockS" : "unlock") : "lock";
            if (this.data)
                this.redpoint.visible = this.data.showRed;
        },
        enumerable: true,
        configurable: true
    });
    return HappySevenDayBtnItemRender;
}(BaseItemRender));
__reflect(HappySevenDayBtnItemRender.prototype, "HappySevenDayBtnItemRender");
//# sourceMappingURL=HappySevenDayBtnItemRender.js.map