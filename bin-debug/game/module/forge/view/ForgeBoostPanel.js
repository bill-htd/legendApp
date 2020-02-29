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
var Tween = egret.Tween;
var ForgeBoostPanel = (function (_super) {
    __extends(ForgeBoostPanel, _super);
    function ForgeBoostPanel() {
        var _this = _super.call(this) || this;
        _this.isMax = false;
        _this.isAutoUp = false;
        _this.itemNum = 0;
        _this.startPos = 0;
        _this.name = "\u5F3A\u5316";
        return _this;
    }
    ForgeBoostPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    ForgeBoostPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.upGradeBtn.label = "\u5F3A  \u5316";
        this.curPanel = ForgeWin.Page_Select_Boost;
        this.getItemTxt.textFlow = (new egret.HtmlTextParser).parser("<u>" + this.getItemTxt.text + "</u>");
        this.eff = new MovieClip;
        this.eff.x = this.upGradeBtn.width / 2;
        this.eff.y = this.upGradeBtn.height / 2;
        this.eff.touchEnabled = false;
    };
    ForgeBoostPanel.prototype.getGuildButton = function () {
        this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
        this.eff.x = this.upGradeBtn.width / 2;
        this.eff.y = this.upGradeBtn.height / 2;
        if (!this.eff.parent)
            this.upGradeBtn.addChild(this.eff);
        return this.upGradeBtn;
    };
    ForgeBoostPanel.prototype.open = function (pos, lv) {
        this.addTouchEvent(this.upGradeBtn, this.onTouch);
        this.addTouchEvent(this.upGradeBtn0, this.onTouch);
        this.addTouchEvent(this.getItemTxt, this.onGetItem);
        this.observe(UserBag.ins().postItemAdd, this.setCount);
        this.observe(UserBag.ins().postItemChange, this.setCount);
        this.observe(Actor.ins().postLevelChange, this.setView);
        this.isMax = false;
        this.setView();
        this.changeData(pos, lv);
        this.stopAutoUp();
    };
    ForgeBoostPanel.prototype.close = function () {
        this.removeTouchEvent(this.upGradeBtn, this.onTouch);
        this.removeTouchEvent(this.getItemTxt, this.onGetItem);
        DisplayUtils.removeFromParent(this.eff);
        this.stopAutoUp();
    };
    ForgeBoostPanel.prototype.setView = function () {
        DisplayUtils.removeFromParent(this.eff);
    };
    ForgeBoostPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.upGradeBtn:
                DisplayUtils.removeFromParent(this.eff);
                var costConfig = UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1);
                if (!costConfig)
                    return;
                if (this.itemNum >= costConfig.stoneNum) {
                    SoundUtil.ins().playEffect(SoundUtil.FORGE);
                    UserForge.ins().sendUpGrade(this.curRole, this.pos);
                }
                else {
                    UserWarn.ins().setBuyGoodsWarn(costConfig.stoneId, costConfig.stoneNum - this.itemNum);
                }
                break;
            case this.upGradeBtn0:
                if (this.isAutoUp) {
                    this.stopAutoUp();
                }
                else {
                    var costConfig_1 = UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1);
                    if (!costConfig_1)
                        return;
                    if (this.itemNum >= costConfig_1.stoneNum) {
                        this.isAutoUp = true;
                        this.upGradeBtn0.label = "\u505C \u6B62";
                        TimerManager.ins().doTimer(200, 0, this.autoUpStar, this);
                    }
                    else {
                        this.onGetItem(null);
                    }
                }
                break;
        }
    };
    ForgeBoostPanel.prototype.stopAutoUp = function () {
        this.isAutoUp = false;
        if (this.upGradeBtn0)
            this.upGradeBtn0.label = "\u4E00\u952E\u5F3A\u5316";
        TimerManager.ins().remove(this.autoUpStar, this);
        egret.Tween.removeTweens(this.upGradeBtn0);
    };
    ForgeBoostPanel.prototype.stopAutoUpEx = function () {
        this.isAutoUp = false;
        TimerManager.ins().remove(this.stopAutoUpEx, this);
    };
    ForgeBoostPanel.prototype.autoUpBack = function (index) {
        if (this.isAutoUp) {
            var costConfig = UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1);
            if (!costConfig)
                return;
            if (this.itemNum < costConfig.stoneNum) {
                this.isAutoUp = false;
                UserTips.ins().showTips("材料不足");
                return;
            }
            if (this.startPos == index) {
                this.isAutoUp = false;
                return;
            }
        }
    };
    ForgeBoostPanel.prototype.autoUpStarEx = function () {
        var costConfig = UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1);
        if (!costConfig)
            return false;
        if (this.itemNum >= costConfig.stoneNum) {
            SoundUtil.ins().playEffect(SoundUtil.FORGE);
            UserForge.ins().sendUpGrade(this.curRole, this.pos);
        }
        else {
            this.upGradeBtn0.label = "\u4E00\u952E\u5F3A\u5316";
            return false;
        }
        return true;
    };
    ForgeBoostPanel.prototype.autoUpStar = function () {
        var costConfig = UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1);
        if (!costConfig)
            return;
        if (this.itemNum >= costConfig.stoneNum) {
            UserForge.ins().sendUpGrade(this.curRole, this.pos);
        }
        else {
            this.isAutoUp = false;
            this.upGradeBtn0.label = "\u4E00\u952E\u5F3A\u5316";
            TimerManager.ins().remove(this.autoUpStar, this);
        }
    };
    ForgeBoostPanel.prototype.onGetItem = function (e) {
        UserWarn.ins().setBuyGoodsWarn(UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1).stoneId, 1);
    };
    ForgeBoostPanel.prototype.changeData = function (pos, lv, bool) {
        if (bool === void 0) { bool = true; }
        this.pos = pos;
        this.lv = lv;
        var attrList = UserForge.ins().countAllBoostAttr(this.curRole, this.curPanel);
        this.setAttrData(attrList);
        this.setPower();
        this.setSlectedInfo();
        if (bool) {
            this.setCount();
            this.upGradeBtn.touchEnabled = true;
        }
        else {
            this.upGradeBtn.touchEnabled = false;
        }
    };
    ForgeBoostPanel.prototype.setPower = function () {
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        this._totalPower = model.getForgeTotalPower(this.curPanel);
        this.powerPanel.setPower(this._totalPower);
    };
    ForgeBoostPanel.prototype.setSlectedInfo = function () {
        var roleData = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var equipData = roleData.equipsData;
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            var level = equipData[i].strengthen;
            this["level_" + i].text = level > 0 ? "+" + level : "";
            this["show" + (i + 1)].visible = i == this.pos;
            this["lianjiexian" + i].visible = (i == this.pos);
        }
    };
    ForgeBoostPanel.prototype.setAttrData = function (attrList) {
        var nextConfig;
        var len = attrList.length;
        attrList.sort(AttributeData.sortAttribute);
        for (var i = 0; i < 4; i++) {
            this["attr" + i].text = len > i ? AttributeData.getAttStrByType(attrList[i], 0.5) : "";
        }
        nextConfig = UserForge.ins().getForgeConfigByPos(this.pos, this.lv + 1, this.curPanel);
        if (nextConfig) {
            this.isMax = false;
            var str = "";
            var addList = UserForge.ins().countAllBoostAttr(this.curRole, this.curPanel, this.pos, true);
            addList.sort(AttributeData.sortAttribute);
            for (var i = 0; i < 4; i++) {
                if (len > i) {
                    var attr = attrList[i];
                    str = this.getAttrByType(addList, attr);
                }
                this["arrow" + i].visible = str.length > 0;
                this["addAttr" + i].text = str;
            }
        }
        else {
            this.isMax = true;
            for (var i = 0; i < 4; i++) {
                this["arrow" + i].visible = false;
                this["addAttr" + i].text = "";
            }
        }
        this.upInfo.visible = !this.isMax;
        this.maxDesc.visible = this.isMax;
    };
    ForgeBoostPanel.prototype.setCount = function () {
        var costConfig = UserForge.ins().getEnhanceCostConfigByLv(this.lv + 1);
        var cost = 0;
        if (costConfig) {
            this.itemNum = UserBag.ins().getBagGoodsCountById(0, costConfig.stoneId);
            cost = costConfig.stoneNum;
        }
        var colorStr = "";
        if (this.itemNum >= cost)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.countLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + this.itemNum + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + cost + "</font> ");
    };
    ForgeBoostPanel.prototype.getAttrByType = function (attrs, attr) {
        var len = attrs.length;
        for (var i = 0; i < len; i++) {
            if (attrs[i].type == attr.type && attrs[i].value != attr.value) {
                return "" + attrs[i].value;
            }
        }
        return "";
    };
    return ForgeBoostPanel;
}(BaseEuiView));
__reflect(ForgeBoostPanel.prototype, "ForgeBoostPanel");
//# sourceMappingURL=ForgeBoostPanel.js.map