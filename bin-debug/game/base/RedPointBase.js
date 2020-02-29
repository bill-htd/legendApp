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
var RedPointBase = (function (_super) {
    __extends(RedPointBase, _super);
    function RedPointBase() {
        var _this = _super.call(this) || this;
        _this.initTabs();
        return _this;
    }
    RedPointBase.ins = function () {
        return _super.ins.call(this);
    };
    RedPointBase.prototype.initTabs = function () {
        this.isOpen = false;
        this.redpoint = false;
        this.tabs = {};
        this.toTabs = {};
        this.sumTabs = {};
        this.observe(this.postRedPoint, this.postOpen);
    };
    RedPointBase.prototype.registerTab = function (tab) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.tabs[tab] = false;
        this.associated.apply(this, [function () { return _this.updateTabRedPoint(tab); }].concat(args));
    };
    RedPointBase.prototype.registerSum = function (tab, tabs) {
        this.sumTabs[tab] = tabs;
        for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
            var t = tabs_1[_i];
            if (this.toTabs[t])
                this.toTabs[t].push(tab);
            else
                this.toTabs[t] = [tab];
        }
    };
    RedPointBase.prototype.registerOpen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.associated.apply(this, [this.postOpen].concat(args));
    };
    RedPointBase.prototype.postOpen = function () {
        var oldv = this.isOpen;
        this.isOpen = this.getIsOpen();
        if (this.isOpen && oldv != this.isOpen) {
            var keys = Object.keys(this.tabs);
            for (var i = 0; i < keys.length; i++) {
                var tab = +keys[i];
                this.updateTabRedPoint(tab);
            }
        }
        return this.isOpen != oldv;
    };
    RedPointBase.prototype.postRedPoint = function () {
        if (!this.isOpen) {
            if (this.redpoint) {
                this.redpoint = false;
                return true;
            }
            else {
                return false;
            }
        }
        var oldv = this.redpoint;
        this.redpoint = this.and();
        return this.redpoint != oldv;
    };
    RedPointBase.prototype.postTabs = function (tab) {
        return tab;
    };
    RedPointBase.prototype.getRedPoint = function (tab) {
        return this.tabs[tab];
    };
    RedPointBase.prototype.updateTabRedPoint = function (tab) {
        if (!this.isOpen)
            return;
        var oldv = this.tabs[tab];
        this.tabs[tab] = this.getTabRedPoint(tab);
        if (this.tabs[tab] != oldv) {
            this.sendTabs(tab);
        }
    };
    RedPointBase.prototype.sendTabs = function (tab) {
        this.postTabs(tab);
        var toTabs = this.toTabs[tab];
        if (toTabs) {
            for (var _i = 0, toTabs_1 = toTabs; _i < toTabs_1.length; _i++) {
                var t = toTabs_1[_i];
                var oldv = this.tabs[t];
                this.tabs[t] = this.andTabs(this.sumTabs[t]);
                if (this.tabs[t] != oldv) {
                    this.postTabs(t);
                }
            }
        }
        this.postRedPoint();
    };
    RedPointBase.prototype.and = function () {
        for (var k in this.tabs) {
            if (this.tabs[k])
                return true;
        }
        return false;
    };
    RedPointBase.prototype.andTabs = function (tabs) {
        for (var k in tabs) {
            if (this.getRedPoint(tabs[k]))
                return true;
        }
        return false;
    };
    RedPointBase.prototype.andList = function (list) {
        for (var k in list) {
            if (list[k])
                return true;
        }
        return false;
    };
    RedPointBase.prototype.getTabRedPoint = function (tab) {
        return false;
    };
    RedPointBase.prototype.getIsOpen = function () {
        return true;
    };
    return RedPointBase;
}(BaseSystem));
__reflect(RedPointBase.prototype, "RedPointBase");
//# sourceMappingURL=RedPointBase.js.map