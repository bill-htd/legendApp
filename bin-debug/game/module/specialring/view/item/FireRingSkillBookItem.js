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
var FireRingSkillBookItem = (function (_super) {
    __extends(FireRingSkillBookItem, _super);
    function FireRingSkillBookItem() {
        var _this = _super.call(this) || this;
        _this.isOpenSelectImg = true;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    FireRingSkillBookItem.prototype.init = function () {
    };
    FireRingSkillBookItem.prototype.dataChangeHandler = function () {
        var count = this.data.count;
        if (count > 0) {
            this.itemIcon.imgIcon.filters = null;
            this.itemIcon.imgBg.filters = null;
        }
        else {
            this.itemIcon.imgIcon.filters = FilterUtil.ARRAY_GRAY_FILTER;
            this.itemIcon.imgBg.filters = FilterUtil.ARRAY_GRAY_FILTER;
        }
    };
    FireRingSkillBookItem.prototype.onRemove = function () {
        if (this.itemIcon) {
            this.itemIcon.imgIcon.filters = null;
            this.itemIcon.imgBg.filters = null;
        }
    };
    return FireRingSkillBookItem;
}(ItemBase));
__reflect(FireRingSkillBookItem.prototype, "FireRingSkillBookItem");
//# sourceMappingURL=FireRingSkillBookItem.js.map