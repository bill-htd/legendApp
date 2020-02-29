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
var TipsGoodEquip = (function (_super) {
    __extends(TipsGoodEquip, _super);
    function TipsGoodEquip() {
        var _this = _super.call(this) || this;
        _this.skinName = "OrangeEquipNoticeSkin";
        _this.isUsing = false;
        _this.horizontalCenter = 0;
        _this.bgMc = new MovieClip;
        _this.bgMc.x = 142;
        _this.bgMc.y = 58;
        _this.bgMc.touchEnabled = false;
        _this.addChild(_this.bgMc);
        return _this;
    }
    Object.defineProperty(TipsGoodEquip.prototype, "data", {
        set: function (item) {
            this.bgMc.playFile(RES_DIR_EFF + "tekuangeff", 1, null, false);
            this.item.isShowName(false);
            if (item instanceof ItemData) {
                var q = ItemConfig.getQuality(item.itemConfig);
                this.item.showNum(true);
                this.item.data = item;
                if (q == 4) {
                    this.desc.text = "传说物品！";
                    this.itemName.visible = true;
                }
                else if (q == 5) {
                    this.desc.text = "传说物品！";
                    this.itemName.visible = true;
                }
                if (ItemConfig.getType(item.itemConfig) == 7) {
                    this.desc.text = "恭喜获得:";
                }
                this.itemName.text = item.itemConfig.name;
                this.itemName.textColor = ItemBase.QUALITY_COLOR[q];
            }
            else {
                this.desc.text = "恭喜获得:";
                var data = item;
                this.item.setItemImg(data.imgClose);
                this.itemName.text = data.name;
                this.itemName.textColor = ItemBase.QUALITY_COLOR[data.quality];
                this.item.showNum(false);
            }
        },
        enumerable: true,
        configurable: true
    });
    return TipsGoodEquip;
}(BaseView));
__reflect(TipsGoodEquip.prototype, "TipsGoodEquip");
//# sourceMappingURL=TipsGoodEquip.js.map