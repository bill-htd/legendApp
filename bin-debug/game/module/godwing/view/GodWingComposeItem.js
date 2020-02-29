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
var GodWingComposeItem = (function (_super) {
    __extends(GodWingComposeItem, _super);
    function GodWingComposeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ShenYuComposeItem';
        return _this;
    }
    GodWingComposeItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    GodWingComposeItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var suitConfig = this.data.suitConfig;
        var slot = this.data.slot;
        var gl = GlobalConfig.GodWingLevelConfig[suitConfig.lv][slot];
        var config = GlobalConfig.ItemConfig[gl.itemId];
        this.nameTxt.text = config.name;
    };
    GodWingComposeItem.prototype.setRedPoint = function (b) {
        this.redPoint.visible = b;
    };
    GodWingComposeItem.prototype.destruct = function () {
    };
    return GodWingComposeItem;
}(BaseItemRender));
__reflect(GodWingComposeItem.prototype, "GodWingComposeItem");
//# sourceMappingURL=GodWingComposeItem.js.map