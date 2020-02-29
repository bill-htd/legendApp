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
var RoleSelectPanel = (function (_super) {
    __extends(RoleSelectPanel, _super);
    function RoleSelectPanel() {
        var _this = _super.call(this) || this;
        _this._curRole = 0;
        _this.lastX = 0;
        _this.isTouchBegin = false;
        _this.rolesLength = 1;
        _this.initMc();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdd, _this);
        return _this;
    }
    RoleSelectPanel.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.destructor();
    };
    RoleSelectPanel.prototype.childrenCreated = function () {
        this.init();
    };
    RoleSelectPanel.prototype.initMc = function () {
        this.roleMovie = [];
        for (var i = 0; i < 2; i++) {
            var mc = new MovieClip;
            mc.x = 44;
            mc.y = 44;
            mc.touchEnabled = false;
            this.roleMovie.push(mc);
        }
    };
    RoleSelectPanel.prototype.hideTop = function () {
        this.leftImg.visible = false;
        this.rightImg.visible = false;
        this.bgImg.visible = false;
    };
    RoleSelectPanel.prototype.init = function () {
        this.roles = [this.role0, this.role1, this.role2];
        for (var i = 0; i < 2; i++) {
            var mc = this.roleMovie[i];
            this.roles[i + 1].addChild(mc);
        }
    };
    RoleSelectPanel.prototype.onAdd = function () {
        this.destructor();
        this.parent.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
        this.parent.addEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        this.addTouchEvent(this.recharge, this.onBtnClick);
        this.addTouchEvent(this.recharge0, this.onBtnClick);
        this.addTouchEvent(this, this.onClick);
        this.observe(GameLogic.ins().postSubRoleChange, this.updateRole);
        this.observe(Actor.ins().postLevelChange, this.updateRole);
        this.observe(UserVip.ins().postUpdateVipData, this.updateRole);
        this.observe(UserZs.ins().postZsData, this.updateRole);
        this.observe(Actor.ins().postGoldChange, this.initData);
        this.observe(Actor.ins().postYbChange, this.initData);
        this.setCurRole(this._curRole);
        this.updateRole();
        this.initData();
    };
    RoleSelectPanel.prototype.initData = function () {
        CommonUtils.labelIsOverLenght(this.goldTxt, Actor.gold);
        CommonUtils.labelIsOverLenght(this.ybTxt, Actor.yb);
    };
    RoleSelectPanel.prototype.getCurRole = function () {
        return this._curRole;
    };
    RoleSelectPanel.prototype.setCurRole = function (value) {
        this._curRole = value;
        for (var i = 0; i < this.roles.length; i++) {
            var element = this.roles[i];
            element.selected = i == value;
        }
        this.dispatchEventWith(egret.Event.CHANGE, false, this._curRole);
    };
    RoleSelectPanel.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.recharge0:
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || rdata.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                break;
            case this.recharge:
                Shop.openBuyGoldWin();
                break;
        }
    };
    RoleSelectPanel.prototype.onClick = function (e) {
        var index = this.roles.indexOf(e.target);
        if (index > -1)
            this.changeRole(index);
    };
    RoleSelectPanel.prototype.onMove = function (e) {
        if (!this.headGroup.visible || !this.parent || !this.parent.touchEnabled)
            return;
        if (this.isPass())
            return;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.lastX = e.stageX;
                this.isTouchBegin = true;
                break;
            case egret.TouchEvent.TOUCH_END:
                if (!this.isTouchBegin)
                    break;
                this.isTouchBegin = false;
                var Index = this._curRole;
                if (this.lastX - e.stageX >= 100) {
                    Index++;
                    if (Index > this.rolesLength)
                        Index = 0;
                    this.changeRole(Index);
                }
                else if (this.lastX - e.stageX <= -100) {
                    Index--;
                    if (Index < 0)
                        Index = this.rolesLength;
                    this.changeRole(Index);
                }
                break;
        }
    };
    RoleSelectPanel.prototype.isPass = function () {
        var forgwin = ViewManager.ins().getView(ForgeWin);
        if (forgwin && forgwin.isNotMove)
            return true;
        var advanequipwin = ViewManager.ins().getView(AdvanEquipWin);
        if (advanequipwin && advanequipwin.isNotMove)
            return true;
        return false;
    };
    RoleSelectPanel.prototype.changeRole = function (value) {
        var model = SubRoles.ins().getSubRoleByIndex(value);
        if (model) {
            this.setCurRole(value);
        }
        else {
            ViewManager.ins().open(NewRoleWin);
            if (!Assert(this.roles[value], "RoleSelectPanel changeRole value:" + value)) {
                this.roles[value].selected = false;
            }
        }
    };
    RoleSelectPanel.prototype.updateRole = function () {
        var role;
        var roleData;
        var len = this.roles.length;
        this.rolesLength = SubRoles.ins().subRolesLen - 1;
        for (var i = 0; i < len; i++) {
            role = this.roles[i];
            roleData = SubRoles.ins().getSubRoleByIndex(i);
            if (roleData) {
                role['jobImg'].visible = true;
                switch (roleData.job) {
                    case 1:
                        role['jobImg'].source = "new_duanzao_tubiao_zhanshi";
                        break;
                    case 2:
                        role['jobImg'].source = "new_duanzao_tubiao_fashi";
                        break;
                    case 3:
                        role['jobImg'].source = "new_duanzao_tubiao_daoshi";
                        break;
                }
                role['stageImg'].visible = false;
                role['stageImg'].source = "";
                role.icon = "yuanhead" + roleData.job + roleData.sex;
                if (this.roleMovie[i - 1])
                    DisplayUtils.removeFromParent(this.roleMovie[i - 1]);
            }
            else {
                var config = GlobalConfig.NewRoleConfig[i];
                if (!config) {
                    var parName = egret.getQualifiedClassName(this.parent);
                    Assert(false, "\u89D2\u8272\u7D22\u5F15" + i + "\u4E0D\u5B58\u5728\uFF0C\u51FA\u9519\u7C7B\uFF1A" + parName);
                    continue;
                }
                role['jobImg'].visible = false;
                role['stageImg'].visible = true;
                if (config.zsLevel) {
                    if (UserZs.ins().lv < config.zsLevel) {
                        role['stageImg'].source = "toujiesuo" + config.zsLevel;
                    }
                    else {
                        role['stageImg'].source = "toujiesuo";
                    }
                }
                else {
                    if (Actor.level < config.level) {
                        role['stageImg'].source = "toujiesuo" + config.level;
                    }
                    else {
                        role['stageImg'].source = "toujiesuo";
                    }
                }
                if (config.vip && UserVip.ins().lv >= config.vip) {
                    role['stageImg'].source = "toujiesuo";
                }
                role.icon = "";
            }
            if (this.roleMovie[i - 1] && role['stageImg'].source == "toujiesuo" && role['stageImg'].visible) {
                this.roleMovie[i - 1].playFile(RES_DIR_EFF + 'juesejiesuo', -1);
                this.showRedPoint(i, true);
            }
        }
    };
    RoleSelectPanel.prototype.showRedPoint = function (index, b) {
        if (this.roles == null)
            return;
        this.roles[index]['redPoint'].visible = b;
    };
    RoleSelectPanel.prototype.clearRedPoint = function () {
        for (var i = 0; i < this.roles.length; i++) {
            this.roles[i]['redPoint'].visible = false;
        }
    };
    RoleSelectPanel.prototype.openRole = function () {
        this.headGroup.visible = true;
    };
    RoleSelectPanel.prototype.hideRole = function () {
        this.headGroup.visible = false;
    };
    RoleSelectPanel.prototype.destructor = function () {
        if (this.parent) {
            this.parent.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMove, this);
            this.parent.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMove, this);
        }
    };
    return RoleSelectPanel;
}(BaseView));
__reflect(RoleSelectPanel.prototype, "RoleSelectPanel");
//# sourceMappingURL=RoleSelectPanel.js.map