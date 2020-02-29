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
var BabelLotteryItem = (function (_super) {
    __extends(BabelLotteryItem, _super);
    function BabelLotteryItem() {
        return _super.call(this) || this;
    }
    BabelLotteryItem.prototype.rewardState = function (isGet) {
        if (isGet) {
            this.currentState = "yilingqu";
        }
        else {
            this.currentState = "weilingqu";
        }
    };
    return BabelLotteryItem;
}(BaseComponent));
__reflect(BabelLotteryItem.prototype, "BabelLotteryItem");
//# sourceMappingURL=BabelLotteryItem.js.map