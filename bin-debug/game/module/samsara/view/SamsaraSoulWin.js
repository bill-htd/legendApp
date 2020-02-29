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
var SamsaraSoulWin = (function (_super) {
    __extends(SamsaraSoulWin, _super);
    function SamsaraSoulWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ReincarnateSoulSkin";
        _this.isTopLevel = true;
        return _this;
    }
    SamsaraSoulWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(UserEquip.ins().postAddSoul, this.updateView);
        this.addTouchEvent(this.soulBtn, this.addSoul);
        this.addTouchEvent(this.closeBtn, this.closeWin);
        this.roleIndex = param[0];
        this.subType = param[1];
        this.updateView();
    };
    SamsaraSoulWin.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    SamsaraSoulWin.prototype.addSoul = function () {
        UserEquip.ins().requestAddSoul(this.roleIndex, this.subType);
    };
    SamsaraSoulWin.prototype.updateView = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this.roleIndex);
        var data = role.getEquipByIndex(this.subType);
        this.itemId = data.item.itemConfig.id;
        var mainEquip = role.getEquipByIndex(this.subType);
        this.soulLv = mainEquip.soulLv;
        this.soulLinkLv = SamsaraModel.ins().getSoulLinkLv(role, this.subType, mainEquip.soulLv);
        var itemCfg = GlobalConfig.ItemConfig[this.itemId];
        var subType = ItemConfig.getSubType(itemCfg);
        var job = ItemConfig.getJob(itemCfg);
        var maxLv = SamsaraModel.ins().getSoulMaxLevel();
        var isSoulMax = this.soulLv == maxLv;
        var isChainMax = this.soulLinkLv == maxLv;
        this.nextSoulTextGroup.visible = !(this.soulLv == 0 || isSoulMax);
        this.nextChainTextGroup.visible = !(this.soulLinkLv == 0 || isChainMax);
        if (this.nextChainTextGroup.visible) {
            var tempCfg = SamsaraModel.ins().getReincarnationLinkLevel(subType, this.soulLinkLv + 1);
            this.nextChain0.text = tempCfg.attrs[0].value / 100 + "%";
        }
        if (this.nextSoulTextGroup.visible) {
            var tempCfg = GlobalConfig.ReincarnationDemonLevel[subType][this.soulLv + 1];
            this.nextChain1.text = (100 + tempCfg.precent / 100) + "%";
        }
        var showSoulLinkLv = 0;
        if (this.soulLinkLv == 0) {
            showSoulLinkLv = 1;
        }
        else {
            showSoulLinkLv = this.soulLinkLv;
        }
        var showSoulLv = 0;
        if (this.soulLv == 0) {
            showSoulLv = 1;
        }
        else {
            showSoulLv = this.soulLv;
        }
        var cfg = SamsaraModel.ins().getReincarnationLinkLevel(subType, showSoulLinkLv);
        this.chainPos.text = "[\u9B54\u9B42" + Role.getEquipNameByType(cfg.secondSlot) + "]";
        this.chainAttr.text = SamsaraModel.ins().getSoulLinkDesc(cfg.attrs[0].type);
        this.chainState.text = "增加";
        this.chainValue.text = (cfg.attrs[0].value / 100) + "%";
        var demon = GlobalConfig.ReincarnationDemonLevel[subType][showSoulLv];
        var soulAttrDesc;
        var per = demon.precent / 100;
        per += 100;
        soulAttrDesc = per + "%";
        this.soulAttr.text = soulAttrDesc;
        var soulCfg = GlobalConfig.ReincarnationSoulLevel[job][subType][showSoulLv];
        var attrDesc = AttributeData.getAttStr(soulCfg.attrs, 0, 1, "  :  ");
        var power = UserBag.getAttrPower(soulCfg.attrs);
        power += this.getChainAddPower(this.soulLinkLv);
        power += this.getSoulAddPower(data, this.soulLv);
        if (!isSoulMax)
            this.powerPanel0.setPower(power);
        if (this.soulLv == 0) {
            this.attr0.text = "攻击：0\n物防：0\n魔防：0\n生命：0\n神圣伤害：0";
            this.powerPanel0.setPower(0);
        }
        else {
            this.attr0.text = attrDesc;
        }
        var nextSoulCfg;
        if (isSoulMax) {
            this.attrGroup0.visible = false;
            this.attrGroup1.visible = false;
            this.attrGroup3.visible = true;
            this.attr3.text = attrDesc;
            this.powerPanel3.setPower(power);
        }
        else {
            this.attrGroup0.visible = true;
            this.attrGroup1.visible = true;
            this.attrGroup3.visible = false;
            nextSoulCfg = GlobalConfig.ReincarnationSoulLevel[job][subType][this.soulLv + 1];
            var attrDesc1 = AttributeData.getAttStr(nextSoulCfg.attrs, 0, 1, "  :  ");
            this.attr1.text = attrDesc1;
            var nextPower = UserBag.getAttrPower(nextSoulCfg.attrs);
            nextPower += this.getChainAddPower(this.soulLinkLv + 1);
            nextPower += this.getSoulAddPower(data, this.soulLv + 1);
            this.powerPanel1.setPower(nextPower);
        }
        this.chainLv0.text = "Lv" + showSoulLinkLv;
        this.soulLvText.text = "Lv" + showSoulLv;
        var materialId = soulCfg.materialInfo.id;
        var count = UserBag.ins().getBagGoodsCountById(0, materialId);
        var isCanAdd = false;
        if (nextSoulCfg)
            isCanAdd = (count >= nextSoulCfg.materialInfo.count);
        this.materialLabel.text = GlobalConfig.ItemConfig[materialId].name;
        this.costImg.source = GlobalConfig.ItemConfig[materialId].icon + '_png';
        ;
        this.num.text = count.toString();
        if (nextSoulCfg) {
            this.needNum.text = "/" + nextSoulCfg.materialInfo.count.toString();
        }
        else {
            this.needNum.text = "/0";
        }
        this.soulBtn.enabled = isCanAdd && !isSoulMax;
        if (isCanAdd) {
            this.num.textColor = ColorUtil.GREEN_COLOR_N;
        }
        else {
            this.num.textColor = ColorUtil.RED_COLOR_N;
        }
        this.redPoint.visible = isCanAdd && !isSoulMax;
        this.arrow0.visible = !isSoulMax;
        this.rein_title.source = "rein_demon_soul_" + job + subType;
    };
    SamsaraSoulWin.prototype.getChainAddPower = function (soulLinkLv) {
        if (soulLinkLv == 0)
            return 0;
        var cfg = SamsaraModel.ins().getReincarnationLinkLevel(this.subType, soulLinkLv);
        var role = SubRoles.ins().getSubRoleByIndex(this.roleIndex);
        var temp = UserBag.getAttrPower([cfg.attrs[0]]) + ItemConfig.relatePower(cfg.attrs[0], role);
        return temp >> 0;
    };
    SamsaraSoulWin.prototype.getSoulAddPower = function (equipData, soulLv) {
        if (soulLv == 0)
            return 0;
        var cfg = GlobalConfig.ReincarnationDemonLevel[this.subType][soulLv];
        var percent = cfg.precent / 10000;
        var baseAttrs = ItemConfig.getBaseAttrData(equipData.item.itemConfig);
        return (UserBag.getAttrPower(baseAttrs) * percent) >> 0;
    };
    SamsaraSoulWin.prototype.getValue = function (attrs, typeValue) {
        var obj = CommonUtils.getObjectByAttr(attrs, "type", typeValue);
        return obj.value.toString();
    };
    return SamsaraSoulWin;
}(BaseEuiView));
__reflect(SamsaraSoulWin.prototype, "SamsaraSoulWin");
ViewManager.ins().reg(SamsaraSoulWin, LayerManager.UI_Main);
//# sourceMappingURL=SamsaraSoulWin.js.map