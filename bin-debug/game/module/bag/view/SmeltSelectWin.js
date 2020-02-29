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
var SmeltSelectWin = (function (_super) {
    __extends(SmeltSelectWin, _super);
    function SmeltSelectWin() {
        return _super.call(this) || this;
    }
    SmeltSelectWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "SmeltSelectSkin";
        this.isTopLevel = true;
        this.itemList.itemRenderer = SmeltSelectItem;
        this.itemScroller.viewport = this.itemList;
        this.checkList = [];
    };
    SmeltSelectWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.len = param[1];
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        var list = param[0];
        list.sort(UserBag.ins().sort2);
        this.itemList.dataProvider = new eui.ArrayCollection(param[0]);
    };
    SmeltSelectWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.sureBtn, this.onTap);
        this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.foolChecklist();
        this.removeObserve();
        UserEquip.ins().postEquipCheckList(this.checkList);
    };
    SmeltSelectWin.prototype.onItemTap = function (e) {
        var item = e.itemRenderer;
        item.checkBoxs.selected = !item.checkBoxs.selected;
        var itemData = this.itemList.selectedItem;
        if (item.checkBoxs.selected) {
            if (this.checkList.length < this.len) {
                this.checkList[this.checkList.length] = itemData;
                if (this.checkList.length >= this.len) {
                    this.autoClose();
                    return;
                }
            }
            else {
                this.autoClose();
                return;
            }
        }
        else {
            var index = this.checkList.indexOf(itemData);
            if (index < 0)
                return;
            this.checkList.splice(index, 1);
        }
        this.setCountLabel(this.checkList.length);
    };
    SmeltSelectWin.prototype.autoClose = function () {
        UserEquip.ins().postEquipCheckList(this.checkList);
        ViewManager.ins().close(SmeltSelectWin);
    };
    SmeltSelectWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(SmeltSelectWin);
                break;
            case this.sureBtn:
                UserEquip.ins().postEquipCheckList(this.checkList);
                ViewManager.ins().close(SmeltSelectWin);
                break;
        }
    };
    SmeltSelectWin.prototype.setSmeltEquipList = function (list) {
        var _this = this;
        this.checkList = list;
        this.checkListData();
        this.setCountLabel(this.checkList.length);
        TimerManager.ins().doTimer(60, 1, function () {
            for (var i = 0; i < _this.checkList.length; i++) {
                for (var j = 0; j < _this.itemList.numElements; j++) {
                    var item = _this.itemList.getElementAt(j);
                    if (_this.checkList[i] && item && _this.checkList[i].handle == item.data.handle) {
                        if (_this.checkList.length <= _this.len) {
                            item.checkBoxs.selected = true;
                        }
                        break;
                    }
                }
            }
        }, this);
    };
    SmeltSelectWin.prototype.setCountLabel = function (count) {
        this.countLabel.text = count + "/" + this.len;
    };
    SmeltSelectWin.prototype.checkListData = function () {
        var len = this.checkList.length;
        for (var i = len - 1; i >= 0; i--) {
            if (this.checkList[i] == null) {
                this.checkList.splice(i, 1);
            }
        }
    };
    SmeltSelectWin.prototype.foolChecklist = function () {
        var len = this.checkList.length;
        for (var i = 0; i < this.len; i++) {
            if (i >= len) {
                this.checkList.push(null);
            }
        }
    };
    return SmeltSelectWin;
}(BaseEuiView));
__reflect(SmeltSelectWin.prototype, "SmeltSelectWin");
ViewManager.ins().reg(SmeltSelectWin, LayerManager.UI_Main);
//# sourceMappingURL=SmeltSelectWin.js.map