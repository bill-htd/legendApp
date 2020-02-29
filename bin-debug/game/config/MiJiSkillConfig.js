var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MiJiSkillConfig = (function () {
    function MiJiSkillConfig() {
    }
    MiJiSkillConfig.getSkillIDByItem = function (itemID) {
        var arr = GlobalConfig.MiJiSkillConfig;
        for (var i in arr) {
            if (arr[i].item == itemID)
                return arr[i].id;
        }
        return -1;
    };
    return MiJiSkillConfig;
}());
__reflect(MiJiSkillConfig.prototype, "MiJiSkillConfig");
//# sourceMappingURL=MiJiSkillConfig.js.map