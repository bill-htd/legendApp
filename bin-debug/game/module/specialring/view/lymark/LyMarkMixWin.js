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
var LyMarkMixWin = (function (_super) {
    __extends(LyMarkMixWin, _super);
    function LyMarkMixWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "markMixSkin";
        _this.isTopLevel = true;
        return _this;
    }
    LyMarkMixWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = LyMarkMixItemRender;
    };
    LyMarkMixWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.observe(UserBag.ins().postItemAdd, this.update);
        this.observe(UserBag.ins().postItemChange, this.update);
        this.update();
    };
    LyMarkMixWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
    };
    LyMarkMixWin.prototype.update = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.list.dataProvider = this._collect;
        }
        var datas = [];
        var itemData, cfg;
        var count, itemName, itemCount;
        for (var key in GlobalConfig.FlameStampMat) {
            cfg = GlobalConfig.FlameStampMat[key];
            if (cfg.costItem) {
                itemData = UserBag.ins().getBagItemById(cfg.costItem);
                itemName = GlobalConfig.ItemConfig[cfg.costItem].name;
                count = itemData ? itemData.count : 0;
            }
            else {
                count = 0;
                itemName = "";
            }
            itemData = UserBag.ins().getBagItemById(cfg.itemId);
            itemCount = itemData ? itemData.count : 0;
            datas.push({ cfg: cfg, count: count, itemName: itemName, itemCount: itemCount });
        }
        this._collect.source = datas;
    };
    LyMarkMixWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    return LyMarkMixWin;
}(BaseEuiView));
__reflect(LyMarkMixWin.prototype, "LyMarkMixWin");
ViewManager.ins().reg(LyMarkMixWin, LayerManager.UI_Main);
//# sourceMappingURL=LyMarkMixWin.js.map