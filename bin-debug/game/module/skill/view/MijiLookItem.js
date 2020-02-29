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
var MijiLookItem = (function (_super) {
    __extends(MijiLookItem, _super);
    function MijiLookItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MijiOverViewItemSkin";
        return _this;
    }
    MijiLookItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        if (typeof this.data == "string") {
            this.currentState = "title";
            if (this.data == "middle") {
                this.name1.text = "中级秘籍";
            }
            else {
                this.name1.text = "高级秘籍";
            }
        }
        else if (typeof this.data == "object" && this.data.length) {
            this.currentState = "miji";
            var len = 5;
            for (var i = 0; i < len; i++) {
                var config = this.data[i];
                if (this["item" + i] && config) {
                    this["item" + i].visible = true;
                    this["item" + i].data = config.id;
                    var itemcfg = GlobalConfig.ItemConfig[config.item];
                    this.name1.text = itemcfg.name;
                }
                else {
                    this["item" + i].visible = false;
                }
            }
        }
    };
    return MijiLookItem;
}(BaseItemRender));
__reflect(MijiLookItem.prototype, "MijiLookItem");
//# sourceMappingURL=MijiLookItem.js.map