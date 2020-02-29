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
var FriendAppListItemRender = (function (_super) {
    __extends(FriendAppListItemRender, _super);
    function FriendAppListItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendsAppListItemSkin";
        return _this;
    }
    FriendAppListItemRender.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            Friends.ins().sendAgreeApp(_this.data.id, 1);
            e.stopPropagation();
            e.stopImmediatePropagation();
        }, this);
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            Friends.ins().sendAgreeApp(_this.data.id, 0);
            e.stopPropagation();
            e.stopImmediatePropagation();
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.data)
                ViewManager.ins().open(PlayerTipsWin, _this.data);
        }, this);
    };
    FriendAppListItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.label_name.text = data.name + "(" + (data.zs > 0 ? data.zs + "转" : "") + data.lv + "级)";
        this.img_userIcon.source = "head_" + data.job + data.sex;
        this.labelGuild.text = data.guildName;
        var num_0 = Math.floor(data.vip / 10) || 0;
        var num_1 = data.vip % 10 || 0;
        if (num_0) {
            this.img_vipLv0.source = "xvip_4" + num_0 + "_png";
        }
        else {
            this.img_vipLv0.source = null;
        }
        this.img_vipLv1.source = "xvip_4" + num_1 + "_png";
        this.headBg.source = ChatListItemRenderer.HEAD_BG[data.sex];
    };
    return FriendAppListItemRender;
}(BaseItemRender));
__reflect(FriendAppListItemRender.prototype, "FriendAppListItemRender");
//# sourceMappingURL=FriendAppListItemRender.js.map