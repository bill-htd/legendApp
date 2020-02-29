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
var FireRingAbilityView = (function (_super) {
    __extends(FireRingAbilityView, _super);
    function FireRingAbilityView() {
        var _this = _super.call(this) || this;
        _this.skinName = "LYRAbilitySkin";
        _this.isTopLevel = true;
        return _this;
    }
    FireRingAbilityView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.itemRenderer = FireRingAbilityItem;
        this.addTouchEndEvent(this.colorCanvas, this.otherClose);
        var ary = [];
        for (var i in GlobalConfig.ActorExRingAbilityConfig) {
            ary.push(parseInt(i));
        }
        this.list.dataProvider = new ArrayCollection(ary);
    };
    FireRingAbilityView.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return FireRingAbilityView;
}(BaseEuiView));
__reflect(FireRingAbilityView.prototype, "FireRingAbilityView");
ViewManager.ins().reg(FireRingAbilityView, LayerManager.UI_Popup);
//# sourceMappingURL=FireRingAbilityView.js.map