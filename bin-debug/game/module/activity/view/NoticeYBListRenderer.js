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
var NoticeYBListRenderer = (function (_super) {
    __extends(NoticeYBListRenderer, _super);
    function NoticeYBListRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "HuntListRendererSkin";
        return _this;
    }
    NoticeYBListRenderer.prototype.dataChanged = function () {
        var name = this.data.name;
        this.activityID = this.data.activityID;
        var multiple = this.data.multiple;
        var yb = this.data.yb;
        var str = "";
        var nstr = "";
        var cstr = ColorUtil.NORMAL_COLOR;
        var type = 5;
        nstr = RewardData.getCurrencyName(2);
        cstr = 0xff0000;
        str = "<font color = '#16b2ff'>" + name + "</font> 在元宝转盘中抽中了 <font color='" + cstr + "'>" + multiple + "</font>倍，获得<font color='" + cstr + "'>" + ("" + yb) + "</font>元宝";
        this.showText.textFlow = TextFlowMaker.generateTextFlow(str);
    };
    return NoticeYBListRenderer;
}(BaseItemRender));
__reflect(NoticeYBListRenderer.prototype, "NoticeYBListRenderer");
//# sourceMappingURL=NoticeYBListRenderer.js.map