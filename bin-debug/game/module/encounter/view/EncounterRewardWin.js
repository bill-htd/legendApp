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
var EncounterRewardWin = (function (_super) {
    __extends(EncounterRewardWin, _super);
    function EncounterRewardWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "Zaoyurewardskin";
        return _this;
    }
    EncounterRewardWin.prototype.createChildren = function () {
        this.list0.itemRenderer = EncounterRewardRender;
        this.rewardList = [];
        for (var k in GlobalConfig.SkirmishRankConfig) {
            this.rewardList.push(GlobalConfig.SkirmishRankConfig[k]);
        }
    };
    EncounterRewardWin.prototype.open = function () {
        this.addTouchEvent(this.bgClose, this.onTap);
        this.setPanelInfo();
    };
    EncounterRewardWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onTap);
    };
    EncounterRewardWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(EncounterRewardWin);
                break;
        }
    };
    EncounterRewardWin.prototype.setPanelInfo = function () {
        this.list0.dataProvider = new eui.ArrayCollection(this.rewardList);
        var rank = Encounter.ins().encounterRank;
        if (rank == 0) {
            this.myRankText.textFlow = TextFlowMaker.generateTextFlow1("\u6211\u7684\u5F53\u524D\u6392\u540D\uFF1A|C:0xFB9409&T:\u672A\u4E0A\u699C|");
        }
        else {
            this.myRankText.textFlow = TextFlowMaker.generateTextFlow1("\u6211\u7684\u5F53\u524D\u6392\u540D\uFF1A|C:0xFB9409&T:" + rank + "\u540D|");
        }
    };
    return EncounterRewardWin;
}(BaseEuiView));
__reflect(EncounterRewardWin.prototype, "EncounterRewardWin");
ViewManager.ins().reg(EncounterRewardWin, LayerManager.UI_Main);
//# sourceMappingURL=EncounterRewardWin.js.map