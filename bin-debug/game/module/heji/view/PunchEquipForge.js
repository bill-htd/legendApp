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
var PunchEquipForge = (function (_super) {
    __extends(PunchEquipForge, _super);
    function PunchEquipForge() {
        return _super.call(this) || this;
    }
    PunchEquipForge.prototype.childrenCreated = function () {
        this.init();
    };
    PunchEquipForge.prototype.init = function () {
        var text = this.getItemTxt.text;
        this.getItemTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + text);
        this.maxPos = 8;
        this.mcs = [];
    };
    PunchEquipForge.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.getItemTxt, this.onClick);
        this.addTouchEvent(this.btn, this.onClick);
        this.observe(UserSkill.ins().postUpgradeForge, this.UpgradeForgeCallback);
        this.observe(UserEquip.ins().postSmeltEquipComplete, this.callback);
        this.updateDate();
    };
    PunchEquipForge.prototype.callback = function () {
        this.updateDate();
    };
    PunchEquipForge.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.getItemTxt, this.onClick);
        this.removeTouchEvent(this.btn, this.onClick);
        DisplayUtils.removeFromParent(this.mc);
        for (var i = 0; i < this.mcs.length; i++) {
            DisplayUtils.removeFromParent(this.mcs[i]);
        }
    };
    PunchEquipForge.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.getItemTxt:
                UserWarn.ins().setBuyGoodsWarn(909998);
                break;
            case this.btn:
                var pos = UserSkill.ins().getPunchForge().calcSelectPos();
                var ptype = UserSkill.ins().getPunchForge().isUpgradePunchForge(pos);
                if (ptype == PunchEquipForgeData.TYPE_NO) {
                    UserTips.ins().showTips("|C:0xff0000&T:\u788E\u7247\u4E0D\u8DB3");
                    return;
                }
                if (ptype == PunchEquipForgeData.TYPE_MAX) {
                    UserTips.ins().showTips("|C:0x00ff00&T:\u5DF2\u6EE1\u7EA7");
                    return;
                }
                UserSkill.ins().sendUpgradeForge(pos);
                break;
        }
    };
    PunchEquipForge.prototype.UpgradeForgeCallback = function () {
        this.updateDate(true);
    };
    PunchEquipForge.prototype.updateDate = function (eff) {
        var pos = UserSkill.ins().getPunchForge().calcSelectPos();
        var lv = 0;
        var ptype = PunchEquipForgeData.TYPE_MAX;
        for (var i = 0; i < this.maxPos; i++) {
            var tmp = UserSkill.ins().getPunchForge().isUpgradePunchForge(pos);
            if (tmp != PunchEquipForgeData.TYPE_MAX) {
                ptype = 0;
                break;
            }
        }
        if (ptype == PunchEquipForgeData.TYPE_MAX) {
            this.currentState = "full";
        }
        else {
            this.currentState = "normal";
            lv = UserSkill.ins().getPunchForge().getPunchLevel(pos);
        }
        this.validateNow();
        this.setSelect(pos);
        this.setEff();
        this.updateAttrDesc(pos, lv);
        this.updateCost(pos, lv);
        this.setPower();
        if (eff)
            this.setPosEff(pos);
    };
    PunchEquipForge.prototype.setPosEff = function (pos) {
        var index = pos - 1;
        if (index < 0)
            index = this.maxPos - 1;
        if (!this.mcs[index])
            this.mcs[index] = new MovieClip;
        if (!this.mcs[index].parent) {
            this["eff" + index].addChild(this.mcs[index]);
        }
        this.mcs[index].playFile(RES_DIR_EFF + "forgeSuccess", 1);
    };
    PunchEquipForge.prototype.setSelect = function (pos) {
        for (var i = 0; i < this.maxPos; i++) {
            this["pEquip" + i].visible = false;
            this["pELv" + i].text = "+" + UserSkill.ins().getPunchForge().getPunchLevel(i);
        }
        if (this.currentState == "normal") {
            this["pEquip" + pos].visible = true;
        }
    };
    PunchEquipForge.prototype.setEff = function () {
        if (this.currentState != "normal") {
            DisplayUtils.removeFromParent(this.mc);
            return;
        }
        if (!UserSkill.ins().canSolve()) {
            DisplayUtils.removeFromParent(this.mc);
            return;
        }
        if (!this.mc)
            this.mc = new MovieClip;
        if (!this.mc.parent) {
            this.getItemTxt.parent.addChild(this.mc);
            this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
            this.mc.touchEnabled = false;
            this.mc.scaleY = 0.5;
            this.mc.scaleX = 0.6;
        }
        this.mc.x = 0;
        this.mc.y = 0;
    };
    PunchEquipForge.prototype.updateAttrDesc = function (pos, lv) {
        if (this.currentState == "full") {
            var suitlv = UserSkill.ins().getPunchForge().getSuitlevel();
            var mconfig = GlobalConfig.PunchEquipMasterConfig[suitlv];
            var attrs = UserSkill.ins().getPunchForge().getAttributeData();
            for (var i = 0; i < attrs.length; i++) {
                if (this["attr" + i]) {
                    var str = "";
                    var value = 0;
                    for (var j = 0; j < attrs.length; j++) {
                        if (attrs[j].type == attrs[i].type) {
                            value = attrs[j].value;
                            break;
                        }
                    }
                    value += (mconfig.attr && mconfig.attr[i]) ? mconfig.attr[i].value : 0;
                    str = AttributeData.getAttrStrByType(attrs[i].type);
                    str += "+";
                    str += value;
                    this["attr" + i].text = str;
                }
            }
            var astr = "";
            astr = "合击伤害减免";
            astr += mconfig.exattr[0].value / 100;
            this.exattr0.text = astr + "%";
            return;
        }
        var config = GlobalConfig.PunchEquipConfig[pos][lv];
        if (config) {
            var suitlv = UserSkill.ins().getPunchForge().getSuitlevel();
            var mconfig = GlobalConfig.PunchEquipMasterConfig[suitlv];
            var isActive = true;
            if (!mconfig) {
                isActive = false;
                for (var k in GlobalConfig.PunchEquipMasterConfig) {
                    mconfig = GlobalConfig.PunchEquipMasterConfig[k];
                    break;
                }
            }
            var nextconfig = UserSkill.ins().getPunchForge().getPosNextLevelConfig(pos);
            var attrs = UserSkill.ins().getPunchForge().getAttributeData();
            for (var i = 0; i < config.attr.length; i++) {
                if (this["attr" + i]) {
                    var str = "";
                    var value = 0;
                    for (var j = 0; j < attrs.length; j++) {
                        if (attrs[j].type == config.attr[i].type) {
                            value = attrs[j].value;
                            break;
                        }
                    }
                    value += (mconfig.attr && mconfig.attr[i]) ? mconfig.attr[i].value : 0;
                    str = AttributeData.getAttrStrByType(config.attr[i].type);
                    str += "+";
                    str += value;
                    this["attr" + i].text = str;
                    if (nextconfig && this["arrow" + i] && this["addAttr" + i] && nextconfig.attr[i].value) {
                        this["addAttr" + i].visible = this["arrow" + i].visible = true;
                        var nstr = "";
                        nstr += value + (nextconfig.attr[i].value - config.attr[i].value);
                        this["addAttr" + i].text = nstr;
                        this["arrow" + i].x = this["attr" + i].x + this["attr" + i].width;
                        this["addAttr" + i].x = this["arrow" + i].x + this["arrow" + i].width;
                    }
                    else {
                        this["addAttr" + i].visible = this["arrow" + i].visible = false;
                    }
                }
            }
            var nextsuitlv = void 0;
            var nextmconfig = void 0;
            var astr = "";
            astr = "合击伤害减免";
            if (isActive) {
                astr += mconfig.exattr[0].value / 100;
                nextsuitlv = UserSkill.ins().getPunchForge().getNextSuitlevel();
                nextmconfig = GlobalConfig.PunchEquipMasterConfig[nextsuitlv];
            }
            else {
                astr += 0;
                nextmconfig = mconfig;
                nextsuitlv = suitlv;
            }
            this.exattr0.text = astr + "%";
            this.arrow4.x = this.exattr0.x + this.exattr0.width + this.arrow4.width;
            this.exattr1.x = this.arrow4.x + this.arrow4.width;
            if (nextmconfig) {
                this.exattr1.text = nextmconfig.exattr[0].value / 100 + "%";
                this.exattr2.x = this.exattr1.x + this.exattr1.width;
                var curLevel = Math.floor(UserSkill.ins().getPunchForge().level / this.maxPos);
                this.exattr2.text = "(\u6CE8\u7075\u7B49\u7EA7\u8FBE\u5230 " + curLevel + "/" + nextsuitlv + ")";
            }
        }
        else {
            var attrs = UserSkill.ins().getPunchForge().getAttributeData();
            config = GlobalConfig.PunchEquipConfig[pos][1];
            for (var i = 0; i < config.attr.length; i++) {
                if (this["attr" + i]) {
                    var str = "";
                    var value = 0;
                    for (var j = 0; j < attrs.length; j++) {
                        if (attrs[j].type == config.attr[i].type) {
                            value = attrs[j].value;
                            break;
                        }
                    }
                    str = AttributeData.getAttrStrByType(config.attr[i].type);
                    str += "+";
                    str += value;
                    this["attr" + i].text = str;
                    if (this["arrow" + i] && this["addAttr" + i] && config.attr[i].value) {
                        this["addAttr" + i].visible = this["arrow" + i].visible = true;
                        var nstr = "";
                        nstr += config.attr[i].value;
                        this["addAttr" + i].text = nstr;
                        this["arrow" + i].x = this["attr" + i].x + this["attr" + i].width;
                        this["addAttr" + i].x = this["arrow" + i].x + this["arrow" + i].width;
                    }
                    else {
                        this["addAttr" + i].visible = this["arrow" + i].visible = false;
                    }
                }
            }
            var mconfig = void 0;
            for (var k in GlobalConfig.PunchEquipMasterConfig) {
                mconfig = GlobalConfig.PunchEquipMasterConfig[k];
                break;
            }
            var astr = "";
            astr = "合击伤害减免";
            astr += 0;
            this.exattr0.text = astr + "%";
            this.arrow4.x = this.exattr0.x + this.exattr0.width + this.arrow4.width;
            this.exattr1.x = this.arrow4.x + this.arrow4.width;
            if (mconfig) {
                this.exattr1.text = mconfig.exattr[0].value / 100 + "%";
                this.exattr2.x = this.exattr1.x + this.exattr1.width;
                this.exattr2.text = "(\u6CE8\u7075\u7B49\u7EA7\u8FBE\u5230 " + 0 + "/" + mconfig.level + ")";
            }
        }
    };
    PunchEquipForge.prototype.updateCost = function (pos, lv) {
        var config;
        if (!pos && !lv) {
            config = GlobalConfig.PunchEquipConfig[0][1];
        }
        else {
            config = UserSkill.ins().getPunchForge().getPosNextLevelConfig(pos);
        }
        if (!config) {
            config = GlobalConfig.PunchEquipConfig[pos][1];
        }
        this.costicon.source = RewardData.getCurrencyRes(config.cost.id);
        var colorStr = "";
        var ptype = UserSkill.ins().getPunchForge().isUpgradePunchForge(pos);
        if (ptype == PunchEquipForgeData.TYPE_OK) {
            colorStr = ColorUtil.GREEN_COLOR;
            this.redPoint.visible = true;
        }
        else {
            this.redPoint.visible = false;
            colorStr = ColorUtil.RED_COLOR;
        }
        var count = 0;
        if (config.cost.id == MoneyConst.punch1) {
            count = Actor.togeatter1;
        }
        else if (config.cost.id == MoneyConst.punch2) {
            count = Actor.togeatter2;
        }
        this.costcount.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + count + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + config.cost.count + "</font> ");
    };
    PunchEquipForge.prototype.setPower = function () {
        var attrs = UserSkill.ins().getPunchForge().getAttributeData();
        var powers = UserBag.getAttrPower(attrs);
        var suitlv = UserSkill.ins().getPunchForge().getSuitlevel();
        var mconfig = GlobalConfig.PunchEquipMasterConfig[suitlv];
        if (mconfig && mconfig.attr) {
            powers += UserBag.getAttrPower(mconfig.attr);
            powers += mconfig.exPower;
        }
        powers *= SubRoles.ins().subRolesLen;
        this.powerPanel.setPower(powers);
    };
    return PunchEquipForge;
}(BaseView));
__reflect(PunchEquipForge.prototype, "PunchEquipForge");
//# sourceMappingURL=PunchEquipForge.js.map