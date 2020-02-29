var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HunguData = (function () {
    function HunguData() {
    }
    Object.defineProperty(HunguData.prototype, "items", {
        get: function () {
            if (!this._items) {
                this._items = [];
                for (var i = 0; i < GlobalConfig.HunGuConf.equipCount; i++) {
                    var hgi = new HungguItems();
                    this._items.push(hgi);
                }
            }
            return this._items;
        },
        set: function (its) {
            this._items = its;
        },
        enumerable: true,
        configurable: true
    });
    return HunguData;
}());
__reflect(HunguData.prototype, "HunguData");
var HungguItems = (function () {
    function HungguItems() {
        this.itemId = 0;
        this.hunyu = [];
        for (var i = 0; i < GlobalConfig.HunGuConf.hunyuCount; i++) {
            this.hunyu.push(0);
        }
    }
    return HungguItems;
}());
__reflect(HungguItems.prototype, "HungguItems");
var HGPOS;
(function (HGPOS) {
    HGPOS[HGPOS["ITEM0"] = 0] = "ITEM0";
    HGPOS[HGPOS["ITEM1"] = 1] = "ITEM1";
    HGPOS[HGPOS["ITEM2"] = 2] = "ITEM2";
    HGPOS[HGPOS["ITEM3"] = 3] = "ITEM3";
    HGPOS[HGPOS["ITEM4"] = 4] = "ITEM4";
    HGPOS[HGPOS["ITEM5"] = 5] = "ITEM5";
    HGPOS[HGPOS["ITEM6"] = 6] = "ITEM6";
    HGPOS[HGPOS["ITEM7"] = 7] = "ITEM7";
})(HGPOS || (HGPOS = {}));
//# sourceMappingURL=HunguData.js.map