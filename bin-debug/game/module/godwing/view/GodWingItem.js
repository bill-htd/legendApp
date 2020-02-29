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
var GodWingItem = (function (_super) {
    __extends(GodWingItem, _super);
    function GodWingItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ShenYuItem';
        return _this;
    }
    GodWingItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GodWingItem.prototype.setSelect = function (b) {
        this.select.visible = b;
    };
    GodWingItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        this.itemId = 0;
        this.itemIcon.imgJob.visible = false;
        this.itemIcon.imgIcon.source = "";
        if (this.data instanceof GodWingItemConfig) {
            var gitem = this.data;
            var itemConfig = GlobalConfig.ItemConfig[gitem.itemId];
            this.itemIcon.imgIcon.source = itemConfig.icon + "_png";
            this.nameTxt.text = itemConfig.name;
            this.itemId = gitem.itemId;
            this.itemIcon.imgBg.source = 'quality' + ItemConfig.getQuality(itemConfig);
            this.nameTxt.textColor = ItemConfig.getQualityColor(itemConfig);
        }
        else if (this.data instanceof ItemData) {
            var itemdata = this.data;
            var itemConfig = GlobalConfig.ItemConfig[itemdata._configID];
            this.itemIcon.imgIcon.source = itemConfig.icon + "_png";
            this.nameTxt.text = itemConfig.name;
            this.itemId = itemConfig.id;
            this.count.text = itemdata.count + "";
            this.itemIcon.imgBg.source = 'quality' + ItemConfig.getQuality(itemConfig);
            this.nameTxt.textColor = ItemConfig.getQualityColor(itemConfig);
        }
        else if (this.data instanceof ItemConfig) {
            var config = this.data;
            this.itemIcon.imgIcon.source = config.icon + "_png";
            this.nameTxt.text = config.name;
            this.itemId = config.id;
            this.itemIcon.imgBg.source = 'quality' + ItemConfig.getQuality(config);
            this.nameTxt.textColor = ItemConfig.getQualityColor(config);
        }
        else if (this.data instanceof GodWingSuitConfig) {
            var config = this.data;
            if (!config.skillname) {
                for (var k in GlobalConfig.GodWingSuitConfig) {
                    if (GlobalConfig.GodWingSuitConfig[k].skillname) {
                        config = GlobalConfig.GodWingSuitConfig[k];
                        this.data = config;
                        break;
                    }
                }
            }
            this.itemIcon.imgIcon.source = config.skillicon;
            this.nameTxt.text = config.skillname;
        }
        else if (this.data instanceof GodWingLevelConfig) {
            var config = this.data;
            var cfg = GlobalConfig.ItemConfig[config.itemId];
            this.itemIcon.imgIcon.source = cfg.icon + "_png";
            this.nameTxt.text = cfg.name;
            this.itemIcon.imgBg.source = 'quality' + ItemConfig.getQuality(cfg);
            this.nameTxt.textColor = ItemConfig.getQualityColor(cfg);
        }
        this.itemIcon.imgIcon.visible = this.itemIcon.imgIcon.source ? true : false;
    };
    GodWingItem.prototype.setCountVisible = function (b) {
        this.count.visible = b;
    };
    GodWingItem.prototype.setNameVisible = function (b) {
        this.nameTxt.visible = b;
        if (!b)
            this.setQuality("quality0");
    };
    GodWingItem.prototype.setImgIcon = function (img) {
        this.itemIcon.imgIcon.source = img;
        this.itemIcon.imgJob.visible = false;
        this.itemIcon.imgIcon.visible = this.itemIcon.imgIcon.source ? true : false;
    };
    GodWingItem.prototype.updateRedPoint = function (b) {
        this.redPoint.visible = b;
    };
    GodWingItem.prototype.setNameText = function (str) {
        this.nameTxt.text = str;
    };
    GodWingItem.prototype.setQuality = function (str) {
        this.itemIcon.imgBg.source = str;
    };
    GodWingItem.prototype.destruct = function () {
    };
    return GodWingItem;
}(BaseItemRender));
__reflect(GodWingItem.prototype, "GodWingItem");
//# sourceMappingURL=GodWingItem.js.map