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
var GwSkillTipView = (function (_super) {
    __extends(GwSkillTipView, _super);
    function GwSkillTipView() {
        return _super.call(this) || this;
    }
    GwSkillTipView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GwSkillTipSkin";
        this.bgClose.touchEnabled = true;
    };
    GwSkillTipView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._dataInfo = param[0];
        this.addTouchEvent(this.update, this.touchHandler);
        this.addTouchEvent(this.bgClose, this.closeHandler);
        this.observe(GodWeaponCC.ins().postUpdateInfo, this.updateView);
        this.updateView();
    };
    GwSkillTipView.prototype.updateView = function () {
        var curWeapon = GodWeaponCC.ins().getWeaponData(this._dataInfo.weaponId);
        if (this._dataInfo.skillId == 16) {
            this.currentState = "max";
            if (this._dataInfo.isOpen) {
                this.update.visible = true;
                this.pointCount.visible = true;
                this.unlockDesc.visible = false;
                this.unlcokTitle.visible = false;
                this.validateNow();
                if (!curWeapon || curWeapon.skillPoint == 0) {
                    this.pointCount.textFlow = (new egret.HtmlTextParser).parser('<font color="#d1c28f">神兵等级每提升10级可获得1个技能点</font>');
                }
                else {
                    this.pointCount.textFlow = (new egret.HtmlTextParser).parser('<font color="#d1c28f">当前可用的技能点：</font>' + curWeapon.skillPoint);
                }
                if (this._dataInfo.skillLv == 0) {
                    this.nowskillDesc.text = "\u63D0\u5347\u7B49\u7EA7\u53EF\u5B66\u4F1A" + this._dataInfo.config.skillName + "\u6280\u80FD";
                    this.ultraskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addExAttrstr(1));
                }
                else {
                    this.nowskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addAttrValyeType(this._dataInfo.skillLv));
                    this.ultraskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addExAttrstr(this._dataInfo.skillLv));
                }
                this.nextskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addAttrValyeType(this._dataInfo.skillLv + 1));
                this.skillImg.source = this._dataInfo.config.iconId + "_N";
            }
            else {
                this.validateNow();
                this.update.visible = false;
                this.pointCount.visible = false;
                this.unlcokTitle.visible = true;
                this.unlockDesc.visible = true;
                this.unlockDesc.text = this._dataInfo.openTip;
                this.skillImg.source = this._dataInfo.config.iconId + "_L";
                this.nowskillDesc.text = "\u63D0\u5347\u7B49\u7EA7\u53EF\u5B66\u4F1A" + this._dataInfo.config.skillName + "\u6280\u80FD";
                this.ultraskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addExAttrstr(1));
                this.nextskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addAttrValyeType(this._dataInfo.skillLv + 1));
            }
        }
        else {
            if (this._dataInfo.isOpen) {
                this.validateNow();
                if (this._dataInfo.skillLv < this._dataInfo.config.upLevel) {
                    this.currentState = "normal";
                    if (!curWeapon || curWeapon.skillPoint == 0) {
                        this.pointCount.textFlow = (new egret.HtmlTextParser).parser('<font color="#d1c28f">神兵等级每提升10级可获得1个技能点</font>');
                    }
                    else {
                        this.pointCount.textFlow = (new egret.HtmlTextParser).parser('<font color="#d1c28f">当前可用的技能点：</font>' + curWeapon.skillPoint);
                    }
                }
                else {
                    this.currentState = "fullLv";
                }
                if (this._dataInfo.skillLv == 0) {
                    this.nowskillDesc.text = "\u63D0\u5347\u7B49\u7EA7\u53EF\u5B66\u4F1A" + this._dataInfo.config.skillName + "\u6280\u80FD";
                }
                else {
                    this.nowskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addatrStr(this._dataInfo.skillLv));
                    if (this._dataInfo.config.skill) {
                        this.nowskillDesc.textFlow = TextFlowMaker.generateTextFlow(this._dataInfo.specialSkill(this._dataInfo.skillLv));
                    }
                    this.descTextAlign(this.nowskillDesc);
                }
                this.nextskillDesc.textFlow = (new egret.HtmlTextParser).parser(this._dataInfo.addatrStr(this._dataInfo.skillLv + 1));
                if (this._dataInfo.config.skill) {
                    this.nextskillDesc.textFlow = TextFlowMaker.generateTextFlow(this._dataInfo.specialSkill(this._dataInfo.skillLv + 1));
                }
                this.descTextAlign(this.nextskillDesc);
                this.skillImg.source = this._dataInfo.config.iconId + "_N";
            }
            else {
                this.validateNow();
                this.currentState = "lock";
                this.nowskillDesc.textFlow = TextFlowMaker.generateTextFlow(this._dataInfo.config.lockDesc);
                this.descTextAlign(this.nowskillDesc);
                this.unlockDesc.text = this._dataInfo.openTip;
                this.skillImg.source = this._dataInfo.config.iconId + "_L";
            }
        }
        this.skillName.text = this._dataInfo.config.skillName;
        if (this._dataInfo.skillId == 16) {
            this.lvCount.text = this._dataInfo.lvLabel(true);
        }
        else {
            this.lvCount.text = this._dataInfo.lvLabel();
        }
        var weaponData = GodWeaponCC.ins().getWeaponData(this._dataInfo.weaponId);
        var num = (weaponData && weaponData.skillPoint) || 0;
        if (num <= 0) {
            this.update.enabled = false;
        }
        else {
            this.update.enabled = true;
        }
    };
    GwSkillTipView.prototype.descTextAlign = function (txt) {
        if (this._dataInfo.config.attr) {
            txt.textAlign = "center";
        }
        else {
            if (txt.numLines >= 2) {
                txt.textAlign = "left";
            }
            else {
                txt.textAlign = "center";
            }
        }
    };
    GwSkillTipView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.update, this.touchHandler);
        this.removeTouchEvent(this.bgClose, this.closeHandler);
    };
    GwSkillTipView.prototype.touchHandler = function (e) {
        if (this._dataInfo.skillLv >= this._dataInfo.config.upLevel) {
            UserTips.ins().showTips("\u5DF2\u8FBE\u5230\u6700\u5927\u7B49\u7EA7");
            return;
        }
        var weaponData = GodWeaponCC.ins().getWeaponData(this._dataInfo.weaponId);
        var num = (weaponData && weaponData.skillPoint) || 0;
        if (num <= 0) {
            UserTips.ins().showTips("\u5F53\u524D\u53EF\u7528\u6280\u80FD\u70B9\u4E0D\u8DB3");
            return;
        }
        GodWeaponCC.ins().gwshowTips = true;
        GodWeaponCC.ins().roleshowTips = SubRoles.ins().subRolesLen;
        GodWeaponCC.ins().upSkill(this._dataInfo.weaponId, this._dataInfo.skillId);
    };
    GwSkillTipView.prototype.closeHandler = function (e) {
        ViewManager.ins().close(this);
    };
    return GwSkillTipView;
}(BaseEuiView));
__reflect(GwSkillTipView.prototype, "GwSkillTipView");
ViewManager.ins().reg(GwSkillTipView, LayerManager.UI_Popup);
//# sourceMappingURL=GwSkillTipView.js.map