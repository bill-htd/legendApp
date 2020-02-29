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
var ExtremeEquipPanel = (function (_super) {
    __extends(ExtremeEquipPanel, _super);
    function ExtremeEquipPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtremeEquipPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.menuList.itemRenderer = ExtremeEquipItem;
        this.menuListData = new ArrayCollection;
        this.menuList.dataProvider = this.menuListData;
        this.menuList.selectedIndex = 0;
        this.addTouchEvent(this.leftBtn, this.onLeft);
        this.addTouchEvent(this.rightBtn, this.onRight);
        this.addTouchEvent(this.updateBtn, this.update);
        this.addTouchEvent(this["skillIcon0"], this.onClick);
        this.addTouchEvent(this["skillIcon1"], this.onClick);
        this.addTouchEvent(this["chainImg0"], this.onClick);
        this.addTouchEvent(this["chainImg1"], this.onClick);
        this.addTouchEvent(this["skillIcon2"], this.onClick);
        this.addTouchEvent(this["chainImg2"], this.onClick);
        this.menuList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChange, this);
        this.addChangeEvent(this.menuScroller, this.onChange);
        this.observe(UserEquip.ins().postZhiZunUpgrade, this.undateView);
        ViewManager.ins().getView(AdvanEquipWin).isNotMove = true;
        this.listWidth = 82 * 8 + 70;
        this.setRoleId(param[0]);
    };
    ExtremeEquipPanel.prototype.onClick = function (e) {
        var config;
        var linkconfig;
        var equipconfig;
        var level;
        var zhiZunLv;
        var sconfig;
        var strdesc;
        switch (e.currentTarget) {
            case this["skillIcon0"]:
            case this["skillIcon2"]:
                linkconfig = ExtremeEquipModel.ins().getZhiZunLinkLevelConfig(this.menuList.selectedItem, ExtremeEquipModel.ins().selectJob);
                zhiZunLv = ExtremeEquipModel.ins().getZhiZunLv(ExtremeEquipModel.ins().selectJob, this.menuList.selectedItem);
                equipconfig = ExtremeEquipModel.ins().getZhiZunEquipLevelConfig(this.menuList.selectedItem, zhiZunLv);
                sconfig = GlobalConfig.SkillsConfig[equipconfig.skillId];
                config = GlobalConfig.SkillsDescConfig[sconfig.desc];
                strdesc = config.desc;
                strdesc = strdesc.replace("%s%", sconfig.desc_ex[0] + "");
                ViewManager.ins().open(ExtremeSkillTipsWin, config.name + ("Lv." + linkconfig.level), strdesc);
                break;
            case this["chainImg0"]:
            case this["chainImg2"]:
                linkconfig = ExtremeEquipModel.ins().getZhiZunLinkLevelConfig(this.menuList.selectedItem, ExtremeEquipModel.ins().selectJob);
                ViewManager.ins().open(ExtremeSkillTipsWin, "灵魂锁链" + ("Lv." + linkconfig.level), linkconfig.chainDesc);
                break;
            case this["skillIcon1"]:
                linkconfig = ExtremeEquipModel.ins().getZhiZunLinkLevelConfig(this.menuList.selectedItem, ExtremeEquipModel.ins().selectJob);
                zhiZunLv = ExtremeEquipModel.ins().getZhiZunLv(ExtremeEquipModel.ins().selectJob, this.menuList.selectedItem);
                equipconfig = ExtremeEquipModel.ins().getZhiZunEquipLevelConfig(this.menuList.selectedItem, zhiZunLv, true);
                sconfig = GlobalConfig.SkillsConfig[equipconfig.skillId];
                config = GlobalConfig.SkillsDescConfig[sconfig.desc];
                strdesc = config.desc;
                strdesc = strdesc.replace("%s%", sconfig.desc_ex[0] + "");
                ViewManager.ins().open(ExtremeSkillTipsWin, config.name + ("Lv." + linkconfig.level), strdesc);
                break;
            case this["chainImg1"]:
                linkconfig = ExtremeEquipModel.ins().getZhiZunLinkLevelConfig(this.menuList.selectedItem, ExtremeEquipModel.ins().selectJob, true);
                ViewManager.ins().open(ExtremeSkillTipsWin, "灵魂锁链" + ("Lv." + linkconfig.level), linkconfig.chainDesc);
                break;
        }
    };
    ExtremeEquipPanel.prototype.undateView = function () {
        var subType = this.menuList.selectedItem;
        this.pos = subType;
        this.setRoleId(this.curRole, subType);
    };
    ExtremeEquipPanel.prototype.update = function () {
        var job = ExtremeEquipModel.ins().selectJob;
        var subType = this.menuList.selectedItem;
        var role = SubRoles.ins().getSubRoleByJob(job);
        var data = role.getEquipByIndex(subType);
        var id = data.item.configID;
        if (!id) {
            UserTips.ins().showTips("|C:0xff0000&T:\u8BE5\u90E8\u4F4D\u672A\u7A7F\u6234\u88C5\u5907");
            return;
        }
        if (!ExtremeEquipModel.ins().canOperate(job, subType)) {
            UserTips.ins().showTips("|C:0xff0000&T:\u6750\u6599\u4E0D\u8DB3");
            return;
        }
        UserEquip.ins().upgradeZhiZunEquip(role.index, subType);
    };
    ExtremeEquipPanel.prototype.onListChange = function () {
        var data = this.menuList.selectedItem;
        this.pos = data;
        this.selectEquip(data);
        this.selectList();
    };
    ExtremeEquipPanel.prototype.onLeft = function () {
        var num = 82 * 5;
        var scrollH = 0;
        scrollH = this.menuList.scrollH - num;
        scrollH = Math.round(scrollH / 82) * 82;
        if (scrollH < 0) {
            scrollH = 0;
        }
        this.menuList.scrollH = scrollH;
        this.onChange();
    };
    ExtremeEquipPanel.prototype.onRight = function () {
        var num = 82 * 5;
        var scrollH = 0;
        scrollH = this.menuList.scrollH + num;
        scrollH = Math.round(scrollH / 82) * 82;
        if (scrollH > this.listWidth - this.menuScroller.width) {
            scrollH = this.listWidth - this.menuScroller.width;
        }
        this.menuList.scrollH = scrollH;
        this.onChange();
    };
    ExtremeEquipPanel.prototype.setRoleId = function (index, pos) {
        index = index ? index : 0;
        this.curRole = index;
        var role = SubRoles.ins().getSubRoleByIndex(index);
        var job = role.job;
        ExtremeEquipModel.ins().selectJob = job;
        this.menuListData.replaceAll(ExtremeEquipModel.ins().positions);
        pos = pos ? pos : (this.pos ? this.pos : EquipPos.WEAPON);
        this.pos = pos;
        this.selectEquip(pos);
    };
    ExtremeEquipPanel.prototype.onChange = function () {
        if (this.menuList.scrollH < 46) {
            this.leftGroup.visible = false;
            this.rightGroup.visible = true;
        }
        else if (this.menuList.scrollH >= this.listWidth - this.menuList.width - 46) {
            this.leftGroup.visible = true;
            this.rightGroup.visible = false;
        }
        else {
            this.leftGroup.visible = true;
            this.rightGroup.visible = true;
        }
        this.updateRedPoint();
    };
    ExtremeEquipPanel.prototype.updateRedPoint = function () {
        this.leftRed.visible = ExtremeEquipModel.ins().getRedPoint();
        this.rightRed.visible = ExtremeEquipModel.ins().getRedPoint();
    };
    ExtremeEquipPanel.prototype.selectEquip = function (subType) {
        this.extremeName.source = "extreme_name_0" + subType;
        var job = ExtremeEquipModel.ins().selectJob;
        var role = SubRoles.ins().getSubRoleByJob(job);
        var zhiZunLv = ExtremeEquipModel.ins().getZhiZunLv(job, subType);
        if (!zhiZunLv) {
            this.attrGroup1.visible = true;
            this.attrGroup0.visible = false;
            this.updateBtn.label = "激 活";
            this.updateBtn.visible = true;
            var preCfg = GlobalConfig.ZhiZunEquipLevel[subType][1];
            var preDesc = AttributeData.getAttStr(preCfg.attrs, 0, 1, "  :  ");
            this.attr2.text = preDesc;
            this.skillChain2.text = "\u7075\u9B42\u9501\u94FELv." + 1;
            var sname = ExtremeEquipModel.ins().getSkillName(subType);
            if (sname) {
                this.skillName2.text = sname + "Lv." + 1;
                this["skillIcon2"].source = UserSkill.ins().getSkillIdIcon(preCfg.skillId);
            }
            var power2 = Math.floor(UserBag.getAttrPower(preCfg.attrs)) + preCfg.ex_power;
            power2 += this.getChainAddPower(subType, zhiZunLv);
            this.powerPanel2.setPower(power2);
            var itemCount = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, preCfg.materialInfo.id);
            var item = GlobalConfig.ItemConfig[preCfg.materialInfo.id];
            var count = preCfg.materialInfo.count;
            this.cost.text = item.name;
            var colorStr = void 0;
            if (itemCount >= count) {
                colorStr = ColorUtil.GREEN_COLOR;
                this.isItemEnough = true;
            }
            else {
                colorStr = ColorUtil.RED_COLOR;
                this.isItemEnough = false;
            }
            this.numLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + itemCount + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + count + "</font> ");
            this.redPoint.visible = ExtremeEquipModel.ins().canOperate(job, subType);
        }
        else if (zhiZunLv >= ExtremeEquipModel.ins().getMaxZhiZunEquipLevel(subType)) {
            this.attrGroup1.visible = true;
            this.attrGroup0.visible = false;
            this.updateBtn.visible = this.redPoint.visible = this.cost.parent.visible = false;
            var cfg = GlobalConfig.ZhiZunEquipLevel[subType][zhiZunLv];
            var attrDesc = AttributeData.getAttStr(cfg.attrs, 0, 1, "  :  ");
            this.attr2.text = attrDesc;
            this.skillChain2.text = "\u7075\u9B42\u9501\u94FELv." + ExtremeEquipModel.ins().getZhiZunLinkLvShow(role.index, subType, zhiZunLv);
            var sname = ExtremeEquipModel.ins().getSkillName(subType);
            if (sname) {
                this.skillName2.text = sname + "Lv." + zhiZunLv;
                this["skillIcon2"].source = UserSkill.ins().getSkillIdIcon(cfg.skillId);
            }
            var power2 = Math.floor(UserBag.getAttrPower(cfg.attrs)) + cfg.ex_power;
            power2 += this.getChainAddPower(subType, zhiZunLv);
            this.powerPanel2.setPower(power2);
        }
        else {
            this.attrGroup1.visible = false;
            this.attrGroup0.visible = true;
            this.updateBtn.visible = this.cost.parent.visible = true;
            var cfg = GlobalConfig.ZhiZunEquipLevel[subType][zhiZunLv + 1];
            var item = GlobalConfig.ItemConfig[cfg.materialInfo.id];
            var count = cfg.materialInfo.count;
            this.cost.text = item.name;
            var itemCount = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, cfg.materialInfo.id);
            var colorStr = void 0;
            if (itemCount >= count) {
                colorStr = ColorUtil.GREEN_COLOR;
                this.isItemEnough = true;
            }
            else {
                colorStr = ColorUtil.RED_COLOR;
                this.isItemEnough = false;
            }
            this.numLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + itemCount + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + count + "</font> ");
            var attrDesc = AttributeData.getAttStr(cfg.attrs, 0, 1, "  :  ");
            var preDesc = void 0;
            var preCfg = void 0;
            if (zhiZunLv == 0) {
                preCfg = GlobalConfig.ZhiZunEquipLevel[subType][1];
                preDesc = AttributeData.getAttStr(preCfg.attrs, 0, 1, "  :  ");
            }
            else {
                preCfg = GlobalConfig.ZhiZunEquipLevel[subType][zhiZunLv];
                preDesc = AttributeData.getAttStr(preCfg.attrs, 0, 1, "  :  ");
            }
            this.attr0.text = preDesc;
            this.attr1.text = attrDesc;
            var power0 = Math.floor(UserBag.getAttrPower(preCfg.attrs)) + preCfg.ex_power;
            var power1 = Math.floor(UserBag.getAttrPower(cfg.attrs)) + cfg.ex_power;
            power0 += this.getChainAddPower(subType, zhiZunLv);
            power1 += this.getChainAddPower(subType, zhiZunLv + 1);
            this.powerPanel0.setPower(power0);
            this.powerPanel1.setPower(power1);
            this.skillChain0.text = "\u7075\u9B42\u9501\u94FELv." + ExtremeEquipModel.ins().getZhiZunLinkLvShow(role.index, subType, zhiZunLv);
            this.skillChain1.text = "\u7075\u9B42\u9501\u94FELv." + ExtremeEquipModel.ins().getZhiZunLinkLvShow(role.index, subType, zhiZunLv + 1);
            var sname = ExtremeEquipModel.ins().getSkillName(subType);
            if (sname) {
                this.skillName0.text = sname + "Lv." + zhiZunLv;
                this.skillName1.text = sname + "Lv." + (zhiZunLv + 1);
                this["skillIcon0"].source = UserSkill.ins().getSkillIdIcon(cfg.skillId);
                this["skillIcon1"].source = UserSkill.ins().getSkillIdIcon(cfg.skillId);
            }
            this.redPoint.visible = ExtremeEquipModel.ins().canOperate(job, subType);
            this.updateBtn.label = "升 级";
        }
        if (subType == EquipPos.WEAPON || subType == EquipPos.CLOTHES) {
            if (!this.skill_0_0.parent) {
                this.group0.addChild(this.skill_0_0);
            }
            if (!this.skill_1_0.parent) {
                this.group1.addChild(this.skill_1_0);
            }
            if (!this.skill_2_0.parent) {
                this.group3.addChild(this.skill_2_0);
            }
        }
        else {
            if (this.skill_0_0.parent)
                this.skill_0_0.parent.removeChild(this.skill_0_0);
            if (this.skill_1_0.parent)
                this.skill_1_0.parent.removeChild(this.skill_1_0);
            if (this.skill_2_0.parent)
                this.skill_2_0.parent.removeChild(this.skill_2_0);
        }
        this.setEff(subType);
        this.selectList();
        this.onChange();
    };
    ExtremeEquipPanel.prototype.setEff = function (subType) {
        if (!this.mc1)
            this.mc1 = new MovieClip;
        if (!this.mc1.parent)
            this.extreme_eff.addChild(this.mc1);
        if (!this.mc2)
            this.mc2 = new MovieClip;
        if (!this.mc2.parent)
            this.extreme_eff_bottom.addChild(this.mc2);
        this.mc1.playFile(RES_DIR_EFF + ("extrme_eff_0" + subType), -1);
        this.mc2.playFile(RES_DIR_EFF + "extrme_eff_bottom", -1);
    };
    ExtremeEquipPanel.prototype.selectList = function () {
        var count = this.menuList.dataProvider.length;
        for (var i = 0; i < count; i++) {
            var item = this.menuList.getElementAt(i);
            if (item) {
                if (i != this.menuList.selectedIndex) {
                    item.setSelect(false);
                }
                else {
                    item.setSelect(true);
                }
            }
        }
    };
    ExtremeEquipPanel.prototype.getChainAddPower = function (subType, zhiZunLv) {
        if (!zhiZunLv)
            return 0;
        var zzel = GlobalConfig.ZhiZunEquipLevel[subType][zhiZunLv];
        if (!zzel)
            return 0;
        var secPos = ExtremeEquipModel.ins().getLinkEquipPos(subType);
        var zzll = GlobalConfig.ZhiZunLinkLevel[subType][secPos][zzel.soulLinkLevel];
        if (!zzll)
            return 0;
        var temp = 0;
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        if (zzll.attrs) {
            temp += UserBag.getAttrPower(zzll.attrs);
            for (var i in zzll.attrs) {
                temp += ItemConfig.relatePower(zzll.attrs[i], role);
            }
        }
        var ex_power = zzll.ex_power ? zzll.ex_power : 0;
        temp = Math.floor(temp) + ex_power;
        return temp;
    };
    ExtremeEquipPanel.prototype.close = function () {
        ViewManager.ins().getView(AdvanEquipWin).isNotMove = false;
    };
    return ExtremeEquipPanel;
}(BaseView));
__reflect(ExtremeEquipPanel.prototype, "ExtremeEquipPanel");
//# sourceMappingURL=ExtremeEquipPanel.js.map