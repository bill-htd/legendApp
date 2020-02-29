var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RingSkillInfo = (function () {
    function RingSkillInfo() {
        this.position = 0;
        this.skillId = 0;
        this.skillLvl = 0;
        this.isOpen = false;
    }
    return RingSkillInfo;
}());
__reflect(RingSkillInfo.prototype, "RingSkillInfo");
//# sourceMappingURL=RingSkillInfo.js.map