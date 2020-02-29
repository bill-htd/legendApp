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
var BossListRender = (function (_super) {
    __extends(BossListRender, _super);
    function BossListRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "CityBossItemSkin";
        return _this;
    }
    BossListRender.prototype.dataChanged = function () {
        var bossId = this.data;
        var monster = GlobalConfig.MonstersConfig[bossId];
        this.nameTxt.text = monster.name;
        var isOpen = CityCC.ins().getKillBossNum(bossId) >= CityCC.ins().getNeedKillBossNum(bossId);
        this.redPoint.visible = isOpen;
    };
    return BossListRender;
}(BaseItemRender));
__reflect(BossListRender.prototype, "BossListRender");
//# sourceMappingURL=BossListRender.js.map