var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DebugUtils = (function () {
    function DebugUtils() {
    }
    DebugUtils.isOpen = function (flag) {
        this._isOpen = flag;
    };
    Object.defineProperty(DebugUtils, "isDebug", {
        get: function () {
            return window['isDebug'] ? window['isDebug'] : false;
        },
        enumerable: true,
        configurable: true
    });
    DebugUtils.log = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug) {
            egret.log(msg, param);
        }
    };
    DebugUtils.warn = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug) {
            egret.warn(msg, param);
        }
    };
    DebugUtils.error = function (msg) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        egret.error(msg, param);
    };
    DebugUtils.start = function (key) {
        if (!this._isOpen) {
            return;
        }
        this._startTimes[key] = egret.getTimer();
    };
    DebugUtils.stop = function (key) {
        if (!this._isOpen) {
            return 0;
        }
        if (!this._startTimes[key]) {
            return 0;
        }
        var cha = egret.getTimer() - this._startTimes[key];
        if (cha > this._threshold) {
            Log.trace(key + ": " + cha);
        }
        return cha;
    };
    DebugUtils.setThreshold = function (value) {
        this._threshold = value;
    };
    DebugUtils._startTimes = {};
    DebugUtils._threshold = 3;
    return DebugUtils;
}());
__reflect(DebugUtils.prototype, "DebugUtils");
var debug = {
    log: DebugUtils.log,
    warn: DebugUtils.warn,
    error: DebugUtils.error
};
//# sourceMappingURL=DebugUtils.js.map