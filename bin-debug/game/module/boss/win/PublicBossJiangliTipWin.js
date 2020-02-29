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
var PublicBossJiangliTipWin = (function (_super) {
    __extends(PublicBossJiangliTipWin, _super);
    function PublicBossJiangliTipWin() {
        return _super.call(this) || this;
    }
    PublicBossJiangliTipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossJiangLiTishiSkin";
        this.isTopLevel = true;
        this.belongList.itemRenderer = ItemBase;
        this.joinList.itemRenderer = ItemBase;
    };
    PublicBossJiangliTipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.otherClose);
        if (GwBoss.ins().isGwBoss || KFBossSys.ins().isKFBossBattle) {
            this.currentState = "gwboss";
        }
        else if (GwBoss.ins().isGwTopBoss) {
            this.currentState = "tower";
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_HIDE_BOSS) {
            this.currentState = "hideboss";
        }
        else {
            this.currentState = "normal";
        }
        if (KFBossSys.ins().isKFBossBattle) {
            this.proWordGroup1.visible = false;
            this.proWordGroup.visible = false;
            var ar = [];
            for (var k in GlobalConfig.CrossBossConfig) {
                var dp = GlobalConfig.CrossBossConfig[k];
                if (dp.fbid == GameMap.fubenID) {
                    var belongRewardshow = CommonUtils.copyDataHandler(dp.belongRewardshow);
                    if (belongRewardshow)
                        this.belongItem.data = belongRewardshow.shift();
                    this.belongList.dataProvider = new eui.ArrayCollection(belongRewardshow);
                    break;
                }
            }
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_HIDE_BOSS) {
            var id = UserBoss.ins().hideBossData.lastId;
            var reward = GlobalConfig.HideBossConfig[id].rewardShow.concat();
            this.belongItem.data = reward.shift();
            this.belongList.dataProvider = new eui.ArrayCollection(reward);
        }
        else {
            var config = GlobalConfig.WorldBossConfig[UserBoss.ins().currBossConfigID];
            this.belongItem.data = config.belongRewardshow[0];
            this.belongList.dataProvider = new eui.ArrayCollection(config.belongRewardshow[1]);
            if (config.canRewardshow) {
                this.joinItem.data = config.canRewardshow[0];
                this.joinList.dataProvider = new eui.ArrayCollection(config.canRewardshow[1]);
            }
        }
    };
    PublicBossJiangliTipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.otherClose);
    };
    PublicBossJiangliTipWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(PublicBossJiangliTipWin);
    };
    PublicBossJiangliTipWin.openCheck = function () {
        if (!UserBoss.ins().currBossConfigID) {
            return false;
        }
        return true;
    };
    return PublicBossJiangliTipWin;
}(BaseEuiView));
__reflect(PublicBossJiangliTipWin.prototype, "PublicBossJiangliTipWin");
ViewManager.ins().reg(PublicBossJiangliTipWin, LayerManager.UI_Popup);
//# sourceMappingURL=PublicBossJiangliTipWin.js.map