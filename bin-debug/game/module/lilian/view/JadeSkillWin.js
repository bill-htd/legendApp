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
var JadeSkillWin = (function (_super) {
    __extends(JadeSkillWin, _super);
    function JadeSkillWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "YupeiSkillTipsSkin";
        return _this;
    }
    JadeSkillWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClose);
        var cfg = GlobalConfig.YuPeiConfig[LiLian.ins().jadeLv];
        var per = "0";
        for (var k in cfg.attrs) {
            if (cfg.attrs[k].type == AttributeType.atYuPeiDeterDam) {
                per = (cfg.attrs[k].value / 100).toFixed(1);
                break;
            }
        }
        this.content.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.YuPeiBasicConfig.deterDesc.replace("{0}", per + "%"));
    };
    JadeSkillWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onClose);
    };
    JadeSkillWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    return JadeSkillWin;
}(BaseEuiView));
__reflect(JadeSkillWin.prototype, "JadeSkillWin");
ViewManager.ins().reg(JadeSkillWin, LayerManager.UI_Main);
//# sourceMappingURL=JadeSkillWin.js.map