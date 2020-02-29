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
var HongBaoRewardsItem = (function (_super) {
    __extends(HongBaoRewardsItem, _super);
    function HongBaoRewardsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'hongbaoRewardItem';
        return _this;
    }
    HongBaoRewardsItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HongBaoRewardsItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var yb = this.data.yb;
        var gold = this.data.gold;
        var money = "" + yb;
        var text = "";
        if (!this.itemIndex && this.data.name == Actor.myName) {
            this.currentState = "owner";
            text = "手气爆炸，在红包里抢到了";
        }
        else {
            this.currentState = "otherman";
            text = "\u5728\u7EA2\u5305\u91CC\u62A2\u5230\u4E86";
        }
        if (gold) {
            money = CommonUtils.overLength(gold);
            text += money + "金币";
        }
        else {
            text += money + "元宝";
        }
        this.validateNow();
        this.speaktxt.text = text;
        this.myFace.source = "yuanhead" + this.data.job + this.data.sex;
        this.playerName.text = this.data.name;
    };
    HongBaoRewardsItem.prototype.destruct = function () {
    };
    return HongBaoRewardsItem;
}(BaseItemRender));
__reflect(HongBaoRewardsItem.prototype, "HongBaoRewardsItem");
//# sourceMappingURL=HongBaoRewardsItem.js.map