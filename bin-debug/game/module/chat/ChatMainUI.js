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
var ChatMainUI = (function (_super) {
    __extends(ChatMainUI, _super);
    function ChatMainUI() {
        var _this = _super.call(this) || this;
        _this.resId = ["xlt_98", "xlt_99"];
        _this.fistOpenGuild = true;
        return _this;
    }
    ChatMainUI.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ChatMainSkin";
        this.chatList.itemRenderer = ChatListItemRenderer2;
        this.chatList.itemRendererSkinName = "ChatItemSkin2";
        this.dataList = new eui.ArrayCollection([]);
        this.chatList.dataProvider = this.dataList;
    };
    ChatMainUI.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.message, this.onTap);
        this.addTouchEvent(this.chatList, this.onTap);
        this.observe(Chat.ins().postSysChatMsg, this.getNewNotice);
        this.observe(Chat.ins().postNewChatMsg, this.updateNewChatMsg);
        this.observe(GameLogic.ins().postEnterMap, this.checkShow);
        this.observe(UserTask.ins().postUpdteTaskTrace, this.updateTipShow);
        this.updataList();
        this.updateTipShow();
        this.setChatTipShow(Chat.ins().isShowTip);
        this.checkShow();
    };
    ChatMainUI.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.message:
            case this.chatList: {
                ViewManager.ins().open(ChatWin);
                break;
            }
        }
    };
    ChatMainUI.prototype.getNewNotice = function (msg) {
        if (msg.type == 7) {
            if (!this.chat) {
                this.chat = new ChatTipsView();
                this.chat.y = this.message.y + 12;
                this.chat.x = this.message.x + 50;
            }
            if (!this.chat.parent) {
                this.addChildAt(this.chat, 0);
            }
            this.chat.setData(msg);
        }
        else if (msg.type == 3) {
            this.updataList();
        }
    };
    ChatMainUI.prototype.updateNewChatMsg = function () {
        if (this.fistOpenGuild) {
            this.fistOpenGuild = false;
            if (Guild.ins().guildID) {
                Guild.ins().sendAllGuildMessage();
            }
        }
        this.updataList();
    };
    ChatMainUI.prototype.updataList = function () {
        this.dataList.replaceAll(Chat.ins().chatListTip2.concat());
    };
    ChatMainUI.prototype.checkShow = function () {
        var fbID = GameMap.fubenID;
        this.updataLayer(fbID != 0);
        this.updataList();
    };
    ChatMainUI.prototype.updataLayer = function (value) {
        if (value)
            this.chatGroup.y = 616;
        else
            this.chatGroup.y = 546;
    };
    ChatMainUI.prototype.setChatTipShow = function (value) {
        this.chatList.visible = true;
    };
    ChatMainUI.prototype.updateTipShow = function () {
        var boo = true;
        this.setChatTipShow(boo);
    };
    ChatMainUI.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this, false);
    };
    return ChatMainUI;
}(BaseEuiView));
__reflect(ChatMainUI.prototype, "ChatMainUI");
ViewManager.ins().reg(ChatMainUI, LayerManager.UI_Popup);
//# sourceMappingURL=ChatMainUI.js.map