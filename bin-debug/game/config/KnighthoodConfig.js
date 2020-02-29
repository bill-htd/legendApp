var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KnighthoodConfig = (function () {
    function KnighthoodConfig() {
        this.effid = 0;
    }
    return KnighthoodConfig;
}());
__reflect(KnighthoodConfig.prototype, "KnighthoodConfig");
var TaskIdConfig = (function () {
    function TaskIdConfig() {
        this.achieveId = 0;
        this.taskId = 0;
    }
    return TaskIdConfig;
}());
__reflect(TaskIdConfig.prototype, "TaskIdConfig");
//# sourceMappingURL=KnighthoodConfig.js.map