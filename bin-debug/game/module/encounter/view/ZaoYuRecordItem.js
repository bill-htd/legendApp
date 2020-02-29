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
var ZaoYuRecordItem = (function (_super) {
    __extends(ZaoYuRecordItem, _super);
    function ZaoYuRecordItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZaoYuRecordInfoSkin";
        return _this;
    }
    ZaoYuRecordItem.prototype.dataChanged = function () {
        var data = this.data;
        this.time.text = DateUtils.getFormatBySecond(DateUtils.formatMiniDateTime(data[0]) / 1000, 2);
        this.playerName.textFlow = (new egret.HtmlTextParser()).parser("\u906D\u9047\u73A9\u5BB6\uFF1A<font color=\"#3681FC\">" + data[2] + "</font>");
        this.exp.text = "" + data[3];
        this.money.text = "" + data[4];
        this.prestige.text = "" + data[5];
        this.lingpo.text = data[6] || "0";
        if (data[1]) {
            this.currentState = "win";
        }
        else {
            this.currentState = "lose";
        }
    };
    return ZaoYuRecordItem;
}(BaseItemRender));
__reflect(ZaoYuRecordItem.prototype, "ZaoYuRecordItem");
//# sourceMappingURL=ZaoYuRecordItem.js.map