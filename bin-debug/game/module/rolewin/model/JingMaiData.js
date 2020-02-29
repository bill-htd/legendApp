var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JingMaiData = (function () {
    function JingMaiData() {
    }
    JingMaiData.prototype.parser = function (bytes) {
        this.level = bytes.readInt();
        this.stage = bytes.readInt();
    };
    JingMaiData.prototype.jingMaiCanUp = function () {
        var stagesConfig = GlobalConfig.JingMaiStageConfig[this.stage];
        if (stagesConfig.stage >= GlobalConfig.JingMaiCommonConfig.stageMax)
            return false;
        var lvConfig = GlobalConfig.JingMaiLevelConfig[this.level];
        var count = UserBag.ins().getBagGoodsCountById(0, lvConfig.itemId);
        return count >= lvConfig.count;
    };
    return JingMaiData;
}());
__reflect(JingMaiData.prototype, "JingMaiData");
//# sourceMappingURL=JingMaiData.js.map