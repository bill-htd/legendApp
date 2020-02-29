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
var WildBossWin = (function (_super) {
    __extends(WildBossWin, _super);
    function WildBossWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    WildBossWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZaoYuBossSkin";
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.x = 250;
        this.bossImage.y = 430;
        this.addChildAt(this.bossImage, 6);
    };
    WildBossWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.challengeBtn, this.onTap);
        this.addTouchEvent(this.thinkBtn, this.onTap);
    };
    WildBossWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.challengeBtn, this.onTap);
        this.removeTouchEvent(this.thinkBtn, this.onTap);
    };
    WildBossWin.openCheck = function () {
        if (EntityManager.ins().getTeamCount(Team.WillBoss)) {
            UserTips.ins().showTips("正在挑战中");
            return false;
        }
        return true;
    };
    WildBossWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.challengeBtn:
            case this.thinkBtn:
            case this.closeBtn0:
            case this.closeBtn:
                ViewManager.ins().close(WildBossWin);
                break;
        }
    };
    return WildBossWin;
}(BaseEuiView));
__reflect(WildBossWin.prototype, "WildBossWin");
ViewManager.ins().reg(WildBossWin, LayerManager.UI_Main);
//# sourceMappingURL=WildBossWin.js.map