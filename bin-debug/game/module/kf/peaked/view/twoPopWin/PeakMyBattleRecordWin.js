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
var PeakMyBattleRecordWin = (function (_super) {
    __extends(PeakMyBattleRecordWin, _super);
    function PeakMyBattleRecordWin() {
        return _super.call(this) || this;
    }
    PeakMyBattleRecordWin.prototype.initUI = function () {
        this.skinName = "MyRecordSkin";
        this.list.itemRenderer = PeakMyBattleRecordItemRender;
    };
    PeakMyBattleRecordWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClose);
        this.addTouchEvent(this.tipGroup, this.onClose);
        this.addTouchEvent(this.list, this.onTouchList);
        var listDt = [];
        var sys = PeakedSys.ins();
        if (PeakedSys.ins().isKf()) {
            listDt = PeakedSys.ins().myKFBattleReportList;
            listDt = PeakedHelp.countKFMyRecordData();
        }
        else
            listDt = PeakedSys.ins().myBattleReportList;
        this.list.dataProvider = new eui.ArrayCollection(listDt);
        DisplayUtils.scrollerToBottom(this.scrollerList);
    };
    PeakMyBattleRecordWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    PeakMyBattleRecordWin.prototype.onTouchList = function (e) {
        if (e.target instanceof eui.Label && e.target.parent instanceof PeakMyBattleRecordItemRender) {
            var data = e.target.parent.data;
            if (data)
                UserReadPlayer.ins().sendFindPlayer(data.roleId);
        }
    };
    return PeakMyBattleRecordWin;
}(BaseEuiView));
__reflect(PeakMyBattleRecordWin.prototype, "PeakMyBattleRecordWin");
ViewManager.ins().reg(PeakMyBattleRecordWin, LayerManager.UI_Popup);
//# sourceMappingURL=PeakMyBattleRecordWin.js.map