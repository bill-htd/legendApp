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
var VipGiftItemView = (function (_super) {
    __extends(VipGiftItemView, _super);
    function VipGiftItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipGiftItemSkin";
        return _this;
    }
    VipGiftItemView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
    };
    VipGiftItemView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curId = param[0] || 1;
        this.updateData();
        this.close();
        this.addTouchEvent(this.getBtn, this.onGet);
        this.observe(UserVip.ins().postVipGiftBuy, this.updateData);
    };
    VipGiftItemView.prototype.close = function () {
        this.removeTouchEvent(this, this.onGet);
        this.removeObserve();
    };
    VipGiftItemView.prototype.onGet = function () {
        var config = GlobalConfig.VipGiftConfig[this.curId];
        if (UserVip.ins().lv < config.vipLv) {
            UserTips.ins().showTips("VIP\u7B49\u7EA7\u4E0D\u8DB3");
            return;
        }
        if (Actor.yb < config.needYb) {
            UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
            return;
        }
        if (UserBag.ins().getSurplusCount() <= 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请先清理背包|");
            return;
        }
        UserVip.ins().sendGetVipGift(this.curId);
    };
    VipGiftItemView.prototype.updateData = function () {
        var config = GlobalConfig.VipGiftConfig[this.curId];
        var awards = config.awards;
        this.reward.dataProvider = new eui.ArrayCollection(awards.concat());
        this.ggtxt.source = config.adImg;
        this.txt.source = config.nameImg;
        this.tu.source = config.bgImg;
        this.getBtn.visible = UserVip.ins().getVipGiftCanBuy(this.curId) && !UserVip.ins().getVipGiftIsBuy(this.curId);
        this.getBtn.label = config.needYb + "元宝";
        this.redPoint.visible = UserVip.ins().getVipGiftRedPoint(this.curId);
        this.already.visible = UserVip.ins().getVipGiftIsBuy(this.curId);
    };
    return VipGiftItemView;
}(BaseView));
__reflect(VipGiftItemView.prototype, "VipGiftItemView");
//# sourceMappingURL=VipGiftItemView.js.map