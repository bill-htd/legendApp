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
var Millionaire = (function (_super) {
    __extends(Millionaire, _super);
    function Millionaire() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Millionaire;
        _this.regNetMsg(1, _this.postMillionaireInfo);
        _this.regNetMsg(2, _this.postTurnDice);
        _this.regNetMsg(3, _this.postRoundReward);
        _this.regNetMsg(4, _this.postOverAllReward);
        _this.regNetMsg(5, _this.postMillionaireUpdate);
        _this.dice = 0;
        _this.gridId = 0;
        _this.round = 0;
        _this.roundReward = 0;
        _this.randomGridById = 0;
        _this.randomGridByRewardId = 0;
        _this.rewardIdByGrids = [];
        _this.isStrideStart = 0;
        _this.dicePoint = 0;
        _this.autoTurnDice = 0;
        _this.isAutoGo = false;
        return _this;
    }
    Millionaire.ins = function () {
        return _super.ins.call(this);
    };
    Millionaire.prototype.postMillionaireInfo = function (bytes) {
        this.dice = bytes.readShort();
        this.gridId = bytes.readShort();
        this.round = bytes.readShort();
        this.roundReward = bytes.readInt();
        this.randomGridById = bytes.readShort();
        this.randomGridByRewardId = bytes.readUnsignedByte();
        var gridSum = bytes.readShort();
        for (var i = 1; i <= gridSum; i++) {
            var reward = bytes.readShort();
            this.rewardIdByGrids[i] = reward;
        }
        var cfg = GlobalConfig.RichManGridConfig[this.gridId];
        if (cfg && cfg.action == 2) {
        }
    };
    Millionaire.prototype.postTurnDice = function (bytes) {
        this.isStrideStart = bytes.readUnsignedByte();
        this.gridId = bytes.readShort();
        this.dicePoint = bytes.readUnsignedByte();
    };
    Millionaire.prototype.postRoundReward = function (bytes) {
        var roundRewardConfigId = bytes.readUnsignedByte();
        this.roundReward = bytes.readInt();
    };
    Millionaire.prototype.postOverAllReward = function (bytes) {
        this.randomGridById = bytes.readShort();
        this.randomGridByRewardId = bytes.readUnsignedByte();
    };
    Millionaire.prototype.postMillionaireUpdate = function (bytes) {
        this.dice = bytes.readShort();
        this.round = bytes.readShort();
        this.roundReward = bytes.readInt();
    };
    Millionaire.prototype.sendMillionaireInfo = function () {
        this.sendBaseProto(1);
    };
    Millionaire.prototype.sendTurnDice = function () {
        this.sendBaseProto(2);
    };
    Millionaire.prototype.sendRoundReward = function (roundId) {
        var bytes = this.getBytes(3);
        bytes.writeInt(roundId);
        this.sendToServer(bytes);
    };
    Millionaire.prototype.getRedPoint = function () {
        if (!MillionaireWin.isOpen())
            return false;
        if (this.dice > 0)
            return true;
        for (var k in GlobalConfig.RichManRoundAwardConfig) {
            if (!(this.roundReward >> Number(k) & 1)) {
                if (this.round >= GlobalConfig.RichManRoundAwardConfig[k].round)
                    return true;
            }
        }
        return false;
    };
    return Millionaire;
}(BaseSystem));
__reflect(Millionaire.prototype, "Millionaire");
var GameSystem;
(function (GameSystem) {
    GameSystem.millionaire = Millionaire.ins.bind(Millionaire);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Millionaire.js.map