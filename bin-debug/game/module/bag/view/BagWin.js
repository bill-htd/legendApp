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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BagWin = (function (_super) {
    __extends(BagWin, _super);
    function BagWin() {
        var _this = _super.call(this) || this;
        _this.oldIndex = 0;
        _this.skinName = "BagSkin";
        _this.isTopLevel = true;
        return _this;
    }
    BagWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.tab.dataProvider = this.viewStack;
        this.itemList.itemRenderer = ItemBase;
        this.itemListGoods.itemRenderer = ItemBase;
        this.itemListRune.itemRenderer = ItemBase;
        this.itemScroller.viewport = this.itemList;
        this.itemGoodsScroller.viewport = this.itemListGoods;
    };
    BagWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.smeltBtn, this.onClick);
        this.addTouchEvent(this.addBtn, this.onClick);
        this.addChangeEvent(this.tab, this.onClick);
        this.observe(UserBag.ins().postBagWillFull, this.setBagTips);
        this.observe(UserBag.ins().postBagVolAdd, this.setCount);
        this.observe(UserBag.ins().postHasItemCanUse, this.setIsExitUsedItem);
        this.observe(UserBag.ins().postItemCountChange, this.showBagBtnRedPoint);
        this.observe(UserBag.ins().postItemChange, this.updateBag);
        this.observe(UserBag.ins().postItemAdd, this.updateBag);
        this.observe(UserBag.ins().postItemDel, this.updateBag);
        var index = 0;
        if (param[0] != undefined) {
            index = param[0];
            if (index == 3) {
                this.reinComposePanel.open(param[1], param[2], param[3]);
            }
        }
        this.viewStack.selectedIndex = this.tab.selectedIndex = index;
        this.setBagData(index);
        this.setIsExitUsedItem();
        UserBag.ins().postBagVolChange();
        this.showBagBtnRedPoint(UserBag.ins().isChange);
        if (MergeCC.ins().isOpen()) {
            this.openMerge();
        }
        else {
            this.inactiveSamsara();
        }
    };
    BagWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var uiview2 = ViewManager.ins().getView(UIView2);
        if (uiview2)
            uiview2.closeNav(UIView2.NAV_BAG);
    };
    BagWin.prototype.openMerge = function () {
        var index = this.viewStack.getChildIndex(this.reinComposePanel);
        if (index < 0) {
            this.viewStack.addChild(this.reinComposePanel);
        }
        this.tab.dataProvider = this.viewStack;
        this.redPointGroup.horizontalCenter = 37;
        this.redPoint3.visible = MergeCC.ins().redPoint();
    };
    BagWin.prototype.inactiveSamsara = function () {
        var index = this.viewStack.getChildIndex(this.reinComposePanel);
        if (index >= 0) {
            this.viewStack.removeChildAt(index);
        }
        this.tab.dataProvider = this.viewStack;
        this.redPointGroup.horizontalCenter = 98;
        this.redPoint3.visible = false;
    };
    BagWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(BagWin);
                break;
            case this.smeltBtn:
                ViewManager.ins().close(BagWin);
                ViewManager.ins().open(SmeltEquipTotalWin);
                break;
            case this.addBtn:
                var config = GlobalConfig.BagBaseConfig;
                var row = (UserBag.ins().bagNum - config.baseSize) / config.rowSize;
                if (row == CommonUtils.getObjectLength(GlobalConfig.BagExpandConfig)) {
                    UserTips.ins().showTips(StringUtils.addColor("格子不能继续扩张", 0xf3311e));
                }
                else
                    ViewManager.ins().open(BagAddItemWarn);
                break;
            case this.tab:
                if (this.tab.selectedIndex == 3) {
                    this.reinComposePanel.open();
                }
                else if (this.tab.selectedIndex == 2) {
                    this.setBagData(this.tab.selectedIndex);
                }
                else {
                    this.setBagData(this.tab.selectedIndex);
                }
                break;
        }
    };
    BagWin.prototype.setCount = function () {
        this.itemCount.text = UserBag.ins().getBagItemNum() + "/" + UserBag.ins().getMaxBagRoom();
    };
    BagWin.prototype.updateBag = function () {
        this.setBagData(this.oldIndex);
    };
    BagWin.prototype.setBagData = function (tabIndex) {
        if (tabIndex === void 0) { tabIndex = 1; }
        switch (tabIndex) {
            case 0:
                var equipItemData = UserBag.ins().getBagSortQualityEquips(5, 0, 1);
                equipItemData.sort(UserBag.ins().sort3);
                var dataPro = this.itemList.dataProvider;
                if (dataPro) {
                    dataPro.replaceAll(equipItemData);
                }
                else {
                    this.itemList.dataProvider = new eui.ArrayCollection(equipItemData);
                }
                break;
            case 1:
                var goodsList = UserBag.ins().getBagGoodsBySort(0);
                var goodsList2 = UserBag.ins().getBagGoodsBySort(2);
                var goodsList3 = goodsList2.concat(goodsList);
                var goodDataPro = this.itemListGoods.dataProvider;
                if (goodDataPro) {
                    goodDataPro.replaceAll(goodsList3);
                }
                else {
                    this.itemListGoods.dataProvider = new eui.ArrayCollection(goodsList3);
                }
                break;
            case 2:
                var listRune = UserBag.ins().getBagGoodsBySort(1);
                var runeDataPro = this.itemListRune.dataProvider;
                if (runeDataPro) {
                    runeDataPro.replaceAll(listRune);
                }
                else {
                    this.itemListRune.dataProvider = new eui.ArrayCollection(listRune);
                }
                break;
        }
        if (this.oldIndex != tabIndex) {
            this.oldIndex = tabIndex;
        }
        else {
            this.tab.selectedIndex = tabIndex;
        }
        this.setCount();
    };
    BagWin.prototype.setIsExitUsedItem = function () {
        this.redPoint1.visible = UserBag.ins().getIsExitUsedItem() || UserBag.ins().getBagGoodsCountByType(8);
        this.redPoint2.visible = UserBag.ins().getRuneBagGoodsCountByType(8);
        this.redPoint3.visible = MergeCC.ins().isOpen() && MergeCC.ins().redPoint();
    };
    BagWin.prototype.setBagTips = function (result) {
        this.redPoint0.visible = result > 0 || UserBag.ins().isChange > 0;
    };
    BagWin.prototype.showBagBtnRedPoint = function (b) {
        this.redPoint.visible = b > 0;
    };
    __decorate([
        callDelay(100)
    ], BagWin.prototype, "updateBag", null);
    return BagWin;
}(BaseEuiView));
__reflect(BagWin.prototype, "BagWin");
ViewManager.ins().reg(BagWin, LayerManager.UI_Main);
//# sourceMappingURL=BagWin.js.map