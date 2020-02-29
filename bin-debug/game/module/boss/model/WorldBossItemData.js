var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WorldBossItemData = (function () {
    function WorldBossItemData() {
        this.id = 0;
        this.roleName = "";
        this.guildName = "";
        this.relieveTime = 0;
        this.bossState = 0;
        this.hp = 0;
        this.people = 0;
        this.challengeing = 0;
    }
    WorldBossItemData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.roleName = bytes.readString();
        this.guildName = bytes.readString();
        var rTime = bytes.readInt();
        this.relieveTime = rTime * 1000 + egret.getTimer();
        this.bossState = bytes.readShort();
        this.hp = bytes.readByte();
        this.people = bytes.readShort();
        this.challengeing = bytes.readByte();
    };
    Object.defineProperty(WorldBossItemData.prototype, "isDie", {
        get: function () {
            return (this.relieveTime - egret.getTimer()) / 1000 > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorldBossItemData.prototype, "canInto", {
        get: function () {
            var config = GlobalConfig.WorldBossConfig[this.id];
            var zsLevel = config.zsLevel;
            if (typeof zsLevel == "number") {
                if (zsLevel > 0) {
                    return UserZs.ins().lv >= zsLevel;
                }
                else {
                    return Actor.level >= zsLevel;
                }
            }
            else {
                var arr = zsLevel;
                if (arr.length > 1) {
                    return (UserZs.ins().lv >= arr[0] && UserZs.ins().lv <= arr[1]);
                }
                else {
                    console.log("WorldBossConfig\u914D\u7F6E\u9519\u8BEF\uFF01 " + arr);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorldBossItemData.prototype, "canChallenge", {
        get: function () {
            return !this.isDie && this.canInto;
        },
        enumerable: true,
        configurable: true
    });
    return WorldBossItemData;
}());
__reflect(WorldBossItemData.prototype, "WorldBossItemData");
//# sourceMappingURL=WorldBossItemData.js.map