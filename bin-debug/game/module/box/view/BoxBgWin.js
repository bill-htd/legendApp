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
var BoxBgWin = (function (_super) {
    __extends(BoxBgWin, _super);
    function BoxBgWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "chestbgskin";
        _this.isTopLevel = true;
        return _this;
    }
    BoxBgWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.observe(Book.ins().postDataChange, this.redUpdate);
        this.observe(Box.ins().postUpdateData, this.redUpdate);
        this.observe(Box.ins().postUpdateFreeBox, this.redUpdate);
        this.addTouchEvent(this.help, this.onBtnClick);
        this.tab.selectedIndex = this.viewStack.selectedIndex = param[0] || 0;
        this._ext = param[1];
        this.setSelectedIndex(this.tab.selectedIndex);
        this.help.visible = false;
        this.redUpdate();
    };
    BoxBgWin.prototype.close = function () {
        this.boxPanel.close();
        this.bookPanel.close();
        this.removeObserve();
    };
    BoxBgWin.prototype.redUpdate = function () {
        this.redPoint1.visible = BoxModel.ins().checkRedPointShow();
        this.redPoint2.visible = Book.ins().getBookRed();
    };
    BoxBgWin.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.help:
                ViewManager.ins().open(ZsBossRuleSpeak, 11);
                break;
        }
    };
    BoxBgWin.prototype.onTabTouch = function (e) {
        if (e === void 0) { e = null; }
        this.setSelectedIndex(this.tab.selectedIndex);
    };
    BoxBgWin.prototype.setSelectedIndex = function (index) {
        this.help.visible = false;
        if (index == 0) {
            this.boxPanel.open();
        }
        else if (index == 1) {
            if (this._ext) {
                this.bookPanel.open(this._ext);
                this._ext = null;
            }
            else {
                this.bookPanel.open();
            }
            this.help.visible = true;
        }
    };
    return BoxBgWin;
}(BaseEuiView));
__reflect(BoxBgWin.prototype, "BoxBgWin");
ViewManager.ins().reg(BoxBgWin, LayerManager.UI_Main);
//# sourceMappingURL=BoxBgWin.js.map