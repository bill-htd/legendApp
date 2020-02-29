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
var EncounterBgWin = (function (_super) {
    __extends(EncounterBgWin, _super);
    function EncounterBgWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZaoYuBGSkin";
        _this.isTopLevel = true;
        _this.encounterPanel = new EncounterInfoWin();
        _this.viewStack.addChild(_this.encounterPanel);
        _this.tab.dataProvider = _this.viewStack;
        return _this;
    }
    EncounterBgWin.prototype.open = function () {
        this.roleSelect.hideRole();
        this.addTouchEvent(this.btnClose, this.onTap);
        this.addTouchEvent(this.btnClose0, this.onTap);
        this.encounterPanel.open();
    };
    EncounterBgWin.prototype.close = function () {
        this.encounterPanel.close();
    };
    EncounterBgWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnClose:
            case this.btnClose0:
                ViewManager.ins().close(EncounterBgWin);
                break;
        }
    };
    return EncounterBgWin;
}(BaseEuiView));
__reflect(EncounterBgWin.prototype, "EncounterBgWin");
ViewManager.ins().reg(EncounterBgWin, LayerManager.UI_Main);
//# sourceMappingURL=EncounterBgWin.js.map