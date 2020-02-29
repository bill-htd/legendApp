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
var WeaponSoulItem = (function (_super) {
    __extends(WeaponSoulItem, _super);
    function WeaponSoulItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'weaponSoulitem';
        return _this;
    }
    WeaponSoulItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.slot = 0;
    };
    WeaponSoulItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var wsinfo;
        this.black.visible = false;
        if (this.data instanceof WeaponsInfo) {
            wsinfo = this.data;
            this.itemIcon.setActived(true);
        }
        else {
            wsinfo = this.data;
            this.black.visible = true;
        }
        this.slot = wsinfo.id;
        var cfg = GlobalConfig.WeaponSoulPosConfig[wsinfo.id][0];
        this.itemIcon.imgIcon.source = cfg.icon + "_png";
        this.lv.text = (!isNaN(wsinfo.level) ? wsinfo.level : cfg.level) + "";
        this.nameTxt.text = cfg.name;
        var nextcfg = GlobalConfig.WeaponSoulPosConfig[wsinfo.id][Number(this.lv.text) + 1];
        if (!wsinfo.costNum || !nextcfg)
            this.redPoint.visible = false;
        else {
            var itemData = UserBag.ins().getBagItemById(wsinfo.costItem);
            var costItemLen = itemData ? itemData.count : 0;
            this.redPoint.visible = costItemLen >= wsinfo.costNum ? true : false;
        }
    };
    WeaponSoulItem.prototype.destruct = function () {
    };
    WeaponSoulItem.prototype.clear = function () {
    };
    return WeaponSoulItem;
}(BaseItemRender));
__reflect(WeaponSoulItem.prototype, "WeaponSoulItem");
//# sourceMappingURL=WeaponSoulItem.js.map