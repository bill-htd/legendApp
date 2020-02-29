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
var KfArenaInviteWin = (function (_super) {
    __extends(KfArenaInviteWin, _super);
    function KfArenaInviteWin() {
        var _this = _super.call(this) || this;
        _this.friendList = [];
        _this.guildList = [];
        _this.type = 0;
        _this.cdTime = 30;
        _this.skinName = "kfInviteSkin";
        _this.isTopLevel = true;
        _this.listView.itemRenderer = kfArenaMemberItemRender;
        _this.worldInvite.textFlow = (new egret.HtmlTextParser).parser("<u>" + _this.worldInvite.text + "</u>");
        _this.listArray = new eui.ArrayCollection();
        _this.listView.dataProvider = _this.listArray;
        _this.tab.itemRenderer = KfArenaBtn;
        _this.updateTabRedPt();
        return _this;
    }
    KfArenaInviteWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.tab.selectedIndex = 0;
        this.addTouchEvent(this.closeBtn0, this.onTouch);
        this.addTouchEvent(this.worldInvite, this.onTouch);
        this.addTouchEvent(this.tab, this.onTabClick);
        this.observe(KfArenaSys.ins().postKfArenaDelID, this.update);
        this.observe(KfArenaSys.ins().postKfArenaGuilds, this.updateGuild);
        this.type = KFInviteType.Friend;
        KfArenaSys.ins().sendGuilds(0);
        KfArenaSys.ins().sendGuilds(1);
    };
    KfArenaInviteWin.prototype.updateGuild = function (type) {
        switch (type) {
            case KFInviteType.Friend:
                this.friendList = KfArenaSys.ins().getDataList(type);
                break;
            case KFInviteType.Guild:
                this.guildList = KfArenaSys.ins().getDataList(type);
                break;
        }
        this.setType(this.type);
    };
    KfArenaInviteWin.prototype.onTabClick = function (e) {
        if (e === void 0) { e = null; }
        this.setType(this.tab.selectedIndex);
    };
    KfArenaInviteWin.prototype.updateTabRedPt = function () {
        this.tab.dataProvider = new ArrayCollection(["好  友", "帮  派"]);
    };
    KfArenaInviteWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.worldInvite:
                var time = egret.getTimer();
                var cd = (KfArenaSys.ins().worldTimeCd - time) / 1000 >> 0;
                if (cd > 0) {
                    UserTips.ins().showTips(cd + "\u79D2\u540E\u53EF\u518D\u6B21\u4E16\u754C\u9080\u8BF7");
                }
                else {
                    KfArenaSys.ins().worldTimeCd = time + this.cdTime * 1000;
                    KfArenaSys.ins().sendWorldInvite();
                    UserTips.ins().showTips("\u9080\u8BF7\u53D1\u9001\u6210\u529F");
                }
                break;
        }
    };
    KfArenaInviteWin.prototype.update = function (id) {
        for (var i = this.friendList.length - 1; i >= 0; i--) {
            if (this.friendList[i].id == id)
                this.friendList.splice(i, 1);
        }
        for (var i = this.guildList.length - 1; i >= 0; i--) {
            if (this.guildList[i].roleID == id)
                this.guildList.splice(i, 1);
        }
        this.setType(this.type);
    };
    KfArenaInviteWin.prototype.setType = function (type) {
        this.type = type;
        switch (type) {
            case KFInviteType.Friend:
                this.listArray.source = this.friendList;
                this.noPlayer.visible = this.friendList.length == 0;
                break;
            case KFInviteType.Guild:
                this.listArray.source = this.guildList;
                this.noPlayer.visible = this.guildList.length == 0;
                break;
        }
    };
    return KfArenaInviteWin;
}(BaseEuiView));
__reflect(KfArenaInviteWin.prototype, "KfArenaInviteWin");
ViewManager.ins().reg(KfArenaInviteWin, LayerManager.UI_Popup);
//# sourceMappingURL=KfArenaInviteWin.js.map