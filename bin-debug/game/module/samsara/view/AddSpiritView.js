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
var AddSpiritView = (function (_super) {
    __extends(AddSpiritView, _super);
    function AddSpiritView() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "ReincarnateSpiritSkin";
        return _this;
    }
    AddSpiritView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.lunhuiList.itemRenderer = ItemBase;
        this.addTouchEvent(this.upBtn, this.addSpirit);
        this.addTouchEvent(this.bgClose, this.closeWin);
        this.observe(UserEquip.ins().postAddSpirit, this.updateView);
        this.index = param[1];
        this.roleIndex = param[0];
        this.updateView();
    };
    AddSpiritView.prototype.updateView = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.roleIndex);
        var data = role.getEquipByIndex(this.index);
        this.setData(data);
    };
    AddSpiritView.prototype.addSpirit = function () {
        var data = this.lunhuiList.dataProvider;
        if (SamsaraModel.ins().checkSpiritLvIsMax(this.equipData, this.index)) {
            UserTips.ins().showTips("装备附灵等级已满级");
            return;
        }
        if (data.length == 0) {
            UserTips.ins().showTips("没有可以附灵的装备");
        }
        else {
            var filterAry = [];
            for (var i = 0; i < data.length; i++) {
                var id = data.getItemAt(i);
                var itemData = UserBag.ins().getFilterBagItemById(id, filterAry, UserBag.BAG_TYPE_EQUIP);
                if (itemData && itemData.handle) {
                    filterAry.push(itemData.handle);
                }
            }
            if (filterAry.length > 0)
                UserEquip.ins().requestAddSpirit(this.roleIndex, this.index, filterAry);
        }
    };
    AddSpiritView.prototype.setData = function (data) {
        this.equipData = data;
        var lv = data.spiritLv;
        this.lvTxt.text = "(Lv." + lv + ")";
        var cfg = CommonUtils.getObjectByUnionAttr(GlobalConfig.ReincarnateSpirit, this.index, lv);
        var nextCfg = CommonUtils.getObjectByUnionAttr(GlobalConfig.ReincarnateSpirit, this.index, lv + 1);
        var power = 0;
        this.attr4.text = "0";
        this.attr5.text = "0";
        this.attr6.text = "0";
        this.attr7.text = "0";
        if (cfg) {
            power = UserBag.getAttrPower(cfg.attrs);
            this.attr4.text = cfg.attrs[0].value.toString();
            this.attr5.text = cfg.attrs[1].value.toString();
            this.attr6.text = cfg.attrs[2].value.toString();
            this.attr7.text = cfg.attrs[3].value.toString();
        }
        this.powerPanel.setPower(power);
        if (lv == CommonUtils.getObjectLength(GlobalConfig.ReincarnateSpirit[this.index])) {
            this.attrGroup2.visible = false;
            this.expBar.maximum = 100;
            this.expBar.value = 100;
        }
        else {
            this.attrGroup2.visible = true;
            this.attr8.text = nextCfg.attrs[0].value.toString();
            this.attr9.text = nextCfg.attrs[1].value.toString();
            this.attr10.text = nextCfg.attrs[2].value.toString();
            this.attr11.text = nextCfg.attrs[3].value.toString();
            this.expBar.maximum = nextCfg.consume;
            this.expBar.value = data.spiritExp;
        }
        this.expLabel.text = this.expBar.value + "/" + this.expBar.maximum;
        var role = SubRoles.ins().getSubRoleByIndex(this.roleIndex);
        var ary = SamsaraModel.ins().getAddSpiritEquips(role, this.index);
        this.lunhuiList.dataProvider = new ArrayCollection(ary);
        this.redPoint.visible = SamsaraModel.ins().checkEquipPosCanAddSpirit(role, this.index);
    };
    AddSpiritView.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return AddSpiritView;
}(BaseEuiView));
__reflect(AddSpiritView.prototype, "AddSpiritView");
ViewManager.ins().reg(AddSpiritView, LayerManager.UI_Popup);
//# sourceMappingURL=AddSpiritView.js.map