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
var ChatWin = (function (_super) {
    __extends(ChatWin, _super);
    function ChatWin() {
        var _this = _super.call(this) || this;
        _this.cruIndex = 0;
        _this.dataList = new eui.ArrayCollection();
        _this.fistOpenGuild = true;
        _this.isStretch = false;
        _this.isTopLevel = true;
        return _this;
    }
    ChatWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ChatSkin";
        this.defaultText = "点击输入咨询内容";
        this.chatInput.maxChars = 30;
        this.input.maxChars = 100;
        this.tabData = new eui.ArrayCollection();
        this.tab.dataProvider = this.tabData;
        this.chatList.touchEnabled = false;
    };
    ChatWin.prototype.refTab = function () {
        var world = Chat.ins().getWorldStr();
        var arr = ["综合", world, "行会", "系统"];
        if (LocationProperty.appid != PlatFormID.GE_TUI)
            arr.push("客服");
        this.tabData.replaceAll(arr);
    };
    ChatWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.input.text.length == 0) {
            this.input.text = this.defaultText;
            this.input.textColor = 0x6C6C6C;
        }
        else
            this.input.textColor = 0xDFD1B5;
        this.addTouchEvent(this.chatList, this.onListTap);
        this.addTouchEvent(this.upBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.sendBtn, this.onTap);
        this.addTouchEvent(this.allReceiveBtn, this.onTap);
        this.observe(Chat.ins().postNewChatMsg, this.getNewOne);
        this.chatInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.textInOn, this);
        this.observe(Chat.ins().postSendInfoSuccess, this.textInOn);
        this.addChangeEvent(this.tab, this.selectIndexChange);
        this.addChangingEvent(this.tab, this.checkIsOpen);
        this.addTouchEvent(this.sendBtn0, this.onTap);
        this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.updateInput, this);
        this.observe(Guild.ins().postGetNewGuildMessage, this.getNewOneGuild);
        this.observe(Guild.ins().postAllGuildMessage, this.updataList);
        this.observe(UserMail.ins().postMailDetail, this.setOpenMail);
        this.observe(UserMail.ins().postMailData, this.onSendMail);
        this.observe(Guild.ins().postQuitGuild, this.updateMsgRedPoint);
        this.observe(GameLogic.ins().postEnterMap, this.updateMsgRedPoint);
        this.addTouchEvent(this.chatList, this.onSendMail);
        if (this.cruIndex == 2 && !Guild.ins().guildID) {
            this.cruIndex = 0;
        }
        else if (this.cruIndex > 2) {
            this.cruIndex = 0;
        }
        this.refTab();
        this.backSelect(this.cruIndex);
        this.selectIndexChange(null);
        this.addDataProviderEvent();
    };
    ChatWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.chatInput.removeEventListener(egret.FocusEvent.FOCUS_IN, this.textInOn, this);
        this.input.removeEventListener(egret.FocusEvent.FOCUS_IN, this.updateInput, this);
        WatcherUtil.removeFromArrayCollection(Chat.ins().chatListData);
        WatcherUtil.removeFromArrayCollection(Guild.ins().guildMessageInfoData);
        WatcherUtil.removeFromArrayCollection(Chat.ins().systemListData);
        this.removeDataProviderEvent();
        WatcherUtil.removeFromArrayCollection(this.tab.dataProvider);
        this.chatList.dataProvider = null;
    };
    ChatWin.prototype.destoryView = function () {
    };
    ChatWin.prototype.addDataProviderEvent = function () {
        if (this.chatList.dataProvider) {
            this.chatList.dataProvider.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.listDataChange, this);
        }
    };
    ChatWin.prototype.removeDataProviderEvent = function () {
        if (this.chatList.dataProvider) {
            this.chatList.dataProvider.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.listDataChange, this);
        }
    };
    ChatWin.prototype.updateInput = function () {
        if (this.input.text == this.defaultText) {
            this.input.text = "";
            this.input.textColor = 0xDFD1B5;
        }
    };
    ChatWin.prototype.checkIsOpen = function (e) {
        var tab = e.target;
        if (tab.selectedIndex == 2 && !Guild.ins().guildID) {
            UserTips.ins().showTips("请先加入公会");
            e.preventDefault();
            return;
        }
    };
    ChatWin.prototype.selectIndexChange = function (e) {
        this.oldChangle = this.cruIndex;
        this.cruIndex = this.tab.selectedIndex;
        this.updataList(true);
        if (this.cruIndex == 2 && this.fistOpenGuild) {
            this.fistOpenGuild = false;
            Guild.ins().sendAllGuildMessage();
        }
    };
    ChatWin.prototype.backSelect = function (id) {
        this.tab.selectedIndex = id;
    };
    ChatWin.prototype.onSendMail = function (e) {
        if (!e)
            return;
        if (this.cruIndex == 5) {
            var item = e.target.parent;
            if (item) {
                var mailData = item.data;
                if (mailData) {
                    UserMail.ins().sendMailContentData(mailData.handle);
                }
            }
        }
    };
    ChatWin.prototype.setOpenMail = function (mailData) {
        if (this.cruIndex == 5) {
            for (var i = 0; i < this.chatList.numChildren; i++) {
                var item = this.chatList.getChildAt(i);
                if (item.data.handle == mailData.handle) {
                    item.data = mailData;
                    break;
                }
            }
        }
    };
    ChatWin.prototype.updataList = function (barChange) {
        if (barChange === void 0) { barChange = false; }
        switch (this.cruIndex) {
            case 0:
                this.currentState = 'all';
                this.removeDataProviderEvent();
                this.chatList.dataProvider = null;
                this.chatList.itemRenderer = ChatListItemRenderer3;
                this.chatList.dataProvider = Chat.ins().chatListData2;
                this.chatList.itemRendererSkinName = "ChatItemSkin3";
                this.addDataProviderEvent();
                break;
            case 1:
                this.currentState = 'world';
                this.removeDataProviderEvent();
                this.chatList.dataProvider = null;
                this.chatList.itemRendererSkinName = "ChatItemSkin";
                this.chatList.dataProvider = Chat.ins().chatListData;
                this.chatList.itemRenderer = ChatListItemRenderer;
                this.addDataProviderEvent();
                break;
            case 2:
                this.currentState = 'guild';
                this.removeDataProviderEvent();
                this.chatList.dataProvider = null;
                this.chatList.itemRendererSkinName = "ChatGuildItemSkin";
                this.chatList.itemRenderer = ChatGuildItemRender;
                this.chatList.dataProvider = Guild.ins().guildMessageInfoData;
                this.addDataProviderEvent();
                break;
            case 3:
                this.currentState = 'sys';
                this.removeDataProviderEvent();
                this.chatList.itemRenderer = ChatSystemItemRenderer;
                this.chatList.dataProvider = Chat.ins().systemListData;
                this.addDataProviderEvent();
                break;
            case 4:
                this.currentState = 'customService';
                this.removeDataProviderEvent();
                break;
        }
        this.listDataChange();
        this.updateMsgRedPoint();
    };
    ChatWin.prototype.updateMsgRedPoint = function () {
        if (KFServerSys.ins().isKF) {
            this.redPoint2.visible = false;
            return;
        }
        if (this.tab.selectedIndex == 2) {
            Guild.ins().hasNewMsg = false;
        }
        this.redPoint2.visible = Guild.ins().hasNewMsg;
    };
    ChatWin.prototype.getNewOne = function (msg) {
        if (Friends.ins().indexOfBlackList(msg.id) != -1)
            return;
        this.refushBar();
        this.updateMsgRedPoint();
    };
    ChatWin.prototype.getNewOneGuild = function (msg) {
        if (Friends.ins().indexOfBlackList(msg.id) != -1)
            return;
        this.refushBar();
    };
    ChatWin.prototype.listDataChange = function () {
        if (this.cruIndex != 4) {
            if (this.cruIndex == 5)
                this.refushBarListTop();
            else
                this.refushBar();
        }
    };
    ChatWin.prototype.refushBar = function () {
        TimerManager.ins().doTimer(100, 1, this.refushBarList, this);
    };
    ChatWin.prototype.refushBarList = function () {
        this.barList.viewport.validateNow();
        if (this.barList.viewport.contentHeight > this.barList.height) {
            this.barList.viewport.scrollV = this.barList.viewport.contentHeight - this.barList.height;
        }
    };
    ChatWin.prototype.refushBarListTop = function () {
        this.barList.viewport.scrollV = 0;
    };
    ChatWin.prototype.textInOn = function () {
        this.chatInput.text = "";
    };
    ChatWin.prototype.callBack = function () {
        this.input.text = "";
    };
    ChatWin.prototype.setStretchWin = function () {
        if (this.isStretch) {
            this.isStretch = false;
            this.upBtn.scaleY = 1;
            this.winGroup.height = ChatWin.LITTLE_HEIGHT;
        }
        else {
            this.isStretch = true;
            this.upBtn.scaleY = -1;
            this.winGroup.height = ChatWin.BIG_HEIGHT;
        }
        this.updataList();
    };
    ChatWin.prototype.allReceiveMail = function () {
        var list = [];
        var mailList = UserMail.ins().getMailByReceive();
        for (var i = 0; i < mailList.length; i++) {
            list.push(mailList[i].handle);
        }
        UserMail.ins().sendGetItem(list);
    };
    ChatWin.prototype.onListTap = function () {
        var selectedItem = this.chatList.selectedItem;
        if (selectedItem && (selectedItem instanceof ChatInfoData || selectedItem instanceof GuildMessageInfo || selectedItem instanceof ChatSystemData)) {
            if (selectedItem instanceof ChatSystemData) {
                var str = selectedItem.str;
                if (str && str.indexOf("|E:") >= 0) {
                    this.onLink(str);
                    return;
                }
            }
            if (selectedItem.lv != undefined)
                ViewManager.ins().open(PlayerTipsWin, selectedItem);
        }
    };
    ChatWin.prototype.onLink = function (str) {
        var index = str.indexOf("|E:");
        str = str.slice(index + 3, Number.MAX_VALUE);
        var list;
        if (str.indexOf(",") >= 0)
            list = str.split(",");
        else if (str.indexOf("*") >= 0)
            list = str.split("*");
        if (!list || list.length <= 0)
            return;
        switch (list[0]) {
            case "1":
                UserFb.ins().sendEnterTFRoom(+list[1]);
                break;
            case "2":
                KfArenaSys.ins().sendJoinTeam(+list[1]);
                break;
        }
    };
    ChatWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.upBtn:
                this.setStretchWin();
                this.refushBar();
                break;
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.sendBtn:
                if (this.chatInput.text.indexOf("@") > -1) {
                    GameLogic.ins().sendGMCommad(this.chatInput.text);
                    if (this.chatInput.text == "@version") {
                        WarnWin.show(Version.BUILD_NUMBER, null, this, null, null, "sure");
                    }
                    else if (this.chatInput.text == "@player") {
                        PlayerAttrManager.ins().getAttr();
                    }
                    return;
                }
                if (this.cruIndex != 2 && !OpenSystem.ins().checkSysOpen(SystemType.CHAT)) {
                    UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.CHAT));
                    return;
                }
                if (!Chat.ins().canSpeak) {
                    UserTips.ins().showTips("|C:0xf3311e&T:发言次数过快|");
                    return;
                }
                if (this.chatInput.text == "点击输入聊天内容") {
                    UserTips.ins().showTips("|C:0xf3311e&T:请输入聊天内容|");
                    return;
                }
                Chat.ins().startInterval();
                if (this.cruIndex == 2) {
                    Guild.ins().sendGuildMessage(this.chatInput.text);
                    this.chatInput.text = "";
                }
                else {
                    if (this.chatInput.text.indexOf("@") > -1) {
                        GameLogic.ins().sendGMCommad(this.chatInput.text);
                        if (this.chatInput.text == "@version") {
                            WarnWin.show(Version.BUILD_NUMBER, null, this, null, null, "sure");
                        }
                        else if (this.chatInput.text == "@player") {
                            PlayerAttrManager.ins().getAttr();
                        }
                        return;
                    }
                    if (Chat.ins().checkRepeatString(this.chatInput.text)) {
                        Chat.ins().sendChatInfo(7, this.chatInput.text);
                        Chat.ins().UpSpeak = this.chatInput.text;
                        this.chatInput.text = "";
                    }
                }
                break;
            case this.sendBtn0:
                if (this.input.text.length == 0 || this.input.text == this.defaultText) {
                    UserTips.ins().showTips("内容不能为空");
                    return;
                }
                if (this.input.text.indexOf("@") > -1) {
                    GameLogic.ins().sendGMCommad(this.input.text);
                    return;
                }
                if (this.input.text.indexOf("$") > -1) {
                    var rmb = parseInt(this.input.text.slice(1));
                    return;
                }
                ReportData.getIns().advice(this.input.text, this.callBack, this);
                break;
        }
    };
    ChatWin.BIG_HEIGHT = 850;
    ChatWin.LITTLE_HEIGHT = 370;
    return ChatWin;
}(BaseEuiView));
__reflect(ChatWin.prototype, "ChatWin");
ViewManager.ins().reg(ChatWin, LayerManager.UI_Popup);
//# sourceMappingURL=ChatWin.js.map