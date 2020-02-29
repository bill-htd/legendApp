var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MonstersConfig = (function () {
    function MonstersConfig() {
        this.attrange = 0;
        this.wanderrange = 0;
        this.dirNum = 2;
    }
    return MonstersConfig;
}());
__reflect(MonstersConfig.prototype, "MonstersConfig");
var MonsterType;
(function (MonsterType) {
    MonsterType[MonsterType["Monster"] = 0] = "Monster";
    MonsterType[MonsterType["Boss"] = 1] = "Boss";
    MonsterType[MonsterType["Summon"] = 3] = "Summon";
    MonsterType[MonsterType["Ring"] = 4] = "Ring";
})(MonsterType || (MonsterType = {}));
//# sourceMappingURL=MonstersConfig.js.map