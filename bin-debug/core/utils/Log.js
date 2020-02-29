var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Log = (function () {
    function Log() {
    }
    Log.trace = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i] = arguments[_i];
        }
        if (DebugUtils.isDebug) {
            optionalParams[0] = "[DebugLog]" + optionalParams[0];
            debug.log.apply(console, optionalParams);
        }
    };
    return Log;
}());
__reflect(Log.prototype, "Log");
//# sourceMappingURL=Log.js.map