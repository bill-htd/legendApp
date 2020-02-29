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
var GodWingTransferPanel = (function (_super) {
    __extends(GodWingTransferPanel, _super);
    function GodWingTransferPanel() {
        return _super.call(this) || this;
    }
    GodWingTransferPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.transfer, this.onClick);
        this.removeTouchEvent(this.have, this.onListTap);
        this.removeTouchEvent(this.item0, this.onClick);
        this.removeObserve();
        this.reset();
        for (var i = 1; i < Wing.GodWingMaxSlot; i++) {
            this.removeTouchEvent(this["item" + i], this.onTouchItem);
        }
    };
    GodWingTransferPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.transfer, this.onClick);
        this.addTouchEvent(this.have, this.onListTap);
        this.addTouchEvent(this.item0, this.onClick);
        this.observe(UserBag.ins().postItemAdd, this.callbackUpdate);
        this.itemList = new eui.ArrayCollection();
        this.have.itemRenderer = GodWingItem;
        this.have.dataProvider = new eui.ArrayCollection([]);
        this.updateGodWing();
    };
    GodWingTransferPanel.prototype.reset = function () {
        for (var i = 1; i < Wing.GodWingMaxSlot; i++) {
            this.addTouchEvent(this["item" + i], this.onTouchItem);
            this["item" + i].setCountVisible(false);
            this["item" + i].setNameVisible(false);
            this["item" + i].setImgIcon("");
            this["item" + i].setSelect(false);
            this["item" + i].data = null;
        }
        this.item0.setCountVisible(false);
        this.item0.setImgIcon("");
        this.item0.setNameVisible(false);
        this["item0"].data = null;
        this.updateBagList();
        this.warn.visible = this.itemList.length ? false : true;
        this.curItemId = 0;
        this.desId = 0;
    };
    GodWingTransferPanel.prototype.updateBagList = function () {
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_16);
        this.itemList.replaceAll(itemData);
        this.have.dataProvider = this.itemList;
    };
    GodWingTransferPanel.prototype.callbackUpdate = function () {
        if (!this["item0"].itemId)
            return;
        var item = UserBag.ins().getBagItemById(this["item0"].itemId);
        if (!item) {
            this.reset();
        }
        this.updateBagList();
        this.updateCost();
    };
    GodWingTransferPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.transfer:
                if (Boolean(UserBag.ins().getBagGoodsByType(ItemType.TYPE_16))) {
                    if (this["item0"].itemId && this.desId)
                        Wing.ins().sendResetGodWing(this["item0"].itemId, this.desId);
                    else
                        UserTips.ins().showTips("\u8BF7\u786E\u8BA4\u8F6C\u6362\u6E90\u548C\u8F6C\u6362\u76EE\u6807");
                }
                else {
                    UserTips.ins().showTips("\u4E0D\u53EF\u8F6C\u6362");
                }
                break;
            case this.item0:
                if (this.curItemId) {
                    var config = GlobalConfig.GodWingItemConfig[this.curItemId];
                    ViewManager.ins().open(GodWingTipsWin, config);
                }
                break;
        }
    };
    GodWingTransferPanel.prototype.onTouchItem = function (e) {
        for (var i = 1; i < Wing.GodWingMaxSlot; i++) {
            if (e.currentTarget == this["item" + i]) {
                if (e.currentTarget.itemId) {
                    this.desId = e.currentTarget.itemId;
                    this["item" + i].setSelect(true);
                }
            }
            else {
                this["item" + i].setSelect(false);
            }
        }
    };
    GodWingTransferPanel.prototype.onListTap = function (e) {
        if (e && e.currentTarget && this.have.selectedItem) {
            var itemdata = this.have.selectedItem;
            this.curItemId = itemdata._configID;
            var gwConfig = GlobalConfig.GodWingItemConfig[itemdata._configID];
            var cfg = GlobalConfig.GodWingLevelConfig[gwConfig.level];
            this["item0"].data = gwConfig;
            this.item0.setNameVisible(true);
            var itemcfg = GlobalConfig.ItemConfig[itemdata._configID];
            this["item0"].setImgIcon(itemcfg.icon + "_png");
            var idx = 1;
            for (var i in cfg) {
                if (cfg[i].slot != gwConfig.slot) {
                    this["item" + idx].data = GlobalConfig.GodWingItemConfig[cfg[i].itemId];
                    this["item" + idx].setNameVisible(true);
                    this["item" + idx].setSelect(false);
                    idx++;
                    if (idx > 3)
                        break;
                }
            }
            this.updateCost();
        }
    };
    GodWingTransferPanel.prototype.updateGodWing = function () {
        this.reset();
        this.updateCost();
    };
    GodWingTransferPanel.prototype.updateCost = function () {
        if (!this.curItemId) {
            this.costImg0.visible = this.cost.visible = false;
            return;
        }
        this.costImg0.visible = this.cost.visible = true;
        var config = GlobalConfig.GodWingItemConfig[this.curItemId];
        this.cost.text = config.needMoney + "";
    };
    GodWingTransferPanel.prototype.updateRedPoint = function () {
    };
    return GodWingTransferPanel;
}(BaseView));
__reflect(GodWingTransferPanel.prototype, "GodWingTransferPanel");
//# sourceMappingURL=GodWingTransferPanel.js.map