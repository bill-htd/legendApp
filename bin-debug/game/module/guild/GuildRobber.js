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
var GuildRobber = (function (_super) {
    __extends(GuildRobber, _super);
    function GuildRobber() {
        var _this = _super.call(this) || this;
        _this.robberNum = 0;
        _this.robberTotal = 0;
        _this.robberDealNum = 0;
        _this._robberList = [];
        _this.robberChanllge = 0;
        _this.isUpdateRobber = false;
        _this.sysId = PackageID.GuildRobber;
        _this.regNetMsg(1, _this.doGuildRobberInfo);
        _this.regNetMsg(2, _this.doGuildRobberStarts);
        _this.regNetMsg(3, _this.doGuildRobberSX);
        _this.regNetMsg(4, _this.doGuildRobberChangller);
        return _this;
    }
    GuildRobber.ins = function () {
        return _super.ins.call(this);
    };
    GuildRobber.prototype.getRobberList = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._robberList : this._robberList[index];
    };
    GuildRobber.prototype.doGuildRobberInfo = function (bytes) {
        this.robberNum = bytes.readByte();
        if (this.robberNum > 0) {
            this.robberTotal = bytes.readByte();
            this.robberDealNum = bytes.readByte();
            this._robberList = [];
            for (var i = 0; i < this.robberTotal; i++) {
                var info = new RobberStartInfo();
                info.robberStart = bytes.readByte();
                info.robberType = bytes.readByte();
                this._robberList.push(info);
            }
        }
        this.postGuildRobberInfo();
    };
    GuildRobber.prototype.postGuildRobberInfo = function () {
    };
    GuildRobber.prototype.doGuildRobberStarts = function (bytes) {
        var index = bytes.readByte();
        if (this._robberList.length > 0) {
            var info = this._robberList[index - 1];
            info.robberStart = bytes.readByte();
        }
        this.robberDealNum = bytes.readByte();
        this.postGuildRobberInfo();
    };
    GuildRobber.prototype.doGuildRobberSX = function (bytes) {
        this.robberNum = bytes.readByte();
        if (ViewManager.ins().getView(GuildMap)) {
            this.sendRobberInfo();
        }
        else
            this.isUpdateRobber = true;
    };
    GuildRobber.prototype.doGuildRobberChangller = function (bytes) {
        this.robberChanllge = bytes.readByte();
    };
    GuildRobber.prototype.sendRobberInfo = function () {
        this.sendBaseProto(1);
    };
    GuildRobber.prototype.sendRobberChanger = function (num) {
        var bytes = this.getBytes(2);
        bytes.writeByte(num);
        this.sendToServer(bytes);
    };
    GuildRobber.prototype.hasbtn = function () {
        return this.robberTotal > 0 &&
            (this.robberTotal > this.robberDealNum);
    };
    return GuildRobber;
}(BaseSystem));
__reflect(GuildRobber.prototype, "GuildRobber");
var GameSystem;
(function (GameSystem) {
    GameSystem.guildrobber = GuildRobber.ins.bind(GuildRobber);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuildRobber.js.map