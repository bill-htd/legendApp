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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShenshouWin = (function (_super) {
    __extends(ShenshouWin, _super);
    function ShenshouWin() {
        var _this = _super.call(this) || this;
        _this.curId = 1;
        _this.MAX_SKILL = 4;
        return _this;
    }
    ShenshouWin.prototype.childrenCreated = function () {
        this.listMenu.itemRenderer = ShenshouTab;
        this.listMenuDt = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.ShenShouBase));
        this.listMenu.dataProvider = this.listMenuDt;
    };
    ShenshouWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.rightBtn, this.onTouch);
        this.addTouchEvent(this.leftBtn, this.onTouch);
        this.addTouchEvent(this.activityBtn, this.onTouch);
        this.addTouchEvent(this.shenshouItem, this.onTouch);
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.listMenu, this.onTouchMenu);
        this.addEvent(eui.UIEvent.CHANGE_END, this.listScroller, this.onChange);
        for (var i = 1; i <= this.MAX_SKILL; i++) {
            this.addTouchEvent(this["skill" + i], this.onTouch);
        }
        this.observe(ShenshouRedpoint.ins().postRedPoint, this.refRedPoint);
        this.observe(ShenshouSys.ins().postWearEquip, this.refEquipData);
        this.observe(ShenshouSys.ins().postUpEquip, this.refEquipData);
        this.observe(ShenshouSys.ins().postInfo, this.refData);
        this.observe(ShenshouSys.ins().postBattleState, this.refData);
        this.listMenu.selectedIndex = 0;
        this.showUI(this.curId);
        this.onChange();
        this.refRedPoint();
    };
    ShenshouWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.shenshouItem.close();
    };
    ShenshouWin.prototype.onTouchMenu = function (e) {
        this.curId = e.item.id;
        this.showUI(this.curId);
    };
    ShenshouWin.prototype.onChange = function () {
        if (this.listMenu.scrollH < 20) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.listMenu.scrollH > (this.listMenu.dataProvider.length - 5) * 88 + 2) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = false;
        }
        else {
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
        }
        if (this.listMenu.dataProvider.length <= 5) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = false;
        }
        this.refArrowRedpoint();
    };
    ShenshouWin.prototype.showUI = function (id) {
        var model = ShenshouModel.ins();
        var sys = ShenshouSys.ins();
        var data = model.getDataById(id);
        var dp = GlobalConfig.ShenShouBase[id];
        for (var i = 0; i < this.MAX_SKILL; i++) {
            if (dp.skill && dp.skill[i]) {
                this["skill" + (i + 1)].visible = true;
                this["skill" + (i + 1)].touchChildren = false;
                var skillData = GlobalConfig.ShenShouSkill[dp.skill[i]];
                this["skill" + (i + 1)].name = dp.skill[i];
                this["skill" + (i + 1)].skillImg.source = skillData.icon;
                this["skill" + (i + 1)].skillName.text = skillData.name;
                this["skill" + (i + 1)].skillQuality.source = 'quality' + skillData.quality;
            }
            else {
                this["skill" + (i + 1)].visible = false;
            }
        }
        this.shenshouItem.setID(id);
        this.refEquipData();
    };
    ShenshouWin.prototype.refEquipData = function () {
        var model = ShenshouModel.ins();
        this.shenshouItem.refEquipData();
        this.attr1.text = "+" + model.getAttrValue(this.curId, AttributeType.atAttack);
        this.attr2.text = "+" + model.getAttrValue(this.curId, AttributeType.atMaxHp);
        this.attr3.text = "+" + model.getAttrValue(this.curId, AttributeType.atDef);
        this.attr4.text = "+" + model.getAttrValue(this.curId, AttributeType.atRes);
        this.powerPanel.setPower(ShenshouModel.ins().calcEquipScore(this.curId) * SubRoles.ins().subRolesLen);
        this.refEquipRedpoint();
        this.refData();
    };
    ShenshouWin.prototype.refData = function () {
        var model = ShenshouModel.ins();
        var sys = ShenshouSys.ins();
        this.fightCount.text = "\u5F53\u524D\u51FA\u6218\uFF1A" + model.getCurBattle() + "/" + model.getCountBattle();
        var state = model.getCurStatus(this.curId);
        this.shenshouItem.refState(state);
        switch (state) {
            case ShenshouState.State_No:
                this.activityBtn.enabled = false;
                this.activityBtn.label = "\u51FA\u6218";
                break;
            case ShenshouState.State_Can:
                this.activityBtn.enabled = true;
                this.activityBtn.label = "\u51FA\u6218";
                break;
            case ShenshouState.State_Has:
                this.activityBtn.enabled = true;
                this.activityBtn.label = "\u53D6\u6D88\u51FA\u6218";
                break;
        }
        this.listMenuDt.replaceAll(CommonUtils.objectToArray(GlobalConfig.ShenShouBase));
    };
    ShenshouWin.prototype.refArrowRedpoint = function () {
        this.rightRed.visible = false;
        this.leftRed.visible = false;
        if (this.leftBtn.visible) {
            var redList = ShenshouRedpoint.ins().redpoints.slice(0, 4);
            this.leftRed.visible = redList.indexOf(true) > -1;
        }
        if (this.rightBtn.visible) {
            var redList = ShenshouRedpoint.ins().redpoints.slice(5, 9);
            this.rightRed.visible = redList.indexOf(true) > -1;
        }
    };
    ShenshouWin.prototype.refRedPoint = function () {
        this.refArrowRedpoint();
        this.listMenuDt.replaceAll(CommonUtils.objectToArray(GlobalConfig.ShenShouBase));
        this.refEquipRedpoint();
    };
    ShenshouWin.prototype.refEquipRedpoint = function () {
        for (var i = 0; i < GlobalConfig.ShenShouConfig.posCount; i++) {
            if (ShenshouRedpoint.ins().redpointEquips1[this.curId] && ShenshouRedpoint.ins().redpointEquips1[this.curId][i + 1]
                || ShenshouRedpoint.ins().redpointEquips2[this.curId] && ShenshouRedpoint.ins().redpointEquips2[this.curId][i + 1]) {
                this.shenshouItem["item" + i].redPoint.visible = true;
            }
            else {
                this.shenshouItem["item" + i].redPoint.visible = false;
            }
        }
    };
    ShenshouWin.prototype.onTouch = function (e) {
        var num = 92 * 5;
        var scrollH = 0;
        switch (e.target) {
            case this.rightBtn:
                scrollH = this.listMenu.scrollH + num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH > this.listMenu.contentWidth - this.listScroller.width) {
                    scrollH = this.listMenu.contentWidth - this.listScroller.width;
                }
                this.listMenu.scrollH = scrollH;
                this.onChange();
                break;
            case this.leftBtn:
                scrollH = this.listMenu.scrollH - num;
                scrollH = Math.round(scrollH / 92) * 92;
                if (scrollH < 0) {
                    scrollH = 0;
                }
                this.listMenu.scrollH = scrollH;
                this.onChange();
                break;
            case this.activityBtn:
                if (ShenshouModel.ins().getCurStatus(this.curId) == ShenshouState.State_Can) {
                    var curNum = ShenshouModel.ins().getCurBattle();
                    if (curNum < GlobalConfig.ShenShouConfig.maxCount &&
                        UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, GlobalConfig.ShenShouConfig.battleCountItem) &&
                        curNum >= ShenshouModel.ins().getCountBattle()) {
                        ViewManager.ins().open(ShenshouDanUseWin, GlobalConfig.ItemConfig[GlobalConfig.ShenShouConfig.battleCountItem]);
                        return;
                    }
                    if (curNum >= ShenshouModel.ins().getCountBattle()) {
                        UserTips.ins().showCenterTips("\u517D\u795E\u7684\u51FA\u6218\u603B\u91CF\u5DF2\u7ECF\u8FBE\u5230\u4E0A\u9650");
                        return;
                    }
                }
                ShenshouSys.ins().sendBattle(this.curId);
                break;
            default:
                if (e.target.skinName == "shenshouEquipItem") {
                    var pos = parseInt(e.target.name);
                    if (e.target.data) {
                        ViewManager.ins().open(ShenshouEquipTip, this.curId, pos, e.target.data);
                    }
                    else {
                        ViewManager.ins().open(ShenshouWearEquipWin, this.curId, pos);
                    }
                }
                else if (e.target.parent.skinName == "shenshouSkillItem" || e.target.skinName == "shenshouSkillItem") {
                    ViewManager.ins().open(ShenshouSkillTip, GlobalConfig.ShenShouSkill[e.target.name]);
                }
        }
    };
    __decorate([
        callLater
    ], ShenshouWin.prototype, "refEquipData", null);
    return ShenshouWin;
}(BaseView));
__reflect(ShenshouWin.prototype, "ShenshouWin");
//# sourceMappingURL=ShenshouWin.js.map