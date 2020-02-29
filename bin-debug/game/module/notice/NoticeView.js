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
var NoticeView = (function (_super) {
    __extends(NoticeView, _super);
    function NoticeView() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.startX = 0;
        _this.endX = 0;
        return _this;
    }
    NoticeView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.frame = new eui.Image;
        this.frame.source = "zjmgonggaobg";
        this.frame.width = 480;
        this.frame.height = 28;
        this.frame.y = 240;
        this.frame.x = (StageUtils.ins().getWidth() / 2) - this.frame.width / 2;
        this.addChild(this.frame);
        this.frame.visible = false;
        this.touchChildren = false;
        this.touchEnabled = false;
        this.startX = this.frame.x + this.frame.width;
        this.endX = this.frame.x;
    };
    NoticeView.prototype.showNotice = function (str) {
        this.frame.visible = true;
        var lab = new eui.Label;
        lab.size = 20;
        lab.textColor = 0xfee900;
        lab.stroke = 1;
        lab.strokeColor = 0x000000;
        lab.x = this.startX;
        lab.y = this.frame.y + 4;
        lab.textFlow = TextFlowMaker.generateTextFlow(str);
        this.addChild(lab);
        this.list.push(lab);
        lab.visible = false;
        if (this.list.length == 1)
            this.tweenLab();
    };
    NoticeView.prototype.tweenLab = function () {
        var _this = this;
        var lab = this.list[0];
        var tweenX = this.endX - lab.width;
        var t = egret.Tween.get(lab);
        lab.visible = true;
        t.to({ "x": tweenX }, lab.width * 20).call(function () {
            _this.removeChild(lab);
            _this.list.shift();
            if (_this.list.length < 1)
                _this.frame.visible = false;
            else
                _this.tweenLab();
        }, this);
    };
    return NoticeView;
}(BaseEuiView));
__reflect(NoticeView.prototype, "NoticeView");
ViewManager.ins().reg(NoticeView, LayerManager.UI_Tips);
//# sourceMappingURL=NoticeView.js.map