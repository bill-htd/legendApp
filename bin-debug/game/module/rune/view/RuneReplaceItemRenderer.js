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
var RuneReplaceItemRenderer = (function (_super) {
    __extends(RuneReplaceItemRenderer, _super);
    function RuneReplaceItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "RuneEquipChangeSkinItem";
        _this.changeBtn.name = "changeBtn";
        _this.changeBtn0.name = "changeBtn";
        _this.getBtn.name = "getBtn";
        return _this;
    }
    RuneReplaceItemRenderer.prototype.dataChanged = function () {
        var curData = this.data;
        var itemData = curData.data;
        this.currentState = "all";
        this.validateNow();
        if (itemData && itemData instanceof ItemData) {
            if (itemData.configID) {
                var rbc = RuneConfigMgr.ins().getBaseCfg(itemData);
                if (rbc) {
                    this.itemIcon.showName(false);
                    this.itemIcon.setData(itemData);
                    var itemCfg = GlobalConfig.ItemConfig[itemData.itemConfig.id];
                    var nameCfg = GlobalConfig.RuneNameConfig[ItemConfig.getSubType(itemCfg)];
                    this.runeName.textFlow = TextFlowMaker.generateTextFlow("|C:" + ItemConfig.getQualityColor(itemCfg) + "&T:" + nameCfg.runeName + "Lv." + itemCfg.id % 100);
                    this.back.text = "\u56DE\u6536\u53EF\u5F97" + rbc.gain + "\u7CBE\u534E";
                    this.attr.text = RuneConfigMgr.ins().getcfgAttrDesc(rbc);
                    this.changeBtn.visible = curData.canEquip && RuneDataMgr.ins().posIsWear;
                    this.changeBtn0.visible = curData.canEquip && !RuneDataMgr.ins().posIsWear;
                    this.now.visible = !curData.canEquip && RuneDataMgr.ins().posIsWear && RuneDataMgr.ins().posIsWear.configID == itemData.configID;
                    this.already.visible = !curData.canEquip && (RuneDataMgr.ins().posIsWear != itemData);
                    if (!this.already.visible) {
                        var win = ViewManager.ins().getView(RuneReplaceWin);
                        if (win) {
                            this.already.visible = Rune.ins().isEquipMerge(itemData.configID, win.roleIndex, win.posIndex);
                            this.changeBtn.visible = this.changeBtn0.visible = !this.already.visible;
                        }
                    }
                }
                else {
                    this.resetView();
                }
            }
            else {
                this.setBtnStatu();
                this.resetView();
            }
        }
        else {
            this.resetView();
        }
    };
    RuneReplaceItemRenderer.prototype.setBtnStatu = function () {
        if (this.data == null || this.data.data == null) {
            this.currentState = "dis";
            this.itemIcon.currentState = "emp";
        }
        else {
            if (this.data.data.configID) {
                this.currentState = "all";
                this.changeBtn.visible = false;
                this.changeBtn0.visible = false;
                this.now.visible = true;
                this.already.visible = false;
            }
            else {
                this.currentState = "get";
            }
        }
    };
    RuneReplaceItemRenderer.prototype.getItemId = function () {
        if (this.data && this.data.data)
            return this.data.data.configID;
        return 0;
    };
    RuneReplaceItemRenderer.prototype.resetView = function () {
        this.itemIcon.setData(null);
        this.nameLab.text = "";
        this.attr.text = "";
    };
    return RuneReplaceItemRenderer;
}(eui.ItemRenderer));
__reflect(RuneReplaceItemRenderer.prototype, "RuneReplaceItemRenderer");
var RuneReplaceItemData = (function () {
    function RuneReplaceItemData(data) {
        this.data = data;
    }
    return RuneReplaceItemData;
}());
__reflect(RuneReplaceItemData.prototype, "RuneReplaceItemData");
//# sourceMappingURL=RuneReplaceItemRenderer.js.map