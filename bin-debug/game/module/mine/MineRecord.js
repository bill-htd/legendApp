var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MineRecord = (function () {
    function MineRecord() {
    }
    MineRecord.prototype.parser = function (bytes) {
        this.index = bytes.readShort();
        this.type = bytes.readByte();
        this.time = DateUtils.formatMiniDateTime(bytes.readInt());
        if (this.type == MineRecord.TYPE_BEROB) {
            this.configID = bytes.readByte();
            this.fighterActorID = bytes.readInt();
            this.fighterName = bytes.readString();
            this.fighterIsWin = bytes.readByte();
            this.isBeatHim = bytes.readByte();
            this.fighterJob = bytes.readByte();
            this.fighterSex = bytes.readByte();
            this.fighterPower = bytes.readInt();
        }
        else {
            this.configID = bytes.readByte();
            this.robActorID = bytes.readInt();
            this.robMasterName = bytes.readString();
            this.robIsWin = bytes.readByte();
        }
    };
    MineRecord.TYPE_BEROB = 1;
    MineRecord.TYPE_ROB = 2;
    return MineRecord;
}());
__reflect(MineRecord.prototype, "MineRecord");
//# sourceMappingURL=MineRecord.js.map