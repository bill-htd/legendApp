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
var RuneExchangePanel = (function (_super) {
    __extends(RuneExchangePanel, _super);
    function RuneExchangePanel() {
        var _this = _super.call(this) || this;
        _this._scrollV = 0;
        _this.skinName = "RuneSkinExchange";
        _this.menulist0.itemRenderer = RuneExchangeItemRenderer;
        return _this;
    }
    RuneExchangePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(GameLogic.ins().postRuneExchange, this.updateList);
        this.addTouchEvent(this.menulist0, this.onListTap);
        this.updateList();
    };
    RuneExchangePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        for (var i = 0; i < this.menulist0.numElements; i++) {
            var render = this.menulist0.getVirtualElementAt(i);
            render.close();
        }
    };
    RuneExchangePanel.prototype.updateList = function () {
        var data = RuneConfigMgr.ins().getExchangeDataList();
        this.menulist0.dataProvider = new eui.ArrayCollection(data);
        var scro = this.menulist0.parent;
        scro.validateNow();
        scro.stopAnimation();
        this.menulist0.scrollV = this._scrollV;
    };
    RuneExchangePanel.prototype.onListTap = function (e) {
        if (e.target.name != "goBtn") {
            return;
        }
        var cfg = this.menulist0.selectedItem;
        if (!cfg || (cfg && cfg.conversion > Actor.runeExchange)) {
            UserWarn.ins().setBuyGoodsWarn(500008, cfg.conversion - Actor.runeExchange);
            UserTips.ins().showTips("\u9053\u5177\u4E0D\u8DB3");
            return;
        }
        if (SkyLevelModel.ins().lastPass || SkyLevelModel.ins().cruLevel >= cfg.checkpoint) {
        }
        else {
            UserTips.ins().showTips("\u901A\u5173\u7B49\u7EA7\u4E0D\u8DB3");
            return;
        }
        Rune.ins().sendExchangeRune(cfg.id);
        this._scrollV = this.menulist0.scrollV;
    };
    return RuneExchangePanel;
}(BaseView));
__reflect(RuneExchangePanel.prototype, "RuneExchangePanel");
//# sourceMappingURL=RuneExchangePanel.js.map