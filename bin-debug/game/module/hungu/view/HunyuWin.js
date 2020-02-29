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
var HunyuWin = (function (_super) {
    __extends(HunyuWin, _super);
    function HunyuWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "hunguJewelSkin";
        _this.isTopLevel = true;
        return _this;
    }
    HunyuWin.prototype.childrenCreated = function () {
    };
    HunyuWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    HunyuWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        ViewManager.ins().close(HunguTipsWin);
        this.addTouchEvent(this.executeBtn0, this.onTap);
        this.addTouchEvent(this.executeBtn, this.onTap);
        this.addTouchEvent(this.getItemTxt0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(Hungu.ins().postHunyu, this.updateShow);
        this.observe(Hungu.ins().postHunyu, this.playEff);
        for (var i = 0; i < GlobalConfig.HunGuConf.hunyuCount; i++) {
            this.addTouchEvent(this["equip" + i], this.onSelect);
        }
        this.roleId = param[0];
        this.itemId = param[1];
        this.kong = param[2] || 0;
        this["equip" + this.kong].select.visible = true;
        this.updateShow();
    };
    HunyuWin.prototype.onSelect = function (e) {
        for (var i = 0; i < GlobalConfig.HunGuConf.hunyuCount; i++) {
            var equipItem = this["equip" + i];
            equipItem.select.visible = false;
            if (equipItem && e.currentTarget == equipItem) {
                var config = GlobalConfig.ItemConfig[this.itemId];
                var pos = ItemConfig.getSubType(config);
                if (i + 1 > GlobalConfig.HunGuEquip[Hungu.ins().hunguData[this.roleId].items[pos].itemId].hunyuNum) {
                    var qualityName = Hungu.ins().getHunguItemQualityName(0, i + 1);
                    if (qualityName)
                        UserTips.ins().showTips("\u878D\u5408" + qualityName + "\u9B42\u9AA8\u540E\u5F00\u542F");
                    this["equip" + this.kong].select.visible = true;
                }
                else if (this.kong != i) {
                    equipItem.select.visible = true;
                    this.kong = i;
                    this.updateShow();
                }
                else {
                    equipItem.select.visible = true;
                }
            }
        }
    };
    HunyuWin.prototype.updateShow = function () {
        this.updateAct();
        this.updateUI();
        this.getItemTxt0.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.getItemTxt0.text);
    };
    HunyuWin.prototype.playEff = function () {
        var hyequipItem = this["equip" + this.kong];
        if (hyequipItem) {
            var mc = new MovieClip();
            mc.playFile(RES_DIR_EFF + "forgeSuccess", 1);
            hyequipItem.eff.addChild(mc);
        }
    };
    HunyuWin.prototype.updateUI = function () {
        this.hide();
        this.updateItems();
    };
    HunyuWin.prototype.updateItems = function () {
        var equipItem = this["equip"];
        var itemIcon = equipItem.itemIcon;
        var config = GlobalConfig.ItemConfig[this.itemId];
        itemIcon.setData(config);
        var pos = ItemConfig.getSubType(config);
        var ins = Hungu.ins();
        for (var i = 0; i < GlobalConfig.HunGuConf.hunyuCount; i++) {
            var hyequipItem = this["equip" + i];
            var openText = hyequipItem.openText;
            if (!hyequipItem)
                continue;
            var b = ins.getHunyuKongRedPoint(this.roleId, pos, i);
            hyequipItem.redPoint.visible = b;
            var hyitemIcon = hyequipItem.itemIcon;
            hyitemIcon.icon.visible = false;
            hyequipItem.kejihuo.visible = false;
            hyitemIcon.lock.visible = false;
            openText.visible = false;
            hyequipItem.level.visible = false;
            hyequipItem.lvBg.visible = true;
            var hunyuNum = GlobalConfig.HunGuEquip[ins.hunguData[this.roleId].items[pos].itemId].hunyuNum;
            if (i + 1 > hunyuNum) {
                hyitemIcon.lock.visible = true;
                if (i == hunyuNum) {
                    openText.visible = true;
                    var qualityName = Hungu.ins().getHunguItemQualityName(0, i + 1);
                    if (qualityName)
                        openText.text = qualityName + "\u5F00\u542F";
                }
                else {
                    hyequipItem.lvBg.visible = false;
                }
            }
            else {
                hyequipItem.level.visible = true;
                hyitemIcon.icon.visible = true;
                var hylv = ins.hunguData[this.roleId].items[pos].hunyu[i];
                if (hylv) {
                    var hyt = GlobalConfig.HunGuConf.hunyuType[pos][i];
                    hyitemIcon.icon.source = GlobalConfig.HunYuEquip[hyt][hylv].icon;
                    hyequipItem.level.text = hylv + "\u7EA7";
                }
                else {
                    hyequipItem.level.text = 0 + "\u7EA7";
                    if (b) {
                        hyequipItem.kejihuo.visible = true;
                        hyitemIcon.icon.visible = false;
                        hyequipItem.lvBg.visible = false;
                        hyequipItem.level.visible = false;
                    }
                }
            }
        }
        var power = 0;
        if (ins.hunguData[this.roleId] && ins.hunguData[this.roleId].items[pos].hunyu) {
            var hyT = GlobalConfig.HunGuConf.hunyuType[pos][this.kong];
            for (var i = 0; i < ins.hunguData[this.roleId].items[pos].hunyu.length; i++) {
                var lv = ins.hunguData[this.roleId].items[pos].hunyu[i];
                var hyequip = GlobalConfig.HunYuEquip[hyT][lv];
                if (hyequip) {
                    power += UserBag.getAttrPower(hyequip.attrs, SubRoles.ins().getSubRoleByIndex(this.roleId));
                    var expower = hyequip.expower ? hyequip.expower : 0;
                    power += expower;
                }
            }
        }
        this.powerPanel0.setPower(power);
        var hyType = GlobalConfig.HunGuConf.hunyuType[pos][this.kong];
        if (this.currentState == "activation") {
            var config_1 = GlobalConfig.HunYuEquip[hyType][1];
            var costYb = GlobalConfig.HunGuConf.unlockCost[this.kong + 1];
            var color = ColorUtil.RED_COLOR_N;
            if (!this.kong && config_1.cost) {
                this.actRMB = false;
                costYb = config_1.cost.count;
                var itemData = UserBag.ins().getBagItemById(config_1.cost.id);
                var myCount = itemData ? itemData.count : 0;
                if (myCount >= costYb)
                    color = ColorUtil.GREEN_COLOR_N;
                this.icon0.source = GlobalConfig.ItemConfig[config_1.cost.id].icon + "_png";
                this.countLabel0.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + myCount + "|/" + costYb);
            }
            else {
                this.actRMB = true;
                this.icon0.source = "szyuanbao";
                if (Actor.yb >= costYb)
                    color = ColorUtil.GREEN_COLOR_N;
                this.countLabel0.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + Actor.yb + "|/" + costYb);
            }
            this.name0.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.HunYuEquip[hyType][1].name);
            this.att0.text = AttributeData.getAttStr(GlobalConfig.HunYuEquip[hyType][1].attrs, 1);
        }
        else if (this.currentState == "max") {
            var lv = ins.hunguData[this.roleId].items[pos].hunyu[this.kong];
            this.name1.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.HunYuEquip[hyType][lv].name);
            this.att1.text = AttributeData.getAttStr(GlobalConfig.HunYuEquip[hyType][lv].attrs, 1);
        }
        else {
            var lv = ins.hunguData[this.roleId].items[pos].hunyu[this.kong];
            this.curname.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.HunYuEquip[hyType][lv].name);
            this.curAtt0.text = AttributeData.getAttStr(GlobalConfig.HunYuEquip[hyType][lv].attrs, 1);
            this.nextname.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.HunYuEquip[hyType][lv + 1].name);
            this.nextAtt0.text = AttributeData.getAttStr(GlobalConfig.HunYuEquip[hyType][lv + 1].attrs, 1);
            var hycfg = Hungu.ins().getNextHunyuLvConfig(this.roleId, pos, this.kong);
            if (hycfg) {
                var color = ColorUtil.RED_COLOR_N;
                var total = hycfg.cost.count;
                var itemData = UserBag.ins().getBagItemById(hycfg.cost.id);
                var curCount = itemData ? itemData.count : 0;
                if (curCount >= total)
                    color = ColorUtil.GREEN_COLOR_N;
                this.countLabel1.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + curCount + "|/" + total);
                this.icon1.source = GlobalConfig.ItemConfig[hycfg.cost.id].icon + "_png";
            }
        }
    };
    HunyuWin.prototype.hide = function () {
        var equipItem = this["equip"];
        var itemIcon = equipItem.itemIcon;
        equipItem.level.visible = false;
        for (var i = 0; i < GlobalConfig.HunGuConf.hunyuCount; i++) {
            var hyequipItem = this["equip" + i];
            itemIcon = hyequipItem.itemIcon;
            hyequipItem.level.visible = false;
        }
    };
    HunyuWin.prototype.updateAct = function () {
        var ins = Hungu.ins();
        var config = GlobalConfig.ItemConfig[this.itemId];
        var pos = ItemConfig.getSubType(config);
        if (!ins.hunguData[this.roleId] || !ins.hunguData[this.roleId].items[pos].hunyu[this.kong]) {
            this.currentState = "activation";
        }
        else {
            var hyType = GlobalConfig.HunGuConf.hunyuType[pos][this.kong];
            var lv = ins.hunguData[this.roleId].items[pos].hunyu[this.kong];
            if (lv >= CommonUtils.getObjectLength(GlobalConfig.HunYuEquip[hyType])) {
                this.currentState = "max";
            }
            else {
                this.currentState = "upgrade";
            }
        }
        this.validateNow();
    };
    HunyuWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.executeBtn0:
                if (this.currentState == "activation") {
                    if (this.actRMB) {
                        var needYb = GlobalConfig.HunGuConf.unlockCost[this.kong + 1];
                        if (Actor.yb >= needYb) {
                            var config = GlobalConfig.ItemConfig[this.itemId];
                            var pos = ItemConfig.getSubType(config);
                            Hungu.ins().sendHunyu(this.roleId, pos, this.kong + 1);
                        }
                        else {
                            UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
                        }
                    }
                    else {
                        var cfg = GlobalConfig.ItemConfig[this.itemId];
                        var ps = ItemConfig.getSubType(cfg);
                        var hyt = GlobalConfig.HunGuConf.hunyuType[ps][this.kong];
                        var hyeq = GlobalConfig.HunYuEquip[hyt][1];
                        var itemData = UserBag.ins().getBagItemById(hyeq.cost.id);
                        var myCount = itemData ? itemData.count : 0;
                        if (myCount >= hyeq.cost.count) {
                            Hungu.ins().sendHunyu(this.roleId, ps, this.kong + 1);
                        }
                        else {
                            UserTips.ins().showTips("\u6750\u6599\u4E0D\u8DB3");
                        }
                    }
                }
                else {
                    UserTips.ins().showTips("\u975E\u53EF\u6FC0\u6D3B\u72B6\u6001");
                }
                break;
            case this.executeBtn:
                if (this.currentState == "upgrade") {
                    var config = GlobalConfig.ItemConfig[this.itemId];
                    var pos = ItemConfig.getSubType(config);
                    var hyequip = Hungu.ins().getNextHunyuLvConfig(this.roleId, pos, this.kong);
                    if (hyequip && hyequip.cost) {
                        var itemData = UserBag.ins().getBagItemById(hyequip.cost.id);
                        var mycount = itemData ? itemData.count : 0;
                        if (mycount >= hyequip.cost.count) {
                            Hungu.ins().sendHunyu(this.roleId, pos, this.kong + 1);
                        }
                        else {
                            UserTips.ins().showTips("\u6750\u6599\u4E0D\u8DB3");
                        }
                    }
                    else {
                        UserTips.ins().showTips("\u9B42\u7389\u6D88\u8017\u6570\u636E\u5F02\u5E38");
                    }
                }
                else {
                    UserTips.ins().showTips("\u975E\u53EF\u5347\u7EA7\u72B6\u6001");
                }
                break;
            case this.getItemTxt0:
                if (this.currentState == "upgrade") {
                    var config = GlobalConfig.ItemConfig[this.itemId];
                    var pos = ItemConfig.getSubType(config);
                    var hyType = GlobalConfig.HunGuConf.hunyuType[pos][this.kong];
                    var lv = Hungu.ins().hunguData[this.roleId].items[pos].hunyu[this.kong];
                    var hyequip = GlobalConfig.HunYuEquip[hyType][lv + 1];
                    if (hyequip && hyequip.cost) {
                        UserWarn.ins().setBuyGoodsWarn(hyequip.cost.id);
                    }
                }
                else {
                    UserTips.ins().showTips("\u975E\u83B7\u53D6\u9053\u5177\u72B6\u6001");
                }
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return HunyuWin;
}(BaseEuiView));
__reflect(HunyuWin.prototype, "HunyuWin");
ViewManager.ins().reg(HunyuWin, LayerManager.UI_Main);
//# sourceMappingURL=HunyuWin.js.map