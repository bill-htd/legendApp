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
var CharMiner = (function (_super) {
    __extends(CharMiner, _super);
    function CharMiner() {
        var _this = _super.call(this) || this;
        _this.npcHead.currentState = _this.npcHead.states[1];
        return _this;
    }
    Object.defineProperty(CharMiner.prototype, "infoModel", {
        get: function () {
            return this._infoModel;
        },
        set: function (model) {
            this._infoModel = model;
        },
        enumerable: true,
        configurable: true
    });
    CharMiner.prototype.updateModel = function () {
        _super.prototype.updateModel.call(this);
        var config = GlobalConfig.KuangYuanConfig[this.infoModel.configID];
        this.npcHead.nameTxt.text = this.infoModel.name + "的矿工";
        this.npcHead.nameTxt.textColor = config.color;
        this.updateTime();
        this.updateTitleState();
    };
    CharMiner.prototype.updateTime = function () {
        var sec = Math.floor((this.infoModel.endTime - GameServer.serverTime) / 1000);
        if (sec >= 0) {
            this.npcHead.timeTxt.text = DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_3);
        }
        else {
            MineData.ins().remove(this.infoModel.index);
        }
        this.playAction(EntityAction.ATTACK, function () {
        });
    };
    CharMiner.prototype.updateTitleState = function () {
        this.npcHead.updateState(this.infoModel);
    };
    CharMiner.prototype.destruct = function () {
        this.destroy();
        ObjectPool.push(this);
    };
    return CharMiner;
}(CharNpc));
__reflect(CharMiner.prototype, "CharMiner");
//# sourceMappingURL=CharMiner.js.map