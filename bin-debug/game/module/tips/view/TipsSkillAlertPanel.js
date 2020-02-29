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
var TipsSkillAlertPanel = (function (_super) {
    __extends(TipsSkillAlertPanel, _super);
    function TipsSkillAlertPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "OrangeEquipNoticeSkin2";
        _this.isUsing = false;
        _this.horizontalCenter = 0;
        return _this;
    }
    Object.defineProperty(TipsSkillAlertPanel.prototype, "data", {
        set: function (skillid) {
            var skillConfig = new SkillData(skillid);
            this.item.setItemImg(skillConfig.icon);
            this.skillName.text = skillConfig.name;
            this.skillName.textColor = ItemBase.QUALITY_COLOR[4];
            this.item.isShowName(false);
            this.item.showNum(false);
        },
        enumerable: true,
        configurable: true
    });
    return TipsSkillAlertPanel;
}(BaseView));
__reflect(TipsSkillAlertPanel.prototype, "TipsSkillAlertPanel");
//# sourceMappingURL=TipsSkillAlertPanel.js.map