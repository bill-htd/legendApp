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
var WeaponSoulUplvWin = (function (_super) {
    __extends(WeaponSoulUplvWin, _super);
    function WeaponSoulUplvWin() {
        var _this = _super.call(this) || this;
        _this.skinName = 'weaponSoulUplv';
        return _this;
    }
    WeaponSoulUplvWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btn1, this.onClick);
        this.addTouchEvent(this.bgClose, this.onClick);
        this.observe(Weapons.ins().postWeaponsUpLevel, this.callback);
        this.roleId = param[0];
        this.slot = param[1];
        this.update();
    };
    WeaponSoulUplvWin.prototype.callback = function () {
        UserTips.ins().showTips("升级成功");
        this.update();
    };
    WeaponSoulUplvWin.prototype.update = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.roleId);
        var winfo = role.weapons.getSlotByInfo(this.slot);
        var wspconfig = GlobalConfig.WeaponSoulPosConfig[winfo.id][0];
        var nextconfig = GlobalConfig.WeaponSoulPosConfig[winfo.id][winfo.level + 1];
        if (!nextconfig) {
            this.costgroup.visible = false;
            this.btn1.visible = this.costgroup.visible;
            this.rightIcon0.visible = this.costgroup.visible;
            this.rightIcon1.visible = this.costgroup.visible;
            this.attr6.visible = this.costgroup.visible;
            this.attr4.visible = this.costgroup.visible;
            this.maxdesc.visible = !this.costgroup.visible;
            if (winfo.attr) {
                this.attr5.text = winfo.attr[0].value + "";
                this.attr2.text = AttributeData.getAttrStrByType(winfo.attr[0].type);
            }
            this.name0.text = wspconfig.name;
            this.item0.imgIcon.source = wspconfig.icon + "_png";
            this.item0.imgJob.visible = false;
            return;
        }
        this.item0.imgIcon.source = wspconfig.icon + "_png";
        this.item0.imgJob.visible = false;
        this.name0.text = wspconfig.name;
        if (winfo.attr) {
            this.attr5.text = winfo.attr[0].value + "";
            this.attr6.text = nextconfig.attr[0].value + "";
            this.rightIcon0.x = this.attr5.x + this.attr5.width + this.rightIcon0.width;
            this.attr6.x = this.rightIcon0.x;
            this.attr2.text = AttributeData.getAttrStrByType(winfo.attr[0].type);
            this.attr3.text = winfo.attr[0].value + "";
            this.attr4.text = nextconfig.attr[0].value + "";
            this.rightIcon1.x = this.attr3.x + this.attr3.width + this.rightIcon1.width;
            this.attr4.x = this.rightIcon1.x;
            var itemData = UserBag.ins().getBagItemById(winfo.costItem);
            var costItemLen = itemData ? itemData.count : 0;
            var itemconfig = GlobalConfig.ItemConfig[winfo.costItem];
            this.micon.source = itemconfig.icon + "";
            this.countLabel0.text = costItemLen + "/" + winfo.costNum;
            this.curSum = costItemLen;
            this.maxSum = winfo.costNum;
        }
    };
    WeaponSoulUplvWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.btn1:
                if (this.curSum < this.maxSum) {
                    UserTips.ins().showTips("材料不足");
                    return;
                }
                Weapons.ins().sendWeaponsUpLevel(this.roleId, this.slot);
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    WeaponSoulUplvWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.btn1, this.onClick);
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    return WeaponSoulUplvWin;
}(BaseEuiView));
__reflect(WeaponSoulUplvWin.prototype, "WeaponSoulUplvWin");
ViewManager.ins().reg(WeaponSoulUplvWin, LayerManager.UI_Popup);
//# sourceMappingURL=WeaponSoulUplvWin.js.map