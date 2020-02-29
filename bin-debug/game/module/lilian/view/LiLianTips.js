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
var LiLianTips = (function (_super) {
    __extends(LiLianTips, _super);
    function LiLianTips() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LiLianTips.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "LiLianTipsSkin";
        this.isTopLevel = true;
    };
    LiLianTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setPanel();
    };
    LiLianTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    LiLianTips.prototype.setPanel = function () {
        var config = LiLian.ins().getCruLevelSkillCfg();
        var nextConfig = LiLian.ins().getCruLevelSkillCfg(true);
        if (config) {
            this.skillIcon.source = config.icon + "";
            this.skillName.text = config.skillname;
            this.cruDesc.textFlow = TextFlowMaker.generateTextFlow(config.desc);
            var levelConfig = GlobalConfig.TrainLevelConfig[config.level];
            var str = "\u00B7" + levelConfig.trainName;
            this.currTrainName.textFlow = TextFlowMaker.generateTextFlow(str);
        }
        if (nextConfig) {
            this.nextDesc.textFlow = TextFlowMaker.generateTextFlow(nextConfig.desc);
            var nextLevelConfig = GlobalConfig.TrainLevelConfig[nextConfig.level];
            var str1 = "\u00B7" + nextLevelConfig.trainName;
            this.nextTrainName.textFlow = TextFlowMaker.generateTextFlow(str1);
        }
        else {
            this.nextDesc.text = "";
        }
    };
    LiLianTips.prototype.onTap = function (e) {
        ViewManager.ins().close(LiLianTips);
    };
    return LiLianTips;
}(BaseEuiView));
__reflect(LiLianTips.prototype, "LiLianTips");
ViewManager.ins().reg(LiLianTips, LayerManager.UI_Popup);
//# sourceMappingURL=LiLianTips.js.map