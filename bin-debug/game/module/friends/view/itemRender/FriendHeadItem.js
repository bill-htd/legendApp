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
var FriendHeadItem = (function (_super) {
    __extends(FriendHeadItem, _super);
    function FriendHeadItem() {
        return _super.call(this) || this;
    }
    FriendHeadItem.prototype.dataChanged = function () {
        var data = this.data;
        this.label_name.text = data.name;
        this.img_userIcon.source = "head_" + data.job + data.sex;
        this.imgBg.source = ChatListItemRenderer.HEAD_BG[data.sex];
    };
    return FriendHeadItem;
}(BaseItemRender));
__reflect(FriendHeadItem.prototype, "FriendHeadItem");
//# sourceMappingURL=FriendHeadItem.js.map