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
var BreakDownListview = (function (_super) {
    __extends(BreakDownListview, _super);
    function BreakDownListview() {
        return _super.call(this) || this;
    }
    BreakDownListview.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "BreakDownSkin";
        this.isTopLevel = true;
        this.equipList.itemRenderer = BreakDownItemRenderer;
        this.listData = new eui.ArrayCollection();
        this.equipList.dataProvider = this.listData;
        this.gainList.itemRenderer = GainGoodsItem;
        this.goList = new eui.ArrayCollection();
        this.gainList.dataProvider = this.goList;
    };
    BreakDownListview.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(UserBag.ins().postItemDel, this.updateData);
        this.addTouchEvent(this, this.onTap);
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGo, this);
        this.quality = param[0];
        this.updateData();
    };
    BreakDownListview.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this, this.onTap);
        this.gainList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGo, this);
        this.removeObserve();
    };
    BreakDownListview.prototype.updateData = function () {
        var itemData = UserBag.ins().getBagEquipsByQuality(this.quality);
        itemData.sort(function (n1, n2) {
            var config1 = GlobalConfig.ItemConfig[n1.configID];
            var config2 = GlobalConfig.ItemConfig[n2.configID];
            if (config1.zsLevel > config2.zsLevel) {
                return 1;
            }
            if (config1.zsLevel < config2.zsLevel) {
                return -1;
            }
            if (config1.level > config2.level) {
                return 1;
            }
            if (config1.level < config2.level) {
                return -1;
            }
            return 0;
        });
        this.listData.source = itemData;
        var dataList = this.itemList[this.quality];
        var dataNum = dataList.length;
        this.goList.removeAll();
        for (var i = 0; i < dataList.length; i++) {
            this.goList.addItem(dataList[i]);
        }
        this.refushPos(dataNum);
    };
    BreakDownListview.prototype.refushPos = function (len) {
        this.contrain.height = 60 * len;
        this.equipScroller.height = 310 + 60 * (3 - len);
    };
    BreakDownListview.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn0:
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            default:
                if (e.target instanceof eui.Button) {
                    switch (e.target.name) {
                        case "breakDown":
                            UserEquip.ins().sendSmeltEquip(1, [e.target.parent["data"]]);
                            break;
                    }
                }
        }
    };
    BreakDownListview.prototype.onGo = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            GameGuider.guidance(item[1], item[2]);
            ViewManager.ins().close(this);
        }
    };
    return BreakDownListview;
}(BaseEuiView));
__reflect(BreakDownListview.prototype, "BreakDownListview");
ViewManager.ins().reg(BreakDownListview, LayerManager.UI_Popup);
//# sourceMappingURL=BreakDownListview.js.map