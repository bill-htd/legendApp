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
var RingUpgradeWin = (function (_super) {
    __extends(RingUpgradeWin, _super);
    function RingUpgradeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "LYRUltraSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RingUpgradeWin.prototype.addBossImg = function (id) {
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.scaleY = 1;
        this.bossImage.x = this.ring0eff.width / 2;
        this.bossImage.y = 115;
        this.ring0eff.addChild(this.bossImage);
        var monster = GlobalConfig.MonstersConfig[id];
        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + monster.avatar + "_3s"), -1);
    };
    RingUpgradeWin.prototype.addNextBossImg = function (id) {
        this.nextBossImage = new MovieClip;
        this.nextBossImage.scaleX = -1;
        this.nextBossImage.scaleY = 1;
        this.nextBossImage.x = this.ring1eff.width / 2;
        this.nextBossImage.y = 115;
        this.ring1eff.addChild(this.nextBossImage);
        var monster = GlobalConfig.MonstersConfig[id];
        this.nextBossImage.playFile(RES_DIR_MONSTER + ("monster" + monster.avatar + "_3s"), -1);
    };
    RingUpgradeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.colorCanvas, this.otherClose);
        var abilityId = SpecialRing.ins().getAbilityID();
        if (abilityId == 0)
            abilityId = 1;
        var lv = SpecialRing.ins().abilityIds[abilityId];
        lv = !lv ? 1 : lv;
        var cfg = GlobalConfig.ActorExRingItemConfig[SpecialRing.FIRE_RING_ID][abilityId][lv];
        var monId = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID].monsterId;
        var nextMonId = monId + cfg.monId;
        this.abilityDesc.textFlow = TextFlowMaker.generateTextFlow(cfg.abilityDesc);
        this.addBossImg(monId);
        this.addNextBossImg(nextMonId);
    };
    RingUpgradeWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return RingUpgradeWin;
}(BaseEuiView));
__reflect(RingUpgradeWin.prototype, "RingUpgradeWin");
ViewManager.ins().reg(RingUpgradeWin, LayerManager.UI_Popup);
//# sourceMappingURL=RingUpgradeWin.js.map