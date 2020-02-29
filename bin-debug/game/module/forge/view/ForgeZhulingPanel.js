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
var ForgeZhulingPanel = (function (_super) {
    __extends(ForgeZhulingPanel, _super);
    function ForgeZhulingPanel() {
        var _this = _super.call(this) || this;
        _this.isMax = false;
        _this.isAutoUp = false;
        _this.itemNum = 0;
        _this.startPos = 0;
        _this.name = "\u94F8\u9020";
        _this.curPanel = ForgeWin.Page_Select_ZhuLing;
        return _this;
    }
    ForgeZhulingPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    ForgeZhulingPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.getItemTxt.textFlow = (new egret.HtmlTextParser).parser("<u>" + this.getItemTxt.text + "</u>");
    };
    ForgeZhulingPanel.prototype.open = function (pos, lv) {
        this.addTouchEvent(this.upGradeBtn, this.onTouch);
        this.addTouchEvent(this.upGradeBtn0, this.onTouch);
        this.addTouchEvent(this.getItemTxt, this.onGetItem);
        this.observe(UserBag.ins().postItemAdd, this.setCount);
        this.observe(UserBag.ins().postItemChange, this.setCount);
        this.observe(Actor.ins().postLevelChange, this.setView);
        this.isMax = false;
        this.setView();
        this.createBitMapNum();
        this.changeData(pos, lv);
        this.stopAutoUp();
    };
    ForgeZhulingPanel.prototype.close = function () {
        this.removeTouchEvent(this.upGradeBtn, this.onTouch);
        this.removeTouchEvent(this.getItemTxt, this.onGetItem);
        this.removeObserve();
        this.stopAutoUp();
    };
    ForgeZhulingPanel.prototype.setView = function () {
    };
    ForgeZhulingPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.upGradeBtn:
                if (this.costConfig && this.itemNum >= this.costConfig.count) {
                    UserZhuLing.ins().sendUpGrade(this.curRole, this.pos);
                    SoundUtil.ins().playEffect(SoundUtil.FORGE);
                }
                else {
                    UserWarn.ins().setBuyGoodsWarn(this.costConfig.itemId, 1);
                }
                break;
            case this.upGradeBtn0:
                if (!this.isAutoUp) {
                    this.isAutoUp = true;
                    this.startPos = this.pos;
                    if (!this.autoUpStarEx()) {
                        UserTips.ins().showTips("材料不足");
                        this.isAutoUp = false;
                    }
                }
                break;
        }
    };
    ForgeZhulingPanel.prototype.stopAutoUp = function () {
        this.isAutoUp = false;
        if (this.upGradeBtn0)
            this.upGradeBtn0.label = "\u4E00\u952E\u7CBE\u70BC";
        TimerManager.ins().remove(this.autoUpStar, this);
    };
    ForgeZhulingPanel.prototype.autoUpBack = function (index) {
        if (this.isAutoUp) {
            var costConfig = UserForge.ins().getZhulingCostConfigByLv(this.lv + 1);
            if (!costConfig)
                return;
            if (this.itemNum < costConfig.count) {
                this.isAutoUp = false;
                UserTips.ins().showTips("材料不足");
                return;
            }
            if (this.startPos == index) {
                this.isAutoUp = false;
                return;
            }
            UserZhuLing.ins().sendUpGrade(this.curRole, index);
        }
    };
    ForgeZhulingPanel.prototype.autoUpStarEx = function () {
        var costConfig = UserForge.ins().getZhulingCostConfigByLv(this.lv + 1);
        if (!costConfig)
            return false;
        if (this.itemNum >= costConfig.count) {
            UserZhuLing.ins().sendUpGrade(this.curRole, this.pos);
            SoundUtil.ins().playEffect(SoundUtil.FORGE);
        }
        else {
            this.upGradeBtn0.label = "\u4E00\u952E\u7CBE\u70BC";
            return false;
        }
        return true;
    };
    ForgeZhulingPanel.prototype.autoUpStar = function () {
        if (this.costConfig && this.itemNum >= this.costConfig.count) {
            UserZhuLing.ins().sendUpGrade(this.curRole, this.pos);
            if (this.pos == 7) {
                this.isAutoUp = false;
                this.upGradeBtn0.label = "\u4E00\u952E\u7CBE\u70BC";
                TimerManager.ins().remove(this.autoUpStar, this);
            }
        }
        else {
            this.isAutoUp = false;
            this.upGradeBtn0.label = "\u4E00\u952E\u7CBE\u70BC";
            TimerManager.ins().remove(this.autoUpStar, this);
        }
    };
    ForgeZhulingPanel.prototype.onGetItem = function (e) {
        UserWarn.ins().setBuyGoodsWarn(this.costConfig.itemId, 1);
    };
    ForgeZhulingPanel.prototype.changeData = function (pos, lv, bool) {
        if (bool === void 0) { bool = true; }
        this.pos = pos;
        this.lv = lv;
        var attrList = UserForge.ins().countAllBoostAttr(this.curRole, this.curPanel);
        this.setAttrData(attrList);
        this.setPower();
        this.setSlectedInfo();
        this.updateLevel();
        if (bool) {
            this.setCount();
        }
    };
    ForgeZhulingPanel.prototype.setPower = function () {
        var model = SubRoles.ins().getSubRoleByIndex(this.curRole);
        this._totalPower = model.getForgeTotalPower(this.curPanel);
        this.powerPanel.setPower(this._totalPower);
    };
    ForgeZhulingPanel.prototype.createBitMapNum = function () {
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            this["level_" + i].text = "0";
        }
    };
    ForgeZhulingPanel.prototype.updateLevel = function () {
        var roleData = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var equipData = roleData.equipsData;
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            var level = equipData[i].zhuling;
            this["level_" + i].visible = level > 0 ? true : false;
            this["level_" + i].text = level.toString();
        }
    };
    ForgeZhulingPanel.prototype.setSlectedInfo = function () {
        var roleData = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var equipData = roleData.equipsData;
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            this["selectIcon" + i].visible = (i == this.pos);
            if (i == 0) {
            }
            else {
                this["line" + (i - 1)].source = (i <= this.pos) ? "jinglianline1" : "jinglianline0";
                this["jinglianed" + i].visible = (i <= this.pos) ? true : false;
            }
        }
    };
    ForgeZhulingPanel.prototype.setAttrData = function (attrList) {
        var nextConfig;
        var len = attrList.length;
        attrList.sort(AttributeData.sortAttribute);
        for (var i = 0; i < 4; i++) {
            this["attr" + i].text = len > i ? AttributeData.getAttStrByType(attrList[i], 0.5) : "";
        }
        nextConfig = UserForge.ins().getForgeConfigByPos(this.pos, this.lv + 1, this.curPanel);
        if (nextConfig) {
            this.isMax = false;
            var addList = UserForge.ins().countAllBoostAttr(this.curRole, this.curPanel, this.pos, true);
            addList.sort(AttributeData.sortAttribute);
            for (var i = 0; i < 4; i++) {
                var str = "";
                if (len > i) {
                    var attr = attrList[i];
                    str = this.getAttrByType(addList, attr);
                }
                this["arrow" + i].visible = str.length > 0;
                this["addattr" + i].text = str;
            }
        }
        else {
            this.isMax = true;
            for (var i = 0; i < 4; i++) {
                this["arrow" + i].visible = false;
                this["addattr" + i].text = "";
            }
        }
        this.maxDesc.visible = this.isMax;
        this.upInfo.visible = !this.isMax;
    };
    ForgeZhulingPanel.prototype.setCount = function () {
        this.costConfig = UserForge.ins().getZhulingCostConfigByLv(this.lv + 1);
        var cost = 0;
        if (this.costConfig) {
            this.itemNum = UserBag.ins().getBagGoodsCountById(0, this.costConfig.itemId);
            cost = this.costConfig.count;
        }
        var colorStr = "";
        if (this.itemNum >= cost)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.countLabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + this.itemNum + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + cost + "</font> ");
    };
    ForgeZhulingPanel.prototype.getAttrByType = function (attrs, attr) {
        var len = attrs.length;
        for (var i = 0; i < len; i++) {
            if (attrs[i].type == attr.type && attrs[i].value != attr.value) {
                return "" + attrs[i].value;
            }
        }
        return "";
    };
    return ForgeZhulingPanel;
}(BaseEuiView));
__reflect(ForgeZhulingPanel.prototype, "ForgeZhulingPanel");
//# sourceMappingURL=ForgeZhulingPanel.js.map