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
var DressItemRenderer = (function (_super) {
    __extends(DressItemRenderer, _super);
    function DressItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "DressItemSkin";
        return _this;
    }
    DressItemRenderer.prototype.dataChanged = function () {
        var config = this.data;
        if (config == null)
            return;
        this.redPoint0.visible = false;
        var id = config.zhuanban.cost["itemId"];
        if (config.lv) {
            this.timelabel.visible = true;
            this.imgIcon.source = id + "_png";
        }
        else {
            this.timelabel.visible = false;
            this.imgIcon.source = id + "_png";
        }
        this.redPoint0.visible = Dress.ins().redPointDress(config.zhuanban.id);
        this.imageName.text = config.zhuanban.name;
        if (config.isDress)
            this.huanhuaImage.visible = true;
        else
            this.huanhuaImage.visible = false;
        if (config.timer == 0)
            this.timelabel.textFlow = new egret.HtmlTextParser().parser(StringUtils.addColor("永久", 0x35e62d));
        else if (config.timer > 0)
            this.timelabel.text = this.updateTimer(config.timer);
        else
            this.timelabel.visible = false;
        if (config.lv > 1) {
            this.levellabel.text = config.lv + "\u7EA7";
        }
        else {
            this.levellabel.text = "1\u7EA7";
        }
    };
    DressItemRenderer.prototype.updateTimer = function (timer) {
        var str = "";
        var endTimer = (DateUtils.formatMiniDateTime(timer) - GameServer.serverTime) / 1000;
        if (endTimer >= 0)
            str = DateUtils.getFormatBySecond(endTimer, 5, 2);
        return str;
    };
    Object.defineProperty(DressItemRenderer.prototype, "selected", {
        set: function (value) {
            this.selectImage.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return DressItemRenderer;
}(eui.ItemRenderer));
__reflect(DressItemRenderer.prototype, "DressItemRenderer");
//# sourceMappingURL=DressItemRenderer.js.map