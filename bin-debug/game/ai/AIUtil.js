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
var AIUtil = (function (_super) {
    __extends(AIUtil, _super);
    function AIUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AIUtil.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    AIUtil.prototype.userSkill = function (self, enemy, skill, hitFun) {
        if (hitFun === void 0) { hitFun = null; }
        if (self != enemy) {
            self.dir = DirUtil.get8DirBy2Point(self, enemy);
        }
        if (!skill)
            return false;
        GameLogic.ins().playSkillEff(skill, self, [enemy], hitFun);
        if (!SoundUtil.WINDOW_OPEN && skill.sound && self.team == Team.My) {
            SoundUtil.ins().playEffect(skill.sound);
        }
        return true;
    };
    AIUtil.prototype.hram = function (self, enemy, type, damage) {
        if (damage === void 0) { damage = 0; }
        enemy.hram(damage);
        GameLogic.ins().postEntityHpChange(enemy, self, type, damage);
        if (enemy.getHP() <= 0) {
            if (this.relive(enemy)) {
                return;
            }
        }
    };
    AIUtil.prototype.relive = function (enemy) {
        if (enemy instanceof CharRole && !enemy.hasBuff(52001)) {
            var stunp = enemy.infoModel.attributeExData[ExAttributeType.eatGodBlessProbability];
            var r = Math.random();
            if (r < stunp / 10000) {
                enemy.reset();
                enemy.removeAllBuff();
                r = enemy.infoModel.getAtt(AttributeType.atMaxHp) * enemy.infoModel.attributeExData[ExAttributeType.eatGodBlessRate] / 10000;
                enemy.hram(r);
                return true;
            }
        }
        return false;
    };
    AIUtil.dead = function (target, callback) {
        if (callback === void 0) { callback = null; }
        target.AI_STATE = AI_State.Die;
        var em = EntityManager.ins();
        em.removeByHandle(target.infoModel.handle, false, GameMap.fbType == UserFb.FB_TYPE_EXP);
        TimerManager.ins().doTimer(5000, 1, function () {
            DisplayUtils.removeFromParent(target);
            if (callback) {
                callback();
            }
        }, this);
    };
    return AIUtil;
}(BaseClass));
__reflect(AIUtil.prototype, "AIUtil");
//# sourceMappingURL=AIUtil.js.map