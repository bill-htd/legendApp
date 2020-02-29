var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LimitTaskData = (function () {
    function LimitTaskData() {
        this.id = 0;
        this.name = "";
        this.desc = "";
        this.target = 0;
        this.control = 0;
        this.type = 0;
        this.state = 0;
        this.progress = 0;
    }
    LimitTaskData.prototype.setBaseData = function (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.desc = obj.desc;
        this.target = obj.target;
        this.awardList = obj.awardList;
        this.control = obj.control;
        this.controlTarget = obj.controlTarget;
        this.type = obj.type;
    };
    LimitTaskData.prototype.parser = function (bytes) {
        this.progress = bytes.readInt();
        this.state = bytes.readByte();
    };
    return LimitTaskData;
}());
__reflect(LimitTaskData.prototype, "LimitTaskData");
//# sourceMappingURL=LimitTaskData.js.map