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
var AssistantHeadItemRender = (function (_super) {
    __extends(AssistantHeadItemRender, _super);
    function AssistantHeadItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "assistantHeadSkin";
        return _this;
    }
    AssistantHeadItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    AssistantHeadItemRender.prototype.dataChanged = function () {
        this.Name.text = this.data.vo.roleName;
        this.imgBg.source = ChatListItemRenderer.HEAD_BG[this.data.vo.sex];
        this.imgHead.source = "head_" + this.data.vo.job + this.data.vo.sex;
        this.charm.text = "\u9B45\u529B\u503C +" + GlobalConfig.TeamFuBenConfig[this.data.id].chiv;
    };
    return AssistantHeadItemRender;
}(BaseItemRender));
__reflect(AssistantHeadItemRender.prototype, "AssistantHeadItemRender");
//# sourceMappingURL=AssistantHeadItemRender.js.map