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
var UserZs = (function (_super) {
    __extends(UserZs, _super);
    function UserZs() {
        var _this = _super.call(this) || this;
        _this.isSendXW = [];
        _this.sysId = PackageID.Zs;
        _this.regNetMsg(1, _this.postZsData);
        _this.exchange = false;
        return _this;
    }
    UserZs.ins = function () {
        return _super.ins.call(this);
    };
    UserZs.prototype.postZsData = function (bytes) {
        this.lv = bytes.readInt();
        var oldexp = this.exp;
        this.exp = bytes.readInt();
        this.upgradeCount = [bytes.readShort(), bytes.readShort(), bytes.readShort()];
        if (oldexp)
            Actor.ins().postZsExpChange(this.exp - oldexp);
        this.postZsLv();
    };
    UserZs.prototype.postZsLv = function () {
    };
    UserZs.prototype.sendGetXiuWei = function (type) {
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    UserZs.prototype.sendZsUpgrade = function () {
        this.sendBaseProto(2);
    };
    UserZs.prototype.canUpgrade = function () {
        var nextAttConfig = GlobalConfig.ZhuanShengLevelConfig[this.lv + 1];
        if (!nextAttConfig)
            return false;
        return this.exp >= nextAttConfig.exp;
    };
    UserZs.prototype.isMaxLv = function () {
        return GlobalConfig.ZhuanShengLevelConfig[this.lv + 1] ? false : true;
    };
    UserZs.prototype.canGet = function () {
        var sum = 0;
        if (!this.upgradeCount)
            return sum;
        var config = GlobalConfig.ZhuanShengConfig;
        var canCount = [config.conversionCount, config.normalCount, config.advanceCount];
        var items = [0, config.normalItem, config.advanceItem];
        for (var i = 0; i < canCount.length; i++) {
            if (canCount[i] - this.upgradeCount[i]) {
                if ((!items[i] && Actor.level > 80) || UserBag.ins().getBagGoodsCountById(0, items[i]))
                    if (i == 0) {
                        if (!UserZs.ins().exchange)
                            sum = sum | 1 << i;
                    }
                    else
                        sum = sum | 1 << i;
            }
        }
        return sum;
    };
    UserZs.prototype.canOpenZSWin = function () {
        var lv = Actor.level;
        var zs = this.lv != null ? this.lv : 0;
        if (zs <= 0 && lv < 80)
            return false;
        else
            return true;
    };
    return UserZs;
}(BaseSystem));
__reflect(UserZs.prototype, "UserZs");
var GameSystem;
(function (GameSystem) {
    GameSystem.userZs = UserZs.ins.bind(UserZs);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserZs.js.map