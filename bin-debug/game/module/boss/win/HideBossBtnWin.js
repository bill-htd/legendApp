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
var HideBossBtnWin = (function (_super) {
    __extends(HideBossBtnWin, _super);
    function HideBossBtnWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "HideBossBtnSkin";
        return _this;
    }
    HideBossBtnWin.prototype.childrenCreated = function () {
        this.eff_dragon.touchEnabled = false;
        this.eff_dragon.touchChildren = false;
        this.hideBossBtn.visible = false;
        this.eff_dragon.visible = false;
    };
    HideBossBtnWin.prototype.initUI = function () {
        this.hideBossBtn.visible = false;
        this.eff_dragon.visible = false;
    };
    HideBossBtnWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0]) {
            this.playDragonEff();
        }
        else {
            this.showBtn();
        }
    };
    HideBossBtnWin.prototype.onTap = function () {
        if (!GameMap.sceneInMain()) {
            UserTips.ins().showCenterTips("|C:0xf3311e&T:请先退出副本后再击杀隐藏BOSS|");
            return;
        }
        if (Encounter.ins().isEncounter()) {
            UserTips.ins().showCenterTips("|C:0xf3311e&T:正在挑战附近的人|");
            return;
        }
        ViewManager.ins().open(HideBossWin);
    };
    HideBossBtnWin.prototype.playDragonEff = function () {
        var _this = this;
        var mc = ObjectPool.pop("MovieClip");
        mc.addEventListener(egret.Event.CHANGE, this.onloadComp, this);
        mc.playFile(RES_DIR_EFF + "luckyboss_dragon_down", 1, function () {
            mc.removeEventListener(egret.Event.CHANGE, _this.onloadComp, _this);
            mc.destroy();
        });
        this.eff_dragon.visible = true;
        this.eff_dragon.addChild(mc);
    };
    HideBossBtnWin.prototype.onloadComp = function () {
        TimerManager.ins().doTimer(400, 1, this.showBtn, this);
    };
    HideBossBtnWin.prototype.showBtn = function () {
        if (Assert(UserBoss.ins().hideBossData.id, "hideBossData id:" + UserBoss.ins().hideBossData.id)) {
            ViewManager.ins().close(this);
            return;
        }
        this.hideBossBtn.visible = true;
        this.addTouchEvent(this.hideBossBtn, this.onTap);
        var config = GlobalConfig.MonstersConfig[GlobalConfig.HideBossConfig[UserBoss.ins().hideBossData.id].bossId];
        this.hideBossBtn["headImg"].source = "monhead" + config.head + "_png";
        this._sec = Math.floor((DateUtils.formatMiniDateTime(UserBoss.ins().hideBossData.endTime) - GameServer.serverTime) / 1000);
        this.lbTime.text = DateUtils.getFormatBySecond(this._sec, DateUtils.TIME_FORMAT_1);
        TimerManager.ins().remove(this.setTime, this);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        if (!this.mcBtn) {
            this.mcBtn = ObjectPool.pop("MovieClip");
            this.mcBtn.playFile(RES_DIR_EFF + "luckyboss_hint", -1);
        }
        if (!this.mcBtn.parent)
            this.hideBossBtn['eff_btn'].addChild(this.mcBtn);
    };
    HideBossBtnWin.prototype.setTime = function () {
        if (this._sec > 0) {
            this._sec -= 1;
            this.lbTime.text = DateUtils.getFormatBySecond(this._sec, DateUtils.TIME_FORMAT_1);
        }
        else {
            UserBoss.ins().hideBossData.id = 0;
            UserBoss.ins().hideBossData.endTime = 0;
            ViewManager.ins().close(this);
        }
    };
    HideBossBtnWin.prototype.close = function () {
        if (this.mcBtn)
            this.mcBtn.destroy();
        this.mcBtn = null;
    };
    return HideBossBtnWin;
}(BaseEuiView));
__reflect(HideBossBtnWin.prototype, "HideBossBtnWin");
ViewManager.ins().reg(HideBossBtnWin, LayerManager.UI_Main);
//# sourceMappingURL=HideBossBtnWin.js.map