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
var Recharge = (function (_super) {
    __extends(Recharge, _super);
    function Recharge() {
        var _this = _super.call(this) || this;
        _this._rechargeData = [];
        _this.flag = 0;
        _this.forevetCard = 0;
        _this.recharge_type = 0;
        _this.franchiseflag = 0;
        _this.franchiseget = 0;
        _this.firstBuy = 0;
        _this.sysId = PackageID.Recharge;
        _this.regNetMsg(1, _this.postRecharge1Data);
        _this.regNetMsg(2, _this.changeRecharge1Data);
        _this.regNetMsg(6, _this.getRecharge2Data);
        _this.regNetMsg(7, _this.changeRecharge2Data);
        _this.regNetMsg(8, _this.postUpDataItem);
        _this.regNetMsg(9, _this.postRechargeTotalDay);
        _this.regNetMsg(20, _this.postGetMonthDay);
        _this.regNetMsg(11, _this.postFranchiseInfo);
        _this.regNetMsg(12, _this.postMuchDayRecReward);
        return _this;
    }
    Recharge.ins = function () {
        return _super.ins.call(this);
    };
    Recharge.prototype.getRechargeData = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._rechargeData : (this._rechargeData[index] || new RechargeData());
    };
    Recharge.prototype.getCurRechargeConfig = function () {
        var rch = this.getRechargeData(0);
        var len = CommonUtils.getObjectLength(GlobalConfig.DailyRechargeConfig);
        if (rch.day <= len) {
            return GlobalConfig.DailyRechargeConfig[rch.day];
        }
        else {
            var loopDay = rch.day - len;
            len = CommonUtils.getObjectLength(GlobalConfig.LoopRechargeConfig);
            loopDay = loopDay % len || len;
            return GlobalConfig.LoopRechargeConfig[loopDay];
        }
    };
    Recharge.prototype.getCurDailyRechargeIsAllGet = function () {
        var data = Recharge.ins().getRechargeData(0);
        var config = Recharge.ins().getCurRechargeConfig();
        var len = CommonUtils.getObjectLength(config);
        for (var i = 0; i < len; i++) {
            var boo2 = ((data.isAwards >> i) & 1) ? true : false;
            if (!boo2)
                return false;
        }
        return true;
    };
    Recharge.prototype.sendGetAwards = function (type, id) {
        var bytes = this.getBytes(type == 0 ? 2 : 7);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    Recharge.prototype.postRecharge1Data = function (bytes) {
        this.recharge(bytes, 0);
    };
    Recharge.prototype.changeRecharge1Data = function () {
        var bytes = this.getBytes(2);
        this.sendToServer(bytes);
    };
    Recharge.prototype.postUpdateRechargeEx = function (param) {
        return { type: param };
    };
    Recharge.prototype.postUpdateRecharge = function (param) {
        return param;
    };
    Recharge.prototype.getDayReward = function (index) {
        var bytes = this.getBytes(3);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    Recharge.prototype.getRecharge2Data = function (bytes) {
    };
    Recharge.prototype.changeRecharge2Data = function (bytes) {
        var data = this.getRechargeData(1);
        if (data) {
            data.change(bytes);
            Recharge.ins().postUpdateRecharge(1);
        }
    };
    Recharge.prototype.getRechargeTotalAward = function (index) {
        var bytes = this.getBytes(8);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    Recharge.prototype.recharge = function (bytes, type) {
        if (!this._rechargeData[type])
            this._rechargeData[type] = new RechargeData;
        this._rechargeData[type].parser(bytes, type);
        if (type == 0) {
            var boo2 = Recharge.ins().getCurDailyRechargeIsAllGet();
            if (boo2)
                ViewManager.ins().close(Recharge2Win);
        }
        Recharge.ins().postUpdateRechargeEx(type);
        this.recharge_type = type;
    };
    Recharge.prototype.postUpDataItem = function (bytes) {
        this.costList = bytes.readInt();
    };
    Recharge.prototype.postRechargeTotalDay = function (bytes) {
        this.rechargeTotal = {};
        this.rechargeTotal.hasGetDays = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            this.rechargeTotal.hasGetDays.push(bytes.readShort());
        }
        this.rechargeTotal.totalDay = bytes.readShort();
    };
    Recharge.prototype.postGetMonthDay = function (bytes) {
        var leftTime = bytes.readUnsignedInt();
        if (leftTime > 0) {
            this.monthDay = leftTime;
        }
        else {
            this.monthDay = 0;
        }
        if (leftTime > 0)
            this.flag = 2;
        this.forevetCard = bytes.readInt();
        if (!Setting.ins().getValue(ClientSet.firstMonthCard) && (this.monthDay > 0 || this.getIsForeve()))
            Setting.ins().setValue(ClientSet.firstMonthCard, 1);
    };
    Recharge.prototype.getOrderByIndex = function (index) {
        if (index === void 0) { index = 0; }
        var num = (this.costList >> index) & 1;
        return num;
    };
    Object.defineProperty(Recharge.prototype, "monthDay", {
        get: function () {
            return this._monthDay;
        },
        set: function (value) {
            if (this._monthDay != value) {
                this._monthDay = value;
                TimerManager.ins().remove(this.downTime, this);
                if (this._monthDay > 0) {
                    TimerManager.ins().doTimer(1000, this._monthDay, this.downTime, this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Recharge.prototype.downTime = function () {
        this._monthDay -= 1;
    };
    Recharge.prototype.getAddBagGrid = function () {
        return this.monthDay > 0 ? 100 : 0;
    };
    Recharge.prototype.getAddBagFranchiseGrid = function () {
        return this.franchise > 0 ? 100 : 0;
    };
    Recharge.prototype.showReCharge = function (payIndex, yuanbao) {
        if (!OpenSystem.ins().checkSysOpen(SystemType.FIRSTCHARGE)) {
            UserTips.ins().showTips("\u5145\u503C\u5DF2\u5C4F\u853D");
            return;
        }
        var money = 0;
        switch (payIndex) {
            case 1:
                money = 10;
                break;
            case 2:
                money = 20;
                break;
            case 3:
                money = 50;
                break;
            case 4:
                money = 100;
                break;
            case 5:
                money = 200;
                break;
            case 6:
                money = 440;
                break;
            case 7:
                money = 840;
                break;
            case 8:
                money = 1230;
                break;
            case 9:
                money = 1560;
                break;
            case 10:
                money = 2250;
                break;
            case 1000:
                money = 28;
                break;
            case 1001:
                money = 88;
                break;
        }
        ViewManager.ins().open(payWin, { money: money, yuanbao: yuanbao });
    };
    Recharge.prototype.getIsForeve = function () {
        return Recharge.ins().forevetCard == 2;
    };
    Recharge.prototype.sendGetFranchise = function () {
        this.sendBaseProto(10);
    };
    Recharge.prototype.postFranchiseInfo = function (bytes) {
        var leftTime = bytes.readUnsignedInt();
        if (leftTime > 0) {
            this.franchise = leftTime;
        }
        else {
            this.franchise = 0;
        }
        this.franchiseget = bytes.readByte();
        this.firstBuy = bytes.readByte();
    };
    Object.defineProperty(Recharge.prototype, "franchise", {
        get: function () {
            return this._franchise;
        },
        set: function (value) {
            if (this._franchise != value) {
                this._franchise = value;
                TimerManager.ins().remove(this.franchiseTime, this);
                if (this._franchise > 0) {
                    TimerManager.ins().doTimer(1000, this._franchise, this.franchiseTime, this);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Recharge.prototype.franchiseTime = function () {
        this._franchise -= 1;
    };
    Recharge.prototype.getRechargeList = function () {
        var configs = GlobalConfig.RechargeDaysAwardsConfig;
        var list = [];
        var rechargeMap = {};
        var rechargeMapSum = {};
        for (var i in configs) {
            if (!rechargeMap[configs[i].sum])
                rechargeMap[configs[i].sum] = [];
            if (!rechargeMapSum[configs[i].sum])
                rechargeMapSum[configs[i].sum] = 0;
            if (Recharge.ins().rechargeTotal.hasGetDays.indexOf(configs[i].id) >= 0) {
                rechargeMapSum[configs[i].sum]++;
            }
            rechargeMap[configs[i].sum].push(configs[i]);
        }
        for (var i in rechargeMapSum) {
            if (list.length)
                break;
            if (rechargeMapSum[i] >= CommonUtils.getObjectLength(rechargeMap[i])) {
                continue;
            }
            for (var j in rechargeMap[i]) {
                list.push(rechargeMap[i][j]);
            }
        }
        return list;
    };
    Recharge.prototype.sendMuchDayRecReward = function () {
        this.sendBaseProto(11);
    };
    Recharge.prototype.postMuchDayRecReward = function (bytes) {
        this.mRecNum = bytes.readInt();
        this.mReward = bytes.readByte();
        this.mDayNum = bytes.readShort();
    };
    return Recharge;
}(BaseSystem));
__reflect(Recharge.prototype, "Recharge");
var RechargeData = (function () {
    function RechargeData() {
    }
    RechargeData.prototype.parser = function (bytes, type) {
        this.day = bytes.readShort() + 1;
        this.curDayPay = bytes.readInt();
        this.num = bytes.readInt();
        this.isAwards = bytes.readInt();
    };
    RechargeData.prototype.change = function (bytes) {
        this.num = bytes.readInt();
        this.isAwards = bytes.readInt();
    };
    RechargeData.checkOpenWin = function () {
        var rdata = Recharge.ins().getRechargeData(0);
        if (!rdata || !rdata.num) {
            ViewManager.ins().open(Recharge1Win);
        }
        else {
            ViewManager.ins().open(ChargeFirstWin);
        }
    };
    return RechargeData;
}());
__reflect(RechargeData.prototype, "RechargeData");
var GameSystem;
(function (GameSystem) {
    GameSystem.recharge = Recharge.ins.bind(Recharge);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Recharge.js.map