var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FeatsStoreData = (function () {
    function FeatsStoreData(len, bytes) {
        this.exchangeCount = [];
        var _index;
        var _exchangeCount;
        for (var i = 0; i < len; i++) {
            _index = bytes.readInt();
            _exchangeCount = bytes.readInt();
            this.exchangeCount[_index] = _exchangeCount;
        }
    }
    FeatsStoreData.prototype.checkHonorBuy = function (id) {
        var feats = GlobalConfig.FeatsStore[id];
        if (Actor.chip < feats.costMoney.count)
            return false;
        switch (feats.buyType) {
            case FEATS_TYPE.day:
                if (this.exchangeCount[feats.index - 1] >= feats.daycount) {
                    return true;
                }
                break;
            case FEATS_TYPE.infinite:
                return true;
            case FEATS_TYPE.forever:
                if (this.exchangeCount[feats.index - 1] >= feats.daycount) {
                    return true;
                }
                break;
        }
        return false;
    };
    FeatsStoreData.prototype.checkHonorRedPoint = function () {
        for (var i in GlobalConfig.FeatsStore) {
            var b = this.checkHonorBuy(GlobalConfig.FeatsStore[i].goods[0].id);
            if (b)
                return true;
        }
        return false;
    };
    return FeatsStoreData;
}());
__reflect(FeatsStoreData.prototype, "FeatsStoreData");
var FEATS_TYPE;
(function (FEATS_TYPE) {
    FEATS_TYPE[FEATS_TYPE["day"] = 1] = "day";
    FEATS_TYPE[FEATS_TYPE["infinite"] = 2] = "infinite";
    FEATS_TYPE[FEATS_TYPE["forever"] = 3] = "forever";
})(FEATS_TYPE || (FEATS_TYPE = {}));
var FEATS_SHOP_TYPE;
(function (FEATS_SHOP_TYPE) {
    FEATS_SHOP_TYPE[FEATS_SHOP_TYPE["Money"] = 1] = "Money";
    FEATS_SHOP_TYPE[FEATS_SHOP_TYPE["Item"] = 2] = "Item";
})(FEATS_SHOP_TYPE || (FEATS_SHOP_TYPE = {}));
//# sourceMappingURL=FeatsStoreData.js.map