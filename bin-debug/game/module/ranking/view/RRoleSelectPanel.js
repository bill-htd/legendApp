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
var RRoleSelectPanel = (function (_super) {
    __extends(RRoleSelectPanel, _super);
    function RRoleSelectPanel() {
        var _this = _super.call(this) || this;
        _this._curRole = 0;
        _this.skinName = "RoleSelectPanelSkin";
        return _this;
    }
    RRoleSelectPanel.prototype.childrenCreated = function () {
        this.roles = [this.role0, this.role1, this.role2];
    };
    RRoleSelectPanel.prototype.open = function () {
        this.setCurRole(0);
        this.addTouchEvent(this, this.onClick);
    };
    Object.defineProperty(RRoleSelectPanel.prototype, "otherPlayerData", {
        set: function (value) {
            this._otherPlayerData = value;
            this.updateRole();
        },
        enumerable: true,
        configurable: true
    });
    RRoleSelectPanel.prototype.getCurRole = function () {
        return this._curRole;
    };
    RRoleSelectPanel.prototype.setCurRole = function (value) {
        this._curRole = value;
        for (var i = 0; i < this.roles.length; i++) {
            var element = this.roles[i];
            element.selected = i == value;
        }
        this.dispatchEventWith(egret.Event.CHANGE, false, this._curRole);
    };
    RRoleSelectPanel.prototype.onClick = function (e) {
        var index = this.roles.indexOf(e.target);
        if (index > -1) {
            var roleBtn = e.target;
            if (this._otherPlayerData.roleData[index]) {
                this.setCurRole(index);
            }
            else {
                roleBtn.selected = false;
            }
        }
    };
    RRoleSelectPanel.prototype.updateRole = function () {
        var role;
        var roleData;
        for (var i = 0; i < this.roles.length; i++) {
            role = this.roles[i];
            roleData = this._otherPlayerData.roleData[i];
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
                role.icon = "yuanhead" + roleData.job + roleData.sex;
            }
            else {
                role.icon = "";
                role['jobImg'].visible = false;
            }
        }
    };
    RRoleSelectPanel.prototype.close = function () {
        this.removeTouchEvent(this, this.onClick);
    };
    return RRoleSelectPanel;
}(BaseView));
__reflect(RRoleSelectPanel.prototype, "RRoleSelectPanel");
//# sourceMappingURL=RRoleSelectPanel.js.map