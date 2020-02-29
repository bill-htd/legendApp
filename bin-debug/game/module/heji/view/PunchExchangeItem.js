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
var PunchExchangeItem = (function (_super) {
    __extends(PunchExchangeItem, _super);
    function PunchExchangeItem() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.exchangeNum = 0;
        _this.skinName = 'PunchExchangeItemSkin';
        return _this;
    }
    PunchExchangeItem.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.count < _this.exchangeNum) {
                UserTips.ins().showTips("|C:0x35e62d&T:材料数量不足|");
                ViewManager.ins().open(ShopGoodsWarn).setData(_this.data.exchangeMaterial[0].id == MoneyConst.punch1 ? 909998 : 909999);
                return;
            }
            if (UserBag.ins().getSurplusCount() < 1) {
                UserTips.ins().showTips("背包已满");
                return;
            }
            UserSkill.ins().sendExchangeHejiEquip(_this.data.id);
        }, this);
        this.itemIcon0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    PunchExchangeItem.prototype.dataChanged = function () {
        var item = GlobalConfig.ItemConfig[this.data.getItem.id];
        var material = this.data.exchangeMaterial[0];
        this.exchangeNum = material.count;
        if (material.id == MoneyConst.punch1) {
            this.count = Actor.togeatter1;
        }
        else {
            this.count = Actor.togeatter2;
        }
        this.icon.source = RewardData.getCurrencyRes(material.id);
        this.redPoint.visible = UserSkill.ins().getPunchExchangeItemRedPoint(this.data.id);
        var str = this.data.zsLevel > 0 ? this.data.zsLevel + "\u8F6C" : this.data.level + "\u7EA7";
        this.nameLab.text = item.name;
        var color = (this.count < this.exchangeNum) ? "#F3311E" : "#35E62D";
        this.descLab.textFlow = new egret.HtmlTextParser().parser("<font color = '" + color + "'>" + this.count + "</font><font color = '#9F946D'>/" + this.exchangeNum + "</font>");
        this.itemConfig = item;
        this.itemIcon0.setData(item);
        if (this.data.zsLevel > 0) {
            this.goBtn.visible = UserZs.ins().lv >= this.data.zsLevel;
        }
        else {
            this.goBtn.visible = Actor.level >= this.data.level;
        }
    };
    PunchExchangeItem.prototype.onClick = function () {
        if (!this.itemConfig)
            return;
        switch (ItemConfig.getType(this.itemConfig)) {
            case 5:
                ViewManager.ins().open(HejiEquipTipsWin, { id: this.itemConfig.id }, false, true);
                break;
            default:
                UserTips.ins().showTips("没有找到道具类型提示页");
        }
    };
    PunchExchangeItem.prototype.setBtnStatu = function () {
    };
    return PunchExchangeItem;
}(eui.ItemRenderer));
__reflect(PunchExchangeItem.prototype, "PunchExchangeItem");
//# sourceMappingURL=PunchExchangeItem.js.map