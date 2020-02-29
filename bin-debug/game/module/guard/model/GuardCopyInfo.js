var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuardCopyInfo = (function () {
    function GuardCopyInfo() {
        this.wave = 0;
        this.score = 0;
        this.callBossNum = 0;
        this.monsterNum = 0;
        this.minMonsterWave = 0;
        this.minMonsteNums = 0;
    }
    GuardCopyInfo.prototype.parser = function (wave, score, callBossNum, monsterNum, minMonsterWave, minMonsteNums) {
        this.wave = wave;
        this.score = score;
        this.callBossNum = callBossNum;
        this.monsterNum = monsterNum;
        this.minMonsterWave = minMonsterWave;
        this.minMonsteNums = minMonsteNums;
    };
    return GuardCopyInfo;
}());
__reflect(GuardCopyInfo.prototype, "GuardCopyInfo");
//# sourceMappingURL=GuardCopyInfo.js.map