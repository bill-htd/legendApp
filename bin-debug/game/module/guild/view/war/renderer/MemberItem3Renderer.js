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
var MemberItem3Renderer = (function (_super) {
    __extends(MemberItem3Renderer, _super);
    function MemberItem3Renderer() {
        var _this = _super.call(this) || this;
        _this.chooseNum = 1;
        _this.skinName = "MemberItem3Skin";
        return _this;
    }
    MemberItem3Renderer.prototype.dataChanged = function () {
        if (this.data instanceof SelectInfoData) {
            var info = this.data;
            this.job.textFlow = new egret.HtmlTextParser().parser("[" + GuildLanguage.guildOffice[info.data.office] + "]");
            this.nameLable.text = info.data.name;
            this.payNum.text = "" + info.num;
            this.attr.text = "" + info.data.attack;
            this.face.source = "head_" + info.data.job + info.data.sex;
            this.headBg.source = "touxiangkuang" + info.data.sex;
        }
        this.checkBoxs.selected = false;
        this.btn1.visible = this.btn2.visible = this.num1.visible = this.inputBg.visible = false;
    };
    return MemberItem3Renderer;
}(BaseItemRender));
__reflect(MemberItem3Renderer.prototype, "MemberItem3Renderer");
//# sourceMappingURL=MemberItem3Renderer.js.map