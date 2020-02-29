var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EntityFilter;
(function (EntityFilter) {
    EntityFilter[EntityFilter["no"] = 0] = "no";
    EntityFilter[EntityFilter["hard"] = 1] = "hard";
    EntityFilter[EntityFilter["poison"] = 2] = "poison";
})(EntityFilter || (EntityFilter = {}));
var EntityFilterUtil = (function () {
    function EntityFilterUtil() {
    }
    EntityFilterUtil.getEntityFilter = function (groupID) {
        var filter = EntityFilter.no;
        if (EntityFilterUtil.isHard(groupID)) {
            filter = EntityFilter.hard;
        }
        else if (EntityFilterUtil.isPoison(groupID)) {
            filter = EntityFilter.poison;
        }
        return filter;
    };
    EntityFilterUtil.isHard = function (groupID) {
        return groupID == 51001 || groupID == 150065;
    };
    EntityFilterUtil.isPoison = function (groupID) {
        return groupID == 23001 || groupID == 61001 || groupID == 150071;
    };
    EntityFilterUtil.buffFilter = {
        1: {
            filters: FilterUtil.ARRAY_GRAY_FILTER,
        },
        2: {
            filters: FilterUtil.ARRAY_GREEN_FILTER,
        }
    };
    return EntityFilterUtil;
}());
__reflect(EntityFilterUtil.prototype, "EntityFilterUtil");
//# sourceMappingURL=EntityFilterUtil.js.map