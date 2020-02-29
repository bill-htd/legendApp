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
var SamsaraCC = (function (_super) {
    __extends(SamsaraCC, _super);
    function SamsaraCC() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Samsara;
        _this.regNetMsg(1, _this.postSamsaraInfo);
        _this.regNetMsg(4, _this.postCompose);
        return _this;
    }
    SamsaraCC.ins = function () {
        return _super.ins.call(this);
    };
    SamsaraCC.prototype.exchangeSamsaraExp = function (type) {
        var bytes = this.getBytes(2);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    SamsaraCC.prototype.upgradeSamsaraLv = function () {
        var bytes = this.getBytes(3);
        this.sendToServer(bytes);
    };
    SamsaraCC.prototype.postSamsaraInfo = function (bytes) {
        var isInit = SamsaraModel.ins().samsaraInfo ? false : true;
        var lastYeli = SamsaraModel.ins().samsaraInfo ? SamsaraModel.ins().samsaraInfo.exp : 0;
        SamsaraModel.ins().samsaraInfo = new SamsaraVO(bytes.readInt(), bytes.readInt(), bytes.readShort(), bytes.readShort(), bytes.readShort());
        if (!isInit) {
            var val = SamsaraModel.ins().samsaraInfo.exp - lastYeli;
            if (val)
                UserTips.ins().showTips("|C:0x00ff00&T:\u83B7\u5F97\u4E1A\u529B" + val + "|");
        }
    };
    SamsaraCC.prototype.requestCompose = function (itemId, roleIndex) {
        var bytes = this.getBytes(4);
        bytes.writeInt(itemId);
        bytes.writeShort(roleIndex);
        this.sendToServer(bytes);
    };
    SamsaraCC.prototype.postCompose = function (bytes) {
    };
    return SamsaraCC;
}(BaseSystem));
__reflect(SamsaraCC.prototype, "SamsaraCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.samsaraCC = SamsaraCC.ins.bind(SamsaraCC);
})(GameSystem || (GameSystem = {}));
var SamsaraUpgradeType;
(function (SamsaraUpgradeType) {
    SamsaraUpgradeType[SamsaraUpgradeType["level"] = 1] = "level";
    SamsaraUpgradeType[SamsaraUpgradeType["normal"] = 2] = "normal";
    SamsaraUpgradeType[SamsaraUpgradeType["advanced"] = 3] = "advanced";
})(SamsaraUpgradeType || (SamsaraUpgradeType = {}));
//# sourceMappingURL=SamsaraCC.js.map