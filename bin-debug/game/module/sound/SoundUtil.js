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
var SoundUtil = (function (_super) {
    __extends(SoundUtil, _super);
    function SoundUtil() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._delayTime = 0;
        _this._delayStartTime = 0;
        _this._runTimeGap = 700;
        _this._runTimeStart = 0;
        return _this;
    }
    SoundUtil.ins = function () {
        return _super.ins.call(this);
    };
    SoundUtil.prototype.playRunSound = function () {
        if (egret.getTimer() - this._runTimeStart >= this._runTimeGap) {
            this._runTimeStart = egret.getTimer();
            SoundManager.ins().playEffect(SoundUtil.RUN);
        }
    };
    SoundUtil.prototype.playRun = function () {
        if (egret.getTimer() - this._runTimeStart > this._runTimeGap + 100) {
            this.playRunSound();
        }
        if (!TimerManager.ins().isExists(this.playRunSound, this)) {
            TimerManager.ins().doTimer(this._runTimeGap, 0, this.playRunSound, this);
        }
    };
    SoundUtil.prototype.stopRun = function () {
        TimerManager.ins().remove(this.playRunSound, this);
    };
    SoundUtil.prototype.playEffect = function (effectName) {
        if (egret.getTimer() - this._delayStartTime < this._delayTime) {
            return;
        }
        SoundManager.ins().playEffect(effectName);
    };
    SoundUtil.prototype.delayTime = function (time) {
        this._delayTime = time;
        this._delayStartTime = egret.getTimer();
    };
    SoundUtil.RUN = "longlin_a_pd_mp3";
    SoundUtil.WINDOW = "longlin_a_dkjm_mp3";
    SoundUtil.TASK = "longlin_b_renwu_mp3";
    SoundUtil.LEVEL_UP = "longlin_b_shengji_mp3";
    SoundUtil.SCENE = "longlin_a_zyz_mp3";
    SoundUtil.EQUIP = "longlin_a_chuandai_mp3";
    SoundUtil.CREATE_ROLE = "longlin_a_chuangjue_mp3";
    SoundUtil.FORGE = "longlin_a_qianghua_mp3";
    SoundUtil.SMELT = "longlin_b_ronglian_mp3";
    SoundUtil.SKILL_UP = "longlin_b_jineng_mp3";
    SoundUtil.WINDOW_OPEN = false;
    return SoundUtil;
}(BaseClass));
__reflect(SoundUtil.prototype, "SoundUtil");
//# sourceMappingURL=SoundUtil.js.map