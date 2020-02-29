var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BubbleConfig = (function () {
    function BubbleConfig() {
        this.bubbleid = 0;
        this.news = "";
        this.type = 0;
    }
    return BubbleConfig;
}());
__reflect(BubbleConfig.prototype, "BubbleConfig");
//# sourceMappingURL=BubbleConfig.js.map