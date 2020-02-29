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
var ChallengeInfoPanel = (function (_super) {
    __extends(ChallengeInfoPanel, _super);
    function ChallengeInfoPanel() {
        return _super.call(this) || this;
    }
    ChallengeInfoPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ChuangtianguanBloodSkin";
        this.list.itemRenderer = ItemBase;
    };
    ChallengeInfoPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var dalay = GameMap.fbType == UserFb.FB_TYPE_HUN_SHOU ? Hungu.ins().getHunShouFbLeftTime() : SkyLevelModel.ins().limitTime;
        this.time.text = DateUtils.getFormatBySecond(dalay, 3);
        TimerManager.ins().doTimer(1000, dalay, this.setTimeLimit, this);
        this.refushInfo();
    };
    ChallengeInfoPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ChallengeInfoPanel.prototype.refushInfo = function () {
        var info = GlobalConfig.FbChallengeConfig[SkyLevelModel.ins().cruLevel + 1];
        if (info) {
            this.levelLimit.text = info.zsLevelLimit > 0 ? info.zsLevelLimit + "\u8F6C" : "" + (info.levelLimit + "\u7EA7\u53EF\u6311\u6218");
            this.setTimeLimit();
        }
    };
    ChallengeInfoPanel.prototype.setTimeLimit = function () {
        var dalay = GameMap.fbType == UserFb.FB_TYPE_HUN_SHOU ? Hungu.ins().getHunShouFbLeftTime() : SkyLevelModel.ins().limitTime;
        this.time.text = DateUtils.getFormatBySecond(dalay, 3);
    };
    return ChallengeInfoPanel;
}(BaseEuiView));
__reflect(ChallengeInfoPanel.prototype, "ChallengeInfoPanel");
ViewManager.ins().reg(ChallengeInfoPanel, LayerManager.Game_Main);
//# sourceMappingURL=ChallengeInfoPanel.js.map