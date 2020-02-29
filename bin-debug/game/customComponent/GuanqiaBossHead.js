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
var GuanqiaBossHead = (function (_super) {
    __extends(GuanqiaBossHead, _super);
    function GuanqiaBossHead() {
        return _super.call(this) || this;
    }
    GuanqiaBossHead.prototype.childrenCreated = function () {
        this.init();
    };
    GuanqiaBossHead.prototype.init = function () {
        this._isSelect = false;
        this._isFrameBig = false;
        this.imgSelect.visible = false;
        this.imgFrameBig.visible = false;
        this.imgFrameLittle.visible = true;
    };
    GuanqiaBossHead.prototype.setHeadSource = function (str) {
        this.imgHead.source = str;
    };
    GuanqiaBossHead.prototype.setGray = function (value) {
        var colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        this.imgHead.filters = value ? [new egret.ColorMatrixFilter(colorMatrix)] : [];
    };
    GuanqiaBossHead.prototype.setFrameBig = function (value) {
        if (value == this._isFrameBig)
            return;
        this._isFrameBig = value;
        this.imgFrameBig.visible = value;
        this.imgFrameLittle.visible = !value;
    };
    GuanqiaBossHead.prototype.getFrameBig = function () {
        return this._isFrameBig;
    };
    GuanqiaBossHead.prototype.setSelect = function (value) {
        if (value == this._isSelect)
            return;
        this.imgSelect.visible = value;
        this._isSelect = value;
    };
    GuanqiaBossHead.prototype.getSelect = function () {
        return this._isSelect;
    };
    return GuanqiaBossHead;
}(BaseComponent));
__reflect(GuanqiaBossHead.prototype, "GuanqiaBossHead");
//# sourceMappingURL=GuanqiaBossHead.js.map