var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var skillConst = (function () {
    function skillConst() {
    }
    skillConst.baseSkillIndex = [11, 21, 31];
    return skillConst;
}());
__reflect(skillConst.prototype, "skillConst");
var SkillEffNumType;
(function (SkillEffNumType) {
    SkillEffNumType[SkillEffNumType["Single"] = 0] = "Single";
    SkillEffNumType[SkillEffNumType["All"] = 1] = "All";
    SkillEffNumType[SkillEffNumType["NoEff"] = 2] = "NoEff";
    SkillEffNumType[SkillEffNumType["SelfAndTarget"] = 3] = "SelfAndTarget";
})(SkillEffNumType || (SkillEffNumType = {}));
var castType;
(function (castType) {
    castType[castType["Friend"] = 1] = "Friend";
    castType[castType["Other"] = 2] = "Other";
    castType[castType["Self"] = 3] = "Self";
    castType[castType["SelfHpLess"] = 4] = "SelfHpLess";
})(castType || (castType = {}));
//# sourceMappingURL=skillConst.js.map