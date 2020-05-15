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
var HeirloomItemIcon = (function (_super) {
    __extends(HeirloomItemIcon, _super);
    function HeirloomItemIcon() {
        var _this = _super.call(this) || this;
        _this.skinName = "heirloomItemIcon";
        _this.imgRect.visible = true;
        return _this;
    }
    HeirloomItemIcon.prototype.setSkillData = function (icon) {
        this.imgRect.visible = false;
        this.imgIcon.source = icon;
    };
    HeirloomItemIcon.prototype.setData = function (info, pos, icon, uplevel) {
        if (uplevel === void 0) { uplevel = false; }
        this.imgRect.visible = true;
        if (info != null) {
            if (icon || info.icon)
                this.imgIcon.source = ((icon ? icon : info.icon) + "_png");
            if (info.lv > 0 && !icon) {
                this.imgRect.visible = false;
                if (this.effect == null) {
                    this.effect = new MovieClip;
                    this.effect.x = this.imgBg.x + this.imgBg.width / 2;
                    this.effect.y = this.imgBg.y + this.imgBg.height / 2 - 10;
                    this.addChildAt(this.effect, this.getChildIndex(this.imgIcon) + 1);
                }
                this.effect.playFile(RES_DIR_EFF + 'quaeff7', -1);
                return;
            }
        }
        if (!icon) {
            var config = GlobalConfig.HeirloomEquipConfig[pos + 1][1];
            this.imgIcon.source = config.icon + "_png";
        }
        else {
            if (info.lv > 0)
                this.imgRect.visible = false;
            else
                this.imgRect.visible = true;
        }
    };
    HeirloomItemIcon.prototype.cleanEff = function () {
        DisplayUtils.removeFromParent(this.effect);
        this.effect = null;
    };
    HeirloomItemIcon.prototype.setUpEff = function () {
        if (this.upEffect == null) {
            this.upEffect = new MovieClip;
            this.upEffect.x = this.imgBg.x + this.imgBg.width / 2;
            this.upEffect.y = this.imgBg.y + this.imgBg.height / 2 - 10;
            this.addChild(this.upEffect);
        }
        this.upEffect.playFile(RES_DIR_EFF + 'promoteeff', 1);
    };
    HeirloomItemIcon.prototype.resumePlay = function (e) {
        this.effect.play(-1);
    };
    return HeirloomItemIcon;
}(BaseComponent));
__reflect(HeirloomItemIcon.prototype, "HeirloomItemIcon");
//# sourceMappingURL=HeirloomItemIcon.js.map