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
var HeirloomDownView = (function (_super) {
    __extends(HeirloomDownView, _super);
    function HeirloomDownView() {
        var _this = _super.call(this) || this;
        _this.skinName = "heirloomDownSkin";
        _this.isTopLevel = true;
        return _this;
    }
    HeirloomDownView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.listData = new eui.ArrayCollection();
        this.equipList.itemRenderer = HeirloomDownItemRenderer;
        this.equipList.dataProvider = this.listData;
        this.gainList.itemRenderer = GainGoodsItem;
        this.goList = new eui.ArrayCollection();
        this.gainList.dataProvider = this.goList;
    };
    HeirloomDownView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(UserBag.ins().postItemDel, this.updateData);
        this.observe(UserBag.ins().postItemCountChange, this.updateData);
        this.observe(UserBag.ins().postUseItemSuccess, this.updateData);
        this.addTouchEvent(this, this.onTap);
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGo, this);
        this.curInfo = param[0];
        this.updateData();
    };
    HeirloomDownView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this, this.onTap);
        this.gainList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGo, this);
        this.removeObserve();
    };
    HeirloomDownView.prototype.getHeirloomSource = function () {
        var itemData = UserBag.ins().getBagEquipsByQuality(5, UserBag.BAG_DESC_TYPE_HEIR, UserBag.BAG_TYPE_OTHTER);
        for (var i = 0; i < itemData.length; i++) {
            itemData[i].isSuggest = true;
            for (var j = 0; j < 3; j++) {
                var role = SubRoles.ins().getSubRoleByIndex(j);
                if (!role)
                    break;
                var config = GlobalConfig.HeirloomEquipItemConfig;
                var isBreak = false;
                for (var k in config) {
                    if (config[k].item == itemData[i]._configID) {
                        var slot = config[k].pos;
                        var info = role.heirloom.getInfoBySolt(slot - 1);
                        if (info && info.lv > 0) {
                            isBreak = false;
                        }
                        else {
                            itemData[i].isSuggest = false;
                            isBreak = true;
                        }
                        break;
                    }
                }
                if (isBreak)
                    break;
            }
        }
        itemData.sort(function (n1, n2) {
            var config1 = GlobalConfig.ItemConfig[n1.configID];
            var config2 = GlobalConfig.ItemConfig[n2.configID];
            if (n1.isSuggest == true && n2.isSuggest == false) {
                return 1;
            }
            if (n1.isSuggest == false && n2.isSuggest == true) {
                return -1;
            }
            if (config1.id < config2.id) {
                return 1;
            }
            if (config1.id > config2.id) {
                return -1;
            }
            return 0;
        });
        return itemData;
    };
    HeirloomDownView.prototype.getHeirloomGoSource = function () {
        if (this.itemList) {
            return this.itemList;
        }
        var item = UserBag.ins().getBagItemById(200141);
        var gainConfig;
        if (!item) {
            if (!this.curInfo)
                return this.itemList;
            var expendId = 0;
            if (this.curInfo.expend) {
                expendId = this.curInfo.expend.id;
            }
            else {
                expendId = GlobalConfig.HeirloomEquipConfig[this.curInfo.slot][this.curInfo.lv - 1].expend.id;
            }
            gainConfig = GlobalConfig.GainItemConfig[expendId];
        }
        else {
            gainConfig = GlobalConfig.GainItemConfig[item._configID];
        }
        if (gainConfig) {
            this.gainList.dataProvider = new eui.ArrayCollection(gainConfig.gainWay);
            this.itemList = gainConfig.gainWay;
        }
        else {
            this.gainList.dataProvider = new eui.ArrayCollection([]);
            this.itemList = [];
        }
        return this.itemList;
    };
    HeirloomDownView.prototype.updateData = function () {
        var source, goList;
        source = this.getHeirloomSource();
        goList = this.getHeirloomGoSource();
        goList = goList ? goList : [];
        this.listData.source = source;
        this.goList.source = goList;
        var dataNum = goList.length;
        this.refushPos(dataNum);
    };
    HeirloomDownView.prototype.refushPos = function (len) {
        this.contrain.height = 60 * len;
        this.equipScroller.height = 310 + 60 * (3 - len);
    };
    HeirloomDownView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            default:
                if (e.target instanceof eui.Button) {
                    switch (e.target.name) {
                        case "breakDown":
                            this.onHandler(e.target.parent["data"]);
                            break;
                    }
                }
        }
    };
    HeirloomDownView.prototype.onHandler = function (data) {
        var itemData = [data];
        for (var i = 0; i < itemData.length; i++) {
            if (itemData[i]) {
                if (UserBag.ins().sendUseItem(itemData[i]._configID, itemData[i].count)) {
                    break;
                }
            }
        }
    };
    HeirloomDownView.prototype.onGo = function (e) {
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
    return HeirloomDownView;
}(BaseEuiView));
__reflect(HeirloomDownView.prototype, "HeirloomDownView");
ViewManager.ins().reg(HeirloomDownView, LayerManager.UI_Popup);
//# sourceMappingURL=HeirloomDownView.js.map