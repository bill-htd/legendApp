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
var GodWingSkillTipsWin = (function (_super) {
    __extends(GodWingSkillTipsWin, _super);
    function GodWingSkillTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShenYuSkillTipsSkin";
        return _this;
    }
    GodWingSkillTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    GodWingSkillTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.bgClose, this.onClick);
        this.gwsConfig = param[0];
        var isActive = param[1];
        for (var i in GlobalConfig.GodWingSuitConfig) {
            var suitconfig = GlobalConfig.GodWingSuitConfig[i];
            if (suitconfig.skillname && suitconfig.lv > this.gwsConfig.lv) {
                this.nextConfig = suitconfig;
                break;
            }
        }
        if (!isActive) {
            this.currentState = "unactive";
        }
        else {
            if (this.nextConfig) {
                this.currentState = "active";
            }
            else {
                this.currentState = "max";
            }
        }
        this.validateNow();
        this.updateDesc();
    };
    GodWingSkillTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    GodWingSkillTipsWin.prototype.onClick = function () {
        ViewManager.ins().close(this);
    };
    GodWingSkillTipsWin.prototype.updateDesc = function () {
        this.setCurDesc();
        this.setNextDesc();
    };
    GodWingSkillTipsWin.prototype.setCurDesc = function () {
        this.icon.data = this.gwsConfig;
        this.icon.setNameVisible(false);
        this.icon.setCountVisible(false);
        this.content.textFlow = TextFlowMaker.generateTextFlow1(this.gwsConfig.skilldesc);
        this.lv.text = "\u7B49\u7EA7\uFF1A" + this.gwsConfig.skilllevel;
        var glc = GlobalConfig.GodWingLevelConfig[this.gwsConfig.lv][1];
        var showlv = GlobalConfig.GodWingItemConfig[glc.itemId].showlv;
        this.condition.text = "\u6240\u6709\u795E\u7FBD\u8FBE\u5230" + showlv + "\u9636";
    };
    GodWingSkillTipsWin.prototype.setNextDesc = function () {
        if (!this.nextConfig)
            return;
        this.icon0.data = this.nextConfig;
        this.icon0.setNameVisible(false);
        this.icon0.setCountVisible(false);
        this.content0.textFlow = TextFlowMaker.generateTextFlow1(this.nextConfig.skilldesc);
        this.lv0.text = "\u7B49\u7EA7\uFF1A" + this.nextConfig.skilllevel + "";
        var glc = GlobalConfig.GodWingLevelConfig[this.nextConfig.lv][1];
        var showlv = GlobalConfig.GodWingItemConfig[glc.itemId].showlv;
        this.condition0.text = "\u6240\u6709\u795E\u7FBD\u8FBE\u5230" + this.nextConfig.lv + "\u9636";
    };
    return GodWingSkillTipsWin;
}(BaseEuiView));
__reflect(GodWingSkillTipsWin.prototype, "GodWingSkillTipsWin");
ViewManager.ins().reg(GodWingSkillTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=GodWingSkillTipsWin.js.map