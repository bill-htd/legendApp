var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PublicBossInfo = (function () {
    function PublicBossInfo() {
    }
    PublicBossInfo.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.hp = bytes.readShort();
        this.people = bytes.readShort();
        this.reliveTime = bytes.readInt() * 1000 + egret.getTimer();
        this.challengeing = bytes.readBoolean();
    };
    Object.defineProperty(PublicBossInfo.prototype, "isDie", {
        get: function () {
            return (this.reliveTime - egret.getTimer()) / 1000 > 0;
        },
        enumerable: true,
        configurable: true
    });
    return PublicBossInfo;
}());
__reflect(PublicBossInfo.prototype, "PublicBossInfo");
//# sourceMappingURL=PublicBossInfo.js.map