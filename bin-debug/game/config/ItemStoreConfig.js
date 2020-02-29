var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemStoreConfig = (function () {
    function ItemStoreConfig() {
    }
    ItemStoreConfig.getStoreByItemID = function (id) {
        var arr = GlobalConfig.ItemStoreConfig;
        for (var i in arr) {
            var element = arr[i];
            if (element.itemId == id)
                return element;
        }
        return null;
    };
    return ItemStoreConfig;
}());
__reflect(ItemStoreConfig.prototype, "ItemStoreConfig");
//# sourceMappingURL=ItemStoreConfig.js.map