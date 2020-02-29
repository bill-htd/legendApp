var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GwTaskData = (function () {
    function GwTaskData() {
    }
    GwTaskData.prototype.parser = function (bytes) {
        this.weaponIdx = bytes.readInt();
        this.weapon = bytes.readInt();
        this.taskIdx = bytes.readInt();
        this.progress = bytes.readInt();
        this.statue = bytes.readInt();
    };
    GwTaskData.DOING = 0;
    GwTaskData.DONE = 1;
    GwTaskData.FINISH = 2;
    return GwTaskData;
}());
__reflect(GwTaskData.prototype, "GwTaskData");
//# sourceMappingURL=GwTaskData.js.map