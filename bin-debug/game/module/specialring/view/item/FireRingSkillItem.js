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
var ItemRenderer = eui.ItemRenderer;
var FireRingSkillItem = (function (_super) {
    __extends(FireRingSkillItem, _super);
    function FireRingSkillItem() {
        var _this = _super.call(this) || this;
        TimerManager.ins().doNext(function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x00ff00);
            shape.graphics.drawRoundRect(0, 0, _this.width, _this.height, 1, 1);
            shape.graphics.endFill();
            shape.alpha = 0;
            _this.addChild(shape);
        }, _this);
        return _this;
    }
    FireRingSkillItem.prototype.dataChanged = function () {
        var _this = this;
        var data = this.data;
        if (data.isOpen) {
            if (data.skillId) {
                this.currentState = "learn";
                var cfg = SpecialRing.ins().getActorExRingBookConfig(data.skillId, data.skillLvl);
                this.skillImg.source = cfg.skillIcon;
                this.skillLv.text = "Lv" + data.skillLvl;
                this.skillName.text = cfg.skillName;
                var num = UserBag.ins().getBagGoodsCountById(0, cfg.itemId);
                this.redpoint.visible = (num >= cfg.num && data.skillLvl < SpecialRing.ins().getSkillMaxLvl(data.skillId));
            }
            else {
                this.currentState = "unlearn";
                this.redpoint.visible = SpecialRing.ins().isCanStudySkill();
            }
        }
        else {
            this.currentState = "lock";
            var lvl = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID).level;
            var stage = SpecialRing.ins().getRingStair(lvl);
            if (stage < SpecialRing.GRID_OPEN_LEVEL) {
                TimerManager.ins().doNext(function () { _this.skillName.text = SpecialRing.GRID_OPEN_LEVEL + "\u9636\u89E3\u9501"; }, this);
                this.price.visible = false;
            }
            else {
                this.price.visible = true;
                TimerManager.ins().doNext(function () { _this.skillName.text = "未解锁"; }, this);
                var data_1 = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID];
                this.price.setPrice(data_1.skillGridYb);
            }
        }
        this.select.visible = this.selected;
    };
    FireRingSkillItem.prototype.setSelect = function (isSelect) {
        this.select.visible = isSelect;
    };
    return FireRingSkillItem;
}(ItemRenderer));
__reflect(FireRingSkillItem.prototype, "FireRingSkillItem");
//# sourceMappingURL=FireRingSkillItem.js.map