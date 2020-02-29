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
var MineRecordWin = (function (_super) {
    __extends(MineRecordWin, _super);
    function MineRecordWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "PlunderRecordSkin";
        return _this;
    }
    MineRecordWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.record.itemRenderer = MineRecordRender;
    };
    MineRecordWin.prototype.open = function () {
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(Mine.ins().postMineRecord, this.update);
        Mine.ins().sendGetRecord();
        this.update();
    };
    MineRecordWin.prototype.update = function () {
        this.record.dataProvider = new eui.ArrayCollection(Mine.ins().mineRecords);
    };
    MineRecordWin.prototype.onTap = function () {
        ViewManager.ins().close(this);
    };
    return MineRecordWin;
}(BaseEuiView));
__reflect(MineRecordWin.prototype, "MineRecordWin");
ViewManager.ins().reg(MineRecordWin, LayerManager.UI_Popup);
//# sourceMappingURL=MineRecordWin.js.map