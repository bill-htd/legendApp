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
var PersonalInteRankInfo = (function (_super) {
    __extends(PersonalInteRankInfo, _super);
    function PersonalInteRankInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = "PersonalInteRankSkin";
        _this.name = "个人排行";
        _this.list.itemRenderer = GuildInteRankItemRenderer;
        _this.data = new eui.ArrayCollection([]);
        return _this;
    }
    PersonalInteRankInfo.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.dataProvider = this.data;
        this.observe(GuildWar.ins().postGuildPersonalRank, this.refushList);
        GuildWar.ins().requestOwnGuildRank();
    };
    PersonalInteRankInfo.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
    };
    PersonalInteRankInfo.prototype.refushList = function (list) {
        this.data.replaceAll(list);
    };
    return PersonalInteRankInfo;
}(BaseView));
__reflect(PersonalInteRankInfo.prototype, "PersonalInteRankInfo");
//# sourceMappingURL=PersonalInteRankInfo.js.map