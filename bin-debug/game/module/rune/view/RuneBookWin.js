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
var RuneBookWin = (function (_super) {
    __extends(RuneBookWin, _super);
    function RuneBookWin() {
        var _this = _super.call(this) || this;
        _this.dataCollection = null;
        _this.skinName = "RuneOverViewSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RuneBookWin.prototype.initUI = function () {
        this.nuneList.itemRenderer = RuneBookItemRenderer;
        _super.prototype.initUI.call(this);
    };
    RuneBookWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.nuneList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);
        this.showList();
    };
    RuneBookWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.cleanList();
        this.nuneList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);
    };
    RuneBookWin.prototype.onTap = function (e) {
        if (e && e.currentTarget) {
            switch (e.currentTarget) {
                case this.closeBtn:
                case this.closeBtn0:
                    ViewManager.ins().close(RuneBookWin);
                    break;
            }
        }
    };
    RuneBookWin.prototype.onListTap = function (e) {
        var rbc = e.item;
        if (rbc && rbc.data) {
            var target = e.item;
            var depth = 6;
            while (depth > 0 && target) {
                if (target.getItemConfig) {
                    var itemConfig = target.getItemConfig();
                    ViewManager.ins().open(RuneBookItemTipsWin, rbc.data, itemConfig);
                    break;
                }
                target = target.parent;
                depth -= 1;
            }
        }
    };
    RuneBookWin.prototype.showList = function () {
        if (!this.dataCollection) {
            var arr = [];
            arr.push(new RuneBookItemData(null, "\u9ED8\u8BA4\u89E3\u9501"));
            var data = RuneConfigMgr.ins().getExchangeDataList();
            for (var i in data) {
                arr.push(new RuneBookItemData(data[i]));
            }
            this.dataCollection = new eui.ArrayCollection(arr);
        }
        this.nuneList.dataProvider = this.dataCollection;
    };
    RuneBookWin.prototype.cleanList = function () {
        if (this.dataCollection) {
            this.dataCollection = null;
        }
        this.nuneList.dataProvider = null;
    };
    return RuneBookWin;
}(BaseEuiView));
__reflect(RuneBookWin.prototype, "RuneBookWin");
ViewManager.ins().reg(RuneBookWin, LayerManager.UI_Main);
//# sourceMappingURL=RuneBookWin.js.map