var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectsConfig = (function () {
    function EffectsConfig() {
    }
    EffectsConfig.isAddBuff = function (config) {
        return config.type == SkillEffType.AdditionalState ||
            config.type == SkillEffType.AdditionalDamage ||
            config.type == SkillEffType.AdditionalAttributes ||
            config.type == SkillEffType.Summon;
    };
    return EffectsConfig;
}());
__reflect(EffectsConfig.prototype, "EffectsConfig");
//# sourceMappingURL=EffectsConfig.js.map