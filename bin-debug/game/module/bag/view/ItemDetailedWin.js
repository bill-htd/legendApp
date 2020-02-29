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
var ItemDetailedWin = (function (_super) {
    __extends(ItemDetailedWin, _super);
    function ItemDetailedWin() {
        return _super.call(this) || this;
    }
    ItemDetailedWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ItemTipsSkin";
        this.itemIcon.imgJob.visible = false;
    };
    ItemDetailedWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var type = param[0];
        var id = param[1];
        var num = param[2];
        this.addTouchEndEvent(this, this.otherClose);
        this.setData(type, id, num);
    };
    ItemDetailedWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    ItemDetailedWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    ItemDetailedWin.prototype.setData = function (type, id, num) {
        var numStr = "";
        if (num == undefined) {
            var data = UserBag.ins().getBagGoodsByTypeAndId(type, id);
            numStr = data ? (data.count + "") : "0";
        }
        else
            numStr = num + "";
        var config = GlobalConfig.ItemConfig[id];
        this.nameLabel.text = config.name;
        this.nameLabel.textColor = ItemConfig.getQualityColor(config);
        this.itemIcon.setData(config);
        this.lv.text = (config.level || 1) + "级";
        this.num.text = numStr;
        this.description.textFlow = TextFlowMaker.generateTextFlow1(config.desc);
        if (ItemConfig.getType(config) == 2) {
            var sID = MiJiSkillConfig.getSkillIDByItem(config.id);
            this.power.text = "评分：" + GlobalConfig.MiJiSkillConfig[sID].power;
        }
        else
            this.power.text = "";
        this.BG.height = 170 + this.description.height;
    };
    return ItemDetailedWin;
}(BaseEuiView));
__reflect(ItemDetailedWin.prototype, "ItemDetailedWin");
ViewManager.ins().reg(ItemDetailedWin, LayerManager.UI_Popup);
//# sourceMappingURL=ItemDetailedWin.js.map