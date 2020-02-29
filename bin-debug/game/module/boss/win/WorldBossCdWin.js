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
var WorldBossCdWin = (function (_super) {
    __extends(WorldBossCdWin, _super);
    function WorldBossCdWin() {
        return _super.call(this) || this;
    }
    WorldBossCdWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBosstishiSkin";
        this.isTopLevel = true;
    };
    WorldBossCdWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.sure, this.onTap);
        this.addTouchEvent(this.giveUp, this.onTap);
        this.addChangeEvent(this.check, this.selectChange);
        var cost = UserBoss.ins().checkWorldBossNeed();
        this.tipsTxt.textFlow = new egret.HtmlTextParser().parser("\u786E\u5B9A\u9700\u8981\u6D88\u8017" + StringUtils.addColor(cost + "\u5143\u5B9D", '#23C42A') + "\u7ACB\u5373\u590D\u6D3B\u5417?");
    };
    WorldBossCdWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.sure, this.onTap);
        this.removeTouchEvent(this.giveUp, this.onTap);
        this.check.removeEventListener(egret.Event.CHANGE, this.selectChange, this);
    };
    WorldBossCdWin.prototype.selectChange = function (e) {
        UserBoss.ins().ShowTip = !this.check.selected;
    };
    WorldBossCdWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return UserBoss.ins().ShowTip;
    };
    WorldBossCdWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sure:
                if (UserBoss.ins().checkRelive()) {
                    UserBoss.ins().sendClearCD();
                    ViewManager.ins().close(WorldBossCdWin);
                    ViewManager.ins().close(WorldBossBeKillWin);
                }
                break;
            case this.giveUp:
                ViewManager.ins().close(WorldBossCdWin);
                break;
        }
    };
    return WorldBossCdWin;
}(BaseEuiView));
__reflect(WorldBossCdWin.prototype, "WorldBossCdWin");
ViewManager.ins().reg(WorldBossCdWin, LayerManager.UI_Popup);
//# sourceMappingURL=WorldBossCdWin.js.map