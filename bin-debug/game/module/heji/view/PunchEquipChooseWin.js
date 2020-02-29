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
var PunchEquipChooseWin = (function (_super) {
    __extends(PunchEquipChooseWin, _super);
    function PunchEquipChooseWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        _this.pos = 0;
        return _this;
    }
    PunchEquipChooseWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "PunchEquipChangeSkin";
        this.list.itemRenderer = PunchEquipListItem;
        this.wearItem = new PunchEquipListItem();
        this.itemGroup.addChild(this.wearItem);
    };
    PunchEquipChooseWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.pos = param[0];
        var wear = param[1];
        var data = UserSkill.ins().equipListData[this.pos];
        this.wearItem.data = data;
        this.wearItem.setBtnStatu();
        this.itemList = UserBag.ins().getHejiEquipsByType(this.pos);
        this.list.dataProvider = new eui.ArrayCollection(this.itemList);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(UserSkill.ins().postHejiEquipChange, this.changeEquipSuccess);
        if (wear == 1) {
            this.scroll.y = 232;
            this.scroll.height = 410;
            this.wearItem.visible = true;
        }
        else {
            this.scroll.y = 50;
            this.scroll.height = 590;
            this.wearItem.visible = false;
        }
    };
    PunchEquipChooseWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    PunchEquipChooseWin.prototype.changeEquipSuccess = function () {
        ViewManager.ins().close(PunchEquipChooseWin);
    };
    PunchEquipChooseWin.prototype.itemTap = function (e) {
        var data = UserSkill.ins().equipListData[this.pos];
        var item = e.item;
        if (data) {
            if (data.itemConfig && item.itemConfig.useCond != data.itemConfig.id) {
                var preItem = GlobalConfig.ItemConfig[data.itemConfig.id + 10];
                UserTips.ins().showTips("|C:0xff0000&T:\u8BF7\u5148\u66F4\u6362" + preItem.name);
                return;
            }
        }
        else {
            if (item.itemConfig.useCond) {
                var preItem = GlobalConfig.ItemConfig[910000 + this.pos + 1];
                UserTips.ins().showTips("|C:0xff0000&T:\u5FC5\u987B\u88C5\u5907\u524D\u4E00\u4E2A\u7B49\u7EA7\u7684\u7B26\u6587\uFF0C\u624D\u53EF\u8FDB\u884C\u88C5\u5907");
                return;
            }
        }
        var itemlv = item.itemConfig.level ? item.itemConfig.level : 0;
        var itemzslv = item.itemConfig.zsLevel ? item.itemConfig.zsLevel : 0;
        if (itemzslv > UserZs.ins().lv || itemlv > Actor.level) {
            UserTips.ins().showTips("|C:0xff0000&T:\u7B26\u6587\u9700\u8981" + itemzslv + "\u8F6C" + itemlv + "\u7EA7\u53EF\u8FDB\u884C\u88C5\u5907");
            return;
        }
        UserSkill.ins().sendDressHejiEquip(item.handle, this.pos);
    };
    PunchEquipChooseWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return PunchEquipChooseWin;
}(BaseEuiView));
__reflect(PunchEquipChooseWin.prototype, "PunchEquipChooseWin");
ViewManager.ins().reg(PunchEquipChooseWin, LayerManager.UI_Main);
//# sourceMappingURL=PunchEquipChooseWin.js.map