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
var BaseSystem = (function (_super) {
    __extends(BaseSystem, _super);
    function BaseSystem() {
        var _this = _super.call(this) || this;
        MessageCenter.compile(egret.getDefinitionByName(egret.getQualifiedClassName(_this)));
        _this.observe(GameApp.ins().postLoginInit, _this.initLogin);
        _this.observe(GameApp.ins().postZeroInit, _this.initZero);
        return _this;
    }
    BaseSystem.prototype.regNetMsg = function (msgId, fun) {
        GameSocket.ins().registerSTCFunc(this.sysId, msgId, fun, this);
    };
    BaseSystem.prototype.initLogin = function () {
    };
    BaseSystem.prototype.initZero = function () {
    };
    BaseSystem.prototype.getGameByteArray = function () {
        return GameSocket.ins().getBytes();
    };
    BaseSystem.prototype.getBytes = function (msgid) {
        var bytes = this.getGameByteArray();
        bytes.writeCmd(this.sysId, msgid);
        return bytes;
    };
    BaseSystem.prototype.sendBaseProto = function (msgid) {
        var bytes = this.getGameByteArray();
        bytes.writeCmd(this.sysId, msgid);
        this.sendToServer(bytes);
    };
    BaseSystem.prototype.sendToServer = function (bytes) {
        GameSocket.ins().sendToServer(bytes);
    };
    BaseSystem.prototype.observe = function (func, myfunc) {
        MessageCenter.addListener(func, myfunc, this);
    };
    BaseSystem.prototype.removeObserve = function () {
        MessageCenter.ins().removeAll(this);
    };
    BaseSystem.prototype.associated = function (fun) {
        var _this = this;
        var funs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            funs[_i - 1] = arguments[_i];
        }
        var isDelayCall = false;
        var callFunc = function () {
            isDelayCall = false;
            fun.call(_this);
        };
        var delayFunc = function () {
            if (!isDelayCall) {
                isDelayCall = true;
                TimerManager.ins().doTimer(60, 1, callFunc, _this);
            }
        };
        for (var _a = 0, funs_1 = funs; _a < funs_1.length; _a++) {
            var i = funs_1[_a];
            this.observe(i, delayFunc);
        }
    };
    return BaseSystem;
}(BaseClass));
__reflect(BaseSystem.prototype, "BaseSystem");
MessageCenter.compile(BaseSystem);
//# sourceMappingURL=BaseSystem.js.map