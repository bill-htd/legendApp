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
var RuneReplaceWin = (function (_super) {
    __extends(RuneReplaceWin, _super);
    function RuneReplaceWin() {
        var _this = _super.call(this) || this;
        _this.posIndex = 0;
        _this.roleIndex = 0;
        _this.item = null;
        return _this;
    }
    RuneReplaceWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "RuneEquipChangeSkin";
        this.isTopLevel = true;
        this.list.itemRenderer = RuneReplaceItemRenderer;
        this.myItem = new RuneReplaceItemRenderer();
        this.itemGroup.addChild(this.myItem);
    };
    RuneReplaceWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.posIndex = isNaN(param[0]) ? 0 : param[0];
        this.roleIndex = isNaN(param[1]) ? 0 : param[1];
        this.item = param[2];
        this.runeTypeList = param[3];
        RuneDataMgr.ins().posIsWear = this.item;
        this.myItem.data = new RuneReplaceItemData(this.item);
        this.myItem.setBtnStatu();
        this.addTouchEvent(this.list, this.onListTap);
        this.observe(Rune.ins().postInlayResult, this.onInlayResult);
        this.updateList();
    };
    RuneReplaceWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageCenter.ins().removeAll(this);
        this.list.dataProvider = null;
    };
    RuneReplaceWin.prototype.onListTap = function (e) {
        var _this = this;
        if (e.target.name != "changeBtn") {
            if (e.target.name == "getBtn") {
                ViewManager.ins().open(FbWin, 2);
            }
            return;
        }
        var item = null;
        var rData = this.list.selectedItem;
        if (rData)
            item = rData.data;
        var flag = false;
        if (item && item instanceof ItemData) {
            var itemCfg = GlobalConfig.ItemConfig[item.configID];
            var selectedRuneData = RuneDataMgr.ins().getRune(this.roleIndex, this.posIndex);
            if (selectedRuneData) {
                var selectedRuneCfg = null;
                if (selectedRuneData.configID > 0)
                    selectedRuneCfg = RuneConfigMgr.ins().getBaseCfg(selectedRuneData);
                if (selectedRuneCfg && selectedRuneData.itemConfig &&
                    ItemConfig.getSubType(itemCfg) == ItemConfig.getSubType(selectedRuneData.itemConfig)) {
                }
                else {
                    var rdList = RuneDataMgr.ins().getRoleRune(this.roleIndex);
                    if (rdList) {
                        var tempCfg = null;
                        for (var _i = 0, rdList_1 = rdList; _i < rdList_1.length; _i++) {
                            var v = rdList_1[_i];
                            if (v && v.itemConfig && v.itemConfig.id > 0) {
                                tempCfg = GlobalConfig.ItemConfig[v.configID];
                                if (tempCfg && ItemConfig.getSubType(tempCfg) == ItemConfig.getSubType(itemCfg)) {
                                    flag = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (flag || !Rune.ins().isCanEquip(item.configID, this.roleIndex, this.myItem.getItemId(), this.posIndex)) {
                UserTips.ins().showTips("\u6BCF\u4E2A\u89D2\u8272\u540C\u79CD\u5C5E\u6027\u7684\u6218\u7EB9\u53EA\u80FD\u9576\u5D4C\u4E00\u4E2A");
                return;
            }
            var arrStr = Rune.ins().getMergeRune(item.configID, this.roleIndex, this.item);
            if (arrStr) {
                WarnWin.show(arrStr[0], function () {
                    Rune.ins().sendInlay(_this.roleIndex, _this.posIndex, item.handle);
                }, this);
                return;
            }
            Rune.ins().sendInlay(this.roleIndex, this.posIndex, item.handle);
        }
    };
    RuneReplaceWin.prototype.updateList = function () {
        var itemDataList = UserBag.ins().getBagGoodsByType(6);
        if (itemDataList) {
            var arr1 = [];
            var arr2 = [];
            var curType = this.item && this.item.itemConfig ? ItemConfig.getSubType(this.item.itemConfig) : -1;
            for (var _i = 0, itemDataList_1 = itemDataList; _i < itemDataList_1.length; _i++) {
                var v = itemDataList_1[_i];
                if (v && RuneConfigMgr.ins().getBaseCfg(v)) {
                    var type = ItemConfig.getSubType(v.itemConfig);
                    if (curType == type || this.runeTypeList.indexOf(type) < 0) {
                        if (curType > -1 && this.item.configID == v.configID) {
                        }
                        else {
                            if (Rune.ins().isEquipMerge(v.configID, this.roleIndex, this.posIndex)) {
                                arr2.push(v);
                            }
                            else {
                                arr1.push(v);
                            }
                        }
                    }
                    else {
                        arr2.push(v);
                    }
                }
            }
            arr1.sort(this.sortRunes);
            arr2.sort(this.sortRunes);
            var arr = [].concat(arr1, arr2);
            var tempItem = new ItemData();
            arr.push(tempItem);
            var datas = [];
            for (var i = 0; i < arr.length; i++) {
                var data = new RuneReplaceItemData(arr[i]);
                data.canEquip = false;
                if (i < arr1.length) {
                    data.canEquip = true;
                }
                datas.push(data);
            }
            this.list.dataProvider = new eui.ArrayCollection(datas);
        }
    };
    RuneReplaceWin.prototype.sortRunes = function (a, b) {
        var aq = ItemConfig.getQuality(a.itemConfig);
        var bq = ItemConfig.getQuality(b.itemConfig);
        if (aq > bq)
            return -1;
        if (aq < bq)
            return 1;
        var arbc = RuneConfigMgr.ins().getBaseCfg(a);
        var brbc = RuneConfigMgr.ins().getBaseCfg(b);
        if (arbc && brbc) {
            var lvlA = arbc.id % 100;
            var lvlB = brbc.id % 100;
            if (lvlA > lvlB) {
                return -1;
            }
            else if (lvlA < lvlB) {
                return 1;
            }
        }
        return a.configID - b.configID;
    };
    RuneReplaceWin.prototype.onInlayResult = function (param) {
        if (param[0]) {
            ViewManager.ins().close(RuneReplaceWin);
        }
    };
    return RuneReplaceWin;
}(BaseEuiView));
__reflect(RuneReplaceWin.prototype, "RuneReplaceWin");
ViewManager.ins().reg(RuneReplaceWin, LayerManager.UI_Main);
//# sourceMappingURL=RuneReplaceWin.js.map