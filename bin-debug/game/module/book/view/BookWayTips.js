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
var BookWayTips = (function (_super) {
    __extends(BookWayTips, _super);
    function BookWayTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "TuJianSuitTips";
        return _this;
    }
    BookWayTips.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.suitlist.itemRenderer = BookWayTipsItem;
    };
    BookWayTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.bgClose, this.otherClose);
        this.suitId = param[0];
        this.updateData();
    };
    BookWayTips.prototype.updateData = function () {
        this.nameLabel.text = Book.ins().getTitleById(this.suitId) + "套装加成";
        var config = GlobalConfig.SuitConfig[this.suitId];
        var datalist = [];
        var curNum = Book.ins().getSuitNum(this.suitId);
        for (var i in config) {
            var cfg = config[i];
            var data = { config: cfg, curNum: curNum };
            datalist.push(data);
        }
        this.suitlist.dataProvider = new eui.ArrayCollection(datalist);
    };
    BookWayTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.otherClose);
    };
    BookWayTips.prototype.otherClose = function (evt) {
        ViewManager.ins().close(BookWayTips);
    };
    return BookWayTips;
}(BaseEuiView));
__reflect(BookWayTips.prototype, "BookWayTips");
ViewManager.ins().reg(BookWayTips, LayerManager.UI_Popup);
//# sourceMappingURL=BookWayTips.js.map