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
var ItemIcon = (function (_super) {
    __extends(ItemIcon, _super);
    function ItemIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "ItemIconSkin";
        return _this;
    }
    ItemIcon.prototype.setSoul = function (isSoul) {
        this.tag.visible = isSoul;
    };
    ItemIcon.prototype.setData = function (config) {
        this.config = config;
        if (config != null) {
            this.setIconfix(config);
            this.imgIcon.source = config.icon + '_png';
            this.imgBg.source = 'quality' + ItemConfig.getQuality(config);
            var type = ItemConfig.getType(config);
            var job = ItemConfig.getJob(config);
            this.imgJob.source = (type == 0 || type == 4) && job && this.imgJob.visible ? "job" + job + "Item" : '';
            if (GlobalConfig.ClientGlobalConfig.effectItems.indexOf && GlobalConfig.ClientGlobalConfig.effectItems.indexOf(config.id) >= 0) {
                if (this.effect == null) {
                    this.effect = new MovieClip;
                    this.effect.x = 35;
                    this.effect.y = 35;
                    this.addChildAt(this.effect, 2);
                    this.effect.addEventListener(egret.Event.ADDED_TO_STAGE, this.resumePlay, this);
                }
                this.effect.playFile(RES_DIR_EFF + 'quality_0' + ItemConfig.getQuality(config));
            }
            else if (this.effect != null) {
            }
        }
        else {
            this.imgIcon.source = '';
            this.imgBg.source = 'quality0';
            this.imgJob.source = '';
            if (this.effect != null) {
            }
        }
    };
    ItemIcon.prototype.setIconfix = function (config) {
        switch (config.id) {
            case 200136:
                config.icon = 200136;
                break;
        }
    };
    ItemIcon.prototype.resumePlay = function (e) {
        this.effect.play(-1);
    };
    ItemIcon.prototype.setActived = function (b) {
        this.actived.visible = b;
    };
    ItemIcon.prototype.setImgBg1 = function (res) {
        this.imgBg1.visible = true;
        this.imgBg.visible = !this.imgBg1.visible;
        if (res)
            this.imgBg1.source = res;
    };
    return ItemIcon;
}(BaseComponent));
__reflect(ItemIcon.prototype, "ItemIcon");
//# sourceMappingURL=ItemIcon.js.map