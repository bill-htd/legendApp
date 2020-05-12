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
var payItemRenderer = (function (_super) {
    __extends(payItemRenderer, _super);
    function payItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "payItem";
        _this.zfbBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            payDate.ins().payType = this.data.type;
            payDate.ins()._url = this.data.url;
        }, _this);
        _this.dqBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            payDate.ins().payType = this.data.type;
            payDate.ins()._url = this.data.url;
        }, _this);
        _this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            payDate.ins().payType = this.data.type;
            payDate.ins()._url = this.data.url;
        }, _this);
        return _this;
    }
    payItemRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.closeAll();
        switch (this.data.type) {
            case '1':
                this.zfb.visible = true;
                break;
            case '2':
                this.wx.visible = true;
                break;
            case '3':
                this.dq.visible = true;
                break;
        }
    };
    payItemRenderer.prototype.closeAll = function () {
        this.zfb.visible = false;
        this.dq.visible = false;
        this.wx.visible = false;
    };
    return payItemRenderer;
}(BaseItemRender));
__reflect(payItemRenderer.prototype, "payItemRenderer");
//# sourceMappingURL=payItemRenderer.js.map