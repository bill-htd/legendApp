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
var RuneBookItemTipsWin = (function (_super) {
    __extends(RuneBookItemTipsWin, _super);
    function RuneBookItemTipsWin() {
        var _this = _super.call(this) || this;
        _this.QUALITY_LABEL_LIST = ["零级", "初级", "中级", "高级", "顶级", "神级"];
        _this.SPECIAL_LABEL_LIST = ["普通", "特殊"];
        _this.skinName = "RuneGainTipsSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RuneBookItemTipsWin.prototype.initUI = function () {
        this.gainList.itemRendererSkinName = 'RuneGainTipsItemSkin';
        this.gainList.itemRenderer = GainGoodsNoSkinItem;
        _super.prototype.initUI.call(this);
    };
    RuneBookItemTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.setData(param[0], param[1]);
    };
    RuneBookItemTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.gainList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.resetView();
    };
    RuneBookItemTipsWin.prototype.otherClose = function (e) {
        ViewManager.ins().close(RuneBookItemTipsWin);
    };
    RuneBookItemTipsWin.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            GameGuider.guidance(item[1], item[2]);
            ViewManager.ins().close(RuneBookItemTipsWin);
        }
    };
    RuneBookItemTipsWin.prototype.setData = function (item, itemCfg) {
        if (itemCfg) {
            this.nameLabel.textFlow = new egret.HtmlTextParser().parser("<font color = '" + ItemConfig.getQualityColor(itemCfg) + "'>" + itemCfg.name + "Lv." + (itemCfg.level || 1) + "</font>");
            this.itemIcon.setData(itemCfg);
            var runeCfg = GlobalConfig.RuneBaseConfig[itemCfg.id];
            this.attrName.text = RuneConfigMgr.ins().getcfgAttrData(runeCfg);
            this.attrValue.text = RuneConfigMgr.ins().getcfgAttrData(runeCfg, false);
            if (item.checkpoint == 0) {
                this.attrDes.text = "\u9ED8\u8BA4\u89E3\u9501";
            }
            else {
                this.attrDes.text = "\u901A\u5173\u901A\u5929\u5854" + GlobalConfig.FbChNameConfig[Math.round(item.checkpoint / 10)].name + "\u89E3\u9501";
            }
            var gainConfig = GlobalConfig.GainItemConfig[itemCfg.id];
            var listHeight = 0;
            if (gainConfig) {
                this.gainList.dataProvider = new eui.ArrayCollection(gainConfig.gainWay);
                listHeight = gainConfig.gainWay.length * 60;
            }
            else {
                this.gainList.dataProvider = new eui.ArrayCollection([]);
            }
        }
        else {
            this.resetView();
        }
    };
    RuneBookItemTipsWin.prototype.resetView = function () {
        this.nameLabel.text = "";
        this.itemIcon.setData(null);
    };
    return RuneBookItemTipsWin;
}(BaseEuiView));
__reflect(RuneBookItemTipsWin.prototype, "RuneBookItemTipsWin");
ViewManager.ins().reg(RuneBookItemTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=RuneBookItemTipsWin.js.map