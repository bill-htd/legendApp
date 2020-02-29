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
var WingSkillItemRender = (function (_super) {
    __extends(WingSkillItemRender, _super);
    function WingSkillItemRender() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.skinName = "WingSkillItemSkin";
        return _this;
    }
    WingSkillItemRender.prototype.dataChanged = function () {
        if (this.data) {
            this.skillIcon.visible = true;
            this.skillIcon.source = this.data + "_png";
            this.blackImg.visible = false;
        }
    };
    return WingSkillItemRender;
}(BaseItemRender));
__reflect(WingSkillItemRender.prototype, "WingSkillItemRender");
//# sourceMappingURL=WingSkillItemRender.js.map