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
var NeiGong = (function (_super) {
    __extends(NeiGong, _super);
    function NeiGong() {
        var _this = _super.call(this) || this;
        _this.isActList = {};
        _this.isShow = false;
        _this.ngList = {};
        _this.sysId = PackageID.NeiGong;
        _this.regNetMsg(1, _this.postNeiGongDataChange);
        _this.regNetMsg(3, _this.postNeiGongAct);
        return _this;
    }
    NeiGong.ins = function () {
        return _super.ins.call(this);
    };
    NeiGong.prototype.postNeiGongDataChange = function (bytes) {
        var roleId = bytes.readShort();
        if (!NeiGongModel.ins().neiGongList[roleId]) {
            NeiGongModel.ins().neiGongList[roleId] = new NeiGongData();
        }
        var data = NeiGongModel.ins().neiGongList[roleId];
        data.roleId = roleId;
        data.parse(bytes);
        var neigongAct = bytes.readBoolean();
        if (!this.isActList[roleId])
            this.isActList[roleId] = {};
        this.isActList[roleId].act = neigongAct ? 1 : 0;
        this.ngList[roleId] = neigongAct ? 1 : 0;
    };
    NeiGong.prototype.postNeiGongAct = function (bytes) {
        var roleId = bytes.readShort();
        var act = bytes.readInt();
        this.ngList[roleId] = act;
        this.isActList[roleId].isShow = false;
        if (this.isActList[roleId].act == 0 && act == 1) {
            this.isActList[roleId].isShow = true;
        }
        this.isActList[roleId].act = act;
    };
    NeiGong.prototype.sendNeiGongUpLevel = function (id) {
        var bytes = this.getBytes(1);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    NeiGong.prototype.sendNeiGongUpStage = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    NeiGong.prototype.sendNeiGongAct = function (id) {
        var bytes = this.getBytes(3);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    return NeiGong;
}(BaseSystem));
__reflect(NeiGong.prototype, "NeiGong");
var GameSystem;
(function (GameSystem) {
    GameSystem.neigong = NeiGong.ins.bind(NeiGong);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=NeiGong.js.map