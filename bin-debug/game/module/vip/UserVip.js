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
var UserVip = (function (_super) {
    __extends(UserVip, _super);
    function UserVip() {
        var _this = _super.call(this) || this;
        _this.weekState = 0;
        _this.vipGiftState = [];
        _this.sysId = PackageID.Vip;
        _this.regNetMsg(1, _this.postUpdateVipData);
        _this.regNetMsg(2, _this.postUpdataExp);
        _this.regNetMsg(3, _this.postUpdateVipAwards);
        _this.regNetMsg(4, _this.postUpdateWeekAwards);
        _this.regNetMsg(5, _this.postVipGiftBuy);
        _this.regNetMsg(6, _this.postSuperVipInfo);
        return _this;
    }
    UserVip.ins = function () {
        return _super.ins.call(this);
    };
    UserVip.prototype.initLogin = function () {
        var superVipData = window['getVipInfo']();
        if (superVipData) {
            this.superVipData = superVipData;
            this.postSuperVipData(this.superVipData);
        }
    };
    UserVip.prototype.postSuperVipData = function (data) {
        return data;
    };
    UserVip.prototype.sendGetAwards = function (lv) {
        var bytes = this.getBytes(1);
        bytes.writeInt(lv);
        this.sendToServer(bytes);
    };
    UserVip.prototype.sendGetWeekAwards = function () {
        this.sendBaseProto(4);
    };
    UserVip.prototype.sendGetVipGift = function (id) {
        var bytes = this.getBytes(5);
        bytes.writeByte(id);
        this.sendToServer(bytes);
    };
    UserVip.prototype.sendGetSuperVipInfo = function () {
        this.sendBaseProto(6);
    };
    UserVip.prototype.postUpdateVipData = function (bytes) {
        this.lv = bytes.readShort();
        this.exp = bytes.readInt();
        this.state = bytes.readInt();
        this.weekState = bytes.readShort();
        var len = bytes.readShort();
        this.vipGiftState = [];
        for (var i = 0; i < len; i++) {
            var id = bytes.readUnsignedInt();
            var state = bytes.readByte();
            var vipGift = { id: id, state: state };
            this.vipGiftState.push(vipGift);
        }
    };
    UserVip.prototype.postUpdataExp = function (bytes) {
        var lv = bytes.readShort();
        var newExp = bytes.readInt();
        var successYuanBaoNum = newExp - this.exp;
        this.exp = newExp;
        ViewManager.ins().close(WarnWin);
        WarnWin.show("恭喜你，充值成功，具体金额可查左下角看邮件", function () { }, this);
        this.weekState = bytes.readShort();
        if (lv > this.lv) {
            this.lv = lv;
        }
    };
    UserVip.prototype.postUpdateVipAwards = function (bytes) {
        this.state = bytes.readInt();
    };
    UserVip.prototype.postUpdateWeekAwards = function (bytes) {
        var boo = bytes.readBoolean();
        if (boo) {
            this.weekState = 0;
        }
    };
    UserVip.prototype.postVipGiftBuy = function (bytes) {
        var len = bytes.readShort();
        for (var j = 0; j < len; j++) {
            var id = bytes.readUnsignedInt();
            var state = bytes.readByte();
            for (var i = 0; i < this.vipGiftState.length; i++) {
                if (id == this.vipGiftState[i].id) {
                    this.vipGiftState[i].state = state;
                }
            }
        }
    };
    UserVip.prototype.postSuperVipInfo = function (bytes) {
        this.superVip = this.superVip || [];
        var len = 2;
        for (var i = 0; i < len; i++) {
            this.superVip[i] = Math.floor(bytes.readInt() / 100);
        }
    };
    UserVip.prototype.getSuperVipState = function () {
        if (this.superVip) {
            for (var id in GlobalConfig.SuperVipConfig) {
                var config = GlobalConfig.SuperVipConfig[id];
                var i = +id - 1;
                if (config.money <= (this.superVip[i] || 0)) {
                    return true;
                }
            }
        }
        return false;
    };
    UserVip.prototype.getVipState = function () {
        var bool = false;
        for (var i = 0; i < this.lv; i++) {
            if (this.state != undefined && ((this.state >> i) & 1) == 0) {
                bool = true;
                return bool;
            }
        }
        return bool;
    };
    UserVip.prototype.getVipGiftCanBuy = function (id) {
        var config = GlobalConfig.VipGiftConfig[id];
        if (config.cond) {
            for (var _i = 0, _a = config.cond; _i < _a.length; _i++) {
                var i = _a[_i];
                if ((this.vipGiftState[(+i) - 1].state & 1) == 0) {
                    return false;
                }
            }
        }
        return true;
    };
    UserVip.prototype.getVipGiftIsBuy = function (id) {
        return (this.vipGiftState[id - 1].state & 1) == 1;
    };
    UserVip.prototype.getVipGiftRedPoint = function (id) {
        var config = GlobalConfig.VipGiftConfig[id];
        if (this.lv >= config.vipLv) {
            return this.getVipGiftCanBuy(id) && !this.getVipGiftIsBuy(id) && config.needYb <= Actor.yb;
        }
        return false;
    };
    UserVip.prototype.getVipIndex = function (pageIndex) {
        for (var k in GlobalConfig.VipGiftConfig) {
            var hfTimes = GlobalConfig.VipGiftConfig[k].hfTimes;
            hfTimes = hfTimes ? hfTimes : 0;
            if (hfTimes == pageIndex)
                return GlobalConfig.VipGiftConfig[k];
        }
        return null;
    };
    UserVip.prototype.checkVipSuccess = function (hfcount) {
        var b = true;
        for (var k in GlobalConfig.VipGiftConfig) {
            var hfTimes = GlobalConfig.VipGiftConfig[k].hfTimes;
            hfTimes = hfTimes ? hfTimes : 0;
            if (hfTimes == hfcount) {
                var id = GlobalConfig.VipGiftConfig[k].id;
                if (!this.getVipGiftIsBuy(id)) {
                    b = false;
                    break;
                }
            }
        }
        return b;
    };
    UserVip.prototype.getVipPage = function () {
        var maxVipPage = [];
        for (var k in GlobalConfig.VipGiftConfig) {
            var hfTimes = GlobalConfig.VipGiftConfig[k].hfTimes;
            hfTimes = hfTimes ? hfTimes : 0;
            if (GameServer._hefuCount >= hfTimes && maxVipPage.indexOf(hfTimes) == -1) {
                maxVipPage.push(hfTimes);
            }
        }
        return maxVipPage;
    };
    return UserVip;
}(BaseSystem));
__reflect(UserVip.prototype, "UserVip");
var GameSystem;
(function (GameSystem) {
    GameSystem.userVip = UserVip.ins.bind(UserVip);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserVip.js.map