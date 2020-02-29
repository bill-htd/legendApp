var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StudySkillNeedItem = (function () {
    function StudySkillNeedItem() {
    }
    StudySkillNeedItem.prototype.setData = function (itemId) {
        var cfg = GlobalConfig.ItemConfig[itemId];
        this.itemIcon.setData(cfg);
        this.nameTxt.text = cfg.name;
    };
    return StudySkillNeedItem;
}());
__reflect(StudySkillNeedItem.prototype, "StudySkillNeedItem");
//# sourceMappingURL=StudySkillNeedItem.js.map