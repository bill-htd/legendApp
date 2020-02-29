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
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseView.prototype.observe = function (func, myfunc, callobj) {
        if (callobj === void 0) { callobj = undefined; }
        MessageCenter.addListener(func, myfunc, this, callobj);
    };
    BaseView.prototype.removeObserve = function () {
        MessageCenter.ins().removeAll(this);
    };
    BaseView.prototype.addTouchEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    };
    BaseView.prototype.addTouchEndEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
    };
    BaseView.prototype.addChangeEvent = function (obj, func) {
        var _this = this;
        if (obj && obj instanceof eui.TabBar) {
            this.addEvent(egret.TouchEvent.CHANGE, obj, function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                SoundUtil.ins().playEffect(SoundUtil.WINDOW);
                func.call.apply(func, [_this].concat(param));
            });
        }
        else {
            this.addEvent(egret.TouchEvent.CHANGE, obj, func);
        }
    };
    BaseView.prototype.addChangingEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.CHANGING, obj, func);
    };
    BaseView.prototype.addEvent = function (ev, obj, func) {
        if (!obj) {
            console.error("\u4E0D\u5B58\u5728\u7ED1\u5B9A\u5BF9\u8C61");
            return;
        }
        obj.addEventListener(ev, func, this);
    };
    BaseView.prototype.removeTouchEvent = function (obj, func) {
        if (obj)
            obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
    };
    BaseView.prototype.$onClose = function () {
        var fun = function (tar) {
            for (var i = 0; i < tar.numChildren; i++) {
                var obj = tar.getChildAt(i);
                if (obj instanceof BaseView) {
                    obj.$onClose();
                }
                else if (obj instanceof egret.DisplayObjectContainer) {
                    fun(obj);
                }
            }
        };
        fun(this);
        this.removeObserve();
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map