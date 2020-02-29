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
var PunchExchangeBtn = (function (_super) {
    __extends(PunchExchangeBtn, _super);
    function PunchExchangeBtn() {
        var _this = _super.call(this) || this;
        _this.skinName = 'PunchExchangeBtnSkin';
        return _this;
    }
    PunchExchangeBtn.prototype.dataChanged = function () {
        this.btnText.text = this.data.config.name;
        this.redPoint.visible = UserSkill.ins().getPunchExchangePageRedPoint(this.data.index);
    };
    PunchExchangeBtn.prototype.setBtnStatu = function () {
    };
    return PunchExchangeBtn;
}(eui.ItemRenderer));
__reflect(PunchExchangeBtn.prototype, "PunchExchangeBtn");
//# sourceMappingURL=PunchExchangeBtn.js.map