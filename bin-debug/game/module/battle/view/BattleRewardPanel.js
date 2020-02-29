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
var BattleRewardPanel = (function (_super) {
    __extends(BattleRewardPanel, _super);
    function BattleRewardPanel() {
        return _super.call(this) || this;
    }
    BattleRewardPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list0.itemRenderer = BattleRewardItemRender;
        var i = 0;
        var datas = [];
        for (var key in GlobalConfig.CampBattlePersonalRankAwardConfig) {
            datas[i] = GlobalConfig.CampBattlePersonalRankAwardConfig[key];
            i++;
        }
        this.list0.dataProvider = new eui.ArrayCollection(datas);
        this._collect = new eui.ArrayCollection();
        this.list1.itemRenderer = BattleAwardTargetItemRender;
        this.list1.dataProvider = this._collect;
    };
    BattleRewardPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(BattleCC.ins().postGiftInfo, this.update);
        this.update();
    };
    BattleRewardPanel.prototype.close = function () {
        this.removeObserve();
    };
    BattleRewardPanel.prototype.update = function () {
        var len = Object.keys(GlobalConfig.CampBattlePersonalAwardConfig).length;
        var datas = [];
        var awardId = BattleCC.ins().awardID;
        datas.length = len;
        for (var i = 1; i <= len; i++)
            datas[i - 1] = [GlobalConfig.CampBattlePersonalAwardConfig[i], i <= awardId];
        this._collect.source = datas;
    };
    return BattleRewardPanel;
}(BaseEuiView));
__reflect(BattleRewardPanel.prototype, "BattleRewardPanel");
//# sourceMappingURL=BattleRewardPanel.js.map