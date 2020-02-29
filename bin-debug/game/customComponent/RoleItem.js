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
var RoleItem = (function (_super) {
    __extends(RoleItem, _super);
    function RoleItem() {
        var _this = _super.call(this) || this;
        _this._curRole = -1;
        _this._index = -1;
        _this.showTip = true;
        return _this;
    }
    RoleItem.prototype.init = function () {
        _super.prototype.init.call(this);
        this.boostLv = new eui.Label;
        this.boostLv.x = 35;
        this.boostLv.y = 55;
        this.boostLv.textColor = 0xF9A305;
        this.zhulingLv = new eui.Label;
        this.zhulingLv.x = 12;
        this.zhulingLv.y = 55;
        this.zhulingLv.textColor = 0x3DBDFF;
        this.tupoLv = new eui.Label;
        this.tupoLv.x = 20;
        this.tupoLv.y = 5;
        this.tupoLv.textColor = 0xE9FA09;
        this.boostLv.size = this.zhulingLv.size = this.tupoLv.size = 16;
        this.boostLv.width = this.zhulingLv.width = this.tupoLv.width = 41;
        this.boostLv.stroke = this.zhulingLv.stroke = this.tupoLv.stroke = 1;
        this.boostLv.strokeColor = this.zhulingLv.strokeColor = this.tupoLv.strokeColor = 0x000000;
        this.boostLv.textAlign = this.tupoLv.textAlign = "right";
        this.addChild(this.boostLv);
        this.addChild(this.zhulingLv);
        this.addChild(this.tupoLv);
        this.mc = new MovieClip;
        this.mc.x = 46;
        this.mc.y = 43;
    };
    RoleItem.prototype.dataChanged = function () {
        this.playEff();
        _super.prototype.dataChanged.call(this);
        var itemConfig = this.data.itemConfig;
        this.bless.visible = false;
        if (itemConfig) {
            var equipsDatas = this._wings ? this._model.wingsData.equipdata : this._model.equipsData;
            var equipsData = void 0;
            for (var i = 0; i < equipsDatas.length; i++) {
                if (this.data.handle == equipsDatas[i].item.handle) {
                    equipsData = equipsDatas[i];
                    break;
                }
            }
            if (!this._wings) {
                this.boostLv.text = (equipsData.strengthen > 0) ? "+" + equipsData.strengthen : "";
                this.zhulingLv.text = (equipsData.zhuling > 0) ? equipsData.zhuling + "" : "";
                this.tupoLv.text = (equipsData.tupo > 0) ? equipsData.tupo + "星" : "";
                this.bless.visible = equipsData.bless > 0;
                if (ItemConfig.getSubType(itemConfig) == ForgeConst.EQUIP_POS_TO_SUB[EquipPos.DZI]) {
                    this.nameTxt.text = UserBag.ins().getGuanyinLevel(itemConfig);
                }
            }
        }
        this.getItemIcon().extreme.visible = false;
        if (this._curRole >= 0 && this._index >= EquipPos.WEAPON && this._index <= EquipPos.SHOE) {
            if (!this.getItemIcon().extreme.visible)
                this.getItemIcon().extreme.visible = ExtremeEquipModel.ins().getZhiZunLvByRoleID(this._model, this._index) > 0;
        }
        this._lastData = this.data;
        this._lastModel = this._model;
    };
    RoleItem.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.boostLv.text = this.zhulingLv.text = this.tupoLv.text = "";
        this.playEff();
    };
    RoleItem.prototype.isShowTips = function (value) {
        this.showTip = value;
    };
    RoleItem.prototype.openEquipsTips = function () {
        if (!this.showTip)
            return;
        if (this._index > EquipPos.DZI) {
            ViewManager.ins().open(SamsaraEquipTips, this._curRole, this._lastModel, this._index);
        }
        else {
            ViewManager.ins().open(EquipDetailedWin, 1, this.data.handle, this.itemConfig.id, this.data, this._model, this._curRole, this._index);
        }
    };
    RoleItem.prototype.showPower = function () {
        this.openEquipsTips();
    };
    RoleItem.prototype.setModel = function (value) {
        this._model = value;
    };
    RoleItem.prototype.getModel = function () {
        return this._model;
    };
    RoleItem.prototype.setCurRole = function (value) {
        this._curRole = value;
    };
    RoleItem.prototype.getCurRole = function () {
        return this._curRole;
    };
    RoleItem.prototype.setIndex = function (value) {
        this._index = value;
    };
    RoleItem.prototype.getIndex = function () {
        return this._index;
    };
    RoleItem.prototype.setWings = function (value) {
        this._wings = value;
    };
    RoleItem.prototype.getWings = function () {
        return this._wings;
    };
    RoleItem.prototype.playEff = function () {
        if (this._lastData) {
            if (this._lastData != this.data && this._model == this._lastModel) {
                this.mc.playFile(RES_DIR_EFF + "forgeSuccess", 1);
                this.addChild(this.mc);
            }
        }
    };
    return RoleItem;
}(ItemBase));
__reflect(RoleItem.prototype, "RoleItem");
//# sourceMappingURL=RoleItem.js.map