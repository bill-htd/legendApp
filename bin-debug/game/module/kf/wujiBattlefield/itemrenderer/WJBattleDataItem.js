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
var WJBattleDataItem = (function (_super) {
    __extends(WJBattleDataItem, _super);
    function WJBattleDataItem() {
        return _super.call(this) || this;
    }
    WJBattleDataItem.prototype.dataChanged = function () {
        if (this.data instanceof WJBattleData) {
            var dt = this.data;
            if (dt.isResult) {
                this.currentState = "result";
            }
            else {
                this.currentState = "data";
            }
            this.nickLabel.text = dt.playerName;
            this.numLabel.text = dt.killNum + "/" + dt.killedNum + "/" + dt.assistsNum;
            this.collectFlagLabel.text = dt.collectFlagNum + "";
            this.firstKillImg.visible = dt.isFirstKiller > 0;
            this.mvpImg.visible = dt.isMVP > 0;
            this.mvpImg.source = dt.camp == WJBattlefieldSys.ins().myCampId ? "wj_mvp_green" : "wj_mvp_red";
            this.honorLabel.text = "";
            this.bg.source = dt.camp == WJBattlefieldSys.ins().myCampId ? "wj_data_item_bg2" : "wj_data_item_bg1";
        }
    };
    return WJBattleDataItem;
}(BaseItemRender));
__reflect(WJBattleDataItem.prototype, "WJBattleDataItem");
//# sourceMappingURL=WJBattleDataItem.js.map