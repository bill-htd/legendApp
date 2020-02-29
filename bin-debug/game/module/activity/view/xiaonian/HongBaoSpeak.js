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
var HongBaoSpeak = (function (_super) {
    __extends(HongBaoSpeak, _super);
    function HongBaoSpeak() {
        var _this = _super.call(this) || this;
        _this.skinName = "hongbaoSpeakSkin";
        return _this;
    }
    HongBaoSpeak.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    HongBaoSpeak.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    HongBaoSpeak.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.sendBtn, this.onClick);
        this.actId = param[0];
        this.index = param[1];
        var config = GlobalConfig.ActivityType12Config[this.actId][this.index];
        this.input.text = "";
        this.input.prompt = config.blessWord + "（点击输入）";
        this.input.maxChars = config.wordCount;
    };
    HongBaoSpeak.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    HongBaoSpeak.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sendBtn:
                ViewManager.ins().close(this);
                var activityData = Activity.ins().getActivityDataById(this.actId);
                if (!activityData.isOpenActivity()) {
                    UserTips.ins().showTips("\u6D3B\u52A8\u5DF2\u7ED3\u675F");
                    return;
                }
                Activity.ins().sendReward(this.actId, this.index, EnvelopeType.SEND, this.input.text);
                ViewManager.ins().close(XiaoNianWin);
                break;
        }
    };
    return HongBaoSpeak;
}(BaseEuiView));
__reflect(HongBaoSpeak.prototype, "HongBaoSpeak");
ViewManager.ins().reg(HongBaoSpeak, LayerManager.UI_Popup);
//# sourceMappingURL=HongBaoSpeak.js.map