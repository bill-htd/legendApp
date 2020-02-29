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
var HeartMethodWin = (function (_super) {
    __extends(HeartMethodWin, _super);
    function HeartMethodWin() {
        var _this = _super.call(this) || this;
        _this.heartPages = [];
        return _this;
    }
    HeartMethodWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.stopIconTween();
        this.removeObserve();
    };
    HeartMethodWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.stopIconTween();
        this.addTouchEvent(this.xiangxishuxing, this.onTap);
        this.addTouchEvent(this.skill, this.onTap);
        this.addTouchEvent(this.fenjie, this.onTap);
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.rightBtn, this.onTap);
        this.addTouchEvent(this.activeBtn0, this.onTap);
        this.addTouchEvent(this.boostBtn, this.onTap);
        this.addTouchEvent(this.getItemTxt0, this.onTap);
        this.observe(HeartMethodRedPoint.ins().postHeartRoleRedPoint, this.updateUI);
        for (var i = 0; i < 5; i++) {
            this.addTouchEvent(this["item" + (i + 1)], this.onSlot);
        }
        var selectedIndex = (param && param[0]) ? param[0] : 0;
        this.curRole = selectedIndex;
        this.heartId = (param && param[1]) ? param[1] : 1;
        this.init();
        this.updateUI();
    };
    HeartMethodWin.prototype.onSlot = function (e) {
        var id = this.getHeartId(this.heartPos);
        for (var i = 0; i < 5; i++) {
            if (e.currentTarget == this["item" + (i + 1)]) {
                var slotId = HeartMethod.ins().getHeartSlotItemId(this.curRole, id, i + 1);
                if (!slotId) {
                    var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_18);
                    itemData.sort(HeartMethod.ins().changeSort);
                    var isSend = false;
                    for (var k in itemData) {
                        var sconfig = GlobalConfig.HeartMethodStarConfig[itemData[k].configID];
                        if (sconfig.heartmethodId == id) {
                            var pos = GlobalConfig.HeartMethodConfig[id].posList.indexOf(sconfig.posId);
                            if (pos != -1 && pos == i) {
                                isSend = true;
                                HeartMethod.ins().sendHeartChange(this.curRole, id, i + 1, sconfig.posItem);
                                break;
                            }
                        }
                    }
                    if (!isSend)
                        UserTips.ins().showTips("\u8EAB\u4E0A\u6CA1\u6709\u9002\u5408\u7684\u9053\u5177\u7A7F\u6234");
                }
                else {
                    ViewManager.ins().open(HeartMethodTips, this.curRole, id, slotId);
                }
                break;
            }
        }
    };
    HeartMethodWin.prototype.onTap = function (e) {
        var id = this.getHeartId(this.heartPos);
        switch (e.currentTarget) {
            case this.boostBtn:
                if (this.currentState == "narmal") {
                    if (!HeartMethod.ins().heartUpCondition(this.curRole, id)) {
                        UserTips.ins().showTips("|C:0xff0000&T:\u6761\u4EF6\u4E0D\u8DB3");
                        return;
                    }
                    if (!this.isHeartUp) {
                        UserTips.ins().showTips("|C:0xff0000&T:\u6750\u6599\u4E0D\u8DB3");
                        return;
                    }
                    HeartMethod.ins().sendHeartUpLevel(this.curRole, id, 0);
                }
                else if (this.currentState == "stage") {
                    HeartMethod.ins().sendHeartUpLevel(this.curRole, id, 0);
                }
                break;
            case this.activeBtn0:
                this.isAct = true;
                HeartMethod.ins().sendHeartUpLevel(this.curRole, id, 0);
                break;
            case this.xiangxishuxing:
                ViewManager.ins().open(HeartMethodAttrWin, this.curRole, id);
                break;
            case this.skill:
                ViewManager.ins().open(HeartMethodSkillTips, this.curRole, id);
                break;
            case this.fenjie:
                ViewManager.ins().open(HeartMethodDecomposePanel, id);
                break;
            case this.leftBtn:
                var preId = this.getHeartId(this.heartPos - 1);
                var precfg = GlobalConfig.HeartMethodConfig[preId];
                if (precfg) {
                    this.heartPos--;
                    this.heartId = preId;
                    this.updateUI();
                }
                else {
                    UserTips.ins().showTips("\u6CA1\u6709\u4E0A\u4E00\u4E2A\u5FC3\u6CD5");
                }
                break;
            case this.rightBtn:
                var nextId = this.getHeartId(this.heartPos + 1);
                var nextcfg = GlobalConfig.HeartMethodConfig[nextId];
                if (nextcfg) {
                    this.heartPos++;
                    this.heartId = nextId;
                    this.updateUI();
                }
                else {
                    UserTips.ins().showTips("\u6CA1\u6709\u4E0B\u4E00\u4E2A\u5FC3\u6CD5");
                }
                break;
            case this.getItemTxt0:
                if (this.conditionDesc.visible) {
                    var hmcfg = GlobalConfig.HeartMethodConfig[this.getHeartId(this.heartPos)];
                    UserWarn.ins().setBuyGoodsWarn(hmcfg.posGainGuide);
                }
                else
                    UserWarn.ins().setBuyGoodsWarn(this.costId);
                break;
        }
    };
    HeartMethodWin.prototype.init = function () {
        this.showGroupY = this.showGroup.y;
        this.showGroupMoveY = this.showGroupY - 10;
        this.heartPages = [];
        for (var k in GlobalConfig.HeartMethodConfig) {
            this.heartPages.push(GlobalConfig.HeartMethodConfig[k]);
        }
        this.heartPages.sort(function (a, b) {
            if (a.sort < b.sort)
                return -1;
            else
                return 1;
        });
        this.heartPos = 0;
        for (var i = 0; i < this.heartPages.length; i++) {
            if (this.heartPages[i].id == this.heartId) {
                this.heartPos = i;
                break;
            }
        }
    };
    HeartMethodWin.prototype.getHeartId = function (posId) {
        if (this.heartPages[posId])
            return this.heartPages[posId].id;
        return 0;
    };
    HeartMethodWin.prototype.updateUI = function () {
        this.updateAct();
        this.updateState();
        this.updatePower();
        this.updateHeart();
        this.updateRedPoint();
        this.updateBtn();
    };
    HeartMethodWin.prototype.updateAct = function () {
        if (this.isAct) {
            Activationtongyong.show(0, GlobalConfig.HeartMethodConfig[this.heartId].name, GlobalConfig.HeartMethodConfig[this.heartId].pic);
        }
        this.isAct = false;
    };
    HeartMethodWin.prototype.updateBtn = function () {
        this.leftBtn.visible = this.rightBtn.visible = true;
        var id = this.getHeartId(this.heartPos - 1);
        var cfg = GlobalConfig.HeartMethodConfig[id];
        if (!cfg) {
            this.redPoint2.visible = this.leftBtn.visible = false;
        }
        else {
            if (!HeartMethod.ins().heartOpenCondition(id)) {
                this.redPoint2.visible = this.leftBtn.visible = false;
            }
        }
        id = this.getHeartId(this.heartPos + 1);
        cfg = GlobalConfig.HeartMethodConfig[id];
        if (!cfg) {
            this.redPoint3.visible = this.rightBtn.visible = false;
        }
        else {
            if (!HeartMethod.ins().heartOpenCondition(id)) {
                this.redPoint3.visible = this.rightBtn.visible = false;
            }
        }
        id = this.getHeartId(this.heartPos);
        cfg = GlobalConfig.HeartMethodConfig[id];
        var zslv = cfg.openCondition ? cfg.openCondition.zs : GlobalConfig.HeartMethodBaseConfig.zsLv;
        this.sysDescText0.text = cfg.openTips + "\n\n" + zslv + "\u8F6C\u53EF\u5B66\u4E60";
    };
    HeartMethodWin.prototype.updateState = function () {
        var id = this.getHeartId(this.heartPos);
        var hminfo = HeartMethod.ins().HeartMethodInfo[this.curRole];
        if (!hminfo || !hminfo[id] || !hminfo[id].id) {
            this.currentState = "open";
        }
        else if (HeartMethod.ins().isHeartMax(this.curRole, id)) {
            this.currentState = "max";
        }
        else if (hminfo[id].isUp) {
            this.currentState = "stage";
        }
        else {
            this.currentState = "narmal";
        }
        this.validateNow();
    };
    HeartMethodWin.prototype.updatePower = function () {
        var id = this.getHeartId(this.heartPos);
        var proShowList = HeartMethod.ins().proShowList;
        var attrvalue = HeartMethod.ins().calcHeartTotalValue(this.curRole, id);
        var attr = [];
        for (var i = 0; i < proShowList.length; i++) {
            var at = new AttributeData();
            at.type = proShowList[i].id;
            at.value = attrvalue[i];
            attr.push(at);
        }
        var power = UserBag.getAttrPower(attr);
        var hminfo = HeartMethod.ins().HeartMethodInfo[this.curRole];
        if (hminfo) {
            var hmdata = hminfo[id];
            if (hmdata) {
                var hmLevelConfig = GlobalConfig.HeartMethodLevelConfig[id][hmdata.lv];
                if (hmLevelConfig) {
                    var lpower = hmLevelConfig.power ? hmLevelConfig.power : 0;
                    power += lpower;
                }
            }
        }
        var suitLv = HeartMethod.ins().calcHeartSkillLevel(this.curRole, id);
        if (suitLv) {
            var suitConfig = GlobalConfig.HeartMethodSuitConfig[id][suitLv];
            var expower = suitConfig.power ? suitConfig.power : 0;
            power += expower;
        }
        this.powerPanel.setPower(power);
    };
    HeartMethodWin.prototype.updateHeart = function () {
        var id = this.getHeartId(this.heartPos);
        var hminfo = HeartMethod.ins().HeartMethodInfo[this.curRole];
        var hmdconfig = GlobalConfig.HeartMethodConfig[id];
        if (hmdconfig) {
            this.bigIcon.source = hmdconfig.pic;
            if (!this.bigEff)
                this.bigEff = new MovieClip;
            if (!this.bigEff.parent)
                this.effGroup.addChild(this.bigEff);
            var slv = HeartMethod.ins().calcHeartSkillLevel(this.curRole, id);
            if (slv) {
                var suitConfig = GlobalConfig.HeartMethodSuitConfig[id][slv];
                this.bigEff.playFile(RES_DIR_EFF + suitConfig.inside, -1);
            }
            else
                this.bigEff.playFile(RES_DIR_EFF + hmdconfig.inside, -1);
        }
        if (hminfo && hminfo[id]) {
            this.heartmethodStage.visible = true;
            this.heartmethodStage.setValue(hminfo[id].stage);
            this.xinfaName.text = hmdconfig ? hmdconfig.name : "";
        }
        else {
            this.heartmethodStage.visible = false;
        }
        if (hmdconfig && hminfo && hminfo[id]) {
            for (var i = 0; i < hmdconfig.posList.length; i++) {
                var pId = hmdconfig.posList[i];
                var redPoint = false;
                var slotId = HeartMethod.ins().getHeartSlotItemId(this.curRole, id, i + 1);
                redPoint = slotId ? true : false;
                if (slotId) {
                    var isBug = true;
                    for (var j = 0; j < hminfo[id].slots.length; j++) {
                        var itemid = hminfo[id].slots[j];
                        var sId = HeartMethod.ins().calcHeartSlotChange(this.curRole, id, itemid);
                        redPoint = sId ? true : false;
                        if (!redPoint && itemid)
                            redPoint = HeartMethod.ins().calcHeartSlotCost(itemid);
                        var hmscfg = GlobalConfig.HeartMethodStarConfig[itemid];
                        if (hmscfg && hmscfg.posId == pId) {
                            isBug = false;
                            this["item" + (i + 1)].data = { itemid: itemid, redPoint: redPoint };
                            break;
                        }
                    }
                    if (isBug) {
                        ErrorLog.Assert(!isBug, "Bug\u5B9A\u4F4D:\u89D2\u8272id:" + this.curRole + " \u5FC3\u6CD5id:" + id + " \u90E8\u4F4D\u7D22\u5F15:" + (i + 1) + " \u90E8\u4F4Did:" + pId + " itemId:" + slotId + "\u6570\u636E\u5F02\u5E38");
                        this["item" + (i + 1)].data = null;
                    }
                }
                else {
                    var configId = HeartMethod.ins().getHeartSlotItemIdWear(this.curRole, id, i + 1);
                    redPoint = configId ? true : false;
                    this["item" + (i + 1)].data = { blank: hmdconfig.blankIcon[i], redPoint: redPoint };
                }
            }
            var attrs = HeartMethod.ins().calcHeartAttrs(this.curRole, id);
            var attrsNext = HeartMethod.ins().calcHeartAttrsNext(this.curRole, id);
            this.curAtt0.text = AttributeData.getAttStr(attrs, 0, 1, "：");
            this.nextAtt0.text = AttributeData.getAttStr(attrsNext, 0, 1, "：");
            var cost = HeartMethod.ins().calcHeartCost(this.curRole, id);
            this.redPoint0.visible = false;
            this.isHeartUp = false;
            var item = void 0;
            if (cost) {
                this.costId = cost.itemid;
                var str = this.getItemTxt0.text;
                this.getItemTxt0.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + str);
                this.icon0.source = GlobalConfig.ItemConfig[cost.itemid].icon + "_png";
                item = UserBag.ins().getBagItemById(cost.itemid);
                var color = "";
                if (item && item.count >= cost.count) {
                    color = "|C:0x00ff00&T:";
                    this.redPoint0.visible = item.count >= GlobalConfig.HeartMethodStageConfig[id][hminfo[id].stage].normalCostTip;
                    this.isHeartUp = true;
                }
                else {
                    color = "|C:0xff0000&T:";
                }
                var sum = item ? item.count : 0;
                this.countLabel0.textFlow = TextFlowMaker.generateTextFlow1("" + color + sum + "|C:0xD1C28F&T:/" + cost.count);
            }
            if (!this.redPoint0.visible)
                this.redPoint0.visible = hminfo[id].isUp ? true : false;
            if (this.currentState == "max")
                this.redPoint0.visible = false;
            else if (this.currentState == "narmal") {
                if (this.conditionDesc) {
                    if (HeartMethod.ins().heartUpCondition(this.curRole, id)) {
                        this["costGroup0"].visible = true;
                    }
                    else {
                        this["costGroup0"].visible = false;
                    }
                    this.conditionDesc.visible = !this["costGroup0"].visible;
                    if (this.conditionDesc.visible) {
                        this.redPoint0.visible = false;
                        this.conditionDesc.text = "\u9700\u8981\u96C6\u9F50" + hmdconfig.upGradeCondition + "\u4E2A\u5FC3\u6CD5\u90E8\u4F4D,\u624D\u80FD\u4FEE\u70BC";
                    }
                }
            }
            if (!this.starList) {
                this.starList = new StarList(10);
                this.starList.horizontalCenter = 0;
                this.starList.y = 0;
                this.starGroup.addChild(this.starList);
            }
            var lv = hminfo[id].lv;
            if (lv > 0) {
                this.starList.setStarNum(lv % 10 == 0 ? 10 : lv % 10);
            }
            else {
                this.starList.setStarNum(0);
            }
            if (lv > 0 && lv % 10 == 0) {
                if (hminfo[id].isUp) {
                    this.starList.setStarNum(10);
                }
                else {
                    this.starList.setStarNum(0);
                }
            }
        }
    };
    HeartMethodWin.prototype.updateRedPoint = function () {
        var leftId = this.getHeartId(this.heartPos - 1);
        var rightId = this.getHeartId(this.heartPos + 1);
        var leftconfig = GlobalConfig.HeartMethodConfig[leftId];
        if (!leftconfig) {
            this.redPoint2.visible = false;
        }
        else {
            var b = false;
            for (var i = leftId; i > 0; i--) {
                if (HeartMethod.ins().heartOpenCondition(i))
                    b = HeartMethodRedPoint.ins().checkHeartRedPoint(this.curRole, i);
                if (b)
                    break;
            }
            this.redPoint2.visible = b;
        }
        var rightconfig = GlobalConfig.HeartMethodConfig[rightId];
        if (!rightconfig) {
            this.redPoint3.visible = false;
        }
        else {
            var b = false;
            var len = CommonUtils.getObjectLength(GlobalConfig.HeartMethodConfig);
            for (var i = rightId; i <= len; i++) {
                if (HeartMethod.ins().heartOpenCondition(i))
                    b = HeartMethodRedPoint.ins().checkHeartRedPoint(this.curRole, i);
                if (b)
                    break;
            }
            this.redPoint3.visible = b;
        }
        var id = this.getHeartId(this.heartPos);
        this.redPoint.visible = false;
        var config = GlobalConfig.HeartMethodConfig[id];
        this.skill.source = config.skillButton;
    };
    HeartMethodWin.prototype.playIconTween = function () {
        this.showGroup.y = this.showGroupY;
        egret.Tween.removeTweens(this.bigIcon);
        egret.Tween.get(this.bigIcon, { loop: true }).to({ y: this.showGroupMoveY }, 1000).to({ y: this.showGroupY }, 1000);
    };
    HeartMethodWin.prototype.stopIconTween = function () {
        egret.Tween.removeTweens(this.showGroup);
    };
    return HeartMethodWin;
}(BaseView));
__reflect(HeartMethodWin.prototype, "HeartMethodWin");
//# sourceMappingURL=HeartMethodWin.js.map