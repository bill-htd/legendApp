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
var SpecialRingItem = (function (_super) {
    __extends(SpecialRingItem, _super);
    function SpecialRingItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ringtogglebtn";
        return _this;
    }
    SpecialRingItem.prototype.dataChanged = function () {
        var config = GlobalConfig.ActorExRingConfig[this.data.id];
        if (!config) {
            return;
        }
        this.addEvent();
        this.ringNameTxt.text = config.name;
        this.textBg.visible = this.data.level > 0;
        if (this.data.level > 0) {
            this.levelTxt.text = SpecialRing.ins().getRingStair(this.data.level) + "\u9636";
            this.openLv.text = "";
            this.noopen.visible = false;
            this.ringicon.source = config.icon;
        }
        else {
            this.levelTxt.text = "";
            this.noopen.visible = true;
            this.ringicon.source = config.icon + "a";
            if (config.openDay > 0 && config.openVip > 0) {
                this.openLv.text = "\u7B2C" + config.openDay + "\u5929\u6216VIP" + config.openVip + "\u5F00\u542F";
            }
            else if (config.openDay > 0) {
                this.openLv.text = "\u7B2C" + config.openDay + "\u5929\u5F00\u542F";
            }
            else if (config.openVip > 0) {
                this.openLv.text = "VIP" + config.openVip + "\u5F00\u542F";
            }
            else if (config.openYb > 0) {
                this.openLv.text = config.openYb + "\u5143\u5B9D\u5F00\u542F";
            }
        }
        this.updateRedPoint();
    };
    SpecialRingItem.prototype.addEvent = function () {
        if (this.isAddEvent) {
            return;
        }
        this.isAddEvent = true;
        MessageCenter.addListener(UserBag.ins().postItemAdd, this.updateRedPoint, this);
        MessageCenter.addListener(UserBag.ins().postItemDel, this.updateRedPoint, this);
        MessageCenter.addListener(UserBag.ins().postItemCountChange, this.updateRedPoint, this);
        MessageCenter.addListener(UserVip.ins().postUpdateVipData, this.updateRedPoint, this);
        MessageCenter.addListener(SpecialRing.ins().postActiveRing, this.updateRedPoint, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    SpecialRingItem.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.destruct();
    };
    SpecialRingItem.prototype.destruct = function () {
        MessageCenter.ins().removeAll(this);
        this.isAddEvent = false;
    };
    SpecialRingItem.prototype.updateRedPoint = function () {
        if (this.data.level > 0) {
            this.actTxt.visible = false;
        }
        else {
            if (this.data.id == SpecialRing.FIRE_RING_ID) {
                this.actTxt.visible = SpecialRing.ins().isFireRingCanActivate();
            }
            else {
                this.actTxt.visible = SpecialRing.ins().checkCanActive(this.data.id);
            }
        }
        this.openLv.visible = !this.actTxt.visible;
        this.redPoint.visible = SpecialRing.ins().checkRedPoint(this.data.id, this.data.level);
    };
    return SpecialRingItem;
}(BaseItemRender));
__reflect(SpecialRingItem.prototype, "SpecialRingItem");
//# sourceMappingURL=SpecialRingItem.js.map