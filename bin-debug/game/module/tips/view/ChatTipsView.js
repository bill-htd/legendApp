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
var ChatTipsView = (function (_super) {
    __extends(ChatTipsView, _super);
    function ChatTipsView() {
        var _this = _super.call(this) || this;
        _this.showOver = false;
        _this.skinName = "ChatMessage";
        return _this;
    }
    ChatTipsView.prototype.setData = function (msg) {
        this.lab.textFlow = TextFlowMaker.generateTextFlow(msg.str);
        this.setshowTime();
    };
    ChatTipsView.prototype.setshowTime = function () {
        if (!this.showOver) {
            TimerManager.ins().remove(this.showOverInfo, this);
        }
        TimerManager.ins().doTimer(5000, 1, this.showOverInfo, this);
    };
    ChatTipsView.prototype.showOverInfo = function () {
        this.showOver = true;
        DisplayUtils.removeFromParent(this);
    };
    return ChatTipsView;
}(eui.Component));
__reflect(ChatTipsView.prototype, "ChatTipsView");
//# sourceMappingURL=ChatTipsView.js.map