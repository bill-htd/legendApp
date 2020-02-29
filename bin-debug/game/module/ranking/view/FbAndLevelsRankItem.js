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
var FbAndLevelsRankItem = (function (_super) {
    __extends(FbAndLevelsRankItem, _super);
    function FbAndLevelsRankItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "FbRankItemSkin";
        return _this;
    }
    FbAndLevelsRankItem.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDetail, this);
    };
    FbAndLevelsRankItem.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openDetail, this);
    };
    FbAndLevelsRankItem.prototype.dataChanged = function () {
        this.rank.text = this.data[RankDataType.DATA_POS] + "";
        this.monthcard.visible = this.data[RankDataType.DATA_MONTH] == 1;
        var vipLevel = this.data[RankDataType.DATA_VIP];
        this.vipImg.visible = vipLevel > 0;
        this.vip.removeChildren();
        if (vipLevel > 0)
            this.vip.addChild(BitmapNumber.ins().createNumPic(vipLevel, '5'));
        this.nameLabel.text = this.data[RankDataType.DATA_PLAYER];
        this.zhanli.text = CommonUtils.overLength(this.data[RankDataType.DATA_POWER]);
        this.ce.text = this.data[RankDataType.DATA_COUNT] + "关";
    };
    FbAndLevelsRankItem.prototype.openDetail = function () {
        UserReadPlayer.ins().sendFindPlayer(this.data.playId);
    };
    return FbAndLevelsRankItem;
}(BaseItemRender));
__reflect(FbAndLevelsRankItem.prototype, "FbAndLevelsRankItem");
//# sourceMappingURL=FbAndLevelsRankItem.js.map