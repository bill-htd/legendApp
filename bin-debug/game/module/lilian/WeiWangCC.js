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
var WeiWangCC = (function (_super) {
    __extends(WeiWangCC, _super);
    function WeiWangCC() {
        var _this = _super.call(this) || this;
        _this._weiWangBack = 0;
        _this.sysId = PackageID.WeiWang;
        _this.regNetMsg(1, _this.postWeiWangBack);
        return _this;
    }
    WeiWangCC.ins = function () {
        return _super.ins.call(this);
    };
    WeiWangCC.prototype.postWeiWangBack = function (bytes) {
        this._weiWangBack = bytes.readInt();
    };
    Object.defineProperty(WeiWangCC.prototype, "weiWangBack", {
        get: function () {
            return this._weiWangBack;
        },
        enumerable: true,
        configurable: true
    });
    WeiWangCC.prototype.sendFindWeiWang = function () {
        this.sendBaseProto(2);
    };
    WeiWangCC.prototype.getWeiWangCfg = function (wei) {
        var len = Object.keys(GlobalConfig.PrestigeLevel).length;
        for (var i = 1; i <= len; i++) {
            if (wei < GlobalConfig.PrestigeLevel[i].exp)
                return GlobalConfig.PrestigeLevel[i - 1];
        }
        return GlobalConfig.PrestigeLevel[wei ? len : 1];
    };
    Object.defineProperty(WeiWangCC.prototype, "isOpen", {
        get: function () {
            return Actor.level < GlobalConfig.PrestigeBase.openLevel || GameServer.serverOpenDay < GlobalConfig.PrestigeBase.openDay - 1 ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    return WeiWangCC;
}(BaseSystem));
__reflect(WeiWangCC.prototype, "WeiWangCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.weiWang = WeiWangCC.ins.bind(WeiWangCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=WeiWangCC.js.map