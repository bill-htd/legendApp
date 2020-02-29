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
var TipsGoodReward = (function (_super) {
    __extends(TipsGoodReward, _super);
    function TipsGoodReward() {
        var _this = _super.call(this) || this;
        _this.skinName = "OrangeEquipNoticeSkin2";
        _this.isUsing = false;
        _this.horizontalCenter = 0;
        return _this;
    }
    Object.defineProperty(TipsGoodReward.prototype, "data", {
        set: function (item) {
            if (item instanceof RewardData) {
                switch (item.id) {
                    case MoneyConst.yuanbao:
                        this.desc.text = "\u5143\u5B9D";
                        this.skillName.text = "" + item.count;
                        this.item.setItemImg(RewardData.CURRENCY_RES[item.id]);
                        this.item.isShowName(false);
                        this.item.showNum(false);
                        this.item.isShowJob(false);
                        break;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    return TipsGoodReward;
}(BaseView));
__reflect(TipsGoodReward.prototype, "TipsGoodReward");
//# sourceMappingURL=TipsGoodReward.js.map