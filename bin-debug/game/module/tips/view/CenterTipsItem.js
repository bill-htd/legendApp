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
var CenterTipsItem = (function (_super) {
    __extends(CenterTipsItem, _super);
    function CenterTipsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CenterTipsItem.prototype, "labelText", {
        set: function (value) {
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.lab.width + 40;
            this.bg.source = "zjmqipao";
            this.bg.visible = true;
            this.lab.alpha = 1;
            this.bg.y = 0;
            this.lab.horizontalCenter = 0;
            this.lab.verticalCenter = 0;
            if (!this.addToEvent) {
                this.addToEvent = true;
                TimerManager.ins().doTimer(5000, 1, this.removeFromParent, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CenterTipsItem.prototype, "labelText2", {
        set: function (value) {
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.lab.width + 40;
            this.bg.source = "zjmqipao";
            this.bg.visible = true;
            this.lab.alpha = 1;
            this.bg.y = 0;
            this.lab.horizontalCenter = 0;
            this.lab.verticalCenter = 0;
            if (!this.addToEvent) {
                this.addToEvent = true;
                TimerManager.ins().doTimer(1000, 1, this.removeFromParent, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CenterTipsItem.prototype, "labelText3", {
        set: function (value) {
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.lab.width + 40;
            this.bg.source = "zjmqipao";
            this.bg.visible = true;
            this.lab.alpha = 1;
            this.bg.y = 0;
            this.lab.horizontalCenter = 0;
            this.lab.verticalCenter = 0;
            if (!this.addToEvent) {
                this.addToEvent = true;
                TimerManager.ins().doTimer(3000, 1, this.removeFromParent, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    return CenterTipsItem;
}(TipsItem));
__reflect(CenterTipsItem.prototype, "CenterTipsItem");
//# sourceMappingURL=CenterTipsItem.js.map