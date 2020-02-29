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
var HejiUseMgr = (function (_super) {
    __extends(HejiUseMgr, _super);
    function HejiUseMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HejiUseMgr.ins = function () {
        return _super.ins.call(this);
    };
    HejiUseMgr.prototype.register = function (root) {
        this.root = root;
        this.reset();
        if (this.root.getSkillLvl()) {
            this.start();
        }
    };
    HejiUseMgr.prototype.unregister = function (root) {
        this.root = null;
        this.reset();
        this.stop();
    };
    HejiUseMgr.prototype.start = function () {
        this.stop();
        TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
    };
    HejiUseMgr.prototype.stop = function () {
        TimerManager.ins().remove(this.updateTime, this);
    };
    HejiUseMgr.prototype.updateTime = function () {
        if (this.cool > 0) {
            this.cool -= 1;
        }
    };
    HejiUseMgr.prototype.getSkillData = function () {
        if (!this.root.getSkillLvl()) {
            return null;
        }
        var config = GlobalConfig.TogetherHitConfig[this.root.getSkillLvl()];
        var model = this.getRoles()[0];
        if (!model)
            return null;
        if (Assert(config, "\u4F7F\u7528\u5408\u51FB\uFF0C\u5408\u51FB\u7B49\u7EA7\uFF1A" + this.root.getSkillLvl())) {
            return;
        }
        var curSkill = GlobalConfig.SkillsConfig[config.skill_id[model.job - 1]];
        return new SkillData(curSkill.id);
    };
    HejiUseMgr.prototype.getRoles = function () {
        return this.root.getRoles() || [];
    };
    HejiUseMgr.prototype.getMaster = function () {
        var roles = this.getRoles();
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].getAtt(AttributeType.atHp) > 0) {
                return EntityManager.ins().getEntityByHandle(roles[i].handle);
            }
        }
        return null;
    };
    HejiUseMgr.prototype.canUse = function () {
        return this.cool <= 0;
    };
    HejiUseMgr.prototype.useSuccess = function () {
        this.cool = 60;
    };
    HejiUseMgr.prototype.reset = function () {
        this.cool = 7;
    };
    return HejiUseMgr;
}(BaseClass));
__reflect(HejiUseMgr.prototype, "HejiUseMgr");
//# sourceMappingURL=HejiUseMgr.js.map