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
var PersonInteRewardInfo = (function (_super) {
    __extends(PersonInteRewardInfo, _super);
    function PersonInteRewardInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "PersonInteRewardSkin";
        _this.name = "个人奖励";
        _this.list.itemRenderer = PersonRewardRenderer;
        _this.list1.itemRenderer = GuildInteRewardItemRenderer;
        _this.dataArr = new eui.ArrayCollection();
        _this.dataArr1 = new eui.ArrayCollection();
        return _this;
    }
    PersonInteRewardInfo.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!this.dataList) {
            this.dataList = [];
            var data = GlobalConfig.GuildBattlePersonalAward;
            for (var str in data) {
                this.dataList.push(data[str]);
            }
        }
        this.dataArr.source = this.dataList;
        this.list.dataProvider = this.dataArr;
        if (!this.dataList1) {
            this.dataList1 = [];
            var data = GlobalConfig.GuildBattlePersonalRankAward;
            for (var str in data) {
                this.dataList1.push(data[str]);
            }
        }
        this.dataArr1.source = this.dataList1;
        this.list1.dataProvider = this.dataArr1;
    };
    PersonInteRewardInfo.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    return PersonInteRewardInfo;
}(BaseView));
__reflect(PersonInteRewardInfo.prototype, "PersonInteRewardInfo");
//# sourceMappingURL=PersonInteRewardInfo.js.map