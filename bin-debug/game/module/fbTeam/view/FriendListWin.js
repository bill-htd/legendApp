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
var FriendListWin = (function (_super) {
    __extends(FriendListWin, _super);
    function FriendListWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "friendListSkin";
        _this.isTopLevel = true;
        return _this;
    }
    FriendListWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = FriendItemRender;
    };
    FriendListWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._des = args[0];
        this.addTouchEvent(this, this.onTouch);
        this.addTouchEvent(this.list, this.onListTap);
        this.observe(Friends.ins().postFriendChange, this.update, this);
        this.update();
    };
    FriendListWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeTouchEvent(this.list, this.onListTap);
        this.removeObserve();
    };
    FriendListWin.prototype.update = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.list.dataProvider = this._collect;
        }
        this._collect.source = Friends.ins().friendsList.source;
    };
    FriendListWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    FriendListWin.prototype.onListTap = function (e) {
        var selectedItem = this.list.selectedItem;
        if (selectedItem)
            Friends.ins().sendChat(selectedItem.id, this._des);
    };
    return FriendListWin;
}(BaseEuiView));
__reflect(FriendListWin.prototype, "FriendListWin");
ViewManager.ins().reg(FriendListWin, LayerManager.UI_Popup);
//# sourceMappingURL=FriendListWin.js.map