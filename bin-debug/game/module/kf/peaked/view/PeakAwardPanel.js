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
var PeakAwardPanel = (function (_super) {
    __extends(PeakAwardPanel, _super);
    function PeakAwardPanel() {
        return _super.call(this) || this;
    }
    PeakAwardPanel.prototype.childrenCreated = function () {
        this.curServList.itemRenderer = PeakAwardItemRender;
        this.kfServList.itemRenderer = PeakAwardItemRender;
        this._listDt1 = new eui.ArrayCollection;
        this._listDt2 = new eui.ArrayCollection;
        this.curServList.dataProvider = this._listDt1;
        this.kfServList.dataProvider = this._listDt2;
    };
    PeakAwardPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var bfAwardDtList = [];
        for (var key in GlobalConfig.PeakRaceTime) {
            var dp = GlobalConfig.PeakRaceTime[key];
            if (dp.loseMail)
                bfAwardDtList.push(dp);
        }
        var first = new PeakRaceTime();
        first.loseMail = GlobalConfig.PeakRaceBase.winMail;
        first.status = BF_PeakStatus.Over;
        bfAwardDtList.push(first);
        bfAwardDtList.reverse();
        this._listDt1.replaceAll(bfAwardDtList);
        bfAwardDtList = [];
        for (var key in GlobalConfig.PeakRaceCrossTime) {
            var dp = GlobalConfig.PeakRaceCrossTime[key];
            if (dp.loseMail)
                bfAwardDtList.push(dp);
        }
        var KFfirst = new PeakRaceCrossTime();
        KFfirst.loseMail = GlobalConfig.PeakRaceBase.crossWinMail;
        KFfirst.status = KF_PeakStatus.Over;
        bfAwardDtList.push(KFfirst);
        bfAwardDtList.reverse();
        this._listDt2.replaceAll(bfAwardDtList);
    };
    PeakAwardPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    return PeakAwardPanel;
}(BaseView));
__reflect(PeakAwardPanel.prototype, "PeakAwardPanel");
//# sourceMappingURL=PeakAwardPanel.js.map