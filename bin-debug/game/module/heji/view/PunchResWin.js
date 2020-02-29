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
var PunchResWin = (function (_super) {
    __extends(PunchResWin, _super);
    function PunchResWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "PunchResSkin";
        return _this;
    }
    PunchResWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.smeltEquips = [];
        this.smeltEquips.length = 9;
        this.itemList.itemRenderer = SmeltEquipItem;
        this.dataInfo = new eui.ArrayCollection(this.smeltEquips);
        this.itemList.dataProvider = this.dataInfo;
    };
    PunchResWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.smeltBtn, this.onTap);
        this.addTouchEvent(this.itemList, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(UserEquip.ins().postSmeltEquipComplete, this.smeltComplete);
        this.observe(UserEquip.ins().postEquipCheckList, this.setItemList);
        this.setItemData();
    };
    PunchResWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.smeltBtn, this.onTap);
        this.removeTouchEvent(this.itemList, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    PunchResWin.prototype.smeltComplete = function () {
        var n = this.itemList.numChildren;
        while (n--) {
            this.itemList.getChildAt(n).playEff();
        }
        this.setItemData();
    };
    PunchResWin.prototype.setItemData = function () {
        this.smeltEquips = UserBag.ins().getHejiOutEquips();
        this.dataInfo.replaceAll(this.smeltEquips);
    };
    PunchResWin.prototype.setItemList = function (list) {
        this.dataInfo.replaceAll(list);
        this.itemList.dataProvider = this.dataInfo;
    };
    PunchResWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.smeltBtn:
                UserEquip.ins().sendSmeltEquip(0, this.smeltEquips);
                break;
            case this.itemList:
                var item = e.target;
                if (item && item.data) {
                    var i = this.smeltEquips.indexOf(item.data);
                    if (i >= 0) {
                        this.smeltEquips.splice(i, 1);
                        item.data = null;
                    }
                }
                break;
            case this.bgClose:
                ViewManager.ins().close(PunchResWin);
                break;
        }
    };
    return PunchResWin;
}(BaseEuiView));
__reflect(PunchResWin.prototype, "PunchResWin");
ViewManager.ins().reg(PunchResWin, LayerManager.UI_Popup);
//# sourceMappingURL=PunchResWin.js.map