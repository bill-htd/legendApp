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
var CreateRoleViewItem = (function (_super) {
    __extends(CreateRoleViewItem, _super);
    function CreateRoleViewItem() {
        return _super.call(this) || this;
    }
    CreateRoleViewItem.prototype.dataChanged = function () {
        if (this.data == "") {
            this.labelInfo.text = "";
            return;
        }
        var str = "玩家  " + "|C:0x3EADFF&T:" + this.data + "|" + "  正在进入游戏";
        this.labelInfo.textFlow = TextFlowMaker.generateTextFlow1(str);
    };
    return CreateRoleViewItem;
}(eui.ItemRenderer));
__reflect(CreateRoleViewItem.prototype, "CreateRoleViewItem");
//# sourceMappingURL=CreateRoleViewItem.js.map