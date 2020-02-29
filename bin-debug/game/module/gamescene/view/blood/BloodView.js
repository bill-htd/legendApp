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
var BloodView = (function (_super) {
    __extends(BloodView, _super);
    function BloodView() {
        var _this = _super.call(this) || this;
        _this.offY = 0;
        _this.offsetY = 0;
        _this._lastType = 0;
        _this.bloodNum = 50;
        _this.tempBloodViews = [];
        _this.tick = 0;
        _this.delayCount = 0;
        MessageCenter.addListener(GameLogic.ins().postEntityHpChange, _this.showBlood, _this);
        egret.startTick(function () {
            _this.tick++;
            return false;
        }, _this);
        TimerManager.ins().doTimer(1000, 0, function () {
            var t = _this.tick;
            _this.tick = 0;
            if (_this.delayCount <= 0) {
                _this.delayCount--;
                return;
            }
            if (t >= 25)
                _this.bloodNum = 50;
            else if (t >= 15)
                _this.bloodNum = 10;
            else if (t >= 10)
                _this.bloodNum = 5;
            else
                _this.bloodNum = 0;
            if (t < 25) {
                _this.delayCount = 5;
            }
        }, _this);
        return _this;
    }
    BloodView.prototype.showBlood = function (_a) {
        var target = _a[0], source = _a[1], type = _a[2], value = _a[3];
        if (this.tempBloodViews.length >= this.bloodNum) {
            var blood_1 = this.tempBloodViews[0];
            if (blood_1) {
                egret.Tween.removeTweens(blood_1);
                DisplayUtils.removeFromParent(blood_1);
                this.destroyBlood(blood_1);
            }
        }
        if (!target || !source)
            return;
        if (target.team != Team.My && source.team != Team.My)
            return;
        if (target.team == Team.My)
            type = 1;
        var isDeter = type & DamageTypes.Deter && source.isMy;
        var isCrit = type & DamageTypes.CRIT && !isDeter;
        var isLucky = type & DamageTypes.Lucky;
        var isHeji = type & DamageTypes.Heji;
        var isMiss = type & DamageTypes.Dodge;
        var isZhiMing = type & DamageTypes.ZhiMing;
        if (isZhiMing)
            isCrit = false;
        this.offY = EntityManager.CHAR_DEFAULT_TYPEFACE - target.typeface;
        if (this._lastType != type)
            this.offsetY = 0;
        this._lastType = type;
        if (value == 0 && !isMiss)
            return;
        var chartype = "";
        if (source instanceof CharRole) {
            switch (source.infoModel.job) {
                case JobConst.ZhanShi:
                    chartype = "j" + (isCrit || isDeter ? 0 : 1);
                    break;
                case JobConst.FaShi:
                    chartype = "j" + (isCrit || isDeter ? 4 : 2);
                    break;
                case JobConst.DaoShi:
                    chartype = "j" + (isCrit || isDeter ? 5 : 3);
                    break;
            }
        }
        else if (source instanceof CharMonster) {
            chartype = "j3";
            var monsterCfg = GlobalConfig.MonstersConfig[source.infoModel.configID];
            if (monsterCfg && monsterCfg.type == MonsterType.Ring) {
                chartype = "j9";
                isCrit = true;
            }
        }
        if (isHeji || isLucky) {
            chartype = "j0";
        }
        var numType = target.team == Team.My ? "2" : chartype;
        if (isMiss) {
            numType = "j0";
        }
        var sv = "";
        if (isMiss) {
            sv = "s";
        }
        else if (isHeji) {
            sv = value < 0 ? "+" + Math.abs(value) : "h" + (value >> 0) + "";
        }
        else {
            sv = value < 0 ? "+" + Math.abs(value) : (isCrit ? "b" : (isDeter ? "d" : (isLucky ? "b" : ""))) + (value >> 0) + "";
        }
        var st = value < 0 ? "g3" : numType;
        var offsetX = 3.5;
        (type & DamageTypes.Fujia || type & DamageTypes.Lianji) ? this.offsetY += 25 : this.offsetY = 0;
        var offsety = this.offsetY;
        var blood = BloodLabel.ins().createBloodLabel(type, sv, st, offsetX, offsety, source.infoModel.job || 1);
        blood.touchChildren = false;
        if (type & DamageTypes.Heji) {
            this.addChildAt(blood, 1000);
        }
        else {
            this.addChild(blood);
        }
        blood.x = target.x - blood.width / 2;
        blood.y = target.y - 50 - offsety;
        var isAddBlood = value < 0;
        if (chartype == "6") {
            isAddBlood = true;
        }
        this.floatImg(blood, type, target, source, isAddBlood);
        this.tempBloodViews.push(blood);
    };
    BloodView.prototype.removeFloatTarget = function (floatTarger) {
        DisplayUtils.removeFromParent(floatTarger);
        this.destroyBlood(floatTarger);
    };
    BloodView.prototype.injuredCritLucky = function (floatTarger, t) {
        floatTarger.scaleX = floatTarger.scaleY = BloodView.sc_s0;
        var posY1 = floatTarger.y - (EntityManager.CHAR_DEFAULT_TYPEFACE - 80) / 2;
        var posY2 = floatTarger.y - (EntityManager.CHAR_DEFAULT_TYPEFACE - 30);
        floatTarger.y = posY1;
        t.to({
            "y": posY2,
            'scaleX': BloodView.sc_s1,
            'scaleY': BloodView.sc_s1
        }, BloodView.sc_sp1, BloodView.sc_fun1)
            .wait(BloodView.sc_sp2)
            .to({
            alpha: 0,
            'scaleX': BloodView.sc_s2,
            'scaleY': BloodView.sc_s2
        }, BloodView.sc_sp3, BloodView.sc_fun2)
            .call(this.removeFloatTarget, this, [floatTarger]);
    };
    BloodView.prototype.injured = function (floatTarger, t) {
        floatTarger.scaleX = floatTarger.scaleY = BloodView.sn_s0;
        var posY1 = floatTarger.y - (EntityManager.CHAR_DEFAULT_TYPEFACE - 80) / 2;
        var posY2 = floatTarger.y - (EntityManager.CHAR_DEFAULT_TYPEFACE - 30);
        floatTarger.y = posY1;
        t.to({
            "y": posY2,
            'scaleX': BloodView.sn_s1,
            'scaleY': BloodView.sn_s1
        }, BloodView.sn_sp1, BloodView.sn_fun1)
            .wait(BloodView.sn_sp2)
            .to({
            alpha: 0,
            'scaleX': BloodView.sn_s2,
            'scaleY': BloodView.sn_s2
        }, BloodView.sn_sp3, BloodView.sn_fun2)
            .call(this.removeFloatTarget, this, [floatTarger]);
    };
    BloodView.prototype.atkCritLucky = function (floatTarger, t) {
        var posX = 0;
        var posX2 = 0;
        floatTarger.x += BloodView.c_posX1;
        posX = floatTarger.x + BloodView.c_posX2;
        posX2 = floatTarger.x + BloodView.c_posX3;
        floatTarger.scaleX = floatTarger.scaleY = BloodView.c_s0;
        floatTarger.y = floatTarger.y - BloodView.c_posY1 + this.offY;
        floatTarger.alpha = BloodView.c_alpha0;
        var endY = floatTarger.y - BloodView.c_posY2;
        t.to({
            "x": posX,
            "y": endY,
            scaleX: BloodView.c_s1,
            scaleY: BloodView.c_s1,
            alpha: BloodView.c_alpha1
        }, BloodView.c_sp1, BloodView.c_fun1)
            .to({
            scaleX: BloodView.c_s2,
            scaleY: BloodView.c_s2,
            alpha: BloodView.c_alpha2
        }, BloodView.c_sp2, BloodView.c_fun2)
            .to({
            scaleX: BloodView.c_s3,
            scaleY: BloodView.c_s3,
            alpha: BloodView.c_alpha3
        }, BloodView.c_sp3, BloodView.c_fun3)
            .wait(100)
            .to({
            alpha: BloodView.c_alpha4,
            y: floatTarger.y + BloodView.c_posY3,
            x: posX2,
            scaleX: BloodView.c_s4,
            scaleY: BloodView.c_s4
        }, BloodView.c_sp4, BloodView.c_fun4)
            .to({
            alpha: BloodView.c_alpha5,
            y: floatTarger.y + BloodView.c_posY4,
            scaleX: BloodView.c_s5,
            scaleY: BloodView.c_s5
        }, BloodView.c_sp5, BloodView.c_fun5)
            .call(this.removeFloatTarget, this, [floatTarger]);
    };
    BloodView.prototype.atkHeJi = function (floatTarger, t) {
        var posX = 0;
        var posX2 = 0;
        var map = ViewManager.gamescene.map;
        var point = this.localToGlobal();
        point.x = StageUtils.ins().getWidth() / 2;
        map.globalToLocal(point.x, point.y, point);
        var ranX = Math.random() * 100 - 50;
        var ranY = Math.random() * 200 - 100;
        floatTarger.x = point.x - 100 - floatTarger.width / 2 + ranX;
        floatTarger.x += BloodView.h_posX1;
        posX = floatTarger.x + BloodView.h_posX2;
        posX2 = floatTarger.x + BloodView.h_posX3;
        floatTarger.scaleX = floatTarger.scaleY = BloodView.h_s0;
        floatTarger.y = floatTarger.y - BloodView.h_posY1 + this.offY + ranY;
        floatTarger.alpha = BloodView.h_alpha0;
        var endY = floatTarger.y - BloodView.h_posY2;
        t.to({
            "x": posX,
            "y": endY,
            scaleX: BloodView.h_s1,
            scaleY: BloodView.h_s1,
            alpha: BloodView.h_alpha1
        }, BloodView.h_sp1, BloodView.h_fun1)
            .to({
            scaleX: BloodView.h_s2,
            scaleY: BloodView.h_s2,
            alpha: BloodView.h_alpha2
        }, BloodView.h_sp2, BloodView.h_fun2)
            .to({
            scaleX: BloodView.h_s3,
            scaleY: BloodView.h_s3,
            alpha: BloodView.h_alpha3
        }, BloodView.h_sp3, BloodView.h_fun3)
            .wait(100)
            .to({
            alpha: BloodView.h_alpha4,
            y: floatTarger.y + BloodView.h_posY3,
            x: posX2,
            scaleX: BloodView.h_s4,
            scaleY: BloodView.h_s4
        }, BloodView.h_sp4, BloodView.h_fun4)
            .to({
            alpha: BloodView.h_alpha5,
            y: floatTarger.y + BloodView.h_posY4,
            scaleX: BloodView.h_s5,
            scaleY: BloodView.h_s5
        }, BloodView.h_sp5, BloodView.h_fun5)
            .call(this.removeFloatTarget, this, [floatTarger]);
    };
    BloodView.prototype.atk = function (floatTarger, t) {
        var posX = 0;
        var posX2 = 0;
        floatTarger.x += BloodView.posX1;
        posX = floatTarger.x + BloodView.posX2;
        posX2 = floatTarger.x + BloodView.posX3;
        floatTarger.scaleX = floatTarger.scaleY = BloodView.s0;
        floatTarger.y = floatTarger.y - BloodView.posY1 + this.offY;
        floatTarger.alpha = BloodView.alpha0;
        var endY = floatTarger.y - BloodView.posY2;
        t.to({
            "x": posX, "y": endY, scaleX: BloodView.s1, scaleY: BloodView.s1, alpha: BloodView.alpha1
        }, BloodView.sp1, BloodView.fun1)
            .to({
            scaleX: BloodView.s2,
            scaleY: BloodView.s2,
            alpha: BloodView.alpha2
        }, BloodView.sp2, BloodView.fun2)
            .to({
            scaleX: BloodView.s3,
            scaleY: BloodView.s3,
            alpha: BloodView.alpha3
        }, BloodView.sp3, BloodView.fun3)
            .wait(100)
            .to({
            alpha: BloodView.alpha6,
            y: floatTarger.y + BloodView.posY6,
            x: floatTarger.x + BloodView.posX6,
            scaleX: BloodView.s6,
            scaleY: BloodView.s6
        }, BloodView.sp6, BloodView.fun6)
            .to({
            alpha: BloodView.alpha7,
            y: floatTarger.y + BloodView.posY7,
            x: floatTarger.x + BloodView.posX7,
            scaleX: BloodView.s7,
            scaleY: BloodView.s7
        }, BloodView.sp7, BloodView.fun7)
            .to({
            alpha: BloodView.alpha8,
            y: floatTarger.y + BloodView.posY8,
            x: floatTarger.x + BloodView.posX8,
            scaleX: BloodView.s8,
            scaleY: BloodView.s8
        }, BloodView.sp8, BloodView.fun8)
            .to({
            alpha: BloodView.alpha9,
            y: floatTarger.y + BloodView.posY9,
            x: floatTarger.x + BloodView.posX9,
            scaleX: BloodView.s9,
            scaleY: BloodView.s9
        }, BloodView.sp9, BloodView.fun9)
            .to({
            alpha: BloodView.alpha5,
            y: floatTarger.y + BloodView.posY4,
            scaleX: BloodView.s5,
            scaleY: BloodView.s5
        }, BloodView.sp5, BloodView.fun5)
            .call(this.removeFloatTarget, this, [floatTarger]);
    };
    BloodView.prototype.floatImg = function (floatTarger, type, target, source, isAddBlood) {
        var t = egret.Tween.get(floatTarger);
        if (source == null || target['team'] == Team.My) {
            if ((type & DamageTypes.CRIT) == DamageTypes.CRIT || (type & DamageTypes.Lucky) == DamageTypes.Lucky) {
                this.injuredCritLucky(floatTarger, t);
            }
            else {
                this.injured(floatTarger, t);
            }
        }
        else {
            var isDeter = (type & DamageTypes.Deter) == DamageTypes.Deter && source && source.isMy;
            var showBigDater = isDeter && (type & DamageTypes.CRIT) == DamageTypes.CRIT;
            if (showBigDater || (type & DamageTypes.CRIT) == DamageTypes.CRIT || (type & DamageTypes.Lucky) == DamageTypes.Lucky) {
                this.atkCritLucky(floatTarger, t);
            }
            else if ((type & DamageTypes.Heji) == DamageTypes.Heji) {
                this.atkHeJi(floatTarger, t);
            }
            else {
                this.atk(floatTarger, t);
            }
        }
    };
    BloodView.prototype.destroyBlood = function (blood) {
        blood.x = 0;
        blood.y = 0;
        blood.alpha = 1;
        blood.scaleX = blood.scaleY = 1;
        blood.touchChildren = true;
        if (blood instanceof BloodContainer) {
            blood.destroy();
        }
        else {
            BitmapNumber.ins().desstroyNumPic(blood);
        }
        var index = this.tempBloodViews.indexOf(blood);
        if (~index) {
            this.tempBloodViews.splice(index, 1);
        }
    };
    BloodView.sp1 = 60;
    BloodView.sp2 = 80;
    BloodView.sp3 = 80;
    BloodView.sp4 = 400;
    BloodView.sp5 = 720;
    BloodView.fun1 = egret.Ease.circInOut;
    BloodView.fun2 = egret.Ease.circInOut;
    BloodView.fun3 = egret.Ease.sineIn;
    BloodView.fun4 = null;
    BloodView.fun5 = egret.Ease.sineIn;
    BloodView.s0 = 1.2;
    BloodView.s1 = 0.4;
    BloodView.s2 = 0.75;
    BloodView.s3 = 0.6;
    BloodView.s4 = 0.6;
    BloodView.s5 = 0.6;
    BloodView.posX6 = -18;
    BloodView.posX7 = -20;
    BloodView.posX8 = -23;
    BloodView.posX9 = -30;
    BloodView.posY6 = 10;
    BloodView.posY7 = 13;
    BloodView.posY8 = 16;
    BloodView.posY9 = 20;
    BloodView.alpha6 = 0.6;
    BloodView.alpha7 = 0.5;
    BloodView.alpha8 = 0.4;
    BloodView.alpha9 = 0;
    BloodView.sp6 = 600;
    BloodView.sp7 = 200;
    BloodView.sp8 = 400;
    BloodView.sp9 = 400;
    BloodView.fun6 = null;
    BloodView.fun7 = null;
    BloodView.fun8 = null;
    BloodView.fun9 = null;
    BloodView.s6 = 0.6;
    BloodView.s7 = 0.6;
    BloodView.s8 = 0.6;
    BloodView.s9 = 0.6;
    BloodView.posX1 = 90;
    BloodView.posX2 = 0;
    BloodView.posX3 = 0;
    BloodView.posY1 = 100;
    BloodView.posY2 = 0;
    BloodView.posY3 = 0;
    BloodView.posY4 = 10;
    BloodView.alpha0 = 1;
    BloodView.alpha1 = 1;
    BloodView.alpha2 = 1;
    BloodView.alpha3 = 0.9;
    BloodView.alpha4 = 0.5;
    BloodView.alpha5 = 0;
    BloodView.startX = 70;
    BloodView.startY = 75;
    BloodView.changeTime1 = 300;
    BloodView.changeTime2 = 1000;
    BloodView.changeY = 0.5;
    BloodView.bigScale = 3;
    BloodView.endScale = 0.6;
    BloodView.bigAlpha = 1;
    BloodView.endAlpha1 = 1;
    BloodView.endAlpha2 = 0.3;
    BloodView.endTime1 = 600;
    BloodView.endTime2 = 500;
    BloodView.c_sp1 = 80;
    BloodView.c_sp2 = 200;
    BloodView.c_sp3 = 200;
    BloodView.c_sp4 = 1000;
    BloodView.c_sp5 = 1200;
    BloodView.c_fun1 = egret.Ease.circInOut;
    BloodView.c_fun2 = egret.Ease.circInOut;
    BloodView.c_fun3 = egret.Ease.sineIn;
    BloodView.c_fun4 = null;
    BloodView.c_fun5 = egret.Ease.sineIn;
    BloodView.c_s0 = 0.1;
    BloodView.c_s1 = 0.8;
    BloodView.c_s2 = 0.8;
    BloodView.c_s3 = 0.8;
    BloodView.c_s4 = 0.6;
    BloodView.c_s5 = 0.1;
    BloodView.c_posX1 = 0;
    BloodView.c_posX2 = 100;
    BloodView.c_posX3 = 120;
    BloodView.c_posY1 = 120;
    BloodView.c_posY2 = 10;
    BloodView.c_posY3 = 10;
    BloodView.c_posY4 = 10;
    BloodView.c_alpha0 = 1;
    BloodView.c_alpha1 = 1;
    BloodView.c_alpha2 = 1;
    BloodView.c_alpha3 = 0.6;
    BloodView.c_alpha4 = 0;
    BloodView.c_alpha5 = 0;
    BloodView.h_sp1 = 80;
    BloodView.h_sp2 = 300;
    BloodView.h_sp3 = 200;
    BloodView.h_sp4 = 1000;
    BloodView.h_sp5 = 1200;
    BloodView.h_fun1 = egret.Ease.circInOut;
    BloodView.h_fun2 = egret.Ease.circInOut;
    BloodView.h_fun3 = egret.Ease.sineIn;
    BloodView.h_fun4 = null;
    BloodView.h_fun5 = egret.Ease.sineIn;
    BloodView.h_s0 = 0.1;
    BloodView.h_s1 = 1.2;
    BloodView.h_s2 = 1.2;
    BloodView.h_s3 = 1.2;
    BloodView.h_s4 = 1.2;
    BloodView.h_s5 = 1.2;
    BloodView.h_posX1 = 0;
    BloodView.h_posX2 = 100;
    BloodView.h_posX3 = 120;
    BloodView.h_posY1 = 150;
    BloodView.h_posY2 = 10;
    BloodView.h_posY3 = -30;
    BloodView.h_posY4 = -30;
    BloodView.h_alpha0 = 1;
    BloodView.h_alpha1 = 1;
    BloodView.h_alpha2 = 1;
    BloodView.h_alpha3 = 0.6;
    BloodView.h_alpha4 = 0;
    BloodView.h_alpha5 = 0;
    BloodView.NORMAL_SCALE_1 = 1.1;
    BloodView.NORMAL_SCALE_2 = 0.95;
    BloodView.sn_sp1 = 600;
    BloodView.sn_sp2 = 200;
    BloodView.sn_sp3 = 200;
    BloodView.sn_fun1 = null;
    BloodView.sn_fun2 = null;
    BloodView.sn_s0 = 1.3;
    BloodView.sn_s1 = 1.3;
    BloodView.sn_s2 = 1.3;
    BloodView.sc_sp1 = 600;
    BloodView.sc_sp2 = 200;
    BloodView.sc_sp3 = 200;
    BloodView.sc_fun1 = null;
    BloodView.sc_fun2 = null;
    BloodView.sc_s0 = 1.5;
    BloodView.sc_s1 = 1.5;
    BloodView.sc_s2 = 1.5;
    BloodView.C_END_DES = 0;
    BloodView.C_YPOS1 = 120;
    BloodView.C_YPOS2 = 0;
    BloodView.C_YPOS3 = -20;
    BloodView.C_WAIT1 = 200;
    BloodView.C_SPEED1 = 100;
    BloodView.C_SPEED2 = 600;
    return BloodView;
}(egret.DisplayObjectContainer));
__reflect(BloodView.prototype, "BloodView");
//# sourceMappingURL=BloodView.js.map