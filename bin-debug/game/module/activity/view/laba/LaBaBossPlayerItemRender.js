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
var LaBaBossPlayerItemRender = (function (_super) {
    __extends(LaBaBossPlayerItemRender, _super);
    function LaBaBossPlayerItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "LaBaBossPlayerRankSkin";
        return _this;
    }
    LaBaBossPlayerItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    LaBaBossPlayerItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        this.rank.text = this.data.rank + "";
        this.rank.visible = this.data.rank ? true : false;
        this.name1.text = this.data.name;
        CommonUtils.labelIsOverLenght(this.hurt, this.data.damage);
    };
    LaBaBossPlayerItemRender.prototype.destruct = function () {
    };
    return LaBaBossPlayerItemRender;
}(BaseItemRender));
__reflect(LaBaBossPlayerItemRender.prototype, "LaBaBossPlayerItemRender");
//# sourceMappingURL=LaBaBossPlayerItemRender.js.map