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
var WildBossJoinItem = (function (_super) {
    __extends(WildBossJoinItem, _super);
    function WildBossJoinItem() {
        return _super.call(this) || this;
    }
    WildBossJoinItem.prototype.dataChanged = function () {
        this.bg.visible = this.itemIndex % 2 == 0;
        if (this.data[3]) {
            this.txt0.text = this.data[0];
        }
        else
            this.txt0.text = (this.itemIndex + 1) + "";
        this.txt1.text = this.data[1];
        this.txt2.text = this.data[2];
    };
    return WildBossJoinItem;
}(BaseItemRender));
__reflect(WildBossJoinItem.prototype, "WildBossJoinItem");
//# sourceMappingURL=WildBossJoinItem.js.map