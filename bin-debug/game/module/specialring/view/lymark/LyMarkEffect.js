var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LyMarkEffect = (function () {
    function LyMarkEffect(ring, infoModel) {
        this._angle = 0.1;
        this._angles = [0, 0, 0, 0, 0, 0, 0];
        this._circleCenter = { x: 0, y: -72 };
        this._a = 60;
        this._b = 30;
        this._oldBallNum = 0;
        this._curTimes = 0;
        this._isShowBall = true;
        this._ring = ring;
        this._infoModel = infoModel;
        MessageCenter.addListener(LyMark.ins().postMarkData, this.dataChange, this);
        this.usedLyMarkSkill();
    }
    LyMarkEffect.prototype.dataChange = function () {
        if (!this._infoModel || this._infoModel.masterHandle != Actor.handle)
            return;
        this.update();
    };
    Object.defineProperty(LyMarkEffect.prototype, "_parent", {
        get: function () {
            return this._ring.parent;
        },
        enumerable: true,
        configurable: true
    });
    LyMarkEffect.prototype.usedLyMarkSkill = function () {
        this.resetBalls();
        TimerManager.ins().removeAll(this);
        var lv = this.getSkillLvById(1);
        if (!lv)
            return;
        var cfg = GlobalConfig.FlameStampEffect[1][lv];
        lv = this.getSkillLvById(3);
        var mCd = lv ? GlobalConfig.FlameStampEffect[3][lv].reloadTime : 0;
        var skillID = cfg.skillId;
        var count = cfg.stamp;
        if (this.getSkillLvById(2)) {
            lv = this.getSkillLvById(2);
            skillID = GlobalConfig.FlameStampEffect[2][lv].skillId;
            count = GlobalConfig.FlameStampEffect[2][lv].stamp;
        }
        var skillDes = GlobalConfig.SkillsDescConfig[GlobalConfig.SkillsConfig[skillID].desc];
        var cdPer = (skillDes.cd - mCd) / count >> 0;
        TimerManager.ins().doTimer(cdPer, count, this.doTimer, this);
        this._curTimes = 0;
    };
    LyMarkEffect.prototype.doTimer = function () {
        this._curTimes++;
        this.updateBalls(this._curTimes);
    };
    LyMarkEffect.prototype.update = function () {
        var skillLv, effectCfg;
        var bollNum = 0, realLv = 0;
        for (var i = 0; i <= 6; i++) {
            realLv = skillLv = this.getSkillLvById(i + 1);
            if (!skillLv)
                skillLv = 1;
            effectCfg = GlobalConfig.FlameStampEffect[i + 1][skillLv];
            if ((i + 1 == 1 || i + 1 == 2) && realLv)
                bollNum = effectCfg.stamp;
        }
        this.updateBalls(bollNum);
    };
    LyMarkEffect.prototype.updateBalls = function (bollNum) {
        if (!this._ring || !this._parent)
            return;
        if (bollNum && this._oldBallNum != bollNum) {
            this.resetBalls();
            this._oldBallNum = bollNum;
            if (!this._balls) {
                this._balls = [];
                TimerManager.ins().doTimer(17 * 3, 0, this.doCircle, this);
            }
            var ball = void 0;
            var radian = 2 * Math.PI / bollNum;
            for (var i = 0; i < bollNum; i++) {
                ball = ObjectPool.pop("MovieClip");
                if (this._isShowBall)
                    this._parent.addChild(ball);
                this._angles[i] = radian * i;
                ball.x = this._a * Math.cos(radian * i) + this._circleCenter.x;
                ball.y = this._b * Math.sin(radian * i) + this._circleCenter.y;
                this._balls.push(ball);
                ball.playFile(RES_DIR_SKILLEFF + "skill6204a", -1);
            }
        }
    };
    LyMarkEffect.prototype.doCircle = function () {
        if (!this._balls) {
            TimerManager.ins().remove(this.doCircle, this);
            return;
        }
        if (!this._isShowBall)
            return;
        if (!this._ring || !this._parent)
            return;
        var len = this._balls.length, ball;
        var parent;
        var imgIndex = 0, selfIndex = 0;
        for (var i = 0; i < len; i++) {
            ball = this._balls[i];
            ball.x = this._a * Math.cos(this._angles[i]) + this._circleCenter.x;
            ball.y = this._b * Math.sin(this._angles[i]) + this._circleCenter.y;
            this._angles[i] += this._angle;
            this._angles[i] = this._angles[i] % (2 * Math.PI);
            parent = ball.parent;
            imgIndex = parent.getChildIndex(this._ring);
            selfIndex = parent.getChildIndex(ball);
            if (this._angles[i] >= 2.5 && this._angles[i] <= 6) {
                if (selfIndex > imgIndex)
                    parent.addChildAt(ball, imgIndex);
            }
            else {
                if (selfIndex < imgIndex)
                    parent.addChildAt(ball, parent.numChildren);
            }
        }
    };
    LyMarkEffect.prototype.resetBalls = function () {
        TimerManager.ins().remove(this.doCircle, this);
        this._oldBallNum = 0;
        if (this._balls) {
            var len = this._balls.length;
            for (var i = 0; i < len; i++) {
                this._balls[i].destroy();
            }
            this._balls = null;
        }
    };
    LyMarkEffect.prototype.getSkillLvById = function (id) {
        var skills = this._infoModel.masterHandle == Actor.handle ? LyMark.ins().skills : this._infoModel.lyMarkSkills;
        if (!skills || skills.length < id)
            return 0;
        return skills[id - 1];
    };
    LyMarkEffect.prototype.getLyMarkLv = function () {
        return this._infoModel.masterHandle == Actor.handle ? LyMark.ins().lyMarkLv : this._infoModel.lyMarkLv;
    };
    LyMarkEffect.prototype.showBall = function () {
        if (this._isShowBall)
            return;
        this._isShowBall = true;
        this.updateBalls(this._curTimes);
        if (this._balls) {
            var len = this._balls.length;
            for (var i = 0; i < len; i++) {
                this._parent.addChild(this._balls[i]);
            }
        }
    };
    LyMarkEffect.prototype.hideBall = function () {
        if (!this._isShowBall)
            return;
        this._isShowBall = false;
        this.resetBalls();
    };
    LyMarkEffect.prototype.destruct = function () {
        this.resetBalls();
        TimerManager.ins().removeAll(this);
        this._ring = null;
        this._infoModel = null;
        MessageCenter.ins().removeAll(this);
    };
    return LyMarkEffect;
}());
__reflect(LyMarkEffect.prototype, "LyMarkEffect");
//# sourceMappingURL=LyMarkEffect.js.map