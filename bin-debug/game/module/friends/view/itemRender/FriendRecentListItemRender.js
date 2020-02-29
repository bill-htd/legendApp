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
var FriendRecentListItemRender = (function (_super) {
    __extends(FriendRecentListItemRender, _super);
    function FriendRecentListItemRender() {
        return _super.call(this) || this;
    }
    FriendRecentListItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FriendRecentListItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.label_name.text = data.name +
            "(" + (data.zs > 0 ? data.zs + "转" : "") + data.lv + "级)";
        this.label_lastChat.text = data.lastMsg;
        this.img_userIcon.source = "head_" + data.job + data.sex + (data.online == 1 ? "" : "b");
        this.redPoint.visible = Friends.ins().newMsg[data.id];
    };
    return FriendRecentListItemRender;
}(BaseItemRender));
__reflect(FriendRecentListItemRender.prototype, "FriendRecentListItemRender");
//# sourceMappingURL=FriendRecentListItemRender.js.map