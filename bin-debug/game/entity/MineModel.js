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
var MineModel = (function (_super) {
    __extends(MineModel, _super);
    function MineModel() {
        var _this = _super.call(this) || this;
        _this.type = EntityType.Mine;
        return _this;
    }
    Object.defineProperty(MineModel.prototype, "npcConfig", {
        get: function () {
            var conf = GlobalConfig.KuangYuanConfig[this.configID];
            return GlobalConfig.NpcBaseConfig[conf.npcId];
        },
        enumerable: true,
        configurable: true
    });
    MineModel.prototype.parser = function (bytes) {
        this.index = bytes.readByte();
        this.actorID = bytes.readInt();
        this.name = bytes.readString();
        this.power = bytes.readInt();
        this.guildName = bytes.readString();
        this.configID = bytes.readUnsignedByte();
        this.startTime = DateUtils.formatMiniDateTime(bytes.readInt());
        this.endTime = DateUtils.formatMiniDateTime(bytes.readInt());
        this.isBeFight = bytes.readBoolean();
        var len = bytes.readByte();
        this.beFightActorID = [];
        for (var i = 0; i < len; i++) {
            this.beFightActorID[i] = bytes.readInt();
        }
    };
    return MineModel;
}(NpcModel));
__reflect(MineModel.prototype, "MineModel");
//# sourceMappingURL=MineModel.js.map