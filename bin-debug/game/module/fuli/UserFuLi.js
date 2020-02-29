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
var UserFuLi = (function (_super) {
    __extends(UserFuLi, _super);
    function UserFuLi() {
        var _this = _super.call(this) || this;
        _this.playNum = 0;
        _this.boxOn = 0;
        _this.addCoefficient = 1;
        _this.exp = 0;
        _this.boxInfo = 0;
        _this.baoji = 0;
        _this.isOpen = [];
        _this.sysId = PackageID.moneyTree;
        _this.regNetMsg(1, _this.doMoneyTreeInfo);
        _this.regNetMsg(2, _this.doPalyBack);
        _this.regNetMsg(3, _this.doGetRewardBack);
        return _this;
    }
    UserFuLi.ins = function () {
        return _super.ins.call(this);
    };
    UserFuLi.prototype.sendPlayYaoYao = function () {
        this.sendBaseProto(2);
    };
    UserFuLi.prototype.sendGetCaseReward = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserFuLi.prototype.doMoneyTreeInfo = function (bytes) {
        this.playNum = bytes.readUnsignedShort();
        this.boxOn = bytes.readUnsignedShort();
        this.addCoefficient = bytes.readUnsignedShort();
        this.exp = bytes.readUnsignedShort();
        this.boxInfo = bytes.readInt();
        this.postMoneyInfoChange();
    };
    UserFuLi.prototype.postMoneyInfoChange = function (param) {
        if (param === void 0) { param = null; }
        return param;
    };
    UserFuLi.prototype.doPalyBack = function (bytes) {
        this.playNum = bytes.readUnsignedShort();
        this.boxOn = bytes.readUnsignedShort();
        this.addCoefficient = bytes.readUnsignedShort();
        this.exp = bytes.readUnsignedShort();
        this.baoji = bytes.readUnsignedShort();
        this.postMoneyInfoChange([false, this.baoji]);
    };
    UserFuLi.prototype.doGetRewardBack = function (bytes) {
        this.boxInfo = bytes.readInt();
        this.postMoneyInfoChange();
    };
    UserFuLi.prototype.getOrderByIndex = function (index) {
        if (index === void 0) { index = 0; }
        var num = (this.boxInfo >> index) & 1;
        return num;
    };
    UserFuLi.prototype.getNowCoefficientinfo = function (index) {
        if (index === void 0) { index = 0; }
        var config = GlobalConfig.CashCowAmplitudeConfig;
        for (var k in config) {
            if (config[k].level == (this.addCoefficient + index)) {
                return config[k];
            }
        }
        return null;
    };
    Object.defineProperty(UserFuLi.prototype, "maxNum", {
        get: function () {
            return this.checkCashCowBasicLenght(10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFuLi.prototype, "cruMaxNum", {
        get: function () {
            return this.checkCashCowBasicLenght();
        },
        enumerable: true,
        configurable: true
    });
    UserFuLi.prototype.getIndexCost = function () {
        var config = GlobalConfig.CashCowBasicConfig;
        for (var k in config) {
            if (config[k].time == (this.boxOn + 1)) {
                return config[k];
            }
        }
        return null;
    };
    UserFuLi.prototype.getBoxInfoByIndex = function (index) {
        var config = GlobalConfig.CashCowBoxConfig;
        for (var k in config) {
            if (config[k].index == index) {
                return config[k];
            }
        }
        return null;
    };
    UserFuLi.prototype.checkCashCowBasicLenght = function (lv) {
        if (lv === void 0) { lv = 0; }
        if (lv == 0) {
            lv = UserVip.ins().lv;
        }
        var config = GlobalConfig.CashCowLimitConfig;
        for (var k in config) {
            if (config[k].vip == lv) {
                return config[k].maxTime;
            }
        }
        return 0;
    };
    UserFuLi.prototype.checkBoxIsCanget = function (index) {
        var data = this.getBoxInfoByIndex(index);
        if (data.time <= this.playNum) {
            if (this.getOrderByIndex(index - 1) <= 0) {
                return true;
            }
        }
        return false;
    };
    return UserFuLi;
}(BaseSystem));
__reflect(UserFuLi.prototype, "UserFuLi");
var GameSystem;
(function (GameSystem) {
    GameSystem.userfuli = UserFuLi.ins.bind(UserFuLi);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserFuLi.js.map