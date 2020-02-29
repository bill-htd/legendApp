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
var NeiGongModel = (function (_super) {
    __extends(NeiGongModel, _super);
    function NeiGongModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.neiGongList = [];
        return _this;
    }
    NeiGongModel.ins = function () {
        return _super.ins.call(this);
    };
    NeiGongModel.prototype.canUp = function () {
        if (UserFb.ins().guanqiaID < GlobalConfig.NeiGongBaseConfig.openGuanqia)
            return false;
        var len = Math.min(SubRoles.ins().subRolesLen, this.neiGongList.length);
        for (var i = 0; i < len; i++) {
            if (this.canUpById(i))
                return true;
        }
        return false;
    };
    NeiGongModel.prototype.canUpById = function (id) {
        if (this.neiGongList[id]) {
            if (UserFb.ins().guanqiaID <= GlobalConfig.NeiGongBaseConfig.openGuanqia)
                return false;
            if (this.neiGongList[id].stage >= GlobalConfig.NeiGongBaseConfig.maxStage)
                return false;
            if (this.neiGongList[id].canMix || this.neiGongList[id].getCanLevelUp())
                return true;
        }
        return false;
    };
    return NeiGongModel;
}(BaseClass));
__reflect(NeiGongModel.prototype, "NeiGongModel");
var NeiGongData = (function () {
    function NeiGongData() {
        this.roleId = 0;
        this.level = 0;
        this.stage = 0;
        this.exp = 0;
    }
    NeiGongData.prototype.parse = function (bytes) {
        this.level = bytes.readInt();
        this.stage = bytes.readInt();
        this.exp = bytes.readInt();
        var cruLevelCfg = GlobalConfig.NeiGongStageConfig[this.stage][this.level];
        this.canMix = this.level > 0 && this.level % GlobalConfig.NeiGongBaseConfig.levelPerStage == 0;
    };
    NeiGongData.prototype.getCanLevelUp = function () {
        var cruLevelCfg = GlobalConfig.NeiGongStageConfig[this.stage][this.level];
        if (!cruLevelCfg)
            return false;
        var difexp = cruLevelCfg.totalExp - this.exp;
        var count = Math.ceil(difexp / cruLevelCfg.addExp);
        return Actor.gold >= count * cruLevelCfg.costMoney && Actor.gold >= 1000000;
    };
    return NeiGongData;
}());
__reflect(NeiGongData.prototype, "NeiGongData");
//# sourceMappingURL=NeiGongModel.js.map