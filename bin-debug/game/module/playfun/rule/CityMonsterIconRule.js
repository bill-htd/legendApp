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
var CityMonsterIconRule = (function (_super) {
    __extends(CityMonsterIconRule, _super);
    function CityMonsterIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this._shap = new egret.Shape();
        _this._radius = 0;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            GameApp.ins().postZeroInit
        ];
        _this.updateMessage = [
            CityCC.ins().postBossInfo,
            CityCC.ins().postCityBossId,
        ];
        return _this;
    }
    CityMonsterIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.monHead = t["monHead"];
        this.process = t["process"];
        this._radius = t.width >> 1;
        this._shap.x = this._radius;
        this._shap.y = this._radius;
        this._shap.rotation = -90;
        t.addChild(this._shap);
        this.process.mask = this._shap;
        return t;
    };
    CityMonsterIconRule.prototype.checkShowIcon = function () {
        this.updateIcon();
        return GameServer.serverOpenDay && OpenSystem.ins().checkSysOpen(SystemType.CITYMONSTER);
    };
    CityMonsterIconRule.prototype.checkShowRedPoint = function () {
        this.updateIcon();
        return CityCC.ins().cityBossId;
    };
    CityMonsterIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(CityBossView);
    };
    CityMonsterIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    CityMonsterIconRule.prototype.updateIcon = function () {
        var bossId = CityCC.ins().cityBossId;
        if (bossId == 0) {
            var _a = CityCC.ins().getMaxKillNumBoss(), id = _a[0], value = _a[1];
            bossId = id;
            this.curAngle = MathUtils.toInteger(value * 360);
        }
        else
            this.curAngle = 360;
        if (!GlobalConfig.MonstersConfig[bossId])
            return;
        if (this.monHead)
            this.monHead.source = 'monhead' + GlobalConfig.MonstersConfig[bossId].head + '_png';
    };
    Object.defineProperty(CityMonsterIconRule.prototype, "curAngle", {
        set: function (value) {
            DisplayUtils.drawCir(this._shap, this._radius, value);
        },
        enumerable: true,
        configurable: true
    });
    return CityMonsterIconRule;
}(RuleIconBase));
__reflect(CityMonsterIconRule.prototype, "CityMonsterIconRule");
//# sourceMappingURL=CityMonsterIconRule.js.map