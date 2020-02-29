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
var BookUpItem = (function (_super) {
    __extends(BookUpItem, _super);
    function BookUpItem() {
        var _this = _super.call(this) || this;
        _this.touchChildren = false;
        return _this;
    }
    BookUpItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.mc = new MovieClip;
        this.mc.x = 45;
        this.mc.y = 40;
    };
    BookUpItem.prototype.dataChanged = function () {
        this.clear();
        if (this.data instanceof ItemData) {
            this.itemConfig = this.data.itemConfig;
            this.itemIcon.setData(this.itemConfig);
            if (this.itemConfig == null)
                return;
            var type = ItemConfig.getType(this.itemConfig);
            var job = ItemConfig.getJob(this.itemConfig);
            if (type == 4) {
                this.nameTxt.text = this.itemConfig.name;
            }
            else {
            }
            this.itemIcon.imgJob.source = (type == 0 || type == 4) && job && this.itemIcon.imgJob.visible ? "job" + job + "Item" : '';
        }
    };
    BookUpItem.prototype.onClick = function () {
    };
    BookUpItem.prototype.playEff = function () {
        if (this.data) {
            this.mc.playFile(RES_DIR_EFF + "litboom", 1);
            this.addChild(this.mc);
        }
    };
    BookUpItem.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.itemIcon.imgJob.source = null;
    };
    return BookUpItem;
}(ItemBase));
__reflect(BookUpItem.prototype, "BookUpItem");
//# sourceMappingURL=BookUpItem.js.map