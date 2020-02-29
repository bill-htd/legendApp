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
var ShenshouWearEquipWin = (function (_super) {
    __extends(ShenshouWearEquipWin, _super);
    function ShenshouWearEquipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SsEquipChooseSkin";
        return _this;
    }
    ShenshouWearEquipWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.list, this.onTouch);
        this.list.itemRenderer = ShenshouWearEquipItem;
        this.listDt = new eui.ArrayCollection();
        this.list.dataProvider = this.listDt;
        this.shenshouId = args[0];
        this.pos = args[1];
        var items = ShenshouModel.ins().findCanWearEquips(this.shenshouId, this.pos);
        if (items.length > 0) {
            if (args[2]) {
                var myEquip = new ShenshouEquipData();
                myEquip.pos = this.pos;
                myEquip.shenshuId = this.shenshouId;
                myEquip.sortIndex = Number.MAX_VALUE;
                myEquip.id = args[2];
                items.splice(0, 0, myEquip);
            }
            this.listDt.replaceAll(items);
            this.tipLabel2.visible = false;
        }
        else {
            this.tipLabel2.visible = true;
        }
    };
    ShenshouWearEquipWin.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    ShenshouWearEquipWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            default:
                if (e.target instanceof eui.Button && e.target.parent instanceof ShenshouWearEquipItem) {
                    var data = e.target.parent.data;
                    ShenshouSys.ins().sendWearEquip(this.shenshouId, this.pos, data.id);
                }
        }
    };
    return ShenshouWearEquipWin;
}(BaseEuiView));
__reflect(ShenshouWearEquipWin.prototype, "ShenshouWearEquipWin");
ViewManager.ins().reg(ShenshouWearEquipWin, LayerManager.UI_Popup);
//# sourceMappingURL=ShenshouWearEquipWin.js.map