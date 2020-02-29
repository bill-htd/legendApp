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
var KFBossShowWin = (function (_super) {
    __extends(KFBossShowWin, _super);
    function KFBossShowWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KFBossShowSkin";
        return _this;
    }
    KFBossShowWin.prototype.childrenCreated = function () {
        this.boss.touchEnabled = false;
        this.boss.touchChildren = false;
        this.dropRewardList.itemRenderer = ItemBase;
    };
    KFBossShowWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.challengeBtn, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.fbId = args[0];
        this.dp = GlobalConfig.CrossBossConfig[this.fbId];
        this.showAward();
        this.showBoss();
        this.bossName.source = "kf_name_" + this.dp.bossId;
    };
    KFBossShowWin.prototype.showAward = function () {
        var rewardShow = this.dp.belongRewardshow;
        this.dropRewardList.dataProvider = new eui.ArrayCollection(rewardShow.concat());
    };
    KFBossShowWin.prototype.showBoss = function () {
        if (!this.bossMc) {
            this.bossMc = ObjectPool.pop("MovieClip");
            this.bossMc.scaleX = -1;
            this.bossMc.scaleY = 1;
            this.bossMc.x = 78;
            this.bossMc.y = 50;
            this.boss.addChild(this.bossMc);
        }
        var bossId = this.dp.bossId;
        var bossBaseConfig = GlobalConfig.MonstersConfig[bossId];
        this.bossMc.playFile(RES_DIR_MONSTER + ("monster" + bossBaseConfig.avatar + "_3s"), -1);
    };
    KFBossShowWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.challengeBtn:
                var cd = (KFBossSys.ins().enterCD - egret.getTimer()) / 1000 >> 0;
                if (cd > 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:" + cd + "\u79D2\u540E\u53EF\u4EE5\u8FDB\u5165\uFF01");
                    return;
                }
                if (UserZs.ins().lv < this.dp.levelLimit[0] / 1000 || UserZs.ins().lv > this.dp.levelLimit[1] / 1000) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u9700\u8981\u8F6C\u751F\u7B49\u7EA7\u5230\u8FBE" + (this.dp.levelLimit[0] / 1000 >> 0) + "\u8F6C\uFF01");
                    return;
                }
                KFBossSys.ins().sendEnter(this.fbId);
                break;
        }
    };
    return KFBossShowWin;
}(BaseEuiView));
__reflect(KFBossShowWin.prototype, "KFBossShowWin");
ViewManager.ins().reg(KFBossShowWin, LayerManager.UI_Popup);
//# sourceMappingURL=KFBossShowWin.js.map