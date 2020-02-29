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
var UserJingMai = (function (_super) {
    __extends(UserJingMai, _super);
    function UserJingMai() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.JingMai;
        _this.regNetMsg(1, _this.doUpData);
        _this.regNetMsg(4, _this.doBigUpLevel);
        return _this;
    }
    UserJingMai.ins = function () {
        return _super.ins.call(this);
    };
    UserJingMai.prototype.sendBoost = function (roleId) {
        var bytes = this.getBytes(1);
        bytes.writeShort(roleId);
        this.sendToServer(bytes);
    };
    UserJingMai.prototype.sendUpgrade = function (roleId) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleId);
        this.sendToServer(bytes);
    };
    UserJingMai.prototype.doUpData = function (bytes) {
        var index = bytes.readShort();
        SubRoles.ins().getSubRoleByIndex(index).jingMaiData.parser(bytes);
        this.postUpdate();
    };
    UserJingMai.prototype.postUpdate = function () {
    };
    UserJingMai.prototype.sendBigUpLevel = function (role) {
        var bytes = this.getBytes(4);
        bytes.writeInt(role);
        this.sendToServer(bytes);
    };
    UserJingMai.prototype.doBigUpLevel = function (bytes) {
        var result = bytes.readInt();
        var str;
        if (!result) {
            var type = bytes.readInt();
            if (!type)
                str = "使用成功，经脉等阶+1";
        }
        else {
            str = "道具不足够";
        }
        if (str)
            UserTips.ins().showTips(str);
    };
    UserJingMai.prototype.canGradeupJingMai = function () {
        var boolList = [false, false, false];
        var config;
        var costNum = 0;
        var itemNum = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            config = GlobalConfig.JingMaiLevelConfig[role.jingMaiData.level];
            costNum = config.count;
            if (costNum) {
                var num = UserBag.ins().getBagGoodsCountById(0, 200103);
                if (num) {
                    boolList[i] = true;
                    break;
                }
                itemNum = UserBag.ins().getBagGoodsCountById(0, config.itemId);
                boolList[i] = (itemNum >= costNum);
            }
            else {
                boolList[i] = false;
            }
        }
        return boolList;
    };
    return UserJingMai;
}(BaseSystem));
__reflect(UserJingMai.prototype, "UserJingMai");
var GameSystem;
(function (GameSystem) {
    GameSystem.userJingMai = UserJingMai.ins.bind(UserJingMai);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserJingMai.js.map