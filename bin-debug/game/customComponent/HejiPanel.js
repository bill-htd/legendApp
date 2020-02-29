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
var HejiPanel = (function (_super) {
    __extends(HejiPanel, _super);
    function HejiPanel() {
        var _this = _super.call(this) || this;
        _this.otherWhite = "#D1C28F";
        _this.colorWhite = "#f8b141";
        _this.colorGray = "#444134";
        _this.otherWhiteN = 0xD1C28F;
        _this.colorWhiteN = 0xf8b141;
        _this.colorGrayN = 0x444134;
        _this.unActTextArr = ["装备3件符文大幅增强对玩家的伤害", "装备5件符文大幅增强对怪物的伤害", "装备8件符文大幅减少合击冷却时间"];
        _this.jobId = 0;
        return _this;
    }
    HejiPanel.prototype.childrenCreated = function () {
        this.init();
    };
    HejiPanel.prototype.init = function () {
        this.HejiSkillMc1 = new MovieClip;
        this.HejiSkillMc1.x = 150 + 57;
        this.HejiSkillMc1.y = 306 + 10;
        this.Punchpre.addChild(this.HejiSkillMc1);
        this.HejiSkillMc2 = new MovieClip;
        this.HejiSkillMc2.x = 384 + 50;
        this.HejiSkillMc2.y = 450 - 25;
        this.Punchpre.addChild(this.HejiSkillMc2);
        this.preViewText.textFlow = new egret.HtmlTextParser().parser("<font color = '#23C42A'><u>" + this.preViewText.text + "</u></font>");
        this.bagua = [this.bagua1, this.bagua2, this.bagua3, this.bagua4, this.bagua5, this.bagua6, this.bagua7, this.bagua8];
        this.effArr = [];
        for (var i = 0; i < 8; i++) {
            this["itemEff" + i] = new MovieClip();
            this["itemEff" + i].x = 177;
            this["itemEff" + i].y = 174;
            this["itemEff" + i].rotation = i * 45;
            this["itemEff" + i].touchEnabled = false;
            this.effArr.push(this["itemEff" + i]);
        }
        this.jobId = SubRoles.ins().getSubRoleByIndex(0).job;
        this.mcSkillID = "skill40" + this.jobId;
        var num = 403 + this.jobId;
        this.targetSkillID = "skill" + num;
    };
    HejiPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.UplevelBtn1, this.onClick);
        this.addTouchEvent(this.AttrBtn, this.onClick);
        this.addTouchEvent(this.punchtogether1, this.onClick);
        this.addTouchEvent(this.preViewText, this.onClick);
        this.addTouchEvent(this.skillitem, this.onClick);
        this.addTouchEvent(this.clickGroup, this.onClick);
        this.addTouchEvent(this.fenjieBtn, this.onClick);
        this.addTouchEvent(this.turnPunchForge, this.onClick);
        this.observe(UserSkill.ins().postHejiUpdate, this.setData);
        this.observe(UserSkill.ins().postHejiEquipChange, this.setData);
        this.observe(Actor.ins().postUpdateTogeatter, this.setData);
        this.observe(Actor.ins().postUpdateTogeatter, this.setRedPoint);
        this.observe(UserFb.ins().postGuanKaIdChange, this.setRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.addItem);
        this.observe(UserBag.ins().postItemDel, this.setRedPoint);
        this.resetData();
        this.setData();
        this.setRedPoint();
    };
    HejiPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.UplevelBtn1, this.onClick);
        this.removeTouchEvent(this.AttrBtn, this.onClick);
        this.removeTouchEvent(this.punchtogether1, this.onClick);
        this.removeTouchEvent(this.skillitem, this.onClick);
        this.removeTouchEvent(this.preViewText, this.onClick);
        this.removeTouchEvent(this.fenjieBtn, this.onClick);
        this.removeTouchEvent(this.turnPunchForge, this.onClick);
        this.removeAllEffect();
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        this.PunchForge.visible = false;
        this.PunchForge.close();
    };
    HejiPanel.prototype.resetData = function () {
        this.validateNow();
        for (var i = 1; i < 9; i++) {
            this["item" + i].data = null;
        }
    };
    HejiPanel.prototype.addItem = function () {
        this.refushPanelInfo();
        this.setRedPoint();
    };
    HejiPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.UplevelBtn1:
                if (UserFb.ins().guanqiaID < UserSkill.ACTIVE_LEVEL) {
                    UserTips.ins().showTips("\u901A\u5173\u5230\u7B2C" + UserSkill.ACTIVE_LEVEL + "\u5173\u5F00\u542F");
                }
                else {
                    this.Activation.visible = UserSkill.ins().hejiLevel > 0 ? false : true;
                    UserSkill.ins().sendGrewUpHejiSkill();
                }
                break;
            case this.AttrBtn:
                ViewManager.ins().open(PunchEquipAttrWin);
                break;
            case this.punchtogether1:
                ViewManager.ins().open(PunchExchangeWin);
                break;
            case this.skillitem:
                ViewManager.ins().open(PunchSkillTipsWin);
                break;
            case this.preViewText:
                ViewManager.ins().open(PunchExtShowWin);
                break;
            case this.fenjieBtn:
                ViewManager.ins().open(PunchResWin);
                break;
            case this.turnPunchForge:
                this.Activation.visible = false;
                this.Punchpre.visible = false;
                this.Punch.visible = false;
                this.PunchForge.visible = true;
                this.PunchForge.open();
                break;
        }
    };
    HejiPanel.prototype.showActive = function (map) {
        var isAct = map.isAct;
        if (isAct) {
            var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
            var skid = config.skill_id;
            var img = skid[0].toString();
            Activationtongyong.show(0, "合击", "j" + img + "_png");
        }
    };
    HejiPanel.prototype.setRedPoint = function () {
        this.redPointEx.visible = UserSkill.ins().canExchange();
        this.redPointSo.visible = UserSkill.ins().canSolve();
        this.redPointAct.visible = UserSkill.ins().canAcitve();
        this.redPointPf.visible = UserSkill.ins().getPunchForge().getRedPoint();
    };
    HejiPanel.prototype.playSkillAnmi = function () {
        var _this = this;
        var t = egret.Tween.get(this.Punchpre);
        if (!this.HejiSkillMc1.parent)
            this.Punchpre.addChild(this.HejiSkillMc1);
        this.HejiSkillMc1.playFile("" + RES_DIR_SKILLEFF + this.mcSkillID, 1, null, true);
        t.wait(1500).call(function () {
            if (!_this.HejiSkillMc2.parent)
                _this.Punchpre.addChild(_this.HejiSkillMc2);
            _this.HejiSkillMc2.playFile("" + RES_DIR_SKILLEFF + _this.targetSkillID, 1, null, true);
        }, this);
    };
    HejiPanel.prototype.setData = function () {
        var len = SubRoles.ins().subRolesLen;
        if (UserSkill.ins().hejiLevel <= 0) {
            this.Activation.visible = true;
            this.Punchpre.visible = false;
            this.Punch.visible = false;
            this.PunchForge.visible = false;
            this.activeTipsTxt.text = "\u95EF\u5173\u8FBE\u5230 \u7B2C" + UserSkill.ACTIVE_LEVEL + "\u5173 \u5373\u53EF\u5F00\u542F\u5408\u51FB\u6280\u80FD";
            return;
        }
        else {
            if (Actor.level >= UserSkill.HEJI_SHOW_LEVEL) {
                if (this.PunchForge.visible) {
                    this.Punch.visible = false;
                }
                else {
                    this.Punch.visible = true;
                    this.PunchForge.visible = false;
                }
                this.Activation.visible = false;
                this.Punchpre.visible = false;
                this.setPunchView();
                this.setPunch2View();
                this.refushPanelInfo();
                this.checkShowEff();
            }
            else {
                this.setPunchpreView();
            }
        }
    };
    HejiPanel.prototype.setPunchpreView = function () {
        TimerManager.ins().remove(this.playSkillAnmi, this);
        this.Activation.visible = false;
        this.Punch.visible = false;
        this.Punchpre.visible = true;
        this.PunchForge.visible = false;
        this.skillName.source = "8000" + this.jobId + "_png";
        var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
        var curSkill = new SkillData(config.skill_id[this.jobId - 1]);
        this.skillIcon.source = curSkill.id + "_png";
        TimerManager.ins().doTimer(3000, 0, this.playSkillAnmi, this);
        this.playSkillAnmi();
    };
    HejiPanel.prototype.checkShowEff = function () {
        var equipList = UserSkill.ins().equipListData;
        var num = -1;
        var len = equipList.length;
        if (equipList && equipList.length != 8)
            return;
        for (var i = 0; i < len; i++) {
            var item = equipList[i];
            if (item && item.itemConfig) {
                if (num == -1) {
                    num = (item.itemConfig.zsLevel || 0) * 10000 + item.itemConfig.level;
                }
                else {
                    var tempLv = (item.itemConfig.zsLevel || 0) * 10000 + item.itemConfig.level;
                    if (num != tempLv) {
                        this.removeAllEffect();
                        return;
                    }
                }
            }
            else {
                return;
            }
        }
        this.playAllEffect();
    };
    HejiPanel.prototype.setPunch2View = function () {
        var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
        var curSkill = new SkillData(config.skill_id[this.jobId - 1]);
        this.skillitem.setData(curSkill);
    };
    HejiPanel.prototype.destructor = function () {
    };
    HejiPanel.prototype.updateRedPoint = function (isOpens) {
    };
    HejiPanel.prototype.refushPanelInfo = function () {
        var attData = [];
        for (var i = 1; i < 9; i++) {
            this["item" + i].data = i - 1;
            var item = UserSkill.ins().equipListData[i - 1];
            if (attData.length == 0) {
                attData = item.att;
            }
            else {
                attData = AttributeData.AttrAddition(attData, item.att);
            }
        }
        this.powerPanel.setPower(this.countAllAttNum());
        this.validateNow();
        this.updateForge();
    };
    HejiPanel.prototype.refushOne = function (index) {
        this["item" + (index + 1)].data = index;
        if (ViewManager.ins().isShow(PunchEquipChooseWin))
            ViewManager.ins().close(PunchEquipChooseWin);
        this.powerPanel.setPower(this.countAllAttNum());
    };
    HejiPanel.prototype.countAllAttNum = function () {
        var equipList = UserSkill.ins().equipListData;
        var num = 0;
        var len = equipList.length;
        if (equipList && equipList.length <= 0)
            return 0;
        for (var i = 0; i < len; i++) {
            var item = equipList[i];
            if (item && item.configID) {
                num += item.point;
            }
        }
        return num * SubRoles.ins().subRolesLen;
    };
    HejiPanel.prototype.playAllEffect = function () {
        for (var i = 0; i < this.effArr.length; i++) {
            if (!this.effArr[i].parent) {
                this.effArr[i].playFile(RES_DIR_EFF + "hejizbjihuoeff", -1);
                this.EffectGroup.addChild(this["itemEff" + i]);
            }
        }
    };
    HejiPanel.prototype.removeAllEffect = function () {
        for (var i = 0; i < this.effArr.length; i++) {
            if (this.effArr[i].parent) {
                DisplayUtils.removeFromParent(this["itemEff" + i]);
            }
        }
    };
    HejiPanel.prototype.setPunchView = function () {
        var config = UserSkill.ins().qimingAttrDic;
        var zsLv = 0;
        var lv = 0;
        var nextZslv = 0;
        var nextLv = 0;
        var currConfig;
        var nextConfig;
        var string1 = "";
        var string2 = "";
        var color1 = "";
        var color2 = "";
        this.currText3.text = "";
        this.currText5.text = "";
        this.currText8.text = "";
        this.nextText1.text = "";
        this.nextText2.text = "";
        this.nextText3.text = "";
        var currCount = 0;
        var nextCount = 0;
        if (config && CommonUtils.getObjectLength(config) > 0) {
            for (var k in config) {
                for (var i in config[k]) {
                    zsLv = config[k][i].zslv;
                    lv = config[k][i].lv;
                }
            }
            nextZslv = zsLv + 1;
            nextLv = 80;
            currConfig = GlobalConfig.TogetherHitEquipQmConfig[zsLv][lv];
            this.paserText("currText", currConfig, config[zsLv * 10000 + lv]);
        }
        else {
            this.currTitleText.text = "无";
            this.currText0.text = "";
            this.currText3.text = "";
            this.currText5.text = "";
            this.currText8.text = "";
            zsLv = 0;
            lv = 60;
            nextZslv = 1;
            nextLv = 80;
            currConfig = GlobalConfig.TogetherHitEquipQmConfig[zsLv][lv];
            this.paserText("currText", currConfig);
        }
        for (var j = 0; j < this.bagua.length; j++) {
            this.bagua[j].visible = false;
        }
        for (var j = 0; j < UserSkill.ins().equipListData.length; j++) {
            var item = UserSkill.ins().equipListData[j].itemConfig;
            if (item) {
                var zsLevel = item.zsLevel ? item.zsLevel : 0;
                var level = item.level ? item.level : 1;
                if (zsLevel >= zsLv && level >= lv) {
                    this.bagua[j].visible = true;
                    color1 = this.colorWhite;
                    currCount++;
                }
                else {
                    color1 = this.colorGray;
                }
                if (zsLevel >= nextZslv && level >= nextLv) {
                    this.bagua[j].visible = true;
                    color2 = this.colorWhite;
                    nextCount++;
                }
                else {
                    color2 = this.colorGray;
                }
            }
            else {
                color1 = color2 = this.colorGray;
            }
            string1 += "<font color=" + color1 + ">" + Role.hejiPosName[j] + "  </font>";
        }
        this.currTitleText.text = zsLv > 0 ? zsLv + "\u8F6C\u9F50\u9E23\u5957\u88C5 (" + currCount + "/8)" : lv + "\u7EA7\u9F50\u9E23\u5957\u88C5 (" + currCount + "/8)";
        this.currText0.textFlow = (new egret.HtmlTextParser()).parser(string1);
        this.preViewText.x = this.currTitleText.x + this.currTitleText.textWidth + 10;
    };
    HejiPanel.prototype.paserText = function (labName, config, comparePareConfig) {
        if (comparePareConfig === void 0) { comparePareConfig = null; }
        var attrs = {};
        var equipListData = UserSkill.ins().equipListData;
        var sum = 0;
        var colorMap = {};
        for (var k in equipListData) {
            if (equipListData[k].configID != 0) {
                var item = equipListData[k].itemConfig;
                var lv = (item.zsLevel || 0) * 10000 + item.level;
                if (!attrs[lv])
                    attrs[lv] = 0;
                attrs[lv] += 1;
                sum++;
                colorMap[lv] = ItemConfig.getQualityColor(item);
            }
        }
        var preSum = 0;
        for (var index in attrs) {
            preSum = attrs[index];
            attrs[index] = sum;
            sum -= preSum;
        }
        var descArr = {};
        var cfg = GlobalConfig.TogetherHitEquipQmConfig;
        for (var zslv in cfg) {
            for (var lv in cfg[zslv]) {
                for (var i in attrs) {
                    if (Number(i) == Number(zslv) * 10000 + Number(lv)) {
                        var tf = void 0;
                        for (var j in cfg[zslv][lv]) {
                            var str = "";
                            if (attrs[i] >= Number(j)) {
                                if (Number(zslv)) {
                                    str = "|C:" + colorMap[i] + "&T:" + zslv + "\u8F6C" + j + "\u4EF6\u5957:|C:" + this.otherWhiteN + "&T:" + cfg[zslv][lv][j].desc;
                                }
                                else {
                                    str = "|C:" + colorMap[i] + "&T:" + lv + "\u7EA7" + j + "\u4EF6\u5957:|C:" + this.otherWhiteN + "&T:" + cfg[zslv][lv][j].desc;
                                }
                                descArr[j] = str;
                                tf = TextFlowMaker.generateTextFlow1(str);
                            }
                            else {
                                if (!descArr[j]) {
                                    var minCfg = GlobalConfig.TogetherHitEquipQmConfig;
                                    for (var c1 in minCfg) {
                                        for (var c2 in minCfg[c1]) {
                                            str = "|C:" + colorMap[i] + "&T:" + c2 + "\u7EA7" + j + "\u4EF6\u5957:|C:" + this.otherWhiteN + "&T:" + cfg[c1][c2][j].desc;
                                            tf = TextFlowMaker.generateTextFlow1(str);
                                            for (var _i = 0, tf_1 = tf; _i < tf_1.length; _i++) {
                                                var f = tf_1[_i];
                                                if (f.style) {
                                                    delete f.style.textColor;
                                                }
                                            }
                                            this["" + labName + j].textColor = this.colorGrayN;
                                            break;
                                        }
                                        break;
                                    }
                                }
                            }
                            if (str)
                                this["" + labName + j].textFlow = tf;
                        }
                        break;
                    }
                }
                break;
            }
        }
    };
    HejiPanel.prototype.updateForge = function () {
        this.turnPunchForge.visible = UserSkill.ins().getPunchForge().isShowPunchEquipForge();
    };
    return HejiPanel;
}(BaseView));
__reflect(HejiPanel.prototype, "HejiPanel");
//# sourceMappingURL=HejiPanel.js.map