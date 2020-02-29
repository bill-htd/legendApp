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
var ShenshouEquipTip = (function (_super) {
    __extends(ShenshouEquipTip, _super);
    function ShenshouEquipTip() {
        var _this = _super.call(this) || this;
        _this.posType = ["\u8840\u77B3", "\u9B54\u8EAF", "\u5996\u5C3E", "\u5723\u89D2", "\u9B3C\u722A"];
        _this.skinName = "shenshouEquipTips";
        return _this;
    }
    ShenshouEquipTip.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.changeBtn, this.onTouch);
        this.addTouchEvent(this.takeoffBtn, this.onTouch);
        this.addTouchEvent(this.forgeBtn, this.onTouch);
        this.shenshouId = args[0];
        this.pos = args[1];
        if (!this.shenshouId) {
            this.changeBtn.visible = false;
            this.forgeBtn.visible = false;
            this.takeoffBtn.visible = false;
            this.changeRedPoint.visible = false;
            this.forgeRedPoint.visible = false;
            this.anigroup.height = 505;
        }
        else {
            this.refRedpoint();
            var data = ShenshouModel.ins().getDataById(this.shenshouId);
            if (data.state == ShenshouState.State_No) {
                this.forgeBtn.visible = false;
            }
        }
        this.itemDp = GlobalConfig.ItemConfig[args[2]];
        this.initUi();
    };
    ShenshouEquipTip.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    ShenshouEquipTip.prototype.initUi = function () {
        var quality = ItemConfig.getQuality(this.itemDp);
        this.quali.source = quality ? "quali" + quality : "";
        this.equipIcon.data = this.itemDp.id;
        this.equipIcon.hideName();
        this.nameTxt.text = this.itemDp.name;
        this.nameTxt.textColor = ItemConfig.getQualityColor(this.itemDp);
        this.type.text = this.posType[ItemConfig.getSubType(this.itemDp)];
        this.lv.text = ShenshouModel.ins().getEquipLv(this.itemDp.id) + "级";
        this.career.text = "\u517D\u795E";
        var equipDp = GlobalConfig.ShenShouEquip[this.itemDp.id];
        var score = UserBag.getAttrPower(equipDp.attrs);
        if (equipDp.expower)
            score += equipDp.expower;
        this.powerPanel.setPower(score * SubRoles.ins().subRolesLen);
        var baseEquip = GlobalConfig.ShenShouEquip[ShenshouModel.ins().getEquipBaseId(this.itemDp.id)];
        var nowAttr = ShenshouModel.ins().getNowAttr(baseEquip);
        for (var i = 0; i < 3; i++) {
            if (nowAttr[i]) {
                this["attr" + (i + 1)].visible = true;
                this["attr" + (i + 1)].text = AttributeData.getAttStrByType(nowAttr[i], 0, ":");
                var addValue = equipDp.attrs[i].value - baseEquip.attrs[i].value;
                this["forgeAttr" + (i + 1)].visible = baseEquip && baseEquip.id != equipDp.id && addValue > 0;
                if (baseEquip && baseEquip.id != equipDp.id && addValue > 0)
                    this["forgeAttr" + (i + 1)].text = "+" + addValue;
            }
            else {
                this["attr" + (i + 1)].visible = false;
                this["forgeAttr" + (i + 1)].visible = false;
            }
        }
        for (var i = 0; i < 3; i++) {
            if (equipDp.starattrs[i]) {
                this["starAttr" + (i + 1)].visible = true;
                this["starAttr" + (i + 1)].text = AttributeData.getAttStrByType(equipDp.starattrs[i], 0, ":");
            }
            else {
                this["starAttr" + (i + 1)].visible = false;
            }
        }
    };
    ShenshouEquipTip.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                break;
            case this.changeBtn:
                ViewManager.ins().open(ShenshouWearEquipWin, this.shenshouId, this.pos, this.itemDp.id);
                break;
            case this.takeoffBtn:
                if (ShenshouModel.ins().getDataById(this.shenshouId).state == ShenshouState.State_Has) {
                    UserTips.ins().showCenterTips("\u8BF7\u5148\u53D6\u6D88\u51FA\u6218");
                    return;
                }
                ShenshouSys.ins().sendWearEquip(this.shenshouId, this.pos, 0);
                break;
            case this.forgeBtn:
                ViewManager.ins().open(ShenshouForgeWin, this.shenshouId, this.pos, this.itemDp);
                break;
        }
        ViewManager.ins().close(this);
    };
    ShenshouEquipTip.prototype.refRedpoint = function () {
        this.changeRedPoint.visible = ShenshouRedpoint.ins().redpointEquips1[this.shenshouId] && ShenshouRedpoint.ins().redpointEquips1[this.shenshouId][this.pos];
        this.forgeRedPoint.visible = ShenshouRedpoint.ins().redpointEquips2[this.shenshouId] && ShenshouRedpoint.ins().redpointEquips2[this.shenshouId][this.pos];
    };
    return ShenshouEquipTip;
}(BaseEuiView));
__reflect(ShenshouEquipTip.prototype, "ShenshouEquipTip");
ViewManager.ins().reg(ShenshouEquipTip, LayerManager.UI_Popup);
//# sourceMappingURL=ShenshouEquipTip.js.map