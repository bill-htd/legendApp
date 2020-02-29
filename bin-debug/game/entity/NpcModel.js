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
var NpcModel = (function (_super) {
    __extends(NpcModel, _super);
    function NpcModel() {
        var _this = _super.call(this) || this;
        _this.type = EntityType.Npc;
        return _this;
    }
    Object.defineProperty(NpcModel.prototype, "avatarString", {
        get: function () {
            var config = GlobalConfig.NpcBaseConfig[this.configID];
            return config ? config.avatar : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpcModel.prototype, "avatarFileName", {
        get: function () {
            var config = this.npcConfig;
            if (config.actType == 1) {
                return RES_DIR_BODY + "body" + config.avatar;
            }
            return RES_DIR_MONSTER + "monster" + config.avatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpcModel.prototype, "weaponFileName", {
        get: function () {
            var config = this.npcConfig;
            if (config.weapon) {
                return RES_DIR_WEAPON + "weapon" + config.weapon;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NpcModel.prototype, "npcConfig", {
        get: function () {
            return GlobalConfig.NpcBaseConfig[this.configID];
        },
        enumerable: true,
        configurable: true
    });
    NpcModel.prototype.clone = function (model) {
        var Cls = egret.getQualifiedClassName(this);
        model = model || ObjectPool.pop(Cls);
        for (var key in this) {
            if (typeof this[key] != 'function') {
                if (key != "__class__" && key != "__types__") {
                    model[key] = this[key];
                }
            }
        }
        return model;
    };
    return NpcModel;
}(EffectModel));
__reflect(NpcModel.prototype, "NpcModel");
//# sourceMappingURL=NpcModel.js.map