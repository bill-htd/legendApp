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
var CDKey = (function (_super) {
    __extends(CDKey, _super);
    function CDKey() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.CDKey;
        _this.regNetMsg(1, _this.doChangeResult);
        return _this;
    }
    CDKey.ins = function () {
        return _super.ins.call(this);
    };
    CDKey.prototype.sendCdkey = function (str) {
        if (str.length <= 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:请输入激活码|");
            return;
        }
        var bytes = this.getBytes(1);
        bytes.writeString(str);
        this.sendToServer(bytes);
    };
    CDKey.prototype.doChangeResult = function (bytes) {
        var result = bytes.readByte();
        var str;
        switch (result) {
            case 0:
                str = "|C:0x35e62d&T:兑换成功,请在邮件中领取奖励|";
                break;
            case 1:
                str = "|C:0xf3311e&T:激活码已被使用|";
                break;
            case 2:
                str = "|C:0xf3311e&T:激活码不存在|";
                break;
            case 3:
                str = "|C:0xf3311e&T:已使用过同类型|";
                break;
            case 4:
                str = "|C:0xf3311e&T:兑换失败|";
                break;
        }
        UserTips.ins().showTips(str);
    };
    return CDKey;
}(BaseSystem));
__reflect(CDKey.prototype, "CDKey");
var GameSystem;
(function (GameSystem) {
    GameSystem.cdkey = CDKey.ins.bind(CDKey);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=CDKey.js.map