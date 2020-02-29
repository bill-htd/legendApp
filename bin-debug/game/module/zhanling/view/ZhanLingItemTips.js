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
var ZhanLingItemTips = (function (_super) {
    __extends(ZhanLingItemTips, _super);
    function ZhanLingItemTips() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanglingUpTipsSkin';
        return _this;
    }
    ZhanLingItemTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ZhanLingItemTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.addTouchEvent(this.bgClose, this.otherClose);
        this.id = param[0];
        this.itemid = param[1];
        var config = GlobalConfig.ItemConfig[this.itemid];
        this.itemIcon.setData(config);
        this.nameLabel.textFlow = TextFlowMaker.generateTextFlow1(config.name);
        var curCount = ZhanLingModel.ins().getZhanLingDataByDrug(this.id, this.itemid);
        var level = ZhanLingModel.ins().getZhanLingDataByLevel(this.id);
        var zllevel = GlobalConfig.ZhanLingLevel[this.id][level];
        var maxCount = zllevel.maxCount[this.itemid];
        var color = curCount >= maxCount ? 0x00ff00 : 0xff0000;
        this.use.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + curCount + "|/" + maxCount);
        var itemData = UserBag.ins().getBagItemById(this.itemid);
        this.num.text = itemData ? "" + itemData.count : "0";
        var stage = ZhanLingModel.ins().getZhanLingDataByStage(this.id) + 1;
        if (stage * 10 > CommonUtils.getObjectLength(GlobalConfig.ZhanLingLevel[this.id])) {
            DisplayUtils.removeFromParent(this.info);
        }
        else {
            this.num0.text = stage + "\u9636" + 1 + "\u661F";
        }
        var upgradeInfo = GlobalConfig.ZhanLingConfig.upgradeInfo[this.itemid];
        var attrtext = AttributeData.getAttStr(upgradeInfo.attr, 0, 1, "+");
        if (upgradeInfo.precent) {
            attrtext += "\n\u6218\u7075\u57FA\u7840\u5C5E\u6027+" + upgradeInfo.precent / 100 + "%";
        }
        this.attr.text = attrtext;
    };
    ZhanLingItemTips.prototype.otherClose = function (e) {
        ViewManager.ins().close(this);
    };
    return ZhanLingItemTips;
}(BaseEuiView));
__reflect(ZhanLingItemTips.prototype, "ZhanLingItemTips");
ViewManager.ins().reg(ZhanLingItemTips, LayerManager.UI_Popup);
//# sourceMappingURL=ZhanLingItemTips.js.map