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
var FuncNoticeWin = (function (_super) {
    __extends(FuncNoticeWin, _super);
    function FuncNoticeWin() {
        return _super.call(this) || this;
    }
    FuncNoticeWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "FuncNoticeSkin";
    };
    FuncNoticeWin.prototype.showWin = function (lv) {
        this.curConfig = FuncNoticeWin.getFuncNoticeConfigById(lv);
        var openLv = this.curConfig.openLv;
        (lv == openLv) ? this.sureBtn.icon = "yg_002" : this.sureBtn.icon = "yg_001";
        this.bodyImg.source = "yg_" + this.curConfig.index + "_png";
        this.txt.textFlow = TextFlowMaker.generateTextFlow("|C:0x35e62d&T:" + openLv + "|关开启");
        this.addTouchEvent(this.sureBtn, this.onTouch);
    };
    FuncNoticeWin.prototype.onTouch = function (e) {
        var btn = e.target;
        if (btn.icon == "yg_002") {
            var winName = this.curConfig.openPanel[0].toString();
            var page = this.curConfig.openPanel[1];
            GameGuider.guidance(winName, page);
        }
        this.removeTouchEvent(this.sureBtn, this.onTouch);
        ViewManager.ins().close(this);
    };
    FuncNoticeWin.getFuncNoticeConfigById = function (id) {
        var config = GlobalConfig.FuncNoticeConfig;
        for (var i in config) {
            if (config[i].openLv >= id) {
                return config[i];
            }
        }
        return null;
    };
    return FuncNoticeWin;
}(BaseEuiView));
__reflect(FuncNoticeWin.prototype, "FuncNoticeWin");
ViewManager.ins().reg(FuncNoticeWin, LayerManager.UI_Tips);
//# sourceMappingURL=FuncNoticeWin.js.map