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
var ChatSystemItemRenderer = (function (_super) {
    __extends(ChatSystemItemRenderer, _super);
    function ChatSystemItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "SysMesItemSkin";
        return _this;
    }
    ChatSystemItemRenderer.prototype.dataChanged = function () {
        if (this.data.type == 1) {
            this.str.textFlow = TextFlowMaker.generateTextFlow("|C:0xFD2F2F&T:" + this.data.str + "|");
            this.type.source = "lt_01";
        }
        else {
            this.str.textFlow = TextFlowMaker.generateTextFlow(this.data.str);
            this.type.source = "lt_02";
        }
    };
    return ChatSystemItemRenderer;
}(BaseItemRender));
__reflect(ChatSystemItemRenderer.prototype, "ChatSystemItemRenderer");
//# sourceMappingURL=ChatSystemItemRenderer.js.map