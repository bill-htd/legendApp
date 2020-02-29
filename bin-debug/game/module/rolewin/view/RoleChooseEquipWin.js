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
var RoleChooseEquipWin = (function (_super) {
    __extends(RoleChooseEquipWin, _super);
    function RoleChooseEquipWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        _this.pos = 0;
        _this.roleSelect = 0;
        return _this;
    }
    RoleChooseEquipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "RoleChooseEquipSkin";
        this.list.itemRenderer = RoleEquipChooseItem;
        this.wearItem = new RoleEquipChooseItem();
        this.itemGroup.addChild(this.wearItem);
    };
    RoleChooseEquipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.roleSelect = param[0];
        this.pos = param[1];
        var model = SubRoles.ins().getSubRoleByIndex(this.roleSelect);
        var data = model.getEquipDataByPos(this.pos);
        this.wearItem.setUpImage(false);
        this.wearItem.data = data.item;
        this.wearItem.setBtnStatu();
        var power = 0;
        if (data && data.item.configID != 0) {
            this.scroll.y = 170;
            this.scroll.height = 400;
            this.wearItem.visible = true;
            power = data.item.point;
            var job = ItemConfig.getJob(data.item.itemConfig) == 0 ? model.job : ItemConfig.getJob(data.item.itemConfig);
            UserBag.ins().setEquipPowerDic(job, ItemConfig.getSubType(data.item.itemConfig), power);
        }
        else {
            this.scroll.y = 50;
            this.scroll.height = 520;
            this.wearItem.visible = false;
        }
        this.itemList = UserBag.ins().getEquipByPos(this.roleSelect, this.pos);
        this.list.dataProvider = new eui.ArrayCollection(this.itemList);
        this.list.validateNow();
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this, this.itemTap);
    };
    RoleChooseEquipWin.prototype.itemTap = function (e) {
        if (e.target.name == "changeBtn") {
            var item = e.target.parent.data;
            if (item && item instanceof ItemData) {
                var lv = Actor.level;
                var zsLv = UserZs.ins().lv;
                if (item.itemConfig) {
                    if (zsLv >= (item.itemConfig.zsLevel || 0) && lv >= (item.itemConfig.level || 1)) {
                    }
                    else {
                        if (ItemConfig.getQuality(item.itemConfig) == 5) {
                            UserTips.ins().showTips("|C:0xF3311E&T:" + item.itemConfig.name + "\uFF09\u8FBE\u5230" + item.itemConfig.zsLevel + "\u8F6C" + (item.itemConfig.level || 1) + "\u7EA7\u53EF\u7A7F\u6234|");
                            return;
                        }
                        UserTips.ins().showTips("|C:0xF3311E&T:等级不足，无法穿戴|");
                        return;
                    }
                }
                UserEquip.ins().sendWearEquipment(item.handle, this.pos, this.roleSelect);
                ViewManager.ins().close(this);
                SoundUtil.ins().playEffect(SoundUtil.EQUIP);
            }
        }
    };
    RoleChooseEquipWin.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    RoleChooseEquipWin.prototype.sortFun = function (aItem, bItem) {
        var att1 = UserBag.ins().getEquipAttrs(aItem);
        var itemPoint1 = UserBag.getAttrPower(att1);
        var att2 = UserBag.ins().getEquipAttrs(bItem);
        var itemPoint2 = UserBag.getAttrPower(att2);
        if (itemPoint1 < itemPoint2)
            return 1;
        if (itemPoint1 > itemPoint2)
            return -1;
        return 0;
    };
    return RoleChooseEquipWin;
}(BaseEuiView));
__reflect(RoleChooseEquipWin.prototype, "RoleChooseEquipWin");
ViewManager.ins().reg(RoleChooseEquipWin, LayerManager.UI_Popup);
//# sourceMappingURL=RoleChooseEquipWin.js.map