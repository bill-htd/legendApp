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
var PlayerTipsWin = (function (_super) {
    __extends(PlayerTipsWin, _super);
    function PlayerTipsWin() {
        var _this = _super.call(this) || this;
        _this.currId = 0;
        _this.skinName = "PlayerInfoSkin";
        return _this;
    }
    PlayerTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        if (!this.data) {
            ViewManager.ins().close(PlayerTipsWin);
            return;
        }
        this.currId = 0;
        this.addTouchEvent(this.btnIgnore, this.onTap);
        this.addTouchEvent(this.btnChat, this.onTap);
        this.addTouchEvent(this.btnFriend, this.onTap);
        this.addTouchEvent(this.btnInfo, this.onTap);
        this.addTouchEvent(this.rect, this.onTap);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.initView();
    };
    PlayerTipsWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnChat:
                var index = Friends.ins().getFriendIndex(this.currId);
                if (index != -1) {
                    ViewManager.ins().close(this);
                    ViewManager.ins().open(FriendBgWin, 0, index);
                }
                else {
                    UserTips.ins().showTips("\u53EA\u6709\u597D\u53CB\u624D\u80FD\u79C1\u804A");
                }
                break;
            case this.btnInfo:
                UserReadPlayer.ins().sendFindPlayer(this.currId, this.data.name);
                break;
            case this.btnIgnore:
                Friends.ins().sendAddBlackList(this.currId, this.data.name);
                break;
            case this.btnFriend:
                Friends.ins().sendAddFriend(this.currId, this.data.name);
                break;
            case this.rect:
                ViewManager.ins().close(PlayerTipsWin);
                break;
        }
    };
    PlayerTipsWin.prototype.initView = function () {
        if (this.data instanceof FriendData) {
            var data = this.data;
            this.labelName.text = data.name;
            if (data.zs)
                this.labelLv.text = data.zs + "\u8F6C" + data.lv + "\u7EA7";
            else
                this.labelLv.text = this.data.lv + "\u7EA7";
            this.labelGuild.text = data.guildName;
            this.imgBg.source = ChatListItemRenderer.HEAD_BG[data.sex];
            this.imgHead.source = "head_" + data.job + data.sex;
            this.currId = data.id;
        }
        else if (this.data instanceof GuildMemberInfo) {
            this.labelName.text = this.data.name;
            if (this.data.zsLevel)
                this.labelLv.text = this.data.zsLevel + "\u8F6C" + this.data.level + "\u7EA7";
            else
                this.labelLv.text = this.data.level + "\u7EA7";
            this.labelGuild.text = Guild.ins().guildName ? Guild.ins().guildName : "";
            this.imgBg.source = ChatListItemRenderer.HEAD_BG[this.data.sex];
            this.imgHead.source = "head_" + this.data.job + this.data.sex;
            this.currId = this.data.roleID;
        }
        else if (this.data instanceof GuildMessageInfo) {
            this.labelName.text = this.data.name;
            if (this.data.zsLevel)
                this.labelLv.text = this.data.zsLevel + "\u8F6C" + this.data.lv + "\u7EA7";
            else
                this.labelLv.text = this.data.lv + "\u7EA7";
            this.labelGuild.text = this.data.guildName;
            this.imgBg.source = ChatListItemRenderer.HEAD_BG[this.data.sex];
            this.imgHead.source = "head_" + this.data.job + this.data.sex;
            this.currId = this.data.roleId;
        }
        else {
            this.labelName.text = this.data.name;
            if (this.data.zsLevel)
                this.labelLv.text = this.data.zsLevel + "\u8F6C" + this.data.lv + "\u7EA7";
            else
                this.labelLv.text = this.data.lv + "\u7EA7";
            this.labelGuild.text = this.data.guild;
            this.imgBg.source = ChatListItemRenderer.HEAD_BG[this.data.sex];
            this.imgHead.source = "head_" + this.data.job + this.data.sex;
            this.currId = this.data.id;
        }
    };
    PlayerTipsWin.prototype.openOtherPlayerView = function (otherPlayerData) {
        ViewManager.ins().close(this);
        ViewManager.ins().close(FriendBgWin);
        ViewManager.ins().open(RRoleWin, otherPlayerData);
    };
    return PlayerTipsWin;
}(BaseEuiView));
__reflect(PlayerTipsWin.prototype, "PlayerTipsWin");
ViewManager.ins().reg(PlayerTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=PlayerTipsWin.js.map