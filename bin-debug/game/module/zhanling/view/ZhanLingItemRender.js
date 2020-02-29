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
var ZhanLingItemRender = (function (_super) {
    __extends(ZhanLingItemRender, _super);
    function ZhanLingItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanlingEquipSkin';
        _this.init();
        return _this;
    }
    ZhanLingItemRender.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    ZhanLingItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var id = this.data.id;
        this.equips = this.data.equips;
        this.bg.source = this.getPosImg(Number(this.name));
        this.bg.visible = true;
        this.equip.visible = !this.bg.visible;
        this.redPoint.visible = this.getRedPoint();
        if (!this.data.id)
            return;
        var config = GlobalConfig.ItemConfig[id];
        if (!config)
            return;
        this.quality.source = 'quality' + ItemConfig.getQuality(config);
        this.equip.source = config.icon + '_png';
        this.bg.visible = false;
        this.equip.visible = !this.bg.visible;
    };
    ZhanLingItemRender.prototype.getRedPoint = function () {
        var curequip;
        if (this.data.id) {
            curequip = GlobalConfig.ZhanLingEquip[this.data.id];
        }
        for (var i = 0; i < this.equips.length; i++) {
            var id = this.equips[i].configID;
            var config = GlobalConfig.ItemConfig[id];
            if (!config)
                continue;
            var zlequip = GlobalConfig.ZhanLingEquip[id];
            if (!zlequip)
                continue;
            if (Number(this.name) != zlequip.pos)
                continue;
            var lv = config.level ? config.level : 0;
            var zslv = config.zsLevel ? config.zsLevel : 0;
            if (UserZs.ins().lv >= zslv && Actor.level >= lv) {
                if (curequip) {
                    if (zlequip.level > curequip.level) {
                        this.bestId = zlequip.id;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    this.bestId = zlequip.id;
                    return true;
                }
            }
        }
        return false;
    };
    ZhanLingItemRender.prototype.getPosImg = function (pos) {
        var str = "zl_equip_bg_" + pos;
        return str;
    };
    ZhanLingItemRender.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    ZhanLingItemRender.prototype.onClick = function () {
        if (!this.data)
            return;
        if (!this.data.id && !this.redPoint.visible) {
            UserTips.ins().showTips("\u6CA1\u6709\u53EF\u7A7F\u6234\u7684\u6218\u7075\u88C5\u5907");
            return;
        }
        if (this.data.id && !this.redPoint.visible) {
            ZhanLing.ins().ZhanLingItemTips(this.data.id, 0, true);
            return;
        }
        if (isNaN(this.data.zlId)) {
            UserTips.ins().showTips("\u6218\u7075id\u5F02\u5E38");
            return;
        }
        if (!this.bestId) {
            UserTips.ins().showTips("\u7A7F\u6234\u88C5\u5907\u5F02\u5E38");
            return;
        }
        if (!this.data.id && this.redPoint.visible) {
            ZhanLing.ins().sendZhanLingWear(this.data.zlId, this.bestId);
            return;
        }
        ZhanLing.ins().sendZhanLingWear(this.data.zlId, this.bestId);
    };
    return ZhanLingItemRender;
}(BaseItemRender));
__reflect(ZhanLingItemRender.prototype, "ZhanLingItemRender");
//# sourceMappingURL=ZhanLingItemRender.js.map