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
var CollectWin = (function (_super) {
    __extends(CollectWin, _super);
    function CollectWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "CollectSkin";
        _this.progressBar.labelFunction = function (value, maximum) {
            return '';
        };
        return _this;
    }
    CollectWin.prototype.childrenCreated = function () {
        this.progressBar.value = 0;
        this.progressBar.visible = false;
        this.bgmc = new MovieClip();
        this.bgmc.playFile(RES_DIR_EFF + "jindutiaoeff1", -1);
        this.bgmc.scaleY = 2;
        this.bgmc.scaleX = 1.25;
        this.effGroup.width = 260;
        this.effGroup.height = 50;
        this.effGroup.scrollEnabled = true;
        this.effGroup.addChild(this.bgmc);
    };
    CollectWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.state.text = Actor.myName + " \u6B63\u5728\u91C7\u96C6\u4E2D...";
        Tween.removeTweens(this.effGroup);
        this.effGroup.width = 0;
        Tween.get(this.effGroup).to({ width: 260 }, param[1] * 1000);
    };
    CollectWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        Tween.removeTweens(this.effGroup);
    };
    return CollectWin;
}(BaseEuiView));
__reflect(CollectWin.prototype, "CollectWin");
ViewManager.ins().reg(CollectWin, LayerManager.UI_Popup);
//# sourceMappingURL=CollectWin.js.map