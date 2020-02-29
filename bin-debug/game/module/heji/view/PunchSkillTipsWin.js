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
var PunchSkillTipsWin = (function (_super) {
    __extends(PunchSkillTipsWin, _super);
    function PunchSkillTipsWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PunchSkillTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "PunchskillTips";
    };
    PunchSkillTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setView();
    };
    PunchSkillTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    PunchSkillTipsWin.prototype.setView = function () {
        var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
        var model = SubRoles.ins().getSubRoleByIndex(0);
        var curSkill = new SkillData(config.skill_id[model.job - 1]);
        this.skillitem.setData(curSkill);
        this.nameLabel0.text = curSkill.name;
        this.desc0.text = curSkill.desc;
        var qmDic = UserSkill.ins().qimingValueDic;
        var i = 0;
        for (var k in qmDic) {
            var value = qmDic[k].value / 100;
            var des = void 0;
            if (i < 2) {
                des = StringUtils.substitute(UserSkill.descArr[i], "|C:0x00ff00&T:" + value * 3 + "%|");
            }
            else {
                des = StringUtils.substitute(UserSkill.descArr[i], "|C:0x00ff00&T:" + value + "%|");
            }
            this["desc" + k].textFlow = TextFlowMaker.generateTextFlow1(des);
            i++;
        }
        if (i == 0) {
            this["desc" + 3].text = "无";
        }
    };
    PunchSkillTipsWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return PunchSkillTipsWin;
}(BaseEuiView));
__reflect(PunchSkillTipsWin.prototype, "PunchSkillTipsWin");
ViewManager.ins().reg(PunchSkillTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=PunchSkillTipsWin.js.map