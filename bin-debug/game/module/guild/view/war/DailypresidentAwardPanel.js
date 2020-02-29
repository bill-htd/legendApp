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
var DailypresidentAwardPanel = (function (_super) {
    __extends(DailypresidentAwardPanel, _super);
    function DailypresidentAwardPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DailypresidentAwardPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "DailypresidentAwardSkin";
        this.list.itemRenderer = ItemBase;
        this.dataArr = new eui.ArrayCollection();
    };
    DailypresidentAwardPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        var data1 = GlobalConfig.GuildBattleConst.occupationAward;
        this.dataArr.source = data1;
        this.list.dataProvider = this.dataArr;
    };
    DailypresidentAwardPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onTap);
    };
    DailypresidentAwardPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return DailypresidentAwardPanel;
}(BaseEuiView));
__reflect(DailypresidentAwardPanel.prototype, "DailypresidentAwardPanel");
ViewManager.ins().reg(DailypresidentAwardPanel, LayerManager.UI_Main);
//# sourceMappingURL=DailypresidentAwardPanel.js.map