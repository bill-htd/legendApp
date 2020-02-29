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
var PaoPaoView = (function (_super) {
    __extends(PaoPaoView, _super);
    function PaoPaoView() {
        var _this = _super.call(this) || this;
        _this.jobText = [0xf66006, 0xf66006, 0x2cc2f8, 0xe24ef9];
        _this.skinName = "paopaoSkin";
        return _this;
    }
    PaoPaoView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.x = -this.width / 2;
        this.visible = false;
    };
    PaoPaoView.prototype.setSpeak = function (id, job) {
        if (job === void 0) { job = 1; }
        TimerManager.ins().removeAll(this);
        this.start();
        this.nameTxt.textColor = this.jobText[job];
        var bubble = BubbleFactory.ins().playBubbleEffect(id);
        if (!bubble)
            return;
        this.nameTxt.text = bubble;
        this.nameTxt.x = -this.nameTxt.textWidth >> 1;
        this.visible = true;
    };
    PaoPaoView.prototype.start = function () {
        TimerManager.ins().doTimer(1000, 1, this.destruct, this);
    };
    PaoPaoView.prototype.destruct = function () {
        if (this.parent) {
            this.visible = false;
        }
    };
    return PaoPaoView;
}(BaseView));
__reflect(PaoPaoView.prototype, "PaoPaoView");
//# sourceMappingURL=PaoPaoView.js.map