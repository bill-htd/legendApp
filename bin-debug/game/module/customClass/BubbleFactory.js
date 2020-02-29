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
var BubbleFactory = (function (_super) {
    __extends(BubbleFactory, _super);
    function BubbleFactory() {
        return _super.call(this) || this;
    }
    BubbleFactory.prototype.playBubbleEffect = function (id) {
        var bubble = "";
        var config = GlobalConfig.BubbleConfig[id];
        if (config) {
            switch (config.type) {
                case BubbleType.B1:
                    bubble = config.news;
                    break;
                case BubbleType.B2:
                    if (config.news)
                        UserSkill.ins().postShowSkillWord(config.news);
                    break;
            }
        }
        return bubble;
    };
    return BubbleFactory;
}(BaseClass));
__reflect(BubbleFactory.prototype, "BubbleFactory");
var BubbleType;
(function (BubbleType) {
    BubbleType[BubbleType["B1"] = 1] = "B1";
    BubbleType[BubbleType["B2"] = 2] = "B2";
})(BubbleType || (BubbleType = {}));
//# sourceMappingURL=BubbleFactory.js.map