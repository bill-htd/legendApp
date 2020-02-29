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
var FlowerRewardItemRender = (function (_super) {
    __extends(FlowerRewardItemRender, _super);
    function FlowerRewardItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "flowerRewardItem";
        return _this;
    }
    FlowerRewardItemRender.prototype.dataChanged = function () {
        this.playerName.text = this.data.roleName;
        this.flowerCount.textFlow = TextFlowMaker.generateTextFlow("\u88AB\u4F60\u7684\u9B45\u529B\u6298\u670D\uFF0C\u9001\u4E0A\u4E86|C:" + 0x00FF00 + "&T:\u3010" + this.data.count + "\u3011|\u6735\u6CE3\u8840\u795E\u82B1");
    };
    return FlowerRewardItemRender;
}(BaseItemRender));
__reflect(FlowerRewardItemRender.prototype, "FlowerRewardItemRender");
//# sourceMappingURL=FlowerRewardItemRender.js.map