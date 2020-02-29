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
var BaseSpriteView = (function (_super) {
    __extends(BaseSpriteView, _super);
    function BaseSpriteView($parent) {
        var _this = _super.call(this) || this;
        _this._resources = null;
        _this._myParent = $parent;
        _this._isInit = false;
        StageUtils.ins().getStage().addEventListener(egret.Event.RESIZE, _this.onResize, _this);
        return _this;
    }
    BaseSpriteView.prototype.setResources = function (resources) {
        this._resources = resources;
    };
    Object.defineProperty(BaseSpriteView.prototype, "myParent", {
        get: function () {
            return this._myParent;
        },
        enumerable: true,
        configurable: true
    });
    BaseSpriteView.prototype.isInit = function () {
        return this._isInit;
    };
    BaseSpriteView.prototype.isShow = function () {
        return this.stage != null && this.visible;
    };
    BaseSpriteView.prototype.addToParent = function () {
        this._myParent.addChild(this);
    };
    BaseSpriteView.prototype.removeFromParent = function () {
        DisplayUtils.removeFromParent(this);
    };
    BaseSpriteView.prototype.initUI = function () {
        this._isInit = true;
    };
    BaseSpriteView.prototype.initData = function () {
    };
    BaseSpriteView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseSpriteView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseSpriteView.prototype.destroy = function () {
        this._myParent = null;
        this._resources = null;
    };
    BaseSpriteView.prototype.onResize = function () {
    };
    BaseSpriteView.prototype.loadResource = function (loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            ResourceUtils.ins().loadResource(this._resources, [], function () {
                loadComplete();
                initComplete();
            }, null, this);
        }
        else {
            loadComplete();
            initComplete();
        }
    };
    BaseSpriteView.prototype.setVisible = function (value) {
        this.visible = value;
    };
    BaseSpriteView.openCheck = function () {
        return true;
    };
    return BaseSpriteView;
}(egret.DisplayObjectContainer));
__reflect(BaseSpriteView.prototype, "BaseSpriteView", ["IBaseView"]);
//# sourceMappingURL=BaseSpriteView.js.map