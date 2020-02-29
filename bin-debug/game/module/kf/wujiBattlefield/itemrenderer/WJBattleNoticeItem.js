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
var WJBattleNoticeItem = (function (_super) {
    __extends(WJBattleNoticeItem, _super);
    function WJBattleNoticeItem() {
        return _super.call(this) || this;
    }
    WJBattleNoticeItem.prototype.dataChanged = function () {
        this.txtLabel.text = this.data;
    };
    return WJBattleNoticeItem;
}(BaseItemRender));
__reflect(WJBattleNoticeItem.prototype, "WJBattleNoticeItem");
//# sourceMappingURL=WJBattleNoticeItem.js.map