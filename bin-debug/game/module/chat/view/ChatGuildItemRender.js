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
var ChatGuildItemRender = (function (_super) {
    __extends(ChatGuildItemRender, _super);
    function ChatGuildItemRender() {
        return _super.call(this) || this;
    }
    ChatGuildItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildMessageInfo) {
            var _data = this.data;
            if (_data.type != 1)
                this.currentState = "sys";
            else if (_data.roleId == Actor.actorID)
                this.currentState = "self";
            else
                this.currentState = "other";
            var info = this.data;
            this.validateNow();
            if (this.vip && _data.type == 1) {
                this.vip.removeChildren();
                this.head.source = "head_" + _data.job + _data.sex;
                this.headBg.source = ChatListItemRenderer.HEAD_BG[_data.sex];
                if (_data.titleId)
                    this.labelTitle.text = GlobalConfig.TitleConf[_data.titleId].name;
                else
                    this.labelTitle.text = "";
                this.labelName.text = _data.name;
                this.vipImg.visible = this.vip.visible = _data.vipLevel != 0;
                this.showText.text = info.content;
            }
            else {
                if (info.type == 1) {
                    if (this.showChannel)
                        this.showChannel.visible = info.office ? true : false;
                    if (info.office) {
                        var channel = "|C:0x" + GuildLanguage.guildOfficeColor[info.office] + "&T:[" + GuildLanguage.guildOffice[info.office] + "]|";
                        this.showChannel.textFlow = TextFlowMaker.generateTextFlow(channel);
                    }
                    else {
                        this.showChannel.text = "";
                    }
                    if (this.chatVip)
                        this.chatVip.visible = info.vipLevel > 0 ? true : false;
                    var vipImgWidth = 0;
                    if (info.vipLevel > 0) {
                        this.chatVip.x = this.showChannel.width;
                        this.chatVip.y = this.showChannel.y;
                        vipImgWidth = this.chatVip.width;
                    }
                    if (this.showHead)
                        this.showHead.visible = info.name ? true : false;
                    if (info.name) {
                        var head = "|C:0x16B2FF&T:[" + info.name + "]|";
                        this.showHead.textFlow = TextFlowMaker.generateTextFlow(head);
                        if (!info.office) {
                            this.showHead.x = vipImgWidth;
                            this.showHead.y = 0;
                        }
                        else {
                            this.showHead.x = this.showChannel.x + this.showChannel.width + vipImgWidth;
                            this.showHead.y + this.showChannel.y;
                        }
                    }
                    var strDesc = "|C:0xDFD1B5&T:" + info.content + "|";
                    this.showText.textFlow = TextFlowMaker.generateTextFlow(strDesc);
                    this.showText.x = this.showHead ? (this.showHead.x + this.showHead.width) : 0;
                    if (this.showChannel && this.showChannel.width + this.showHead.width + vipImgWidth + this.showText.width >= this.textGroup.width) {
                        var space = "|C:0xDFD1B5&T:";
                        this.showText.text = "";
                        for (var i = 1; i <= 200; i++) {
                            space += " ";
                            if (i * 4.5 > this.showChannel.width + this.showHead.width + vipImgWidth)
                                break;
                        }
                        space += info.content + "|";
                        this.showText.textFlow = TextFlowMaker.generateTextFlow(space);
                        this.showText.x = 0;
                        this.showText.width = this.textGroup.width;
                        this.showText.height = this.textGroup.height;
                    }
                    this.showText.y = this.showHead ? this.showHead.y : 0;
                }
                else {
                    var str = "|C:0xDFD1B5&T:" + info.content + "|";
                    this.showText.textFlow = TextFlowMaker.generateTextFlow(str);
                    this.showText.x = 0;
                    this.showText.y = 0;
                    if (this.showChannel)
                        this.showChannel.visible = false;
                    if (this.chatVip)
                        this.chatVip.visible = false;
                    if (this.showHead)
                        this.showHead.visible = false;
                }
            }
        }
    };
    return ChatGuildItemRender;
}(BaseItemRender));
__reflect(ChatGuildItemRender.prototype, "ChatGuildItemRender");
//# sourceMappingURL=ChatGuildItemRender.js.map