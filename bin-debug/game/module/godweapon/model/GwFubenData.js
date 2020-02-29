var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GwFubenData = (function () {
    function GwFubenData() {
    }
    GwFubenData.prototype.parse = function (bytes) {
        this.hadBuyData = [];
        this.hadChallengeNum = bytes.readInt();
        this.vipBuyNum = bytes.readInt();
        this.hadPass = bytes.readInt();
        this.curPoint = bytes.readInt();
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var tempA = [];
            tempA.push(bytes.readInt());
            tempA.push(bytes.readInt());
            this.hadBuyData[i] = tempA;
        }
        this.getList();
    };
    Object.defineProperty(GwFubenData.prototype, "hadPass", {
        get: function () {
            return this._hadPass;
        },
        set: function (value) {
            this._hadPass = value;
        },
        enumerable: true,
        configurable: true
    });
    GwFubenData.prototype.getList = function () {
        var maxNum = this.getMaxGird();
        var endNum;
        if (this.curPoint == 1) {
            endNum = Math.min(this._hadPass + 1, maxNum);
        }
        else {
            endNum = this._hadPass;
        }
        this.listData = [];
        var data;
        for (var i = endNum; i > 0; i--) {
            data = new GwfubenFloorData();
            data.gridNum = i;
            if (data.gridNum > this._hadPass) {
                data.curPoint = 0;
            }
            else if (data.gridNum == this._hadPass) {
                data.curPoint = this.curPoint;
            }
            else {
                data.curPoint = 1;
            }
            this.listData.push(data);
        }
    };
    GwFubenData.prototype.getMaxGird = function () {
        if (!this._maxGird) {
            this._maxGird = 0;
            for (var key in GlobalConfig.GodWeaponFubenConfig) {
                this._maxGird++;
            }
        }
        return this._maxGird;
    };
    GwFubenData.prototype.buyTypeData = function (type) {
        for (var i = 0; i < this.hadBuyData.length; i++) {
            if (this.hadBuyData[i][0] == type) {
                return this.hadBuyData[i];
            }
        }
        return [type, 0];
    };
    Object.defineProperty(GwFubenData.prototype, "getBuyCount", {
        get: function () {
            var num = 0;
            for (var i = 0; i < this.hadBuyData.length; i++) {
                num += this.hadBuyData[i][1];
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    return GwFubenData;
}());
__reflect(GwFubenData.prototype, "GwFubenData");
var GwfubenFloorData = (function () {
    function GwfubenFloorData() {
    }
    Object.defineProperty(GwfubenFloorData.prototype, "gridNum", {
        get: function () {
            return this._gridNum;
        },
        set: function (value) {
            this._gridNum = value;
            this.config = GlobalConfig.GodWeaponFubenConfig[value];
        },
        enumerable: true,
        configurable: true
    });
    return GwfubenFloorData;
}());
__reflect(GwfubenFloorData.prototype, "GwfubenFloorData");
//# sourceMappingURL=GwFubenData.js.map