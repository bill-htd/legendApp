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
var GodWingComposePanel = (function (_super) {
    __extends(GodWingComposePanel, _super);
    function GodWingComposePanel() {
        return _super.call(this) || this;
    }
    GodWingComposePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.compose, this.onClick);
        this.removeObserve();
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            this.removeTouchEvent(this["item" + i], this.onSlot);
        }
    };
    GodWingComposePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.compose, this.onClick);
        this.addTouchEvent(this.now, this.onClick);
        this.addTouchEndEvent(this.next, this.onClick);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);
        this.observe(GodWingRedPoint.ins().postGodWingCompose, this.updateItem);
        this.slot = 1;
        for (var i in GlobalConfig.GodWingSuitConfig) {
            this.curIndex = GlobalConfig.GodWingSuitConfig[i].lv;
            break;
        }
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            this.addTouchEvent(this["item" + i], this.onSlot);
            this["item" + i].setSelect(false);
        }
        this["item" + 0].setSelect(true);
        this.list.itemRenderer = GodWingComposeItem;
        this.itemList = new eui.ArrayCollection([]);
        this.updateGodWing();
    };
    GodWingComposePanel.prototype.onListTap = function (e) {
        if (e && e.itemRenderer && e.item) {
            var suit = e.item;
            this.curIndex = suit.suitConfig.lv;
            this.updateItem();
        }
    };
    GodWingComposePanel.prototype.onSlot = function (e) {
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            if (e.currentTarget == this["item" + i]) {
                this["item" + i].setSelect(true);
                this.slot = i + 1;
                this.updateItem();
            }
            else {
                this["item" + i].setSelect(false);
            }
        }
    };
    GodWingComposePanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.compose:
                var gwconfig = GlobalConfig.GodWingLevelConfig[this.curIndex][this.slot];
                if (Wing.ins().isComposeGodWingOnly(gwconfig.itemId)) {
                    var glconfig = GlobalConfig.GodWingLevelConfig[this.curIndex][this.slot];
                    Wing.ins().sendWingCompose(2, glconfig.itemId);
                }
                else {
                    UserTips.ins().showTips("|C:0xff0000&T:\u6750\u6599\u4E0D\u8DB3");
                }
                break;
            case this.now:
                var gwConfig = void 0;
                if (e.currentTarget.data instanceof ItemConfig) {
                    var cfg_1 = e.currentTarget.data;
                    var itemdata = UserBag.ins().getBagItemById(cfg_1.id);
                    var count = itemdata ? itemdata.count : 0;
                    ViewManager.ins().open(ItemDetailedWin, 0, cfg_1.id, count);
                }
                else {
                    var cfg_2 = e.currentTarget.data;
                    gwConfig = GlobalConfig.GodWingItemConfig[cfg_2.itemId];
                    ViewManager.ins().open(GodWingTipsWin, gwConfig);
                }
                break;
            case this.next:
                var cfg = e.currentTarget.data;
                gwConfig = GlobalConfig.GodWingItemConfig[cfg.itemId];
                ViewManager.ins().open(GodWingTipsWin, gwConfig);
                break;
        }
    };
    GodWingComposePanel.prototype.updateGodWing = function () {
        this.dataList = [];
        var slot = 1;
        for (var i in GlobalConfig.GodWingSuitConfig) {
            var suitConfig = GlobalConfig.GodWingSuitConfig[i];
            this.dataList.push({ slot: slot, suitConfig: suitConfig });
        }
        this.itemList.replaceAll(this.dataList);
        this.list.dataProvider = this.itemList;
        this.list.validateNow();
        this.list.selectedIndex = 0;
        this.updateItem();
    };
    GodWingComposePanel.prototype.updateItem = function () {
        var glconfig = GlobalConfig.GodWingLevelConfig[this.curIndex][this.slot];
        var mysum = 0;
        var totalsum = 0;
        this["power0"].visible = this["attr0"].visible = false;
        if (glconfig) {
            this.next.data = glconfig;
            this.next.setCountVisible(false);
            var gwconfig = GlobalConfig.GodWingItemConfig[glconfig.itemId];
            gwconfig = GlobalConfig.GodWingItemConfig[gwconfig.composeItem.id];
            if (!gwconfig) {
                gwconfig = GlobalConfig.GodWingItemConfig[glconfig.itemId];
                var itemconfig = GlobalConfig.ItemConfig[gwconfig.composeItem.id];
                this.now.data = itemconfig;
                this.now.setCountVisible(false);
                var attrtext = AttributeData.getAttStr(gwconfig.attr, 0, 1, "：") + "\n";
                attrtext += AttributeData.getExAttrNameByAttrbute(gwconfig.exattr[0], true);
                this["attr0"].text = attrtext;
                var power0 = Math.floor(UserBag.getAttrPower(gwconfig.attr));
                this["power0"].text = "\u6218\u6597\u529B\uFF1A" + (power0 + gwconfig.exPower);
                var itemdata = UserBag.ins().getBagItemById(itemconfig.id);
                mysum = itemdata ? itemdata.count : 0;
                totalsum = gwconfig.composeItem.count;
                this["power0"].visible = this["attr0"].visible = true;
            }
            else {
                var prelevel = Wing.ins().getPreLevel(this.curIndex);
                var preconfig = GlobalConfig.GodWingLevelConfig[prelevel][this.slot];
                this.now.data = preconfig;
                this.now.setCountVisible(false);
                var pregwconfig = GlobalConfig.GodWingItemConfig[preconfig.itemId];
                var preattrtext = AttributeData.getAttStr(pregwconfig.attr, 0, 1, "：") + "\n";
                preattrtext += AttributeData.getExAttrNameByAttrbute(pregwconfig.exattr[0], true);
                this["attr1"].text = preattrtext;
                var power1 = Math.floor(UserBag.getAttrPower(pregwconfig.attr));
                this["power1"].text = "\u6218\u6597\u529B\uFF1A" + (power1 + pregwconfig.exPower);
                gwconfig = GlobalConfig.GodWingItemConfig[glconfig.itemId];
                var attrtext = AttributeData.getAttStr(gwconfig.attr, 0, 1, "：") + "\n";
                attrtext += AttributeData.getExAttrNameByAttrbute(gwconfig.exattr[0], true);
                this["attr2"].text = attrtext;
                var power2 = Math.floor(UserBag.getAttrPower(gwconfig.attr));
                this["power2"].text = "\u6218\u6597\u529B\uFF1A" + (power2 + gwconfig.exPower);
                var itemdata = UserBag.ins().getBagItemById(gwconfig.composeItem.id);
                mysum = itemdata ? itemdata.count : 0;
                totalsum = gwconfig.composeItem.count;
            }
        }
        this["attr1"].visible = this["attr2"].visible = !this["attr0"].visible;
        this["power1"].visible = this["power2"].visible = !this["power0"].visible;
        var colorStr;
        if (mysum >= totalsum)
            colorStr = ColorUtil.GREEN;
        else
            colorStr = ColorUtil.RED;
        this.number.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + mysum + "|/|C:0xD1C28F&T:" + totalsum);
        for (var i = 0; i < this.dataList.length; i++) {
            this.dataList[i].slot = this.slot;
        }
        this.itemList.replaceAll(this.dataList);
        this.list.dataProvider = this.itemList;
        this.updateRedPoint();
        this.updateGodWingItem();
    };
    GodWingComposePanel.prototype.updateGodWingItem = function () {
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            var glconfig = GlobalConfig.GodWingLevelConfig[this.curIndex][i + 1];
            var config = GlobalConfig.GodWingItemConfig[glconfig.itemId];
            this["item" + i].data = config;
            this["item" + i].setImgIcon("sybg" + (i + 1));
            this["item" + i].setCountVisible(false);
            this["item" + i].setNameVisible(false);
        }
    };
    GodWingComposePanel.prototype.updateRedPoint = function () {
        var gwconfig = GlobalConfig.GodWingLevelConfig[this.curIndex][this.slot];
        this.redPoint.visible = Wing.ins().isComposeGodWingOnly(gwconfig.itemId);
        for (var i = 0; i < this.list.numElements; i++) {
            var render = this.list.getVirtualElementAt(i);
            var slotdata = this.list.dataProvider.getItemAt(i);
            var b = Wing.ins().isComposeGodWingLevel(slotdata.suitConfig.lv, this.slot);
            render.setRedPoint(b);
        }
        for (var i = 1; i <= Wing.GodWingMaxSlot; i++) {
            var b = Wing.ins().isComposeGodWingSlot(this.curIndex, i);
            this["item" + (i - 1)].updateRedPoint(b);
        }
    };
    return GodWingComposePanel;
}(BaseView));
__reflect(GodWingComposePanel.prototype, "GodWingComposePanel");
//# sourceMappingURL=GodWingComposePanel.js.map