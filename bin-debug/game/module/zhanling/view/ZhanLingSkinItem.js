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
var ZhanLingSkinItem = (function (_super) {
    __extends(ZhanLingSkinItem, _super);
    function ZhanLingSkinItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ZhanlingZBItemSkin';
        return _this;
    }
    ZhanLingSkinItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    ZhanLingSkinItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var id = this.data.id;
        var config = GlobalConfig.ZhanLingBase[id];
        if (!config)
            return;
        var level = ZhanLingModel.ins().getZhanLingDataByLevel(id);
        this.icon.source = config.icon;
        this.state.visible = ZhanLingModel.ins().getZhanLingDataById(id) ? false : true;
        this.select.visible = false;
        this.label.text = level + "";
        this.label.visible = !this.state.visible;
        var b = ZhanLingModel.ins().isUpGradeByStar(id) || ZhanLingModel.ins().isHintNum(id);
        if (!b) {
            b = ZhanLingModel.ins().isUpGradeByTalent(id);
        }
        this.redPoint.visible = b;
    };
    ZhanLingSkinItem.prototype.destruct = function () {
    };
    ZhanLingSkinItem.prototype.setSelect = function (v) {
        this.select.visible = v;
    };
    return ZhanLingSkinItem;
}(BaseItemRender));
__reflect(ZhanLingSkinItem.prototype, "ZhanLingSkinItem");
//# sourceMappingURL=ZhanLingSkinItem.js.map