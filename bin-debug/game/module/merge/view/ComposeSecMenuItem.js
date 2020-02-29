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
var ComposeSecMenuItem = (function (_super) {
    __extends(ComposeSecMenuItem, _super);
    function ComposeSecMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComposeSecMenuItem.prototype.dataChanged = function () {
        var data = this.data;
        this.lv.text = "" + data.btn_name;
        this.redPoint.visible = MergeCC.ins().isCanMergeByIndex(data.id, data.index);
        var compose = ViewManager.ins().getView(BagWin).reinComposePanel;
        if (compose.id == data.id && compose.index == data.index) {
            this.setSelect(true);
        }
    };
    ComposeSecMenuItem.prototype.setSelect = function (isSelect) {
        this.chosen.visible = isSelect;
    };
    return ComposeSecMenuItem;
}(BaseItemRender));
__reflect(ComposeSecMenuItem.prototype, "ComposeSecMenuItem");
//# sourceMappingURL=ComposeSecMenuItem.js.map