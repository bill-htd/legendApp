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
var MillionaireData = (function (_super) {
    __extends(MillionaireData, _super);
    function MillionaireData() {
        var _this = _super.call(this) || this;
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
    MillionaireData.ins = function () {
        return _super.ins.call(this);
    };
    MillionaireData.prototype.parser = function (bytes) {
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
    MillionaireData.prototype.parserTurnDice = function (bytes) {
        this.isStrideStart = bytes.readUnsignedByte();
        this.gridId = bytes.readShort();
        this.dicePoint = bytes.readUnsignedByte();
    };
    MillionaireData.prototype.parserRoundReward = function (bytes) {
        this.roundReward = bytes.readInt();
    };
    MillionaireData.prototype.parserOverAllReward = function (bytes) {
        this.randomGridById = bytes.readShort();
        this.randomGridByRewardId = bytes.readUnsignedByte();
    };
    MillionaireData.prototype.parserMillionaireUpdate = function (bytes) {
        this.dice = bytes.readShort();
        this.round = bytes.readShort();
        this.roundReward = bytes.readInt();
    };
    MillionaireData.prototype.getRedPoint = function () {
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
    return MillionaireData;
}(BaseClass));
__reflect(MillionaireData.prototype, "MillionaireData");
//# sourceMappingURL=MillionaireData.js.map