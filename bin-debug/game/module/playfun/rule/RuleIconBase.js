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
var RuleIconBase = (function (_super) {
    __extends(RuleIconBase, _super);
    function RuleIconBase(id, tar) {
        if (tar === void 0) { tar = null; }
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.isDelayUpdateShow = false;
        _this.isDelayUpdate = false;
        _this.id = id;
        _this.tar = tar;
        return _this;
    }
    RuleIconBase.prototype.getTar = function () {
        if (this.tar)
            return this.tar;
        return this.createTar();
    };
    RuleIconBase.prototype.createTar = function () {
        var config = GlobalConfig.PlayFunConfig[this.id];
        var cls = config.iconCls == "eui.Button" ? eui.Button : egret.getDefinitionByName(config.iconCls);
        var tar = new cls();
        if (config.iconSkin)
            tar.skinName = config.iconSkin;
        if (config.icon)
            tar.icon = config.icon;
        if (config.iconParam) {
            for (var key in config.iconParam)
                tar[key] = config.iconParam[key];
        }
        this.tar = tar;
        return tar;
    };
    RuleIconBase.prototype.getConfig = function () {
        return GlobalConfig.PlayFunConfig[this.id];
    };
    RuleIconBase.prototype.delayUpdateShow = function () {
        if (!this.isDelayUpdateShow) {
            this.isDelayUpdateShow = true;
            TimerManager.ins().doTimer(100, 1, this.updateShow, this);
        }
    };
    RuleIconBase.prototype.updateShow = function () {
        this.isDelayUpdateShow = false;
        RuleIconBase.updateShow(this);
    };
    RuleIconBase.prototype.delayUpdate = function () {
        if (!this.isDelayUpdate) {
            this.isDelayUpdate = true;
            TimerManager.ins().doTimer(100, 1, this.update, this);
        }
    };
    RuleIconBase.prototype.update = function () {
        this.isDelayUpdate = false;
        RuleIconBase.update(this);
    };
    RuleIconBase.prototype.checkShowIcon = function () {
        return true;
    };
    RuleIconBase.prototype.checkShowRedPoint = function () {
        return 0;
    };
    RuleIconBase.prototype.getEffName = function (redPointNum) {
        return null;
    };
    RuleIconBase.prototype.tapExecute = function () {
    };
    RuleIconBase.prototype.addShowEvents = function () {
        if (!this.showMessage)
            return;
        for (var _i = 0, _a = this.showMessage; _i < _a.length; _i++) {
            var fun = _a[_i];
            MessageCenter.addListener(fun, this.delayUpdateShow, this);
        }
    };
    RuleIconBase.prototype.addRedEvents = function () {
        if (!this.updateMessage)
            return;
        for (var _i = 0, _a = this.updateMessage; _i < _a.length; _i++) {
            var fun = _a[_i];
            MessageCenter.addListener(fun, this.delayUpdate, this);
        }
    };
    RuleIconBase.prototype.removeRedEvents = function () {
        if (!this.updateMessage)
            return;
        for (var _i = 0, _a = this.updateMessage; _i < _a.length; _i++) {
            var fun = _a[_i];
            MessageCenter.ins().removeListener(fun.funcallname, this.delayUpdate, this);
        }
    };
    RuleIconBase.prototype.removeEvents = function () {
        MessageCenter.ins().removeAll(this);
    };
    return RuleIconBase;
}(egret.HashObject));
__reflect(RuleIconBase.prototype, "RuleIconBase");
//# sourceMappingURL=RuleIconBase.js.map