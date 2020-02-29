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
var PeakViewBattleReportWin = (function (_super) {
    __extends(PeakViewBattleReportWin, _super);
    function PeakViewBattleReportWin() {
        return _super.call(this) || this;
    }
    PeakViewBattleReportWin.prototype.initUI = function () {
        this.skinName = "WarReportSkin";
        this.list.itemRenderer = PeakViewBattleReportItemRender;
    };
    PeakViewBattleReportWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClose);
        var group1 = param[0];
        var group2 = param[1];
        var isSixteen = PeakedSys.ins().isKFSixteen();
        var playData = PeakedSys.ins().isKf() ? PeakedHelp.getKFPlayerData(group1, group2, param[2], isSixteen) : PeakedHelp.getPlayerData(group1, group2);
        var listDt = [];
        var aScore = 0;
        var bScore = 0;
        var promWin = GlobalConfig.PeakRaceBase.promWin;
        if (!promWin)
            promWin = 3;
        if (playData) {
            if (playData.playerList.length == 0) {
                this.AnameTxt.text = "\u65E0\u9009\u624B";
                this.BnameTxt.text = "\u65E0\u9009\u624B";
            }
            else {
                if (playData.playerList[0])
                    this.AnameTxt.text = playData.playerList[0].playerName;
                if (playData.playerList[1])
                    this.BnameTxt.text = playData.playerList[1].playerName;
                else
                    this.BnameTxt.text = "\u8F6E\u7A7A";
                var isOver = PeakedHelp.statusIsOverByGroup(group1);
                for (var i = 0; i < 5; i++) {
                    var data = void 0;
                    if (playData.reportList[i]) {
                        data = {};
                        data.winer = PeakedHelp.findPlayerDtById(playData.reportList[i]).playerName;
                        data.round = i + 1;
                        if (playData.reportList[i] == playData.playerList[0].roleId) {
                            aScore++;
                        }
                        else
                            bScore++;
                    }
                    else if (isOver)
                        continue;
                    listDt[i] = data;
                    if (aScore >= promWin || bScore >= promWin)
                        break;
                }
            }
        }
        else {
            this.AnameTxt.text = "\u65E0\u9009\u624B";
            this.BnameTxt.text = "\u65E0\u9009\u624B";
        }
        if (playData && playData.reportList.length == 0 && !playData.playerList[1])
            aScore = promWin;
        this.score.text = aScore + "." + bScore;
        this.list.dataProvider = new eui.ArrayCollection(listDt);
    };
    PeakViewBattleReportWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClose);
    };
    PeakViewBattleReportWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    return PeakViewBattleReportWin;
}(BaseEuiView));
__reflect(PeakViewBattleReportWin.prototype, "PeakViewBattleReportWin");
ViewManager.ins().reg(PeakViewBattleReportWin, LayerManager.UI_Popup);
//# sourceMappingURL=PeakViewBattleReportWin.js.map