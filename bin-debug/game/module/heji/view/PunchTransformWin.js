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
var PunchTransformWin = (function (_super) {
    __extends(PunchTransformWin, _super);
    function PunchTransformWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PunchTransformSkin";
        _this.isTopLevel = true;
        return _this;
    }
    PunchTransformWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.observe(Actor.ins().postUpdateTogeatter, this.checkChange);
        this.update();
    };
    PunchTransformWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
    };
    PunchTransformWin.prototype.checkChange = function (data) {
        if (data && data.type == 2)
            this.update();
    };
    PunchTransformWin.prototype.update = function () {
        this.count0.text = Actor.togeatter2 + "";
        this.count1.text = "0";
        this.changeBar.value = 0;
        this.changeBar.maximum = Actor.togeatter2;
        this.transformBtn.enabled = Actor.togeatter2 > 0;
        this.quicklytransformBtn.enabled = false;
    };
    PunchTransformWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.transformBtn:
                UserSkill.ins().sendChangeTogeatterHigh(Actor.togeatter2);
                break;
            case this.quicklytransformBtn:
                UserSkill.ins().sendChangeTogeatterHigh(this.changeBar.value);
                break;
            case this.add:
                if (this.changeBar.value < Actor.togeatter2) {
                    this.changeBar.value++;
                    this.count1.text = (this.changeBar.value * GlobalConfig.TogerherHitBaseConfig.TogExgRate) + "";
                    this.quicklytransformBtn.enabled = true;
                }
                else if (Actor.togeatter2 == 0)
                    UserTips.ins().showTips("高级符文碎片不足");
                else
                    UserTips.ins().showTips("已达到最大转换数量");
                break;
            case this.minus:
                if (this.changeBar.value > 0) {
                    this.changeBar.value--;
                    this.count1.text = (this.changeBar.value * GlobalConfig.TogerherHitBaseConfig.TogExgRate) + "";
                }
                if (this.changeBar.value <= 0)
                    this.quicklytransformBtn.enabled = false;
                break;
        }
    };
    return PunchTransformWin;
}(BaseEuiView));
__reflect(PunchTransformWin.prototype, "PunchTransformWin");
ViewManager.ins().reg(PunchTransformWin, LayerManager.UI_Main);
//# sourceMappingURL=PunchTransformWin.js.map