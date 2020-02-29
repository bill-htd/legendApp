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
var ClientSet;
(function (ClientSet) {
    ClientSet[ClientSet["guidePart"] = 0] = "guidePart";
    ClientSet[ClientSet["guideStep"] = 1] = "guideStep";
    ClientSet[ClientSet["expFirst"] = 2] = "expFirst";
    ClientSet[ClientSet["headRed"] = 3] = "headRed";
    ClientSet[ClientSet["diedFirstTime"] = 4] = "diedFirstTime";
    ClientSet[ClientSet["recharge1"] = 5] = "recharge1";
    ClientSet[ClientSet["vip"] = 6] = "vip";
    ClientSet[ClientSet["role"] = 7] = "role";
    ClientSet[ClientSet["FB"] = 8] = "FB";
    ClientSet[ClientSet["recharge2"] = 9] = "recharge2";
    ClientSet[ClientSet["diedFirstTime2"] = 10] = "diedFirstTime2";
    ClientSet[ClientSet["mijiRedPoint"] = 11] = "mijiRedPoint";
    ClientSet[ClientSet["firstMonthCard"] = 12] = "firstMonthCard";
    ClientSet[ClientSet["firstrecharge1"] = 13] = "firstrecharge1";
    ClientSet[ClientSet["firstClickTreasure"] = 14] = "firstClickTreasure";
    ClientSet[ClientSet["autoHeji"] = 15] = "autoHeji";
})(ClientSet || (ClientSet = {}));
var Setting = (function (_super) {
    __extends(Setting, _super);
    function Setting() {
        var _this = _super.call(this) || this;
        _this.map = {};
        _this.sysId = PackageID.Default;
        _this.regNetMsg(19, _this.parser);
        return _this;
    }
    Object.defineProperty(Setting, "currPart", {
        get: function () {
            return Setting.ins().getValue(ClientSet.guidePart);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Setting, "currStep", {
        get: function () {
            return Setting.ins().getValue(ClientSet.guideStep);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Setting.ins = function () {
        return _super.ins.call(this);
    };
    Setting.prototype.parser = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            this.map[bytes.readInt()] = bytes.readInt();
        }
        GuideUtils.ins().init();
        this.postInitSetting();
    };
    Setting.prototype.postInitSetting = function () {
        return true;
    };
    Setting.prototype.sendSave = function (key, value) {
        var bytes = this.getBytes(19);
        bytes.writeInt(key);
        bytes.writeInt(value);
        this.sendToServer(bytes);
        this.map[key] = value;
    };
    Setting.prototype.setValue = function (key, value) {
        this.sendSave(key, value);
    };
    Setting.prototype.getValue = function (key, def) {
        if (def === void 0) { def = 0; }
        return this.map[key] == undefined ? def : this.map[key];
    };
    return Setting;
}(BaseSystem));
__reflect(Setting.prototype, "Setting");
var GameSystem;
(function (GameSystem) {
    GameSystem.setting = Setting.ins.bind(Setting);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Setting.js.map