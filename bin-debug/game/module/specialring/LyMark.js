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
var LyMark = (function (_super) {
    __extends(LyMark, _super);
    function LyMark() {
        var _this = _super.call(this) || this;
        _this._lyMarkLv = 0;
        _this._lyMarkExp = 0;
        _this._isMax = false;
        _this.sysId = PackageID.LyMark;
        _this.regNetMsg(1, _this.postMarkData);
        _this.regNetMsg(2, _this.postUpgrade);
        return _this;
    }
    LyMark.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(LyMark.prototype, "lyMarkLv", {
        get: function () {
            return this._lyMarkLv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LyMark.prototype, "lyMarkExp", {
        get: function () {
            return this._lyMarkExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LyMark.prototype, "skills", {
        get: function () {
            return this._skills;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LyMark.prototype, "isMax", {
        get: function () {
            return this._isMax;
        },
        enumerable: true,
        configurable: true
    });
    LyMark.prototype.getSkillLvById = function (id) {
        if (!this._skills || this._skills.length < id)
            return 0;
        return this._skills[id - 1];
    };
    LyMark.prototype.postMarkData = function (bytes) {
        this._lyMarkLv = bytes.readShort();
        this._lyMarkExp = bytes.readInt();
        var len = bytes.readByte();
        this._skills = [];
        this._skills.length = len;
        for (var i = 0; i < len; i++)
            this._skills[i] = bytes.readShort();
        this._isMax = this._lyMarkLv >= Object.keys(GlobalConfig.FlameStampLevel).length;
    };
    LyMark.prototype.postUpgrade = function (bytes) {
        var crit = bytes.readByte();
        return [crit];
    };
    LyMark.prototype.sendUpgrade = function () {
        this.sendBaseProto(2);
    };
    LyMark.prototype.sendUpSkill = function (skillID) {
        var bytes = this.getBytes(3);
        bytes.writeByte(skillID);
        this.sendToServer(bytes);
    };
    LyMark.prototype.sendCompound = function (itemID) {
        var bytes = this.getBytes(4);
        bytes.writeInt(itemID);
        this.sendToServer(bytes);
    };
    LyMark.prototype.checkOpen = function () {
        if (!SpecialRing.ins().isFireRingActivate())
            return false;
        var ring = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
        if (!ring || ring.level < GlobalConfig.FlameStamp.openLevel)
            return false;
        return true;
    };
    LyMark.prototype.checkRed = function () {
        if (!this.checkOpen())
            return false;
        if (!LyMark.ins().isMax) {
            var cfg = GlobalConfig.FlameStampLevel[this.lyMarkLv];
            if (Assert(cfg, "LyMark lv:" + this.lyMarkLv + ", exp:" + this.lyMarkExp))
                return false;
            var itemData = UserBag.ins().getBagItemById(cfg.costItem);
            var count = itemData ? itemData.count : 0;
            var needExp = cfg.exp - this._lyMarkExp;
            if (count >= cfg.costCount && count * GlobalConfig.FlameStampMat[cfg.costItem].exp >= needExp)
                return true;
        }
        var skillCfg, skillLv;
        for (var i = 0; i <= 6; i++) {
            if (i == 0)
                continue;
            skillLv = LyMark.ins().getSkillLvById(i + 1);
            var isMax = skillLv >= (Object.keys(GlobalConfig.FlameStampEffect[i + 1]).length);
            if (isMax)
                continue;
            skillCfg = GlobalConfig.FlameStampEffect[i + 1][skillLv <= 0 ? 1 : skillLv + 1];
            if (skillCfg.costItem) {
                var itemConfig = GlobalConfig.ItemConfig[skillCfg.costItem];
                var itemData = UserBag.ins().getBagItemById(skillCfg.costItem);
                var count = itemData ? itemData.count : 0;
                if (count >= skillCfg.costCount && LyMark.ins().lyMarkLv >= skillCfg.stampLevel)
                    return true;
            }
        }
        return false;
    };
    LyMark.prototype.getCurSkillID = function () {
        var skillLv, effectCfg;
        var skillID = 0, realLv = 0;
        for (var i = 0; i <= 6; i++) {
            realLv = skillLv = this.getSkillLvById(i + 1);
            if (!skillLv)
                skillLv = 1;
            effectCfg = GlobalConfig.FlameStampEffect[i + 1][skillLv];
            if ((i + 1 == 1 || i + 1 == 2) && realLv)
                skillID = effectCfg.skillId;
        }
        return skillID;
    };
    LyMark.prototype.getCurSkillCD = function () {
        var skillID = this.getCurSkillID();
        var lv = this.getSkillLvById(3);
        var mCd = lv ? GlobalConfig.FlameStampEffect[3][lv].reloadTime : 0;
        var skillDes = GlobalConfig.SkillsDescConfig[GlobalConfig.SkillsConfig[skillID].desc];
        return skillDes.cd - mCd;
    };
    return LyMark;
}(BaseSystem));
__reflect(LyMark.prototype, "LyMark");
var GameSystem;
(function (GameSystem) {
    GameSystem.lyMark = LyMark.ins.bind(LyMark);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=LyMark.js.map