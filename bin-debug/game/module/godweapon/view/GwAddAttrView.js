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
var GwAddAttrView = (function (_super) {
    __extends(GwAddAttrView, _super);
    function GwAddAttrView() {
        return _super.call(this) || this;
    }
    GwAddAttrView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GwAttrskin";
        this._ary = new eui.ArrayCollection();
        this.list.dataProvider = this._ary;
        this.list.itemRenderer = GwAddAttrRender;
    };
    GwAddAttrView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._ary.replaceAll(GodWeaponCC.ins().gwAddAttr(param[0]));
        this.addTouchEvent(this.rect, this.onTap);
        switch (param[0]) {
            case 0:
                this.GwName.text = "雷霆怒斩";
                break;
            case 1:
                this.GwName.text = "赤血魔剑";
                break;
            case 2:
                this.GwName.text = "无极逍遥扇";
                break;
        }
    };
    GwAddAttrView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.dataProvider = null;
        this.removeTouchEvent(this.rect, this.onTap);
    };
    GwAddAttrView.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    return GwAddAttrView;
}(BaseEuiView));
__reflect(GwAddAttrView.prototype, "GwAddAttrView");
var GwAddAttrRender = (function (_super) {
    __extends(GwAddAttrRender, _super);
    function GwAddAttrRender() {
        return _super.call(this) || this;
    }
    GwAddAttrRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data) {
            return;
        }
        this._thisData = this.data;
        this.labelInfo.text = AttributeData.getAttrStrByType(this._thisData.type) + "：" + this._thisData.value;
    };
    return GwAddAttrRender;
}(BaseItemRender));
__reflect(GwAddAttrRender.prototype, "GwAddAttrRender");
ViewManager.ins().reg(GwAddAttrView, LayerManager.UI_Popup);
//# sourceMappingURL=GwAddAttrView.js.map