var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZhanLingData = (function () {
    function ZhanLingData(id) {
        this._id = id ? id : 0;
        this._level = 0;
        this._exp = 0;
        this._items = [];
        for (var i = 0; i < GlobalConfig.ZhanLingConfig.equipPosCount; i++) {
            this._items.push(0);
        }
        this._talentLv = 0;
        this._drugs = [];
        for (var i in GlobalConfig.ZhanLingConfig.upgradeInfo) {
            this._drugs.push({ itemId: Number(i), count: 0 });
        }
    }
    Object.defineProperty(ZhanLingData.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhanLingData.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhanLingData.prototype, "exp", {
        get: function () {
            return this._exp;
        },
        set: function (value) {
            this._exp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhanLingData.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhanLingData.prototype, "talentLv", {
        get: function () {
            return this._talentLv;
        },
        set: function (value) {
            this._talentLv = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhanLingData.prototype, "drugs", {
        get: function () {
            return this._drugs;
        },
        set: function (value) {
            this._drugs = value;
        },
        enumerable: true,
        configurable: true
    });
    return ZhanLingData;
}());
__reflect(ZhanLingData.prototype, "ZhanLingData");
var ZLPOS;
(function (ZLPOS) {
    ZLPOS[ZLPOS["ITEM1"] = 1] = "ITEM1";
    ZLPOS[ZLPOS["ITEM2"] = 2] = "ITEM2";
    ZLPOS[ZLPOS["ITEM3"] = 3] = "ITEM3";
    ZLPOS[ZLPOS["ITEM4"] = 4] = "ITEM4";
})(ZLPOS || (ZLPOS = {}));
//# sourceMappingURL=ZhanLingData.js.map