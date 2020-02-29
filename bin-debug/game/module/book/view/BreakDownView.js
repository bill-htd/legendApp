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
var BreakDownView = (function (_super) {
    __extends(BreakDownView, _super);
    function BreakDownView() {
        var _this = _super.call(this) || this;
        _this._addExp = [];
        _this.skinName = "BreakDownSkin";
        _this.isTopLevel = true;
        _this.listData = new eui.ArrayCollection();
        _this.equipList.itemRenderer = BreakDownItemRenderer;
        _this.equipList.dataProvider = _this.listData;
        _this.gainList.itemRenderer = GainGoodsItem;
        _this.goList = new eui.ArrayCollection();
        _this.gainList.dataProvider = _this.goList;
        return _this;
    }
    BreakDownView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(UserBag.ins().postItemDel, this.updateData);
        this.observe(UserBag.ins().postItemCountChange, this.updateData);
        this.observe(Book.ins().postDataChange, this.showExp);
        this.addTouchEvent(this, this.onTap);
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onGo, this);
        this._breakType = param[0] || 0;
        this._ext = param[1];
        this.updateData();
    };
    BreakDownView.prototype.close = function () {
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
    Object.defineProperty(BreakDownView, "fitleEquip", {
        get: function () {
            if (!BreakDownView._fitleEquip) {
                BreakDownView._fitleEquip = {};
                for (var k in GlobalConfig.SpecialEquipsConfig) {
                    if (GlobalConfig.SpecialEquipsConfig[k].style == FitleStyle.fj)
                        BreakDownView._fitleEquip[GlobalConfig.SpecialEquipsConfig[k].id] = GlobalConfig.SpecialEquipsConfig[k];
                }
            }
            return BreakDownView._fitleEquip;
        },
        enumerable: true,
        configurable: true
    });
    BreakDownView.prototype.getLegendSource = function () {
        var itemData = [];
        if (this._ext == 4) {
            var totalItemData = UserBag.ins().getBagEquipsByQuality(4);
            for (var i = 0; i < totalItemData.length; i++) {
                if (!BreakDownView.fitleEquip[totalItemData[i].configID]) {
                    itemData.push(totalItemData[i]);
                }
            }
        }
        else {
            itemData = UserBag.ins().getBagEquipsByQuality(5);
        }
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
        return itemData;
    };
    BreakDownView.prototype.getBookSource = function () {
        var itemData = UserBag.ins().getBagGoodsByType(this._ext);
        itemData.sort(function (n1, n2) {
            var n1q = ItemConfig.getQuality(n1.itemConfig);
            var n2q = ItemConfig.getQuality(n2.itemConfig);
            if (n1q < n2q) {
                return -1;
            }
            else if (n1q > n2q) {
                return 1;
            }
            return n1.configID - n2.configID;
        });
        var itemArr = [];
        var listBook = Book.ins().itemBook;
        var noActDic = {};
        for (var itemId in listBook) {
            for (var _i = 0, _a = listBook[itemId]; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.getState() != BookState.haveOpen) {
                    noActDic[itemId] = true;
                    break;
                }
            }
        }
        for (var _b = 0, itemData_1 = itemData; _b < itemData_1.length; _b++) {
            var item = itemData_1[_b];
            if (noActDic[item.configID]) {
                continue;
            }
            var data = new ItemData();
            data.count = 1;
            data.handle = item.handle;
            data.configID = item.configID;
            for (var i = 0; i < item.count; i++) {
                itemArr.push(data);
            }
        }
        return itemArr;
    };
    BreakDownView.prototype.getLegendGoSource = function () {
        if (this.itemList) {
            return this.itemList;
        }
        var data1 = new GainWay();
        data1[0] = "获得神装：寻宝";
        data1[1] = egret.getQualifiedClassName(TreasureHuntWin);
        data1[2] = 0;
        var data2 = new GainWay();
        data2[0] = "获得神装：全民BOSS";
        data2[1] = egret.getQualifiedClassName(BossWin);
        data2[2] = 1;
        var data3 = new GainWay();
        data3[0] = "获得神装：挑战副本";
        data3[1] = egret.getQualifiedClassName(FbWin);
        data3[2] = 2;
        var data4 = new GainWay();
        data4[0] = "获得神装：寻宝";
        data4[1] = egret.getQualifiedClassName(TreasureHuntWin);
        data4[2] = 0;
        var list = [[], [], [], [], [data1, data2], [data4]];
        this.itemList = list[this._ext];
        return this.itemList;
    };
    BreakDownView.prototype.getBookGoSource = function () {
        return [];
    };
    BreakDownView.prototype.updateData = function () {
        var source, goList;
        if (this._breakType == BreakDownView.type_legend) {
            source = this.getLegendSource();
            goList = this.getLegendGoSource();
        }
        else if (this._breakType == BreakDownView.type_book) {
            source = this.getBookSource();
            goList = this.getBookGoSource();
        }
        this.listData.source = source;
        this.goList.source = goList;
        var dataNum = goList.length;
        this.refushPos(dataNum);
    };
    BreakDownView.prototype.showExp = function () {
        var exp = this._addExp.pop();
        if (exp) {
        }
    };
    BreakDownView.prototype.refushPos = function (len) {
        this.contrain.height = 60 * len;
        this.equipScroller.height = 310 + 60 * (3 - len);
    };
    BreakDownView.prototype.onTap = function (e) {
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
                            this.onHandler(e.target.parent["data"]);
                            break;
                    }
                }
        }
    };
    BreakDownView.prototype.onHandler = function (data) {
        if (this._breakType == BreakDownView.type_legend) {
            UserEquip.ins().sendSmeltEquip(1, [data]);
        }
        else if (this._breakType == BreakDownView.type_book) {
            var config = Book.ins().getDecomposeConfigByItemId(data.itemConfig.id);
            Book.ins().sendDecompose([[config.id, data.count]]);
            this._addExp.push(config.value);
        }
    };
    BreakDownView.prototype.onGo = function (e) {
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
    BreakDownView.type_legend = 1;
    BreakDownView.type_book = 2;
    return BreakDownView;
}(BaseEuiView));
__reflect(BreakDownView.prototype, "BreakDownView");
ViewManager.ins().reg(BreakDownView, LayerManager.UI_Popup);
//# sourceMappingURL=BreakDownView.js.map