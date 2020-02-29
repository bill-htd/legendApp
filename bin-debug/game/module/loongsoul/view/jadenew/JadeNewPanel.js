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
var JadeNewPanel = (function (_super) {
    __extends(JadeNewPanel, _super);
    function JadeNewPanel() {
        var _this = _super.call(this) || this;
        _this._curRole = 0;
        _this._oldLevel = 0;
        _this._curMaterail = -1;
        _this._oneKeyUp = false;
        return _this;
    }
    JadeNewPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._iconY = this.yupei.y;
        this._iconMoveY = this.yupei.y - 10;
        this.yupei.perLevel = GlobalConfig.JadePlateBaseConfig.perLevel;
        this._danInfo = [];
        var i = 0;
        var itemConfig;
        for (var key in GlobalConfig.JadePlateBaseConfig.upgradeInfo) {
            this["up" + i].name = i;
            itemConfig = GlobalConfig.ItemConfig[key];
            this["up" + i].source = itemConfig.icon + '_png';
            this._danInfo.push({ id: (+key), used: 0, curMax: 0, jade: 0, count: 0 });
            i++;
        }
        this._materialInfo = [];
        i = 0;
        for (var key in GlobalConfig.JadePlateBaseConfig.itemInfo) {
            this["checkBoxs" + i].name = i;
            itemConfig = GlobalConfig.ItemConfig[key];
            this["lvImg" + i].source = itemConfig.icon + '_png';
            this["lvImg" + i].name = key;
            this._materialInfo.push({ id: (+key), count: 0, addExp: (+GlobalConfig.JadePlateBaseConfig.itemInfo[key]) });
            i++;
        }
        for (i = 0; i < 5; i++) {
            this["skillIcon" + i].name = i;
            this["skillIcon" + i].touchEnabled = true;
            this["skillIcon" + i].touchChildren = false;
        }
        this._expBar = new ProgressBarEff();
        this._expBar.setWidth(525);
        this.barGroup.addChild(this._expBar);
        this._expBar.x = -15;
        this._expBar.y = -10;
    };
    JadeNewPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args && args.length)
            this._curRole = args[0];
        this._jadeData = JadeNew.ins().getJadeDataByID(this._curRole);
        if (!this._jadeData)
            return;
        this._oldLevel = this._jadeData.lv;
        this.observe(JadeNew.ins().postJadeData, this.jadeChange);
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.addTouchEvent(this, this.onTouch);
        this.reset();
        this.update();
        this.playIconTween();
        this.initCheckBoxs();
    };
    JadeNewPanel.prototype.initCheckBoxs = function () {
        var len = this._materialInfo.length;
        this._curMaterail = 0;
        for (var i = 0; i < len; i++) {
            if (this._materialInfo[i].count) {
                this._curMaterail = i;
                break;
            }
        }
        this["checkBoxs" + this._curMaterail].selected = true;
    };
    JadeNewPanel.prototype.reset = function () {
        this._curMaterail = -1;
        this.stopOneKyUp();
        this.checkBoxs0.selected = this.checkBoxs1.selected = this.checkBoxs2.selected = false;
        this.stopIconTween();
        this._expBar.reset();
    };
    JadeNewPanel.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
        this.stopIconTween();
        this._curMaterail = -1;
        this.stopOneKyUp();
    };
    JadeNewPanel.prototype.jadeChange = function (roleID) {
        if (this._curRole != roleID)
            return;
        this._jadeData = JadeNew.ins().getJadeDataByID(this._curRole);
        this.update();
    };
    JadeNewPanel.prototype.playIconTween = function () {
        this.yupei.y = this._iconY;
        egret.Tween.removeTweens(this.yupei);
        egret.Tween.get(this.yupei, { loop: true }).to({ y: this._iconMoveY }, 1000).to({ y: this._iconY }, 1000);
    };
    JadeNewPanel.prototype.stopIconTween = function () {
        egret.Tween.removeTweens(this.yupei);
    };
    JadeNewPanel.prototype.update = function () {
        var level = this._jadeData.lv;
        var objAtts = [];
        var cfg = GlobalConfig.JadePlateLevelConfig[level];
        var attr;
        for (var k in cfg.attrs) {
            attr = cfg.attrs[k];
            objAtts.push(new AttributeData(attr.type, attr.value));
        }
        objAtts = this.addDanAtt(objAtts);
        this.powerPanel.setPower(UserBag.getAttrPower(objAtts, SubRoles.ins().getSubRoleByIndex(this._curRole)));
        var phase = Math.floor(level / GlobalConfig.JadePlateBaseConfig.perLevel) + 1;
        this.lv.text = this.getNumStr(phase) + "阶" + this.getNumStr((level % GlobalConfig.JadePlateBaseConfig.perLevel)) + "级";
        var isMax = JadeNew.ins().isJadeMax(this._curRole);
        var isUpgrade;
        this.maxShowGroup.visible = this.maxLevel.visible = isMax;
        this.updateMaterial();
        if (isMax) {
            this.maxGroup.visible = false;
            this.maxCurAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        }
        else {
            this.maxGroup.visible = true;
            isUpgrade = this._oldLevel != level;
            this._oldLevel = level;
            this.curAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
            objAtts = [];
            var nextCfg = GlobalConfig.JadePlateLevelConfig[level + 1];
            for (var k in nextCfg.attrs)
                objAtts.push(new AttributeData(nextCfg.attrs[k].type, nextCfg.attrs[k].value));
            objAtts = this.addDanAtt(objAtts);
            this.nextAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        }
        var jade = Math.floor(level / (GlobalConfig.JadePlateBaseConfig.perLevel * 9));
        this.yupei.setLevel(level, isUpgrade && (level % GlobalConfig.JadePlateBaseConfig.perLevel) == 10);
        if (level % GlobalConfig.JadePlateBaseConfig.perLevel == 10)
            this.barGroup.visible = false;
        else {
            this.barGroup.visible = true;
            if (this._expBar.getMaxValue() != cfg.exp)
                this._expBar.setData(this._jadeData.exp, cfg.exp);
            else
                this._expBar.setValue(this._jadeData.exp);
        }
        cfg = GlobalConfig.JadePlateLevelConfig[(phase - 1) * GlobalConfig.JadePlateBaseConfig.perLevel];
        var len = GlobalConfig.JadePlateBaseConfig.skillUnlock.length;
        var skillLen = cfg.skillIdList ? cfg.skillIdList.length : 0;
        for (var i = 0; i < len; i++) {
            this["blackImg" + i].visible = true;
            for (var j = 0; j < skillLen; j++) {
                if (cfg.skillIdList[j] == GlobalConfig.JadePlateBaseConfig.skillUnlock[i].id)
                    this["blackImg" + i].visible = false;
            }
        }
    };
    JadeNewPanel.prototype.getNumStr = function (num) {
        var list = [];
        if (Math.floor(num / 10)) {
            var shi = Math.floor(num / 10);
            if (shi > 1)
                list.push(shi);
            list.push(10);
            if (num % 10 != 0)
                list.push(num % 10);
        }
        else
            list.push(num % 10);
        var str = "";
        var len = list.length;
        for (var i = 0; i < len; i++) {
            switch (list[i]) {
                case 0:
                    str += "零";
                    break;
                case 1:
                    str += "一";
                    break;
                case 2:
                    str += "二";
                    break;
                case 3:
                    str += "三";
                    break;
                case 4:
                    str += "四";
                    break;
                case 5:
                    str += "五";
                    break;
                case 6:
                    str += "六";
                    break;
                case 7:
                    str += "七";
                    break;
                case 8:
                    str += "八";
                    break;
                case 9:
                    str += "九";
                    break;
                case 10:
                    str += "十";
                    break;
            }
        }
        return str;
    };
    JadeNewPanel.prototype.addDanAtt = function (objAtts) {
        if (this._jadeData.danDate && Object.keys(this._jadeData.danDate).length) {
            var newObj = objAtts.concat();
            var atts = void 0;
            var subLen = void 0;
            for (var key in this._jadeData.danDate) {
                atts = GlobalConfig.JadePlateBaseConfig.upgradeInfo[key];
                if (atts.precent) {
                    var newLen = newObj.length;
                    for (var m = 0; m < newLen; m++) {
                        if (newObj[m].type != AttributeType.atHuiXinDamage)
                            objAtts.push(new AttributeData(newObj[m].type, Math.floor(newObj[m].value * (+this._jadeData.danDate[key]) * atts.precent / 10000)));
                    }
                }
                if (atts.attr) {
                    subLen = atts.attr.length;
                    for (var j = 0; j < subLen; j++)
                        objAtts.push(new AttributeData(atts.attr[j].type, atts.attr[j].value * (+this._jadeData.danDate[key])));
                }
            }
            newObj = [];
            subLen = objAtts.length;
            var obj = new Object();
            for (var i = 0; i < subLen; i++) {
                if (obj[objAtts[i].type] == undefined)
                    obj[objAtts[i].type] = 0;
                obj[objAtts[i].type] += objAtts[i].value;
            }
            for (var key in obj)
                newObj.push(new AttributeData((+key), (+obj[key])));
            return newObj;
        }
        return objAtts;
    };
    JadeNewPanel.prototype.updateMaterial = function () {
        var level = this._jadeData.lv;
        var len = this._danInfo.length;
        var info;
        var itemData;
        var phase = Math.floor(level / GlobalConfig.JadePlateBaseConfig.perLevel) + 1;
        var lvCfg;
        for (var i = 0; i < len; i++) {
            info = this._danInfo[i];
            itemData = UserBag.ins().getBagItemById(info.id);
            info.count = itemData ? itemData.count : 0;
            info.used = this._jadeData.danDate && this._jadeData.danDate[info.id] ? (+this._jadeData.danDate[info.id]) : 0;
            info.jade = phase;
            lvCfg = GlobalConfig.JadePlateLevelConfig[(phase - 1) * GlobalConfig.JadePlateBaseConfig.perLevel];
            info.curMax = lvCfg.upgradeItemInfo && lvCfg.upgradeItemInfo[info.id] ? (+lvCfg.upgradeItemInfo[info.id]) : 0;
            this["used" + i].text = info.used;
            this["redPoint" + i].visible = info.used < info.curMax && info.count;
        }
        len = this._materialInfo.length;
        var material;
        var addExp = 0;
        for (var i = 0; i < len; i++) {
            material = this._materialInfo[i];
            itemData = UserBag.ins().getBagItemById(material.id);
            material.count = itemData ? itemData.count : 0;
            this["lvNum" + i].textFlow = TextFlowMaker.generateTextFlow1("|C:" + (material.count ? 0x00ff00 : 0xff0000) + "&T:" + material.count);
            addExp += (material.addExp * material.count);
        }
        this.normal.visible = (level % GlobalConfig.JadePlateBaseConfig.perLevel) != 10;
        this.upLv.visible = !this.normal.visible;
        this.upgradeBtn0.visible = this.upgradeBtn.visible;
    };
    JadeNewPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.upgradeBtn:
                this.onUpgrade();
                break;
            case this.upgradeBtn0:
                this.onUpgrade(true);
                break;
            case this.upgradeBtn1:
                this.onUpgrade();
                break;
            case this.up0:
            case this.up1:
            case this.up2:
                var info = this._danInfo[e.target.name];
                if (info.used < info.curMax && info.count)
                    JadeNew.ins().sendUseDan(this._curRole, info.id);
                else
                    ViewManager.ins().open(JadeUpTipsWin, info);
                break;
            case this.checkBoxs0:
            case this.checkBoxs1:
            case this.checkBoxs2:
                if (this._oneKeyUp)
                    this.stopOneKyUp();
                var index = (+e.target.name);
                this._curMaterail = -1;
                var box = void 0;
                for (var i = 0; i < 3; i++) {
                    box = this["checkBoxs" + i];
                    if (i == index)
                        this._curMaterail = box.selected ? index : -1;
                    else
                        box.selected = false;
                }
                break;
            case this.skillIcon0:
            case this.skillIcon1:
            case this.skillIcon2:
            case this.skillIcon3:
            case this.skillIcon4:
                var data = GlobalConfig.JadePlateBaseConfig.skillUnlock[e.target.name];
                ViewManager.ins().open(YupeiSkillTipsWin, data.name, data.desc);
                break;
            case this.lvImg0:
            case this.lvImg1:
            case this.lvImg2:
                ViewManager.ins().open(ItemDetailedWin, 0, e.target.name);
                break;
        }
    };
    JadeNewPanel.prototype.onUpgrade = function (isOneKey) {
        if (isOneKey === void 0) { isOneKey = false; }
        if (isOneKey && this._oneKeyUp) {
            this.stopOneKyUp();
            return;
        }
        if (this._oneKeyUp)
            this.stopOneKyUp();
        if ((this._jadeData.lv % GlobalConfig.JadePlateBaseConfig.perLevel) == 10)
            JadeNew.ins().sendUpgrade(this._curRole, this._materialInfo[0].id);
        else {
            if (this._curMaterail == -1)
                UserTips.ins().showTips("请先选择需要消耗的道具");
            else if (this._materialInfo[this._curMaterail].count <= 0) {
                UserTips.ins().showTips("|C:" + 0xff0000 + "&T:\u6750\u6599\u4E0D\u8DB3");
                UserWarn.ins().setBuyGoodsWarn(this._materialInfo[this._curMaterail].id);
            }
            else {
                var count = this._materialInfo[this._curMaterail].count;
                if (count > 1 && isOneKey) {
                    TimerManager.ins().doTimer(150, count, this.sendUp, this, this.stopOneKyUp, this);
                    this.upgradeBtn0.label = "停  止";
                    this._oneKeyUp = true;
                }
                else
                    JadeNew.ins().sendUpgrade(this._curRole, this._materialInfo[this._curMaterail].id);
            }
        }
    };
    JadeNewPanel.prototype.stopOneKyUp = function () {
        this._oneKeyUp = false;
        this.upgradeBtn0.label = "一键升级";
        TimerManager.ins().remove(this.sendUp, this);
    };
    JadeNewPanel.prototype.sendUp = function () {
        if ((this._jadeData.lv % GlobalConfig.JadePlateBaseConfig.perLevel) == 10) {
            this.stopOneKyUp();
            return;
        }
        JadeNew.ins().sendUpgrade(this._curRole, this._materialInfo[this._curMaterail].id);
    };
    return JadeNewPanel;
}(BaseEuiView));
__reflect(JadeNewPanel.prototype, "JadeNewPanel");
//# sourceMappingURL=JadeNewPanel.js.map