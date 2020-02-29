var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shop = (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super.call(this) || this;
        _this.shopData = new ShopData();
        _this.sysId = PackageID.Shop;
        _this.regNetMsg(1, _this.postUpdateShopData);
        _this.regNetMsg(2, _this.postBuyResult);
        _this.regNetMsg(3, _this.postBuyCount);
        _this.regNetMsg(4, _this.refreshGoodsSuccess);
        _this.regNetMsg(5, _this.postRefreshIntegrationSucc);
        _this.regNetMsg(6, _this.updateMedalMessage);
        _this.regNetMsg(7, _this.postUpdateBuyMedal);
        return _this;
    }
    Shop.ins = function () {
        return _super.ins.call(this);
    };
    Shop.prototype.sendBuy = function (shopType, arr) {
        var bytes = this.getBytes(2);
        bytes.writeInt(shopType);
        bytes.writeInt(arr.length);
        this.shopBuyArr = [];
        for (var i = 0; i < arr.length; i++) {
            bytes.writeInt(arr[i][0]);
            bytes.writeInt(arr[i][1]);
            var isc = GlobalConfig.ItemStoreConfig[arr[i][0]];
            if (isc && isc.itemId == ItemConst.GOLD_BRICK) {
                var tmp = { id: ItemConst.GOLD_BRICK, count: arr[i][1] };
                this.shopBuyArr.push(tmp);
            }
        }
        this.sendToServer(bytes);
    };
    Shop.prototype.sendRefreshShop = function () {
        var bytes = this.getBytes(3);
        this.sendToServer(bytes);
    };
    Shop.prototype.postUpdateShopData = function (bytes) {
        Shop.ins().shopData.parser(bytes);
    };
    Shop.prototype.postBuyResult = function (bytes) {
        var result = bytes.readInt();
        return result;
    };
    Shop.prototype.postBuyCount = function (bytes) {
        Shop.ins().shopData.parserBuyCount(bytes);
    };
    Shop.prototype.refreshGoodsSuccess = function (bytes) {
        this.postRefreshGoodsSuccess(true);
    };
    Shop.prototype.postRefreshGoodsSuccess = function (bo) {
        return bo;
    };
    Shop.prototype.postRefreshIntegrationSucc = function (bytes) {
        var result = bytes.readBoolean();
        var num = bytes.readInt();
        return [result, Shop.ins().shopData.point];
    };
    Shop.prototype.sendIntegrationShop = function (index) {
        var bytes = this.getBytes(5);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    Shop.prototype.sendMedalMessage = function () {
        var bytes = this.getBytes(6);
        this.sendToServer(bytes);
    };
    Shop.prototype.updateMedalMessage = function (bytes) {
        var len = bytes.readInt();
        this.medalData = new FeatsStoreData(len, bytes);
        Shop.ins().postRefresMedalMessage();
    };
    Shop.prototype.postRefresMedalMessage = function () {
    };
    Shop.prototype.sendBuyMedal = function (id, num) {
        var bytes = this.getBytes(7);
        bytes.writeInt(id);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    };
    Shop.prototype.postUpdateBuyMedal = function (bytes) {
        var _index = bytes.readInt();
        var _exchangeCount = bytes.readInt();
        return [_index, _exchangeCount];
    };
    Shop.openBuyGoldWin = function (showTips) {
        if (showTips === void 0) { showTips = true; }
        var goodsId = Shop.ins().shopData.getGoodsIdByItemId(200164);
        if (Shop.ins().shopData.checkBuyGoodsId(goodsId, showTips)) {
            ViewManager.ins().open(BuyWin, goodsId);
            return true;
        }
        return false;
    };
    return Shop;
}(BaseSystem));
__reflect(Shop.prototype, "Shop");
var ShopData = (function () {
    function ShopData() {
        this.shopEquipData = [];
        this.hadBuyCount = [];
    }
    Object.defineProperty(ShopData.prototype, "refushTime", {
        get: function () {
            return this._refushTime;
        },
        set: function (value) {
            this._refushTime = value;
            TimerManager.ins().removeAll(this);
            if (value > 0) {
                TimerManager.ins().doTimer(1000, value, this.enterTime, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ShopData.prototype.parser = function (bytes) {
        this.shopEquipData.length = 0;
        this.refushTime = bytes.readInt();
        this.point = bytes.readInt();
        this.times = bytes.readInt();
        var num = bytes.readInt();
        for (var i = 0; i < num; i++) {
            var s = new ShopEquipData;
            s.parser(bytes);
            this.shopEquipData.push(s);
        }
    };
    ShopData.prototype.parserBuyCount = function (bytes) {
        var count = bytes.readShort();
        this.hadBuyCount.length = 0;
        for (var i = 0; i < count; i++) {
            var data = new ShopHadBuyData();
            data.parser(bytes);
            this.hadBuyCount.push(data);
        }
    };
    ShopData.prototype.enterTime = function () {
        if (this._refushTime <= 0)
            this._refushTime = 0;
        else
            this._refushTime--;
    };
    ShopData.prototype.getHadBuyCountItem = function (itemId) {
        for (var _i = 0, _a = this.hadBuyCount; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.itemId == itemId) {
                return item;
            }
        }
        return null;
    };
    ShopData.prototype.getHadBuyCount = function (itemId) {
        var item = this.getHadBuyCountItem(itemId);
        if (item)
            return item.count;
        return 0;
    };
    ShopData.prototype.getShopEquipDataLength = function () {
        var result = 0;
        if (this.shopEquipData != null) {
            result = this.shopEquipData.length;
        }
        return result;
    };
    ShopData.prototype.getShopEquipDataByIndex = function (index) {
        var result = null;
        if (this.shopEquipData != null) {
            if (index >= 0 && index < this.shopEquipData.length) {
                result = this.shopEquipData[index];
            }
        }
        return result;
    };
    ShopData.prototype.getShopEquipDataById = function (id) {
        for (var _i = 0, _a = this.shopEquipData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == id) {
                return item;
            }
        }
        return null;
    };
    ShopData.prototype.checkBuyGoodsId = function (goodsId, showTips) {
        if (showTips === void 0) { showTips = true; }
        var shopItem = GlobalConfig.ItemStoreConfig[goodsId];
        if (shopItem) {
            if (shopItem.viplv && UserVip.ins().lv < shopItem.viplv) {
                if (showTips)
                    UserTips.ins().showTips("VIP" + shopItem.viplv + "\u53EF\u8D2D\u4E70");
                return false;
            }
            if (shopItem.vipLimit) {
                var total = shopItem.vipLimit[UserVip.ins().lv];
                var buyCount = this.getHadBuyCount(shopItem.itemId);
                if (buyCount >= total) {
                    if (showTips)
                        UserTips.ins().showTips("\u4ECA\u65E5\u8D2D\u4E70\u6B21\u6570\u5DF2\u7528\u5B8C");
                    return false;
                }
            }
        }
        return true;
    };
    ShopData.prototype.getGoodsIdByItemId = function (itemId) {
        for (var goodsId in GlobalConfig.ItemStoreConfig) {
            if (GlobalConfig.ItemStoreConfig[goodsId].itemId == itemId) {
                return parseInt(goodsId);
            }
        }
        return 0;
    };
    return ShopData;
}());
__reflect(ShopData.prototype, "ShopData");
var ShopEquipData = (function () {
    function ShopEquipData() {
    }
    ShopEquipData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.costType = bytes.readInt();
        this.costNum = bytes.readInt();
        this.discountType = bytes.readInt();
        this.item = new ItemData;
        this.item.parser(bytes);
    };
    ShopEquipData.discountDic = {
        0: {
            discount: 1,
            res: ""
        },
        1: {
            discount: 0.8,
            res: "shangzk8"
        },
        2: {
            discount: 0.5,
            res: "shangzk5"
        }
    };
    return ShopEquipData;
}());
__reflect(ShopEquipData.prototype, "ShopEquipData");
var ShopHadBuyData = (function () {
    function ShopHadBuyData() {
    }
    ShopHadBuyData.prototype.parser = function (bytes) {
        this.itemId = bytes.readInt();
        this.count = bytes.readInt();
    };
    return ShopHadBuyData;
}());
__reflect(ShopHadBuyData.prototype, "ShopHadBuyData");
var GameSystem;
(function (GameSystem) {
    GameSystem.shop = Shop.ins.bind(Shop);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Shop.js.map