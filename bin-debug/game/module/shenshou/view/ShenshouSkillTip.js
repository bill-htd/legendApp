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
var ShenshouSkillTip = (function (_super) {
    __extends(ShenshouSkillTip, _super);
    function ShenshouSkillTip() {
        var _this = _super.call(this) || this;
        _this.skinName = "shenshouSkillTips";
        return _this;
    }
    ShenshouSkillTip.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        var skillDp = args[0];
        this.quali.source = skillDp.quality ? "quali" + skillDp.quality : "";
        this.equipIcon["skillQuality"].source = "quality" + skillDp.quality;
        this.equipIcon["skillImg"].source = skillDp.icon;
        this.equipIcon["skillName"].text = "";
        this.nameTxt.text = skillDp.name;
        this.targetTxt.text = skillDp.target == 1 ? "\u6240\u6709\u51FA\u6218\u795E\u517D\u751F\u6548" : "\u4EC5\u672C\u4F53\u51FA\u6218\u795E\u517D\u751F\u6548";
        this.targetTxt0.textFlow = TextFlowMaker.generateTextFlow1(skillDp.desc);
    };
    ShenshouSkillTip.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    ShenshouSkillTip.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ShenshouSkillTip;
}(BaseEuiView));
__reflect(ShenshouSkillTip.prototype, "ShenshouSkillTip");
ViewManager.ins().reg(ShenshouSkillTip, LayerManager.UI_Tips);
//# sourceMappingURL=ShenshouSkillTip.js.map