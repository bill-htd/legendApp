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
var SamsaraComposeSecMenuItem = (function (_super) {
    __extends(SamsaraComposeSecMenuItem, _super);
    function SamsaraComposeSecMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SamsaraComposeSecMenuItem.prototype.dataChanged = function () {
        var type = this.data["type"];
        var zsLv = this.data["zsLv"];
        var desc = SamsaraModel.ins().getComposeDesc(type);
        this.head.text = desc;
        this.lv.text = zsLv + "\u8F6C\u88C5\u5907";
        this.redPoint.visible = SamsaraModel.ins().isCanZsLvCompose(type, zsLv);
        var compose = ViewManager.ins().getView(BagWin).reinComposePanel;
        if (compose.type == type && compose.zsLv == zsLv) {
            this.setSelect(true);
        }
    };
    SamsaraComposeSecMenuItem.prototype.setSelect = function (isSelect) {
        this.chosen.visible = isSelect;
    };
    return SamsaraComposeSecMenuItem;
}(BaseItemRender));
__reflect(SamsaraComposeSecMenuItem.prototype, "SamsaraComposeSecMenuItem");
//# sourceMappingURL=SamsaraComposeSecMenuItem.js.map