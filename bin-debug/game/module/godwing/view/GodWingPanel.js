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
var GodWingPanel = (function (_super) {
    __extends(GodWingPanel, _super);
    function GodWingPanel() {
        return _super.call(this) || this;
    }
    GodWingPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.attr, this.onClick);
        this.addTouchEndEvent(this.skill, this.onTouch);
        this.addTouchEndEvent(this.replace, this.onClick);
        this.addTouchEndEvent(this.replace0, this.onClick);
        this.addTouchEndEvent(this.getItemTxt, this.onClick);
        this.observe(GodWingRedPoint.ins().postGodWingItem, this.updateItem);
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            this.addTouchEvent(this["item" + i], this.onTab);
        }
        this.slot = 1;
        this.updateGodWing();
    };
    GodWingPanel.prototype.onTab = function (e) {
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            if (e.currentTarget == this["item" + i]) {
                this.slot = i + 1;
                this["item" + i].setSelect(true);
                this.updateGodWing();
            }
            else {
                this["item" + i].setSelect(false);
            }
        }
    };
    GodWingPanel.prototype.onClick = function (e) {
        switch (e.target) {
            case this.attr:
                ViewManager.ins().open(GodWingSuitTipsWin, this.curRole);
                break;
            case this.replace:
                var gwconfig = this["item" + (this.slot - 1)].data;
                if (gwconfig) {
                    gwconfig = GlobalConfig.GodWingLevelConfig[gwconfig.level][gwconfig.slot];
                    if (!Wing.ins().wearItemRedPoint(this.curRole, this.slot)) {
                        UserTips.ins().showTips("\u65E0\u53EF\u7A7F\u6234\u7684\u9AD8\u9636\u795E\u7FBD");
                        return;
                    }
                    var itemid = Wing.ins().getWearItem(this.curRole, this.slot);
                    if (!itemid)
                        itemid = gwconfig.itemId;
                    Wing.ins().sendWingWear(this.curRole, itemid);
                }
                break;
            case this.replace0:
                if (Wing.ins().isQuicComposeGodWing(this.curRole, this.slot)) {
                    var gwconfig_1 = Wing.ins().getCurLevelItemId(this.curRole, this.slot);
                    if (!gwconfig_1) {
                        var level = Wing.ins().getStartLevel(this.slot);
                        gwconfig_1 = GlobalConfig.GodWingLevelConfig[level][this.slot];
                    }
                    else {
                        var level = Wing.ins().getNextLevel(gwconfig_1.level);
                        gwconfig_1 = GlobalConfig.GodWingLevelConfig[level][this.slot];
                    }
                    if (!Wing.ins().checkGodWingLevel(this.curRole, gwconfig_1.itemId)) {
                        UserTips.ins().showTips("\u4E0D\u7B26\u5408\u7A7F\u6234\u8981\u6C42");
                        return;
                    }
                    if (!Wing.ins().checkGodWingItem(this.curRole, gwconfig_1.itemId, this.slot)) {
                        UserTips.ins().showTips("\u6CA1\u6709\u8DB3\u591F\u7684\u6750\u6599");
                        return;
                    }
                    Wing.ins().sendWingCompose(1, gwconfig_1.itemId, this.curRole);
                }
                else {
                    UserTips.ins().showTips("\u9053\u5177\u4E0D\u8DB3\u6216\u7A7F\u6234\u7B49\u7EA7\u4E0D\u8DB3");
                }
                break;
            case this.getItemTxt:
                var cfg = this["item" + (this.slot - 1)].data;
                if (cfg) {
                    cfg = GlobalConfig.GodWingItemConfig[cfg.itemId];
                    var gayId = cfg.itemId;
                    if (!Wing.ins().getGodWing(this.curRole).getLevel(this.slot)) {
                        if (cfg instanceof GodWingItemConfig)
                            gayId = cfg.composeItem.id;
                    }
                    UserWarn.ins().setBuyGoodsWarn(gayId);
                }
                break;
        }
    };
    GodWingPanel.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.skill:
                ViewManager.ins().open(GodWingSkillTipsWin, this.skill.data, this.isActive);
                break;
        }
    };
    GodWingPanel.prototype.updateGodWing = function () {
        this.updateItem();
    };
    GodWingPanel.prototype.updateItem = function () {
        var gw = Wing.ins().getGodWing(this.curRole);
        var gwdata = gw.getData();
        var level = gw.getLevel(this.slot);
        this.attr0.visible = level ? false : true;
        this.attr1.visible = this.attr2.visible = !this.attr0.visible;
        this.state0.visible = this.power0.visible = this.attr0.visible;
        this.power1.visible = this.power2.visible = !this.power0.visible;
        this.state1.visible = this.state2.visible = !this.state0.visible;
        this.attr3.visible = this.power3.visible = this.state3.visible = false;
        if (level && !Wing.ins().getNextLevel(level)) {
            this.attr3.visible = this.power3.visible = this.state3.visible = true;
            for (var i = 0; i < 3; i++) {
                this["attr" + i].visible = this["power" + i].visible = this["state" + i].visible = !this.attr3.visible;
            }
        }
        var gitem;
        var nextgitem;
        var percent = 0;
        var suitsum = gw.getSuitSum();
        if (suitsum >= Wing.GodWingMaxSlot) {
            var minLevel = gw.getSuitLevel();
            var tmp = GlobalConfig.GodWingSuitConfig[minLevel];
            if (tmp)
                percent = tmp.precent / 10000;
        }
        if (this.attr0.visible) {
            var idx = Wing.ins().getStartLevel(this.slot);
            var wl = GlobalConfig.GodWingLevelConfig[idx][this.slot];
            gitem = GlobalConfig.GodWingItemConfig[wl.itemId];
            var power0 = Math.floor(UserBag.getAttrPower(gitem.attr));
            this.power0.text = "\u6218\u6597\u529B\uFF1A" + (power0 + gitem.exPower);
            this.power0.visible = true;
            this.attr0.text = AttributeData.getAttStr(gitem.attr, 0, 1, "：");
            var attrtext = AttributeData.getAttStr(gitem.attr, 0, 1, "：") + "\n";
            attrtext += AttributeData.getExAttrNameByAttrbute(gitem.exattr[0], true);
            this.attr0.text = attrtext;
        }
        if (this.attr1.visible) {
            var glconfig = Wing.ins().getCurLevelItemId(this.curRole, this.slot);
            if (glconfig) {
                gitem = GlobalConfig.GodWingItemConfig[glconfig.itemId];
                var newAttr = AttributeData.getPercentAttr(gitem.attr, percent);
                var power1 = Math.floor(UserBag.getAttrPower(newAttr));
                this.power1.text = "\u6218\u6597\u529B\uFF1A" + (power1 + gitem.exPower);
                var attrtext = AttributeData.getAttStr(gitem.attr, 0, 1, "：") + "\n";
                attrtext += AttributeData.getExAttrNameByAttrbute(gitem.exattr[0], true);
                this.attr1.text = attrtext;
            }
            glconfig = Wing.ins().getNextLevelItemId(this.curRole, this.slot);
            if (glconfig) {
                nextgitem = GlobalConfig.GodWingItemConfig[glconfig.itemId];
                var newAttr = AttributeData.getPercentAttr(nextgitem.attr, percent);
                var power2 = Math.floor(UserBag.getAttrPower(newAttr));
                this.power2.text = "\u6218\u6597\u529B\uFF1A" + (power2 + nextgitem.exPower);
                var attrtext = AttributeData.getAttStr(nextgitem.attr, 0, 1, "：") + "\n";
                attrtext += AttributeData.getExAttrNameByAttrbute(nextgitem.exattr[0], true);
                this.attr2.text = attrtext;
            }
        }
        if (this.attr3.visible) {
            var glconfig = Wing.ins().getCurLevelItemId(this.curRole, this.slot);
            gitem = GlobalConfig.GodWingItemConfig[glconfig.itemId];
            var newAttr = AttributeData.getPercentAttr(gitem.attr, percent);
            var power0 = Math.floor(UserBag.getAttrPower(newAttr));
            this.power3.text = "\u6218\u6597\u529B\uFF1A" + (power0 + gitem.exPower);
            this.power3.visible = true;
            this.attr3.text = AttributeData.getAttStr(gitem.attr, 0, 1, "：");
            var attrtext = AttributeData.getAttStr(gitem.attr, 0, 1, "：") + "\n";
            attrtext += AttributeData.getExAttrNameByAttrbute(gitem.exattr[0], true);
            this.attr3.text = attrtext;
        }
        var costItem = gitem;
        this.costImg0.visible = this.cost0.visible = true;
        if (!this.attr0.visible) {
            var nextLv = Wing.ins().getNextLevel(gitem.level);
            if (nextLv) {
                var nextcfg = GlobalConfig.GodWingLevelConfig[nextLv][this.slot];
                costItem = GlobalConfig.GodWingItemConfig[nextcfg.itemId];
            }
            else {
                this.costImg0.visible = this.cost0.visible = false;
            }
        }
        this.updateCost(costItem);
        for (var i = 0; i < 4; i++) {
            this["item" + i].data = null;
            this["item" + i].setSelect(false);
            this["item" + i].setCountVisible(false);
            var isShow_1 = Wing.ins().getGodWing(this.curRole).getLevel(i + 1);
            this["item" + i].setNameVisible(isShow_1);
        }
        this["item" + (this.slot - 1)].data = gitem;
        if (!Wing.ins().getCurLevelItemId(this.curRole, this.slot)) {
            this["item" + (this.slot - 1)].setImgIcon("sybg" + this.slot);
        }
        this["item" + (this.slot - 1)].setSelect(true);
        this["item" + (this.slot - 1)].setCountVisible(false);
        var isShow = Wing.ins().getGodWing(this.curRole).getLevel(this.slot);
        this["item" + (this.slot - 1)].setNameVisible(isShow);
        for (var i = 1; i <= 4; i++) {
            if (i != this.slot) {
                var itemlevel = void 0;
                var islock = false;
                if (gwdata[i]) {
                    itemlevel = gwdata[i].level;
                    islock = true;
                }
                else {
                    itemlevel = Wing.ins().getStartLevel(i);
                }
                var cfg = GlobalConfig.GodWingLevelConfig[itemlevel][i];
                var gitem_1 = GlobalConfig.GodWingItemConfig[cfg.itemId];
                if (gitem_1) {
                    this["item" + (i - 1)].data = gitem_1;
                    if (!islock) {
                        this["item" + (i - 1)].setImgIcon("sybg" + i);
                        this["item" + (i - 1)].setQuality("quality0");
                    }
                }
            }
        }
        this.updatePower();
        this.updateRedPoint();
        this.updateSkill();
    };
    GodWingPanel.prototype.setNnactive = function () {
        for (var k in GlobalConfig.GodWingSuitConfig) {
            var config = GlobalConfig.GodWingSuitConfig[k];
            this.skill.data = config;
            this.skill.setCountVisible(false);
            this.skill.setImgIcon("sy100000");
            break;
        }
    };
    GodWingPanel.prototype.updateSkill = function () {
        var gw = Wing.ins().getGodWing(this.curRole);
        var gwsconfig;
        var suitLevel = gw.getSuitLevel();
        this.isActive = false;
        if (!suitLevel) {
            this.setNnactive();
            return 0;
        }
        else {
            var sconfig = GlobalConfig.GodWingSuitConfig[suitLevel];
            if (sconfig.skillname) {
                this.isActive = true;
            }
            gwsconfig = sconfig;
        }
        this.skill.data = gwsconfig;
        this.skill.setCountVisible(false);
        if (!this.isActive) {
            this.skill.setImgIcon("sy100000");
            for (var k in GlobalConfig.GodWingSuitConfig) {
                var gsconfig = GlobalConfig.GodWingSuitConfig[k];
                if (gsconfig.skillname)
                    this.skill.setNameText(gsconfig.skillname);
            }
        }
    };
    GodWingPanel.prototype.updateCost = function (gitem) {
        if (!gitem)
            return;
        var itemData = UserBag.ins().getBagItemById(gitem.composeItem.id);
        var costItemLen = itemData ? itemData.count : 0;
        var myLevel = Wing.ins().getGodWing(this.curRole).getLevel(this.slot);
        if (myLevel) {
            var lcfg = GlobalConfig.GodWingLevelConfig[myLevel][this.slot];
            if (lcfg.itemId == gitem.composeItem.id)
                costItemLen += 1;
        }
        var itemconfig = GlobalConfig.ItemConfig[gitem.composeItem.id];
        this.costImg0.source = itemconfig.icon + "_png";
        this.costImg0.visible = false;
        var colorStr;
        if (costItemLen >= gitem.composeItem.count)
            colorStr = ColorUtil.GREEN;
        else
            colorStr = ColorUtil.RED;
        this.cost0.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + costItemLen + "|/|C:0xD1C28F&T:" + gitem.composeItem.count);
        this.getItemTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.getItemTxt.text);
        var it = GlobalConfig.ItemConfig[gitem.composeItem.id];
        colorStr = ItemConfig.getQualityColor(it);
        this.costName.textFlow = TextFlowMaker.generateTextFlow1("\u6D88\u8017|C:" + colorStr + "&T:" + it.name + "|C:" + 0x00FF00 + "&T:" + ":");
    };
    GodWingPanel.prototype.updateRedPoint = function () {
        for (var i = 0; i < Wing.GodWingMaxSlot; i++) {
            this["item" + i].updateRedPoint(Wing.ins().gridRedPoint(this.curRole, i + 1));
        }
        this.redPointReplace.visible = Wing.ins().wearItemRedPoint(this.curRole, this.slot);
        this.redPointReplace0.visible = Wing.ins().quickComposeRedPoint(this.curRole, this.slot);
    };
    GodWingPanel.prototype.updatePower = function () {
        var gw = Wing.ins().getGodWing(this.curRole);
        var gwdata = gw.getData();
        var powers = 0;
        var percent = 0;
        var suitsum = gw.getSuitSum();
        if (suitsum >= Wing.GodWingMaxSlot) {
            var minLevel = gw.getSuitLevel();
            var tmp = GlobalConfig.GodWingSuitConfig[minLevel];
            if (tmp)
                percent = tmp.precent / 10000;
        }
        for (var k in gwdata) {
            var glconfig = GlobalConfig.GodWingLevelConfig[gwdata[k].level][gwdata[k].slot];
            var gwconfig = GlobalConfig.GodWingItemConfig[glconfig.itemId];
            var exPower = gwconfig.exPower ? gwconfig.exPower : 0;
            var newAttr = AttributeData.getPercentAttr(gwconfig.attr, percent);
            powers += Math.floor(UserBag.getAttrPower(newAttr)) + exPower;
        }
        this.powerPanel.setPower(powers);
    };
    return GodWingPanel;
}(BaseView));
__reflect(GodWingPanel.prototype, "GodWingPanel");
//# sourceMappingURL=GodWingPanel.js.map