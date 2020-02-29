var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImbaSkillReviseConfig = (function () {
    function ImbaSkillReviseConfig() {
        this.id = 0;
        this.skill = 0;
        this.imba_id = 0;
        this.a = 0;
        this.b = 0;
        this.cd = 0;
        this.d = 0;
        this.crit = 0;
        this.affectCount = 0;
        this.selfEff = [];
        this.targetEff = [];
        this.args = {};
    }
    return ImbaSkillReviseConfig;
}());
__reflect(ImbaSkillReviseConfig.prototype, "ImbaSkillReviseConfig");
//# sourceMappingURL=ImbaSkillReviseConfig.js.map