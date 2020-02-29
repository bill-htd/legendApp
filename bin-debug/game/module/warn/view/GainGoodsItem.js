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
var GainGoodsItem = (function (_super) {
    __extends(GainGoodsItem, _super);
    function GainGoodsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "GainGoodsItemSkin";
        _this.graycolor = 0x6E756E;
        return _this;
    }
    GainGoodsItem.prototype.dataChanged = function () {
        this.greencolor = this.desc.textColor;
        this.norcolor = this.desc2.textColor;
        this.desc.text = this.data[0];
    };
    GainGoodsItem.prototype.gainData = function (isOpen, stars, condition) {
        this.stars.visible = true;
        if (!isOpen) {
            this.desc.textColor = this.graycolor;
            this.desc2.textColor = this.graycolor;
            if (condition) {
                var str = "";
                if (condition.needZs)
                    str += condition.needZs + "\u8F6C\u751F\u5F00\u542F";
                if (condition.needLv)
                    str += condition.needLv + "\u7EA7\u5F00\u542F";
                if (condition.guanka)
                    str += condition.guanka + "\u5173\u5361\u5F00\u542F";
                this.desc2.text = str;
            }
            this.dir.visible = false;
            for (var i = 1; i <= 5; i++) {
                this["star" + i].visible = false;
            }
        }
        else {
            for (var i = 1; i <= 5; i++) {
                this["star" + i].visible = (i <= stars);
            }
        }
    };
    Object.defineProperty(GainGoodsItem.prototype, "userData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    return GainGoodsItem;
}(BaseItemRender));
__reflect(GainGoodsItem.prototype, "GainGoodsItem");
//# sourceMappingURL=GainGoodsItem.js.map