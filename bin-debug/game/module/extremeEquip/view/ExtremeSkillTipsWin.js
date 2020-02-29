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
var ExtremeSkillTipsWin = (function (_super) {
    __extends(ExtremeSkillTipsWin, _super);
    function ExtremeSkillTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "YupeiSkillTipsNewSkin";
        _this.isTopLevel = true;
        return _this;
    }
    ExtremeSkillTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.nameLabel.text = args[0];
        this.description.textFlow = TextFlowMaker.generateTextFlow1(args[1]);
        this.addTouchEvent(this.bgClose, this.onTouch);
    };
    ExtremeSkillTipsWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onTouch);
    };
    ExtremeSkillTipsWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(this);
    };
    return ExtremeSkillTipsWin;
}(BaseEuiView));
__reflect(ExtremeSkillTipsWin.prototype, "ExtremeSkillTipsWin");
ViewManager.ins().reg(ExtremeSkillTipsWin, LayerManager.UI_Main);
//# sourceMappingURL=ExtremeSkillTipsWin.js.map