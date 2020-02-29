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
var TipsHeartEquipAlertPanel = (function (_super) {
    __extends(TipsHeartEquipAlertPanel, _super);
    function TipsHeartEquipAlertPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "guardGodWeaponNoticeTip";
        _this.isUsing = false;
        _this.horizontalCenter = 0;
        return _this;
    }
    Object.defineProperty(TipsHeartEquipAlertPanel.prototype, "data", {
        set: function (itemid) {
            var itemConfig = GlobalConfig.ItemConfig[itemid];
            this.item.setItemImg(itemConfig.icon + "_png");
            this.item.isShowJob(false);
            this.item.setImgBg(ItemConfig.getQuality(itemConfig));
            var color = ItemConfig.getQualityColor(itemConfig);
            this.desc.textFlow = TextFlowMaker.generateTextFlow1("C:" + color + "&T:" + itemConfig.name);
            this.itemName.visible = false;
            this.item.isShowName(false);
            this.item.showNum(false);
        },
        enumerable: true,
        configurable: true
    });
    return TipsHeartEquipAlertPanel;
}(BaseView));
__reflect(TipsHeartEquipAlertPanel.prototype, "TipsHeartEquipAlertPanel");
//# sourceMappingURL=TipsHeartEquipAlertPanel.js.map