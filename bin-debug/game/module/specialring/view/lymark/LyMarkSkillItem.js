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
var LyMarkSkillItem = (function (_super) {
    __extends(LyMarkSkillItem, _super);
    function LyMarkSkillItem() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    LyMarkSkillItem.prototype.setCfg = function (cfg) {
        this._cfg = cfg;
        this.update();
    };
    LyMarkSkillItem.prototype.getCfg = function () {
        return this._cfg;
    };
    LyMarkSkillItem.prototype.addToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        MessageCenter.addListener(LyMark.ins().postMarkData, this.update, this);
        MessageCenter.addListener(UserBag.ins().postItemAdd, this.update, this);
        MessageCenter.addListener(UserBag.ins().postItemChange, this.update, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    };
    LyMarkSkillItem.prototype.removeStage = function (e) {
        MessageCenter.ins().removeAll(this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    };
    LyMarkSkillItem.prototype.update = function () {
        if (!this._cfg)
            return;
        this.skillImg.source = this._cfg.icon;
        this.skillName.textFlow = TextFlowMaker.generateTextFlow1(this._cfg.skillname);
        var lv = LyMark.ins().getSkillLvById(this._cfg.id);
        this.lock.visible = !lv;
        this.redpoint.visible = false;
        if (this._cfg.id != 1) {
            var isMax = lv >= (Object.keys(GlobalConfig.FlameStampEffect[this._cfg.id]).length);
            if (isMax)
                return;
            var nextCfg = GlobalConfig.FlameStampEffect[this._cfg.id][lv <= 0 ? 1 : lv + 1];
            if (nextCfg.costItem) {
                var itemConfig = GlobalConfig.ItemConfig[nextCfg.costItem];
                var itemData = UserBag.ins().getBagItemById(nextCfg.costItem);
                var count = itemData ? itemData.count : 0;
                this.redpoint.visible = count >= nextCfg.costCount && LyMark.ins().lyMarkLv >= nextCfg.stampLevel;
            }
        }
    };
    return LyMarkSkillItem;
}(eui.Component));
__reflect(LyMarkSkillItem.prototype, "LyMarkSkillItem");
//# sourceMappingURL=LyMarkSkillItem.js.map