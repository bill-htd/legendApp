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
var WorldBossJiangliTipWin = (function (_super) {
    __extends(WorldBossJiangliTipWin, _super);
    function WorldBossJiangliTipWin() {
        return _super.call(this) || this;
    }
    WorldBossJiangliTipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossJiangLiTishiSkin2";
        this.isTopLevel = true;
        this.belongList.itemRenderer = ItemBase;
        this.joinList.itemRenderer = ItemBase;
    };
    WorldBossJiangliTipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.otherClose);
        var config = GlobalConfig.WorldBossConfig[UserBoss.ins().currBossConfigID];
        this.belongList.dataProvider = new eui.ArrayCollection(config.belongRewardshow[1]);
        this.joinList.dataProvider = new eui.ArrayCollection(config.canRewardshow[1]);
    };
    WorldBossJiangliTipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.otherClose);
    };
    WorldBossJiangliTipWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(WorldBossJiangliTipWin);
    };
    WorldBossJiangliTipWin.openCheck = function () {
        if (!UserBoss.ins().currBossConfigID) {
            return false;
        }
        var config = GlobalConfig.WorldBossConfig[UserBoss.ins().currBossConfigID];
        if (Assert(config, "GlobalConfig.WorldBossConfig[" + UserBoss.ins().currBossConfigID + "]\u662F\u7A7A")) {
            return false;
        }
        return true;
    };
    return WorldBossJiangliTipWin;
}(BaseEuiView));
__reflect(WorldBossJiangliTipWin.prototype, "WorldBossJiangliTipWin");
ViewManager.ins().reg(WorldBossJiangliTipWin, LayerManager.UI_Popup);
//# sourceMappingURL=WorldBossJiangliTipWin.js.map