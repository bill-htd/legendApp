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
var FriendListPanel = (function (_super) {
    __extends(FriendListPanel, _super);
    function FriendListPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u597D\u53CB";
        return _this;
    }
    FriendListPanel.prototype.childrenCreated = function () {
        this.list.itemRenderer = FriendListItemRender;
    };
    FriendListPanel.prototype.open = function () {
        this.updateView();
        this.readMsg();
        this.addTouchEvent(this.btnFind, this.onTap);
    };
    FriendListPanel.prototype.readMsg = function () {
        for (var key in Friends.ins().newMsg) {
            Friends.ins().newMsg[key] = false;
        }
    };
    FriendListPanel.prototype.close = function () {
        this.$onClose();
        WatcherUtil.removeFromArrayCollection(this.list.dataProvider);
        this.list.dataProvider = null;
    };
    FriendListPanel.prototype.updateView = function () {
        this.list.dataProvider = Friends.ins().friendsList;
    };
    FriendListPanel.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnFind:
                ViewManager.ins().open(FriendsAddWin);
                break;
        }
    };
    return FriendListPanel;
}(BaseComponent));
__reflect(FriendListPanel.prototype, "FriendListPanel");
//# sourceMappingURL=FriendListPanel.js.map