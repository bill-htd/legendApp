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
var HunguTipsWin = (function (_super) {
    __extends(HunguTipsWin, _super);
    function HunguTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "hunguTipsSkin";
        return _this;
    }
    HunguTipsWin.prototype.childrenCreated = function () {
    };
    HunguTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    HunguTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.currentState = param[0] ? "shenshang" : "putong";
        this.validateNow();
        this.addTouchEvent(this.bgClose, this.onTap);
        if (this.currentState == "shenshang") {
            this.addTouchEvent(this.takeoffBtn, this.onTap);
            this.addTouchEvent(this.changeBtn, this.onTap);
            this.addTouchEvent(this.hunyuBtn, this.onTap);
            this.wear = true;
        }
        this.observe(Hungu.ins().postHunguItems, this.HunguItemsCallback);
        this.observe(Hungu.ins().postHunguItemUpgrade, this.HunguItemUpgradeCallback);
        this.roleId = param[1];
        this.itemId = param[2];
        this.updateUI();
    };
    HunguTipsWin.prototype.HunguItemsCallback = function () {
        ViewManager.ins().close(this);
    };
    HunguTipsWin.prototype.HunguItemUpgradeCallback = function () {
        var pos = ItemConfig.getSubType(GlobalConfig.ItemConfig[this.itemId]);
        this.itemId = Hungu.ins().hunguData[this.roleId].items[pos].itemId;
        this.updateUI();
    };
    HunguTipsWin.prototype.updateUI = function () {
        var config = GlobalConfig.ItemConfig[this.itemId];
        this.equipIcon.setData(config);
        var color = ItemConfig.getQualityColor(config);
        this.nameTxt.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + config.name);
        var q = ItemConfig.getQuality(config);
        this.quali.source = q > 0 ? "quali" + q : "";
        this.toubuhungu.textFlow = TextFlowMaker.generateTextFlow1("" + Hungu.ins().getHunguPosName(ItemConfig.getSubType(config)));
        this.fanpin.textFlow = TextFlowMaker.generateTextFlow1("" + Hungu.ins().getHunguItemQualityName(config.id));
        this.tongyong.textFlow = TextFlowMaker.generateTextFlow1("" + Role.getJobNameByJob(ItemConfig.getJob(config)));
        var power = 0;
        var suit = Hungu.ins().getSuitData(this.roleId);
        if (this.wear) {
            power += Hungu.ins().getHunguPosPower(this.roleId, ItemConfig.getSubType(config), suit, true);
        }
        else {
            power += Hungu.ins().getHunguItemPower(config.id);
        }
        this.powerPanel.setPower(power);
        var jcattrs = [];
        var exjcattrs = [];
        var hyattrs = [];
        var hgequip = GlobalConfig.HunGuEquip[this.itemId];
        for (var j = 0; j < hgequip.attrs.length; j++) {
            var ishave = false;
            for (var z = 0; z < jcattrs.length; z++) {
                if (jcattrs[z].type == hgequip.attrs[j].type) {
                    jcattrs[z].value += hgequip.attrs[j].value;
                    ishave = true;
                    break;
                }
            }
            if (!ishave) {
                jcattrs.push(new AttributeData(hgequip.attrs[j].type, hgequip.attrs[j].value));
            }
        }
        if (this.wear && Hungu.ins().hunguData[this.roleId]) {
            var percent = [];
            for (var i in suit) {
                for (var j in suit[i]) {
                    if (suit[i][j].count.length >= (+j)) {
                        var stage = suit[i][j].stage;
                        var hgsuit = GlobalConfig.HunGuSuit[i][j][stage];
                        if (hgsuit && hgsuit.specialAttrs) {
                            percent.push(hgsuit.specialAttrs / 10000);
                        }
                    }
                }
            }
            if (percent.length) {
                for (var i = 0; i < percent.length; i++) {
                    for (var j = 0; j < jcattrs.length; j++) {
                        exjcattrs.push(new AttributeData(jcattrs[j].type, Math.floor(jcattrs[j].value * percent[i])));
                    }
                }
            }
            this.updateRedPoint();
            for (var i = 0; i < Hungu.ins().hunguData[this.roleId].items[ItemConfig.getSubType(config)].hunyu.length; i++) {
                var lv = Hungu.ins().hunguData[this.roleId].items[ItemConfig.getSubType(config)].hunyu[i];
                var hyType = GlobalConfig.HunGuConf.hunyuType[ItemConfig.getSubType(config)][i];
                var hyequip = GlobalConfig.HunYuEquip[hyType][lv];
                if (hyequip) {
                    for (var j = 0; j < hyequip.attrs.length; j++) {
                        var ishave = false;
                        for (var z = 0; z < hyattrs.length; z++) {
                            if (hyattrs[z].type == hyequip.attrs[j].type) {
                                hyattrs[z].value += hyequip.attrs[j].value;
                                ishave = true;
                                break;
                            }
                        }
                        if (!ishave) {
                            hyattrs.push(new AttributeData(hyequip.attrs[j].type, hyequip.attrs[j].value));
                        }
                    }
                }
            }
        }
        var proShowList = [2, 4, 5, 6];
        var idx = 0;
        var hidex = 0;
        for (var i = 0; i < proShowList.length; i++) {
            if (this["attr" + i] && this["forgeAttr" + i]) {
                this["attr" + i].visible = this["forgeAttr" + i].visible = false;
            }
            if (this["starAttr" + i]) {
                this["starAttr" + i].visible = false;
            }
            if (this["attr" + idx] && this["forgeAttr" + idx]) {
                this["attr" + idx].visible = this["forgeAttr" + idx].visible = false;
                for (var j = 0; j < jcattrs.length; j++) {
                    if (jcattrs[j].type == proShowList[i]) {
                        this["attr" + idx].visible = true;
                        this["attr" + idx].text = AttributeData.getAttStr(jcattrs[j], 0, 1, ":");
                        if (this.currentState == "shenshang" && exjcattrs[j]) {
                            this["forgeAttr" + idx].visible = true;
                            this["forgeAttr" + idx].text = "+" + exjcattrs[j].value;
                        }
                        break;
                    }
                }
                if (this["attr" + idx].visible)
                    idx++;
            }
            if (this["starAttr" + hidex]) {
                this["starAttr" + hidex].visible = false;
                for (var j = 0; j < hyattrs.length; j++) {
                    if (hyattrs[j].type == proShowList[i]) {
                        this["starAttr" + hidex].visible = true;
                        this["starAttr" + hidex].text = AttributeData.getAttStr(hyattrs[j], 0, 1, ":");
                        break;
                    }
                }
                if (this["starAttr" + hidex].visible)
                    hidex++;
            }
        }
        for (var i = 0; i <= 3; i++) {
            if (this["attr" + i] && !this["attr" + i].visible) {
                DisplayUtils.removeFromParent(this["attr" + i].parent);
            }
            if (this["starAttr" + i] && !this["starAttr" + i].visible) {
                DisplayUtils.removeFromParent(this["starAttr" + i]);
            }
        }
        if (this.starAttr.numElements <= 1) {
            DisplayUtils.removeFromParent(this.starAttr);
        }
    };
    HunguTipsWin.prototype.updateRedPoint = function () {
        var config = GlobalConfig.ItemConfig[this.itemId];
        var pos = ItemConfig.getSubType(config);
        this.changeRedPoint.visible = Hungu.ins().getUpgradeRedPoint(config.id);
        this.forgeRedPoint.visible = Hungu.ins().getHunyuRedPoint(this.roleId, pos);
    };
    HunguTipsWin.prototype.onTap = function (e) {
        var config = GlobalConfig.ItemConfig[this.itemId];
        var pos = ItemConfig.getSubType(config);
        switch (e.currentTarget) {
            case this.takeoffBtn:
                if (this.currentState != "shenshang") {
                    UserTips.ins().showTips("\u4E0D\u5728\u8EAB\u4E0A\u5378\u8F7D\u5F02\u5E38");
                    return;
                }
                if (Hungu.ins().hunguData[this.roleId] && Hungu.ins().hunguData[this.roleId].items[pos]) {
                    Hungu.ins().sendHunguItems(this.roleId, pos, 0);
                    return;
                }
                else {
                    UserTips.ins().showTips("\u6CA1\u6709\u53EF\u5378\u8F7D\u7684\u88C5\u5907");
                }
                break;
            case this.changeBtn:
                if (Hungu.ins().getNextHunguId(this.roleId, pos))
                    ViewManager.ins().open(HunguStageWin, this.roleId, pos);
                else
                    UserTips.ins().showTips("\u5DF2\u6EE1\u7EA7");
                break;
            case this.hunyuBtn:
                if (this.currentState != "shenshang") {
                    UserTips.ins().showTips("\u4E0D\u5728\u8EAB\u4E0A\u9B42\u7389\u5F02\u5E38");
                    return;
                }
                ViewManager.ins().open(HunyuWin, this.roleId, this.itemId);
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return HunguTipsWin;
}(BaseEuiView));
__reflect(HunguTipsWin.prototype, "HunguTipsWin");
ViewManager.ins().reg(HunguTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=HunguTipsWin.js.map