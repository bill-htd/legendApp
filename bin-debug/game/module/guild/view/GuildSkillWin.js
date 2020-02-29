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
var GuildSkillWin = (function (_super) {
    __extends(GuildSkillWin, _super);
    function GuildSkillWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildSkillSkin";
        _this.isTopLevel = true;
        return _this;
    }
    GuildSkillWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.tab, this.setSelectedIndex);
        this.observe(GuildRedPoint.ins().postGuildFire, this.updateRed);
        this.observe(GuildRedPoint.ins().postLianGongRedPoint, this.updateRoleRedPoint);
        this.observe(GuildRedPoint.ins().postLianGongRedPoint, this.updateRed);
        this.lastSelect = 0;
        this.viewStack.selectedIndex = this.lastSelect;
        this.addChangeEvent(this.roleSelect, this.update);
        this.viewStack.getElementAt(this.lastSelect)['open']();
        this.guildskill.curRole = this.roleSelect.getCurRole();
        this.updateRed();
        this.updateRoleRedPoint();
    };
    GuildSkillWin.prototype.setSelectedIndex = function (e) {
        this.selectedIndex(this.viewStack.selectedIndex);
    };
    GuildSkillWin.prototype.selectedIndex = function (index) {
        if (this.lastSelect != undefined) {
            this.viewStack.getElementAt(this.lastSelect)['close']();
        }
        this.lastSelect = index;
        this.viewStack.getElementAt(this.lastSelect)['open']();
        if (this.lastSelect == 0) {
            this.roleSelect.openRole();
        }
        else {
            this.roleSelect.hideRole();
        }
    };
    GuildSkillWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.guildskill.close();
        this.guildcampfire.close();
        ViewManager.ins().open(GuildMap);
    };
    GuildSkillWin.prototype.update = function () {
        if (this.guildskill) {
            this.guildskill.update(this.roleSelect.getCurRole());
        }
    };
    GuildSkillWin.prototype.updateRed = function () {
        this.redPoint1.visible = GuildRedPoint.ins().guildFire;
        this.redPoint0.visible = GuildRedPoint.ins().liangongRed;
    };
    GuildSkillWin.prototype.updateRoleRedPoint = function () {
        var roleRedPoint = [false, false, false];
        for (var i = 0; i < roleRedPoint.length; i++) {
            this.roleSelect.showRedPoint(i, roleRedPoint[i]);
        }
        for (var i = 0; i < 1; i++) {
            if (GuildRedPoint.ins().roleTabs[i]) {
                for (var j = 0; j < SubRoles.ins().subRolesLen; j++) {
                    this.roleSelect.showRedPoint(j, GuildRedPoint.ins().roleTabs[i][j]);
                }
            }
        }
    };
    GuildSkillWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!Guild.ins().getSkllInfoByIndex(0) && !Guild.ins().fireDic) {
            UserTips.ins().showTips("\u7F51\u7EDC\u4E0D\u4F73\uFF0C\u8BF7\u7A0D\u540E");
            return false;
        }
        return true;
    };
    return GuildSkillWin;
}(BaseEuiView));
__reflect(GuildSkillWin.prototype, "GuildSkillWin");
ViewManager.ins().reg(GuildSkillWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildSkillWin.js.map