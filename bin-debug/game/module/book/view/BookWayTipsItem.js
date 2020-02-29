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
var BookWayTipsItem = (function (_super) {
    __extends(BookWayTipsItem, _super);
    function BookWayTipsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "TuJianSuitItem";
        _this.init();
        return _this;
    }
    BookWayTipsItem.prototype.init = function () {
    };
    BookWayTipsItem.prototype.destruct = function () {
    };
    BookWayTipsItem.prototype.dataChanged = function () {
        var cfg = this.data.config;
        this.jieduan.text = cfg.level + "阶";
        this.num.text = cfg.count + "";
        this.suitNum.text = this.data.curNum + "/" + cfg.count;
        for (var i = 0; i < cfg.attrs.length; i++) {
            var attrname = AttributeData.getAttrStrByType(cfg.attrs[i].type);
            this["value" + i].text = attrname + "+" + cfg.attrs[i].value;
            if (this.data.curNum >= cfg.count)
                this["value" + i].textColor = 0x20CB30;
        }
        if (this.data.curNum >= cfg.count)
            this.suitNum.textColor = 0x20CB30;
    };
    return BookWayTipsItem;
}(BaseItemRender));
__reflect(BookWayTipsItem.prototype, "BookWayTipsItem");
//# sourceMappingURL=BookWayTipsItem.js.map