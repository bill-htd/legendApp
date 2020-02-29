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
var ItemCurrencyWin = (function (_super) {
    __extends(ItemCurrencyWin, _super);
    function ItemCurrencyWin() {
        return _super.call(this) || this;
    }
    ItemCurrencyWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ItemCurrencySkin";
        this.itemIcon.imgJob.visible = false;
    };
    ItemCurrencyWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var id = param[0];
        var count = param[1];
        count = count ? count : 0;
        this.addTouchEndEvent(this, this.otherClose);
        this.setData(id, count);
    };
    ItemCurrencyWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    ItemCurrencyWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    ItemCurrencyWin.prototype.setData = function (id, count) {
        var numStr = "";
        switch (id) {
            case MoneyConst.feat:
                numStr = count ? count + "" : "0";
                break;
        }
        var config = GlobalConfig.MoneyConfig[id];
        this.nameLabel.text = config.name;
        this.num.text = numStr;
        this.setImgData(id, count);
        this.description.textFlow = TextFlowMaker.generateTextFlow1(config.describe);
        this.BG.height = 170 + this.description.height;
    };
    ItemCurrencyWin.prototype.setImgData = function (id, count) {
        var type = 1;
        switch (id) {
            case MoneyConst.yuanbao:
                type = 5;
                break;
            case MoneyConst.gold:
                type = 0;
                break;
            case MoneyConst.soul:
            case MoneyConst.chip:
                type = 2;
                break;
            case MoneyConst.piece:
                type = 2;
                break;
            case MoneyConst.godweaponExp:
                type = 2;
                break;
            default:
                break;
        }
        this.nameLabel.text = RewardData.getCurrencyName(id);
        this.nameLabel.textColor = ItemBase.QUALITY_COLOR[type];
        this.itemIcon.imgIcon.source = RewardData.getCurrencyRes(id);
        this.itemIcon.imgBg.source = "quality" + type;
        this.setCount(count + "");
    };
    ItemCurrencyWin.prototype.setCount = function (str) {
        if (str.length > 4) {
            var wNum = Math.floor(Number(str) / 1000);
            str = wNum / 10 + "万";
        }
        this.num.text = str;
    };
    return ItemCurrencyWin;
}(BaseEuiView));
__reflect(ItemCurrencyWin.prototype, "ItemCurrencyWin");
ViewManager.ins().reg(ItemCurrencyWin, LayerManager.UI_Popup);
//# sourceMappingURL=ItemCurrencyWin.js.map