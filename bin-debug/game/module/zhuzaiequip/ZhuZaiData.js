var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZhuZaiData = (function () {
    function ZhuZaiData() {
    }
    ZhuZaiData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.rank = bytes.readShort();
        this.growupID = bytes.readInt();
    };
    Object.defineProperty(ZhuZaiData.prototype, "lv", {
        get: function () {
            return this.rank * GlobalConfig.EquipPointConstConfig.rankGrowUp + this.growupID;
        },
        enumerable: true,
        configurable: true
    });
    ZhuZaiData.prototype.isMaxLevel = function () {
        var nextConfig = GlobalConfig.EquipPointGrowUpConfig[this.id][this.lv + 1];
        return nextConfig ? false : true;
    };
    ZhuZaiData.prototype.canLevelup = function () {
        var config = GlobalConfig.EquipPointGrowUpConfig[this.id][this.lv];
        var itemID = config.growUpItem.id;
        var needZs = config.needLevel / 1000 >> 0;
        var needLv = config.needLevel % 1000;
        if (this.isMaxLevel() || (needZs && UserZs.ins().lv < needZs) || (Actor.level < needLv)) {
            return false;
        }
        if (UserBag.ins().getBagGoodsCountById(0, itemID) < config.growUpItem.count) {
            return false;
        }
        return true;
    };
    ZhuZaiData.prototype.canAdvance = function () {
        var config = GlobalConfig.EquipPointRankConfig[this.id][this.rank];
        if (!this.lv || !config)
            return false;
        var itemID = config.rankUpItem.id;
        if (UserBag.ins().getBagGoodsCountById(0, itemID) < config.rankUpItem.count) {
            return false;
        }
        return true;
    };
    return ZhuZaiData;
}());
__reflect(ZhuZaiData.prototype, "ZhuZaiData");
//# sourceMappingURL=ZhuZaiData.js.map