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
var ZaoYuRecordWin = (function (_super) {
    __extends(ZaoYuRecordWin, _super);
    function ZaoYuRecordWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZaoYuRecordSkin";
        _this.list.itemRenderer = ZaoYuRecordItem;
        return _this;
    }
    ZaoYuRecordWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.observe(Encounter.ins().postZaoYuRecord, this.updateData);
        Encounter.ins().sendInquireRecord();
    };
    ZaoYuRecordWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeObserve();
    };
    ZaoYuRecordWin.prototype.updateData = function (arr) {
        if (!arr)
            return;
        function sort(a, b) {
            if (a[0] < b[0])
                return 1;
            else if (a[0] > b[0])
                return -1;
            else
                return 0;
        }
        arr.sort(sort);
        this.list.dataProvider = new eui.ArrayCollection(arr);
    };
    ZaoYuRecordWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ZaoYuRecordWin;
}(BaseEuiView));
__reflect(ZaoYuRecordWin.prototype, "ZaoYuRecordWin");
ViewManager.ins().reg(ZaoYuRecordWin, LayerManager.UI_Main);
//# sourceMappingURL=ZaoYuRecordWin.js.map