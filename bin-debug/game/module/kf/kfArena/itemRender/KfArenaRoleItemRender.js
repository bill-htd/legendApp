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
var KfArenaRoleItemRender = (function (_super) {
    __extends(KfArenaRoleItemRender, _super);
    function KfArenaRoleItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbRoleItem";
        _this.touchEnabled = false;
        return _this;
    }
    KfArenaRoleItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    KfArenaRoleItemRender.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.invite:
            case this.nomember:
                ViewManager.ins().open(KfArenaInviteWin);
                break;
            case this.body:
                if (this.data.roleID != Actor.actorID)
                    ViewManager.ins().open(kfArenaCheckWin, this.data);
                break;
        }
    };
    KfArenaRoleItemRender.prototype.dataChanged = function () {
        if (!this.data) {
            this.nomember.visible = this.invite.visible = true;
            this.body.visible = this.position.visible = this.weapon.visible = this.wing.visible = false;
            this.roleName.text = "虚位以待";
        }
        else {
            this.nomember.visible = this.invite.visible = false;
            this.body.visible = this.position.visible = this.weapon.visible = true;
            var vo = this.data;
            this.onlineLabel.visible = !vo.isonline;
            this.roleName.text = vo.roleName;
            this.position.source = vo.isLeader() ? "tfb_leader" : null;
            this.body.source = this.weapon.source = this.wing.source = null;
            var clothCfg = GlobalConfig.EquipConfig[vo.cloth];
            if (clothCfg) {
                var fileName = clothCfg.appearance;
                if (fileName && fileName.indexOf("[job]") > -1)
                    fileName = fileName.replace("[job]", vo.job + "");
                this.body.source = (vo.cloth > 0 ? fileName + "_" : "body" + vo.job + "00_") + vo.sex + "_c_png";
            }
            var weaponCfg = GlobalConfig.EquipConfig[vo.weapon];
            if (weaponCfg) {
                var fileName = weaponCfg.appearance;
                if (fileName && fileName.indexOf("[job]") > -1)
                    fileName = fileName.replace("[job]", vo.job + "");
                this.weapon.source = vo.weapon > 0 ? fileName + "_" + vo.sex + "_c_png" : '';
            }
            this.wing.visible = true;
            var wingCfg = GlobalConfig.WingLevelConfig[vo.wingLv];
            if (wingCfg)
                this.wing.source = vo.wingLv >= 0 ? wingCfg.appearance + "_png" : '';
            if (vo.pos1 > 0)
                this.body.source = this.getZhuangbanById(vo.pos1).res + "_" + vo.sex + "_c_png";
            if (vo.pos2 > 0)
                this.weapon.source = this.getZhuangbanById(vo.pos2).res + "_" + vo.sex + "_c_png";
            if (vo.pos3 > 0)
                this.wing.source = this.getZhuangbanById(vo.pos3).res + "_png";
            if (!this.body.source)
                this.body.source = "body000_" + vo.sex + "_c_png";
        }
    };
    KfArenaRoleItemRender.prototype.getZhuangbanById = function (id) {
        for (var k in GlobalConfig.ZhuangBanId) {
            if (GlobalConfig.ZhuangBanId[k].id == id)
                return GlobalConfig.ZhuangBanId[k];
        }
        return null;
    };
    KfArenaRoleItemRender.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    return KfArenaRoleItemRender;
}(BaseItemRender));
__reflect(KfArenaRoleItemRender.prototype, "KfArenaRoleItemRender");
//# sourceMappingURL=KfArenaRoleItemRender.js.map