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
var SceneTipsItem = (function (_super) {
    __extends(SceneTipsItem, _super);
    function SceneTipsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SceneTipsItem.prototype, "labelText", {
        set: function (value) {
            var _this = this;
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.lab.width;
            this.bg.visible = false;
            this.lab.alpha = 1;
            this.bg.y = 0;
            this.lab.verticalCenter = -1;
            TimerManager.ins().doTimer(500, 1, function () {
                DisplayUtils.removeFromParent(_this);
            }, this);
        },
        enumerable: true,
        configurable: true
    });
    return SceneTipsItem;
}(TipsItem));
__reflect(SceneTipsItem.prototype, "SceneTipsItem");
//# sourceMappingURL=SceneTipsItem.js.map