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
var SelectRoleWin = (function (_super) {
    __extends(SelectRoleWin, _super);
    function SelectRoleWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    SelectRoleWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "SelectRoleSkin";
        this.list.itemRenderer = SelectRoleItem;
    };
    SelectRoleWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btnStart, this.onStartGame);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        var list = param[0];
        list.sort(function (a, b) {
            return a.power < b.power ? 1 : -1;
        });
        this.list.dataProvider = new eui.ArrayCollection(list);
        this.list.selectedIndex = 0;
    };
    SelectRoleWin.prototype.onTap = function (e) {
        this.list.selectedIndex = e.itemIndex;
        var dataPro = this.list.dataProvider;
        dataPro.source.forEach(function (item, index) {
            dataPro.itemUpdated(item);
        });
    };
    SelectRoleWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.btnStart, this.onStartGame);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
    };
    SelectRoleWin.prototype.onStartGame = function () {
        var _data = this.list.getVirtualElementAt(this.list.selectedIndex);
        RoleMgr.ins().sendEnterGame(_data.data.id);
    };
    return SelectRoleWin;
}(BaseEuiView));
__reflect(SelectRoleWin.prototype, "SelectRoleWin");
ViewManager.ins().reg(SelectRoleWin, LayerManager.UI_Main);
//# sourceMappingURL=SelectRoleWin.js.map