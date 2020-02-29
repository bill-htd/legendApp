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
var PeakMyBattleRecordItemRender = (function (_super) {
    __extends(PeakMyBattleRecordItemRender, _super);
    function PeakMyBattleRecordItemRender() {
        return _super.call(this) || this;
    }
    PeakMyBattleRecordItemRender.prototype.dataChanged = function () {
        if (this.data.playerName) {
            var exRound = this.data.round ? "\u7B2C" + this.data.round + "\u573A" : "";
            if (PeakedSys.ins().isKf()) {
                this.roundInfo.text = "" + PeakedData.SERV_CN[1] + PeakedData.STATE_KF_TYPE_CN[this.data.stateType] + " " + exRound;
            }
            else {
                this.roundInfo.text = "" + PeakedData.SERV_CN[0] + PeakedData.STATE_TYPE_CN[this.data.stateType] + " " + exRound;
            }
            this.enemyLabel.text = this.data.playerName;
            this.result.text = this.data.result ? "\u80DC\u5229" : "\u5931\u8D25";
            this.result.textColor = this.data.result ? ColorUtil.GREEN : ColorUtil.RED;
        }
    };
    return PeakMyBattleRecordItemRender;
}(BaseItemRender));
__reflect(PeakMyBattleRecordItemRender.prototype, "PeakMyBattleRecordItemRender");
//# sourceMappingURL=PeakMyBattleRecordItemRender.js.map