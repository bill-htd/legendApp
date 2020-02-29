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
var PeakMyBetItemRender = (function (_super) {
    __extends(PeakMyBetItemRender, _super);
    function PeakMyBetItemRender() {
        return _super.call(this) || this;
    }
    PeakMyBetItemRender.prototype.dataChanged = function () {
        if (this.data instanceof PeakBetData) {
            if (PeakedSys.ins().isKf()) {
                this.round.text = PeakedData.SERV_CN[1] + PeakedData.STATE_KF_TYPE_CN[this.data.status];
            }
            else {
                this.round.text = PeakedData.SERV_CN[0] + PeakedData.STATE_TYPE_CN[this.data.status];
            }
            var playDt = PeakedHelp.findPlayerDtById(this.data.playerId);
            var ext = "";
            if (PeakedHelp.statusIsOver(this.data.status, PeakedSys.ins().isKf())) {
                if (PeakedHelp.checkIsWinById(this.data.playerId, this.data.status)) {
                    ext = "|C:" + ColorUtil.GREEN + "&T:\u83B7\u5229" + this.data.batNum + "\u7B79\u7801|";
                }
                else {
                    ext = "|C:" + ColorUtil.RED + "&T:\u635F\u5931" + this.data.batNum + "\u7B79\u7801|";
                }
            }
            else if (PeakedHelp.checkIsWinById(this.data.playerId, this.data.status)) {
                ext = "|C:" + ColorUtil.GREEN + "&T:\u83B7\u5229" + this.data.batNum + "\u7B79\u7801|";
            }
            else {
                ext = "\u7B49\u5F85\u7ED3\u679C\u4E2D...";
            }
            this.infoLabel.textFlow = TextFlowMaker.generateTextFlow1("\u4E0B\u6CE8\u3010" + playDt.playerName + "\u3011 " + this.data.batNum + "\u7B79\u7801\uFF0C" + ext);
        }
    };
    return PeakMyBetItemRender;
}(BaseItemRender));
__reflect(PeakMyBetItemRender.prototype, "PeakMyBetItemRender");
//# sourceMappingURL=PeakMyBetItemRender.js.map