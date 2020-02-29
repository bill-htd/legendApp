var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EntityBuff = (function () {
    function EntityBuff() {
        this.multRate = 1;
    }
    EntityBuff.prototype.dispose = function () {
        this.source = null;
        this.hostsHandle = null;
        this.multRate = 1;
    };
    EntityBuff.createBuff = function (id, selfTarget, args) {
        var config = GlobalConfig.EffectsConfig[id];
        Assert(config, "EffectsConfig\u4E2D " + id + " \u914D\u7F6E\u4E3A\u7A7A\uFF01\uFF01\uFF01");
        var effValue = RoleAI.ins().skillEffValue(selfTarget, config, args);
        var addTime = args ? args.time || 0 : 0;
        return EntityBuff.createBaseBuff(id, selfTarget, effValue, config.duration + addTime);
    };
    EntityBuff.createBaseBuff = function (id, selfTarget, value, duration) {
        var config = GlobalConfig.EffectsConfig[id];
        Assert(config, "EffectsConfig\u4E2D " + id + " \u914D\u7F6E\u4E3A\u7A7A\uFF01\uFF01\uFF01");
        var buff = ObjectPool.pop("EntityBuff");
        buff.effConfig = config;
        buff.value = value;
        buff.addTime = egret.getTimer();
        buff.endTime = buff.addTime + (duration ? duration : config.duration);
        buff.count = ((duration ? duration : config.duration) / config.interval) >> 0;
        buff.step = 0;
        buff.source = selfTarget;
        if (config.type == SkillEffType.HostAddAttributes) {
            if (buff.hostsHandle == null) {
                buff.hostsHandle = [];
            }
            var mh = EntityManager.ins().getRootMasterHandle(selfTarget.infoModel.handle);
            if (buff.hostsHandle.indexOf(mh) < 0) {
                buff.hostsHandle.push(mh);
            }
        }
        return buff;
    };
    EntityBuff.prototype.isExecute = function () {
        return egret.getTimer() - this.addTime > this.step * this.effConfig.interval;
    };
    EntityBuff.prototype.canRemove = function () {
        return this.effConfig.type != SkillEffType.Summon && egret.getTimer() >= this.endTime;
    };
    EntityBuff.prototype.isCanotHit = function () {
        return this.effConfig.type == SkillEffType.AdditionalState && this.effConfig.args.i == 1;
    };
    return EntityBuff;
}());
__reflect(EntityBuff.prototype, "EntityBuff");
//# sourceMappingURL=EntityBuff.js.map