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
var UserZhuLing = (function (_super) {
    __extends(UserZhuLing, _super);
    function UserZhuLing() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Zhuling;
        _this.regNetMsg(2, _this.postForgeUpdata);
        return _this;
    }
    UserZhuLing.ins = function () {
        return _super.ins.call(this);
    };
    UserZhuLing.prototype.postForgeUpdata = function (bytes) {
        var roleId = bytes.readShort();
        var model = SubRoles.ins().getSubRoleByIndex(roleId);
        var index = model.parseForgeChange(bytes, this.sysId);
        UserForge.ins().postForgeUpdate(this.sysId, index);
    };
    UserZhuLing.prototype.sendUpGrade = function (roleId, pos) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleId);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    return UserZhuLing;
}(BaseSystem));
__reflect(UserZhuLing.prototype, "UserZhuLing");
var GameSystem;
(function (GameSystem) {
    GameSystem.userzhuling = UserZhuLing.ins.bind(UserZhuLing);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserZhuLing.js.map