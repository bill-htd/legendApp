var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DeviceUtils = (function () {
    function DeviceUtils() {
    }
    Object.defineProperty(DeviceUtils, "IsHtml5", {
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsNative", {
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsMobile", {
        get: function () {
            return egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsPC", {
        get: function () {
            return !egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsQQBrowser", {
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsIEBrowser", {
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsFirefoxBrowser", {
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsChromeBrowser", {
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsSafariBrowser", {
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsOperaBrowser", {
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
        },
        enumerable: true,
        configurable: true
    });
    return DeviceUtils;
}());
__reflect(DeviceUtils.prototype, "DeviceUtils");
//# sourceMappingURL=DeviceUtils.js.map