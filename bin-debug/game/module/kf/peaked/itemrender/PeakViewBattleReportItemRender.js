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
var PeakViewBattleReportItemRender = (function (_super) {
    __extends(PeakViewBattleReportItemRender, _super);
    function PeakViewBattleReportItemRender() {
        return _super.call(this) || this;
    }
    PeakViewBattleReportItemRender.prototype.dataChanged = function () {
        if (this.data) {
            this.roundTxt.text = "\u7B2C" + this.data.round + "\u5C40";
            this.player.text = this.data.winer;
            this.noOpen.visible = false;
            this.infoGroup.visible = true;
        }
        else {
            this.noOpen.visible = true;
            this.infoGroup.visible = false;
        }
    };
    return PeakViewBattleReportItemRender;
}(BaseItemRender));
__reflect(PeakViewBattleReportItemRender.prototype, "PeakViewBattleReportItemRender");
//# sourceMappingURL=PeakViewBattleReportItemRender.js.map