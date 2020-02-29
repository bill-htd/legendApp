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
var ItemBaseStore = (function (_super) {
    __extends(ItemBaseStore, _super);
    function ItemBaseStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemBaseStore.prototype.onClick = function () {
        var uuid = this.data.handle;
        UserBag.ins().sendGetGoodsByStore(uuid);
    };
    return ItemBaseStore;
}(ItemBase));
__reflect(ItemBaseStore.prototype, "ItemBaseStore");
var TreasureStorePanel = (function (_super) {
    __extends(TreasureStorePanel, _super);
    function TreasureStorePanel() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    TreasureStorePanel.prototype.childrenCreated = function () {
        this.init();
    };
    TreasureStorePanel.prototype.init = function () {
        this.skinName = "TreasureStore";
        this.list.itemRenderer = ItemBaseStore;
        this.listScroller.viewport = this.list;
    };
    TreasureStorePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = param[0];
        this.addTouchEvent(this.get, this.getGoods);
        this.observe(UserBag.ins().postHuntStore, this.updateData);
        this.updateData();
    };
    TreasureStorePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.get, this.getGoods);
        this.removeObserve();
    };
    TreasureStorePanel.prototype.updateData = function () {
        var datas = UserBag.ins().getHuntGoodsBySort(this.type);
        this.list.dataProvider = new eui.ArrayCollection(datas);
    };
    TreasureStorePanel.prototype.getGoods = function (e) {
        if (this.list.dataProvider.length > 0) {
            UserBag.ins().sendGetGoodsByStore(this.type);
        }
    };
    return TreasureStorePanel;
}(BaseEuiView));
__reflect(TreasureStorePanel.prototype, "TreasureStorePanel");
ViewManager.ins().reg(TreasureStorePanel, LayerManager.UI_Main);
//# sourceMappingURL=TreasureStorePanel.js.map