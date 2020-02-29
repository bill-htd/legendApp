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
var ChatListItemRenderer2 = (function (_super) {
    __extends(ChatListItemRenderer2, _super);
    function ChatListItemRenderer2() {
        return _super.call(this) || this;
    }
    ChatListItemRenderer2.prototype.dataChanged = function () {
        var _data = this.data;
        var maxWidth = 0;
        if (this.$parent) {
        }
        var channel = "";
        var desc = "";
        var vip = 0;
        if (_data instanceof GuildMessageInfo) {
            channel = "|C:0xDD6717&T:[行会]|";
            desc = _data.content;
            vip = _data.vipLevel;
        }
        else if (_data instanceof ChatSystemData) {
            channel = "|C:0xDD6717&T:[系统]|";
            desc = _data.str;
        }
        else {
            var world = Chat.ins().getWorldStr();
            channel = "|C:0xDD6717&T:[" + world + "]|";
            desc = _data.str;
            vip = _data.vip;
        }
        this.showChannel.textFlow = TextFlowMaker.generateTextFlow(channel);
        this.showHead.text = "";
        if (_data.name) {
            var head = "|C:0x16B2FF&T:[" + _data.name + "]|";
            this.showHead.textFlow = TextFlowMaker.generateTextFlow(head);
        }
        this.chatVip.visible = vip > 0 ? true : false;
        var vipImgWidth = 0;
        if (vip > 0) {
            this.chatVip.x = this.showChannel.width;
            this.chatVip.y = this.showChannel.y;
            vipImgWidth = this.chatVip.width;
        }
        this.showHead.x = this.showChannel.x + this.showChannel.width + vipImgWidth;
        this.showHead.y + this.showChannel.y;
        var strDesc = "|C:0xDFD1B5&T:" + desc + "|";
        this.showText.textFlow = TextFlowMaker.generateTextFlow(strDesc);
        this.showText.y = this.showHead.y;
        this.showText.width = undefined;
        this.validateNow();
        if (this.showChannel.width + vipImgWidth + this.showHead.width + this.showText.textWidth > (maxWidth || this.textGroup.width)) {
            var tH = this.showText.height;
            this.showText.width = (maxWidth || this.textGroup.width) - this.showChannel.width - vipImgWidth - this.showHead.width;
            this.showText.height = tH;
        }
        this.showText.x = this.showChannel.x + this.showChannel.width + vipImgWidth + this.showHead.width;
    };
    return ChatListItemRenderer2;
}(BaseItemRender));
__reflect(ChatListItemRenderer2.prototype, "ChatListItemRenderer2");
//# sourceMappingURL=ChatListItemRenderer2.js.map