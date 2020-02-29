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
var HunguChooseEquipWin = (function (_super) {
    __extends(HunguChooseEquipWin, _super);
    function HunguChooseEquipWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        _this.pos = 0;
        _this.roleSelect = 0;
        return _this;
    }
    HunguChooseEquipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "hunguChooseSkin";
        this.list.itemRenderer = HunguEquipChooseItem;
    };
    HunguChooseEquipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(Hungu.ins().postHunguItems, this.HunguItemsCallback);
        this.roleSelect = param[0];
        this.pos = param[1];
        var itemId = 0;
        this.itemGroup.visible = false;
        if (Hungu.ins().hunguData[this.roleSelect]) {
            this.itemGroup.visible = true;
            itemId = Hungu.ins().hunguData[this.roleSelect].items[this.pos].itemId;
            if (itemId) {
                this.scroll.y = 160;
                this.scroll.height = 410;
                this.wearItem = new HunguEquipChooseItem();
                this.itemGroup.addChild(this.wearItem);
                this.wearItem.data = { id: itemId, roleId: this.roleSelect };
                this.wearItem.setWearVisible(true);
            }
        }
        this.itemList = this.getHunguItemList(this.roleSelect, this.pos);
        this.list.dataProvider = new eui.ArrayCollection(this.itemList);
        this.list.validateNow();
    };
    HunguChooseEquipWin.prototype.HunguItemsCallback = function () {
        ViewManager.ins().close(this);
    };
    HunguChooseEquipWin.prototype.getHunguItemList = function (roleId, pos) {
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_24);
        var list = [];
        for (var i = 0; i < itemData.length; i++) {
            var slot = Hungu.ins().getHunguItemsPos(itemData[i].itemConfig.id);
            if (slot == pos)
                list.push({ id: itemData[i].configID, roleId: this.roleSelect });
        }
        list.sort(function (a, b) {
            var aequip = GlobalConfig.HunGuEquip[a.id];
            var bequip = GlobalConfig.HunGuEquip[b.id];
            if (aequip.stage > bequip.stage)
                return -1;
            else
                return 1;
        });
        return list;
    };
    HunguChooseEquipWin.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    return HunguChooseEquipWin;
}(BaseEuiView));
__reflect(HunguChooseEquipWin.prototype, "HunguChooseEquipWin");
ViewManager.ins().reg(HunguChooseEquipWin, LayerManager.UI_Popup);
//# sourceMappingURL=HunguChooseEquipWin.js.map