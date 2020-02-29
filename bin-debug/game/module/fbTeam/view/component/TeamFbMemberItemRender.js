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
var TeamFbMemberItemRender = (function (_super) {
    __extends(TeamFbMemberItemRender, _super);
    function TeamFbMemberItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbMemberSkin";
        return _this;
    }
    TeamFbMemberItemRender.prototype.dataChanged = function () {
        var roleList = this.data;
        this.fuhuoImg.visible = false;
        var len = roleList.length;
        var hasRole;
        for (var i = 0; i < len; i++) {
            if (roleList[i].infoModel.getAtt(AttributeType.atHp) > 0) {
                hasRole = true;
                this.updateRole(roleList[i]);
                break;
            }
        }
        if (!hasRole) {
            this.updateRole(roleList[0]);
            this.fuhuoImg.visible = true;
        }
    };
    TeamFbMemberItemRender.prototype.updateRole = function (role) {
        var info = role.infoModel;
        this.roleName.text = info.name;
        this.roleHead.source = "yuanhead" + info.job + info.sex;
    };
    return TeamFbMemberItemRender;
}(BaseItemRender));
__reflect(TeamFbMemberItemRender.prototype, "TeamFbMemberItemRender");
//# sourceMappingURL=TeamFbMemberItemRender.js.map