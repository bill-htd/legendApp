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
var GuildInteRewardInfo = (function (_super) {
    __extends(GuildInteRewardInfo, _super);
    function GuildInteRewardInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildInteRewardSkin";
        _this.name = "公会奖励";
        _this.dataArr = new eui.ArrayCollection();
        _this.dataArr1 = new eui.ArrayCollection();
        _this.itemList.itemRenderer = ItemBase;
        _this.list1.itemRenderer = GuildInteRewardItemRenderer;
        return _this;
    }
    GuildInteRewardInfo.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var data = GuildWar.ins().getModel().creatGuildRewardList();
        this.dataArr1.source = data;
        this.list1.dataProvider = this.dataArr1;
        var data1 = GlobalConfig.GuildBattleConst.occupationAward;
        this.dataArr.source = data1;
        this.itemList.dataProvider = this.dataArr;
    };
    GuildInteRewardInfo.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.dataArr.source = null;
        this.dataArr1.source = null;
    };
    return GuildInteRewardInfo;
}(BaseView));
__reflect(GuildInteRewardInfo.prototype, "GuildInteRewardInfo");
//# sourceMappingURL=GuildInteRewardInfo.js.map