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
var ChatListItemRenderer = (function (_super) {
    __extends(ChatListItemRenderer, _super);
    function ChatListItemRenderer() {
        return _super.call(this) || this;
    }
    ChatListItemRenderer.prototype.dataChanged = function () {
        var _data = null;
        if (this.type)
            this.type.visible = false;
        if (this.data.type == 7) {
            _data = this.data;
        }
        else if (this.data.type == 3) {
            _data = this.data;
        }
        else {
            _data = this.data;
        }
        if (_data.id == Actor.actorID)
            this.currentState = "self";
        else if (this.data.type == 3)
            this.currentState = "sys";
        else
            this.currentState = "other";
        var servStr = KFServerSys.ins().isKF ? "S" + _data.servId : "";
        this.validateNow();
        if (!this.vip) {
            var desc = "";
            var vip = 0;
            var head = void 0;
            var strDesc = void 0;
            if (_data.type == 0 || _data.type == 1 || _data.type == 2) {
                return;
            }
            else if (_data.type == 3) {
                desc = _data.str;
                vip = 0;
                head = "|C:0xDD6717&T:[系统]|";
                strDesc = desc;
            }
            else {
                desc = _data.str;
                vip = _data.vip;
                head = "|C:0x16B2FF&T:[" + _data.name + servStr + "]|";
                strDesc = "|C:0xDFD1B5&T:" + desc + "|";
            }
            this.showHead.textFlow = TextFlowMaker.generateTextFlow(head);
            this.chatVip.visible = vip > 0 ? true : false;
            var vipImgWidth = 0;
            if (vip > 0) {
                vipImgWidth = this.chatVip.width;
                this.chatVip.x = 0;
                this.chatVip.y = 0;
                this.showHead.x = this.chatVip.x + vipImgWidth;
                this.showHead.y + this.chatVip.y;
            }
            else {
                this.showHead.x = 0;
                this.showHead.y = 0;
            }
            this.showText.textFlow = TextFlowMaker.generateTextFlow(strDesc);
            this.showText.x = this.showHead.x + this.showHead.width;
            if (this.showHead.width + vipImgWidth + this.showText.width >= this.textGroup.width) {
                var space = "|C:0xDFD1B5&T:";
                this.showText.text = "";
                for (var i = 1; i <= 200; i++) {
                    space += " ";
                    if (i * 4.5 > this.showHead.width + vipImgWidth)
                        break;
                }
                space += desc + "|";
                this.showText.textFlow = TextFlowMaker.generateTextFlow(space);
                this.showText.x = 0;
                this.showText.width = this.textGroup.width;
                this.showText.height = this.textGroup.height;
            }
            this.showText.y = this.showHead.y;
        }
        else {
            if (!_data.str) {
                return;
            }
            if (_data.type == 3) {
                this.labelName.text = "" + _data.name + servStr;
                this.head.visible = false;
                this.headBg.visible = false;
                this.vipImg.visible = false;
                this.labelTitle.text = "";
                this.showText.textFlow = TextFlowMaker.generateTextFlow(_data.str);
                if (this.type)
                    this.type.visible = true;
            }
            else {
                this.head.visible = true;
                this.headBg.visible = true;
                this.labelName.text = "" + _data.name + servStr;
                this.head.source = "head_" + _data.job + _data.sex;
                this.headBg.source = ChatListItemRenderer.HEAD_BG[_data.sex];
                if (_data.titleId)
                    this.labelTitle.text = GlobalConfig.TitleConf[_data.titleId].name;
                else
                    this.labelTitle.text = "";
                this.vipImg.visible = this.vip.visible = _data.vip != 0;
                this.showText.text = _data.str;
            }
        }
    };
    ChatListItemRenderer.HEAD_BG = ["touxiangkuang0", "touxiangkuang1"];
    return ChatListItemRenderer;
}(BaseItemRender));
__reflect(ChatListItemRenderer.prototype, "ChatListItemRenderer");
//# sourceMappingURL=ChatListItemRenderer.js.map