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
var UserGem = (function (_super) {
    __extends(UserGem, _super);
    function UserGem() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Gem;
        _this.regNetMsg(2, _this.postForgeUpdata);
        return _this;
    }
    UserGem.ins = function () {
        return _super.ins.call(this);
    };
    UserGem.prototype.postForgeUpdata = function (bytes) {
        var roleId = bytes.readShort();
        var model = SubRoles.ins().getSubRoleByIndex(roleId);
        var index = model.parseForgeChange(bytes, this.sysId);
        UserForge.ins().postForgeUpdate(this.sysId, index);
    };
    UserGem.prototype.sendUpGrade = function (roleId, pos) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleId);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    UserGem.ROLL_NUM = 8;
    return UserGem;
}(BaseSystem));
__reflect(UserGem.prototype, "UserGem");
var GameSystem;
(function (GameSystem) {
    GameSystem.usergem = UserGem.ins.bind(UserGem);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserGem.js.map