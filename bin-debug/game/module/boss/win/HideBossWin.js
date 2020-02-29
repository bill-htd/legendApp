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
var HideBossWin = (function (_super) {
    __extends(HideBossWin, _super);
    function HideBossWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "LuckyBossSkin";
        return _this;
    }
    HideBossWin.prototype.childrenCreated = function () {
        this.boss.touchEnabled = false;
        this.boss.touchChildren = false;
        this.dropRewardList.itemRenderer = ItemBase;
    };
    HideBossWin.prototype.open = function () {
        this.addTouchEvent(this.challengeBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.showBoss();
        this.showAward();
    };
    HideBossWin.prototype.close = function () {
        if (this.bossMc)
            this.bossMc.destroy();
        this.bossMc = null;
    };
    HideBossWin.prototype.showAward = function () {
        var id = UserBoss.ins().hideBossData.id;
        var rewardShow = GlobalConfig.HideBossConfig[id].rewardShow;
        this.dropRewardList.dataProvider = new eui.ArrayCollection(rewardShow.concat());
    };
    HideBossWin.prototype.showBoss = function () {
        if (!this.bossMc) {
            var bossImage = ObjectPool.pop("MovieClip");
            this.bossMc = bossImage;
            bossImage.scaleX = -1;
            bossImage.scaleY = 1;
            bossImage.x = 78;
            bossImage.y = 50;
            this.boss.addChild(bossImage);
        }
        var id = UserBoss.ins().hideBossData.id;
        var bossId = GlobalConfig.HideBossConfig[id].bossId;
        var bossBaseConfig = GlobalConfig.MonstersConfig[bossId];
        this.bossMc.playFile(RES_DIR_MONSTER + ("monster" + bossBaseConfig.avatar + "_3s"), -1);
    };
    HideBossWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.bgClose) {
            ViewManager.ins().close(this);
        }
        else if (tar == this.challengeBtn) {
            if (Encounter.ins().isEncounter()) {
                UserTips.ins().showCenterTips("\u6B63\u5728\u6311\u6218\u9644\u8FD1\u7684\u4EBA");
            }
            else if (GameMap.sceneInMain()) {
                UserBoss.ins().hideBossData.lastId = UserBoss.ins().hideBossData.id;
                UserBoss.ins().sendChallengeHideBoss();
                ViewManager.ins().close(this);
            }
            else {
                UserTips.ins().showCenterTips("\u8BF7\u5148\u9000\u51FA\u526F\u672C\u540E\u518D\u51FB\u6740\u9690\u85CFBOSS");
            }
        }
    };
    return HideBossWin;
}(BaseEuiView));
__reflect(HideBossWin.prototype, "HideBossWin");
ViewManager.ins().reg(HideBossWin, LayerManager.UI_Popup);
//# sourceMappingURL=HideBossWin.js.map