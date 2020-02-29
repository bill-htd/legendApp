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
var FriendListItemRender = (function (_super) {
    __extends(FriendListItemRender, _super);
    function FriendListItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendsItemSkin";
        return _this;
    }
    FriendListItemRender.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        if (!this.hasEventListener(egret.Event.REMOVED_FROM_STAGE)) {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                MessageCenter.ins().removeAll(_this);
            }, this);
        }
        this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            Friends.ins().postChatToFriend(_this.data.id);
            e.stopPropagation();
            e.stopImmediatePropagation();
        }, this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            WarnWin.show("\u786E\u5B9A\u8981\u5220\u9664<font color='#f3311e'>" + _this.data.name + "</font>\u5417?", function () {
                Friends.ins().sendDelete(1, _this.data.id);
            }, _this);
            e.stopPropagation();
            e.stopImmediatePropagation();
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.data)
                ViewManager.ins().open(PlayerTipsWin, _this.data);
        }, this);
    };
    FriendListItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.label_name.text = data.name + "(" + (data.zs > 0 ? data.zs + "转" : "") + data.lv + "级)";
        this.label_power.text = "战斗力:" + data.power;
        this.labelGuild.text = data.guildName;
        if (data.online == 1) {
            this.label_lastLogin.text = "在线";
            this.label_lastLogin.textColor = 0x27d61a;
        }
        else {
            this.label_lastLogin.text = DateUtils.getFormatBySecond(Math.max(data.offLineSec, 60), 4);
            this.label_lastLogin.textColor = 0xFCFCFC;
        }
        this.img_userIcon.source = "head_" + data.job + data.sex + (data.online == 1 ? "" : "b");
        this.headBg.source = ChatListItemRenderer.HEAD_BG[data.sex];
    };
    return FriendListItemRender;
}(BaseItemRender));
__reflect(FriendListItemRender.prototype, "FriendListItemRender");
//# sourceMappingURL=FriendListItemRender.js.map