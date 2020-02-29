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
var SubRoles = (function (_super) {
    __extends(SubRoles, _super);
    function SubRoles() {
        var _this = _super.call(this) || this;
        _this.roles = [];
        _this.jobDic = [];
        _this.observe(Guild.ins().postQuitGuild, _this.setGuildName);
        _this.observe(Guild.ins().postGuildInfo, _this.setGuildName);
        _this.observe(LiLian.ins().postLilianData, _this.updateName);
        return _this;
    }
    SubRoles.ins = function () {
        return _super.ins.call(this);
    };
    SubRoles.prototype.init = function () {
        this.roles = [];
        this.jobDic = [];
    };
    SubRoles.prototype.doSubRole = function (bytes) {
        this.init();
        var count = bytes.readShort();
        var roleLen = SubRoles.ins().subRolesLen;
        for (var i = 0; i < count; i++) {
            var model = this.roles[i];
            if (!model)
                model = new Role();
            model.parser(bytes);
            if (!this.roles[i]) {
                this.roles.push(model);
            }
            if (!this.jobDic[model.job]) {
                this.jobDic[model.job] = model;
            }
        }
        if (roleLen && roleLen < this.roles.length)
            UserTips.ins().showTips("\u6210\u529F\u5F00\u542F\u65B0\u89D2\u8272");
    };
    SubRoles.prototype.doSubRoleAtt = function (bytes) {
        var roleID = bytes.readInt();
        var power = 0;
        var len = this.roles.length;
        for (var i = 0; i < len; i++) {
            var model = this.getSubRoleByIndex(i);
            if (model.index == roleID) {
                model.parserAtt(bytes, true);
                model.power = bytes.readDouble();
            }
            power += model.power;
        }
        Actor.ins().postPowerChange(power);
        if (GodWeaponCC.ins().gwshowTips) {
            if (GodWeaponCC.ins().roleshowTips)
                GodWeaponCC.ins().roleshowTips--;
            if (GodWeaponCC.ins().roleshowTips <= 0) {
                GodWeaponCC.ins().roleshowTips = 0;
                GodWeaponCC.ins().gwshowTips = false;
            }
        }
    };
    SubRoles.prototype.doSubRoleExtAtt = function (bytes) {
        var roleID = bytes.readInt();
        var len = this.roles.length;
        for (var i = 0; i < len; i++) {
            var model = this.getSubRoleByIndex(i);
            if (model.index == roleID) {
                model.parserExtAtt(bytes, true);
            }
        }
    };
    SubRoles.prototype.getSubRoleByIndex = function (index) {
        return this.roles[index];
    };
    SubRoles.prototype.getSubRoleByJob = function (jobId) {
        var len = this.roles.length;
        for (var i = 0; i < len; i++) {
            var model = this.getSubRoleByIndex(i);
            if (model.job == jobId) {
                return this.roles[i];
            }
        }
        return null;
    };
    Object.defineProperty(SubRoles.prototype, "subRolesLen", {
        get: function () {
            return this.roles.length;
        },
        enumerable: true,
        configurable: true
    });
    SubRoles.prototype.resetRolesModel = function () {
        this.roles.length = 0;
    };
    SubRoles.prototype.updateName = function () {
        var len = this.subRolesLen;
        for (var i = 0; i < len; i++) {
            var entity = EntityManager.ins().getMainRole(i);
            if (entity) {
                var model = this.getSubRoleByIndex(i);
                entity.setCharName(model.guildAndName);
                entity.setLilian(model.lilianUrl);
            }
        }
    };
    SubRoles.prototype.setGuildName = function (arr) {
        var id = arr[0], name = arr[1];
        var len = this.subRolesLen;
        for (var i = 0; i < len; i++) {
            this.roles[i].guildName = name;
            this.roles[i].guildID = id;
        }
        this.updateName();
    };
    SubRoles.prototype.getIsMyPlayer = function (han) {
        for (var k in this.roles) {
            if (this.roles[k].handle == han) {
                return true;
            }
        }
        return false;
    };
    SubRoles.prototype.isLockRole = function () {
        var len = 3;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (!role) {
                var config = GlobalConfig.NewRoleConfig[i];
                if (!config)
                    continue;
                if (config.zsLevel) {
                    if (UserZs.ins().lv >= config.zsLevel) {
                        return true;
                    }
                }
                else {
                    if (Actor.level >= config.level) {
                        return true;
                    }
                }
                if (config.vip && UserVip.ins().lv >= config.vip) {
                    return true;
                }
            }
        }
        return false;
    };
    SubRoles.MAX_ROLES = 3;
    return SubRoles;
}(BaseSystem));
__reflect(SubRoles.prototype, "SubRoles");
//# sourceMappingURL=SubRoles.js.map