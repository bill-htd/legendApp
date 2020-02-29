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
var XunzhangPanel = (function (_super) {
    __extends(XunzhangPanel, _super);
    function XunzhangPanel() {
        var _this = _super.call(this) || this;
        _this.lastEffId = 0;
        _this.name = "\u52CB\u7AE0";
        return _this;
    }
    XunzhangPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    XunzhangPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.starList = new StarList(10, 0, 60);
        this.starList.x = -5;
        this.starList.y = -40;
        this.starList.scaleX = 0.7;
        this.starList.scaleY = 0.7;
        this.eff = new MovieClip;
        this.eff.x = 255;
        this.eff.y = 680;
        this.eff.scaleX = 1.2;
        this.eff.scaleY = 1;
        this.eff.touchEnabled = false;
        this.taskList.itemRenderer = XunZhangTaskItemRenderer;
        this.XunzhangEff = new MovieClip();
        this.xunzhangMcGroup.addChild(this.XunzhangEff);
    };
    XunzhangPanel.prototype.open = function () {
        this.group.addChild(this.starList);
        this.addTouchEvent(this.btn, this.onTab);
        this.addTouchEvent(this.UplevelBtn1, this.onTab);
        this.observe(LiLian.ins().postNobilityData, this.update);
        this.observe(UserTask.ins().postTaskChangeData, this.setTaskList);
        this.taskList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListTouch, this);
        this.update();
    };
    XunzhangPanel.prototype.close = function () {
        this.removeTouchEvent(this.btn, this.onTab);
        this.removeObserve();
        this.taskList.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListTouch, this);
        DisplayUtils.removeFromParent(this.eff);
    };
    XunzhangPanel.prototype.onListTouch = function (e) {
        var item = e.target.parent;
        if (item.data) {
            GameGuider.taskGuidance(item.data.id, 1);
        }
    };
    XunzhangPanel.prototype.onTab = function (evt) {
        switch (evt.currentTarget) {
            case this.btn:
                this.onBtnDeal();
                break;
        }
    };
    XunzhangPanel.prototype.onBtnDeal = function () {
        if (LiLian.ins().getNobilityIsUpGrade()) {
            LiLian.ins().sendNobilityUpgrade();
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u4EFB\u52A1\u672A\u5B8C\u6210\uFF0C\u65E0\u6CD5\u5347\u7EA7|");
        }
    };
    XunzhangPanel.prototype.setTaskList = function () {
        var lv = LiLian.ins().nobilityLv;
        var config = GlobalConfig.KnighthoodConfig[lv];
        this.nameTF.text = config.type;
        if (this.lastEffId != config.effid) {
            if (!GlobalConfig.DefineEff[config.effid]) {
                egret.log(config.effid + "特效ID出错啦");
                return;
            }
            var effSoure = GlobalConfig.DefineEff[config.effid].souce;
            this.XunzhangEff.playFile(RES_DIR_EFF + effSoure, -1);
            this.lastEffId = config.effid;
            this.stageImg.source = "jieji" + config.effid % 100 + "_png";
        }
        var list = [];
        for (var i = 0; i < config.achievementIds.length; i++) {
            var taskid = config.achievementIds[i].taskId;
            if (taskid > 0) {
                list.push(UserTask.ins().getAchieveByTaskId(taskid));
            }
        }
        this.taskList.dataProvider = new eui.ArrayCollection(list);
    };
    XunzhangPanel.prototype.showActPanel = function () {
        this.Activation.visible = false;
        this.showAct.visible = !this.Activation.visible;
    };
    XunzhangPanel.prototype.update = function (map) {
        var refush = false;
        refush = map ? map.refush : false;
        this.showActPanel();
        var lv = LiLian.ins().nobilityLv;
        var config = GlobalConfig.KnighthoodConfig[lv];
        if (LiLian.ins().isXZShow) {
            var img = config.effid;
            Activationtongyong.show(0, config.desc, "j" + img + "_png");
            LiLian.ins().isXZShow = false;
        }
        if (LiLian.ins().checkJueWeiOpen()) {
            this.com1.visible = true;
            this.com2.visible = true;
            this.group.visible = true;
        }
        else {
            this.com1.visible = false;
            this.com2.visible = false;
            this.group.visible = false;
            return;
        }
        this.nameTF.text = config.type;
        var spaing = GlobalConfig.KnighthoodBasicConfig.perLevel;
        var stage = Math.ceil((lv - spaing) / (spaing + 1) + 1);
        var star = lv - (spaing + (stage - 2) * (spaing + 1) + 1);
        this.starList.setStarNum(star, Number(refush));
        this.btn.label = "\u5347\u7EA7\u52CB\u7AE0";
        if (lv > 0 && (lv - spaing) % (spaing + 1) == 0) {
            this.btn.label = "\u5347\u9636";
        }
        DisplayUtils.removeFromParent(this.eff);
        if (lv == 0) {
            var boo = this.taskList.numChildren > 0;
            for (var i = 0; i < this.taskList.numChildren; i++) {
                var item = this.taskList.getChildAt(i);
                if (item.currentState == "goon") {
                    boo = false;
                    break;
                }
            }
            if (boo) {
                this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
                if (!this.eff.parent)
                    this.showAct.addChild(this.eff);
            }
            else {
                DisplayUtils.removeFromParent(this.eff);
            }
        }
        this.com1.updateInfo1(config, this.starList.starNum);
        config = GlobalConfig.KnighthoodConfig[lv + 1];
        this.btn.visible = true;
        this.manjiTF.visible = false;
        this.com2.visible = true;
        this.arrow.visible = true;
        if (config) {
            this.com1.x = 10;
            this.com2.updateInfo2(config, this.starList.starNum);
        }
        else {
            this.btn.visible = false;
            this.manjiTF.visible = true;
            this.com2.visible = false;
            this.arrow.visible = false;
            this.com1.x = 137;
        }
        this.setTaskList();
    };
    XunzhangPanel.prototype.getPower = function () {
        var lv = LiLian.ins().nobilityLv;
        var config = GlobalConfig.KnighthoodConfig[lv];
        return UserBag.getAttrPower(config.attrs);
    };
    return XunzhangPanel;
}(BaseEuiView));
__reflect(XunzhangPanel.prototype, "XunzhangPanel");
var XunzhangItem = (function (_super) {
    __extends(XunzhangItem, _super);
    function XunzhangItem() {
        return _super.call(this) || this;
    }
    XunzhangItem.prototype.childrenCreated = function () {
    };
    XunzhangItem.prototype.updateInfo1 = function (conf, starNum, isStageUpgrade) {
        if (isStageUpgrade === void 0) { isStageUpgrade = false; }
        var attrs = conf.attrs;
        var str = AttributeData.getAttStr1(attrs, AttributeFormat.FORMAT_1());
        if (conf['exattrs'] && conf['exattrs'].length > 0) {
            for (var i = 0; i < conf['exattrs'].length; i++) {
                str += "\n";
                str += AttributeData.getExAttrNameByAttrbute(conf['exattrs'][i], true) + "\n";
            }
        }
        this.attrTxt.textFlow = TextFlowMaker.generateTextFlow(str);
        this.addNameTF(this.nameTF, conf, starNum, isStageUpgrade);
    };
    XunzhangItem.prototype.updateInfo2 = function (conf, starNum, isStageUpgrade) {
        if (isStageUpgrade === void 0) { isStageUpgrade = false; }
        var attrs = conf.attrs;
        var str = AttributeData.getAttStr1(attrs, AttributeFormat.FORMAT_2());
        if (conf['exattrs'] && conf['exattrs'].length > 0) {
            str += "\n";
            for (var i = 0; i < conf['exattrs'].length; i++) {
                str += AttributeData.getExAttrNameByAttrbute(conf['exattrs'][i], true, "：", 0x35e62d) + "\n";
            }
        }
        this.attrTxt.textFlow = TextFlowMaker.generateTextFlow(str);
        this.addNameTF(this.nameTF, conf, starNum + 1, isStageUpgrade);
    };
    XunzhangItem.prototype.addNameTF = function (label, conf, starNum, isStageUpgrade) {
        if (isStageUpgrade === void 0) { isStageUpgrade = false; }
        if (!label)
            return;
        if (starNum > 9)
            starNum = 9;
        if (isStageUpgrade)
            starNum = 0;
        label.text = conf.desc;
    };
    return XunzhangItem;
}(BaseComponent));
__reflect(XunzhangItem.prototype, "XunzhangItem");
//# sourceMappingURL=XunzhangPanel.js.map