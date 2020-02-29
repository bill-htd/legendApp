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
var FriendItemRender = (function (_super) {
    __extends(FriendItemRender, _super);
    function FriendItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "friendItemSkin";
        return _this;
    }
    FriendItemRender.prototype.dataChanged = function () {
        this.labelName.text = this.data.name;
        this.imgBg.source = ChatListItemRenderer.HEAD_BG[this.data.sex];
        this.imgHead.source = "head_" + this.data.job + this.data.sex;
        this.labelGuild.text = this.data.guildName ? this.data.guildName : "";
        this.labelLv.text = (this.data.zs ? this.data.zs + "级" : "") + this.data.lv + "级";
    };
    return FriendItemRender;
}(BaseItemRender));
__reflect(FriendItemRender.prototype, "FriendItemRender");
//# sourceMappingURL=FriendItemRender.js.map