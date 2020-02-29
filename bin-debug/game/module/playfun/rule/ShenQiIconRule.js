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
var ShenQiIconRule = (function (_super) {
    __extends(ShenQiIconRule, _super);
    function ShenQiIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            UserTask.ins().postUpdteTaskTrace,
            Artifact.ins().postNewArtifactInit,
            Artifact.ins().postNewArtifactUpdate,
            Artifact.ins().postGuide,
        ];
        return _this;
    }
    ShenQiIconRule.prototype.checkShowIcon = function () {
        this.updateInfo();
        var b = OpenSystem.ins().checkSysOpen(SystemType.SHENQIGUIDE) && !UserFb.ins().pkGqboss && UserFb.ins().guanqiaID < 340;
        return b;
    };
    ShenQiIconRule.prototype.updateInfo = function () {
        var rewardData;
        var reward = UserFb.ins().getCurrentReward();
        var nextReward = UserFb.ins().getNextReward();
        if (reward) {
            rewardData = reward[0];
            UserFb.ins().getMapReward();
            if (!this.pretips || this.pretips != rewardData.id) {
                this.pretips = rewardData.id;
                UserTips.ins().showItemTips(rewardData.id);
            }
        }
        else if (nextReward) {
            rewardData = nextReward[0];
            if (this.labelChapter) {
                var str = "\u518D\u6218|C:0x40df38&T:" + UserFb.ins().getNextNeedChapter() + "|\u5173";
                this.labelChapter.textFlow = TextFlowMaker.generateTextFlow1(str);
            }
        }
        if (rewardData && this.tar)
            this.setReward(rewardData);
    };
    ShenQiIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.labelInfo = t["labelInfo"];
        this.imgInfo = t["imgInfo"];
        this.imgName = t["imgName"];
        this.imgItem = t["imgItem"];
        this.labelChapter = t["labelChapter"];
        this.groupEff = t["groupEff"];
        this.updateInfo();
        return t;
    };
    ShenQiIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    ShenQiIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(TargetWin, TargetWin.SEHNQI);
        Artifact.ins().showGuide = -2000;
    };
    ShenQiIconRule.prototype.setReward = function (rewardData) {
        var conf = Artifact.ins().getConfByChipId(rewardData.id);
        if (!conf)
            return;
        this.imgName.source = conf.imgName;
        this.imgItem.source = conf.img;
        this.imgInfo.source = conf.simpleDesc;
        this.labelInfo.text = conf.buttonDesc;
    };
    ShenQiIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    return ShenQiIconRule;
}(RuleIconBase));
__reflect(ShenQiIconRule.prototype, "ShenQiIconRule");
//# sourceMappingURL=ShenQiIconRule.js.map