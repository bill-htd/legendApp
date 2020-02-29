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
var BoxRoomItem = (function (_super) {
    __extends(BoxRoomItem, _super);
    function BoxRoomItem() {
        return _super.call(this) || this;
    }
    BoxRoomItem.prototype.dataChanged = function () {
        var data = this.data;
        if (!data.canUsed) {
            this.currentState = "Tips";
            this.labelTips.text = "\u901A\u5173\u5230\u7B2C" + data.openChapter + "\u5F00\u542F";
            return;
        }
        if (data.itemId) {
            this.currentState = "box";
            var conf = GlobalConfig.TreasureBoxConfig[data.itemId];
            this.imgBox.source = conf.imgClose;
            this.labelName.text = conf.name;
        }
        else {
            this.currentState = "room";
        }
    };
    return BoxRoomItem;
}(BaseItemRender));
__reflect(BoxRoomItem.prototype, "BoxRoomItem");
//# sourceMappingURL=BoxRoomItem.js.map