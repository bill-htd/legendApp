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
var BaseEuiView = (function (_super) {
    __extends(BaseEuiView, _super);
    function BaseEuiView() {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this.isTopLevel = false;
        _this.exclusionWins = [];
        _this._isInit = false;
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        return _this;
    }
    BaseEuiView.prototype.addExclusionWin = function (classOrName) {
        if (this.exclusionWins.indexOf(classOrName) == -1)
            this.exclusionWins.push(classOrName);
    };
    BaseEuiView.prototype.isInit = function () {
        return this._isInit;
    };
    BaseEuiView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    BaseEuiView.prototype.addToParent = function (p) {
        p.addChild(this);
        TimerManager.ins().remove(this.destoryView, this);
    };
    BaseEuiView.prototype.removeFromParent = function () {
        var _parent = this.parent;
        DisplayUtils.removeFromParent(this);
        this.destoryView();
    };
    BaseEuiView.prototype.initUI = function () {
        this._isInit = true;
    };
    BaseEuiView.prototype.initData = function () {
    };
    BaseEuiView.prototype.destroy = function () {
    };
    BaseEuiView.prototype.destoryView = function (destroyUI) {
        if (destroyUI === void 0) { destroyUI = true; }
        TimerManager.ins().removeAll(this);
        ViewManager.ins().destroy(this.hashCode);
        if (destroyUI) {
            ResourceMgr.ins().destroyWin();
        }
    };
    BaseEuiView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseEuiView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseEuiView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            ResourceUtils.ins().loadResource(this._resources, [], loadComplete, null, this);
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    BaseEuiView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseEuiView.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    BaseEuiView.prototype.playUIEff = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.anigroup)
            UIAnimation.setAnimation(this.anigroup, UIAnimation.ANITYPE_IN_SCALE_VER, { time: 200 });
    };
    BaseEuiView.prototype.closeEx = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var func = param[0];
        if (this.parent == LayerManager.UI_Popup) {
            if (this.anigroup)
                UIAnimation.setAnimation(this.anigroup, UIAnimation.ANITYPE_OUT_SCALE_VER, {
                    time: 200,
                    func: func,
                    ease: egret.Ease.sineIn
                });
            else
                func();
        }
        else {
            func();
        }
    };
    return BaseEuiView;
}(BaseView));
__reflect(BaseEuiView.prototype, "BaseEuiView", ["IBaseView"]);
//# sourceMappingURL=BaseEuiView.js.map