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
var HuntListRenderer = (function (_super) {
    __extends(HuntListRenderer, _super);
    function HuntListRenderer() {
        var _this = _super.call(this) || this;
        _this.job = ["", "战士", "法师", "道士"];
        _this.skinName = "HuntListRendererSkin";
        return _this;
    }
    HuntListRenderer.prototype.dataChanged = function () {
        var arr = this.data;
        var item = GlobalConfig.ItemConfig[arr[1]];
        if (item == null)
            return;
        var str;
        var cstr = ItemConfig.getQualityColor(item);
        var type = ItemConfig.getType(item);
        if (type == 0) {
            str = "<font color = '#12b2ff'>" + arr[0] + "</font> 获得 <font color='" + cstr + "'>" + this.makeNameList(item) + "</font>";
        }
        else {
            str = "<font color = '#12b2ff'>" + arr[0] + "</font> 获得 <font color='" + cstr + "'>" + item.name + "</font>";
        }
        this.showText.textFlow = TextFlowMaker.generateTextFlow(str);
    };
    HuntListRenderer.prototype.makeNameList = function (item) {
        var name = '';
        name = item.name;
        if (item.zsLevel > 0) {
            name += "(" + item.zsLevel + "转 ";
        }
        else {
            name += "(" + item.level + "级 ";
        }
        name += this.job[ItemConfig.getJob(item)] + ")";
        return name;
    };
    HuntListRenderer.QUALITY_COLOR = ["#e2dfd4", "#35e62d", "#d242fb", "#ff750f", "#f3311e", "#ffd93f"];
    return HuntListRenderer;
}(BaseItemRender));
__reflect(HuntListRenderer.prototype, "HuntListRenderer");
//# sourceMappingURL=HuntListRenderer.js.map