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
var RuneExchangeItemRenderer = (function (_super) {
    __extends(RuneExchangeItemRenderer, _super);
    function RuneExchangeItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "RuneExchangeItemSkin";
        _this.goBtn.name = "goBtn";
        return _this;
    }
    RuneExchangeItemRenderer.prototype.dataChanged = function () {
        var cfg = this.data;
        if (cfg) {
            var itemCfg = GlobalConfig.ItemConfig[cfg.id];
            this.icon.setDataByItemConfig(itemCfg);
            var info = RuneConfigMgr.ins().getBaseCfgByItemConfig(itemCfg);
            this.descLab.text = RuneConfigMgr.ins().getcfgAttrDesc(info);
            var config = GlobalConfig.FbChallengeConfig[cfg.checkpoint];
            if (!config) {
                this.descLab1.text = "\u9ED8\u8BA4\u89E3\u9501";
            }
            else {
                this.descLab1.text = "\u901A\u5173\u901A\u5929\u5854" + GlobalConfig.FbChNameConfig[config.group].name + "\u89E3\u9501";
            }
            var colorStr = "";
            if (Actor.runeExchange >= cfg.conversion)
                colorStr = ColorUtil.GREEN_COLOR;
            else
                colorStr = ColorUtil.RED_COLOR;
            this.nameLab0.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + Actor.runeExchange + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + cfg.conversion + "</font> ");
            this.setEff(itemCfg);
        }
        else {
            this.retView();
        }
    };
    RuneExchangeItemRenderer.prototype.setEff = function (itemCfg) {
        var quality = ItemConfig.getQuality(itemCfg);
        if (quality == 5) {
            this.EquipEffect = this.EquipEffect || new MovieClip();
            this.EquipEffect.touchEnabled = false;
            if (!this.EquipEffect.parent)
                this.addChild(this.EquipEffect);
            this.EquipEffect.playFile(RES_DIR_EFF + "chuanqizbeff", -1);
            this.EquipEffect.x = this.effpos.x;
            this.EquipEffect.y = this.effpos.y;
            this.EquipEffect.scaleX = this.effpos.scaleX;
            this.EquipEffect.scaleY = this.effpos.scaleY;
        }
    };
    RuneExchangeItemRenderer.prototype.close = function () {
        DisplayUtils.removeFromParent(this.EquipEffect);
    };
    RuneExchangeItemRenderer.prototype.retView = function () {
        this.descLab.text = "";
        this.descLab1.text = "";
        this.nameLab0.text = "";
        this.icon.setData(null);
        this.close();
    };
    return RuneExchangeItemRenderer;
}(eui.ItemRenderer));
__reflect(RuneExchangeItemRenderer.prototype, "RuneExchangeItemRenderer");
//# sourceMappingURL=RuneExchangeItemRenderer.js.map