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
var PeakMyBetRecordWin = (function (_super) {
    __extends(PeakMyBetRecordWin, _super);
    function PeakMyBetRecordWin() {
        return _super.call(this) || this;
    }
    PeakMyBetRecordWin.prototype.initUI = function () {
        this.skinName = "MyBetRecordSkin";
        this.list.itemRenderer = PeakMyBetItemRender;
    };
    PeakMyBetRecordWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClose);
        this.addTouchEvent(this.tipGroup, this.onClose);
        this.observe(PeakedSys.ins().postKFBetInfo, this.updata);
        this.updata();
    };
    PeakMyBetRecordWin.prototype.onClose = function (e) {
        ViewManager.ins().close(this);
    };
    PeakMyBetRecordWin.prototype.updata = function () {
        var list = [];
        var count = 0;
        var getNum = 0;
        var betInfo = PeakedSys.ins().isKf() ? PeakedSys.ins().kfBetInfo : PeakedSys.ins().betInfo;
        if (betInfo) {
            for (var _i = 0, betInfo_1 = betInfo; _i < betInfo_1.length; _i++) {
                var info = betInfo_1[_i];
                count += info.batNum;
                list.push(info);
                if (PeakedHelp.statusIsOver(info.status, PeakedSys.ins().isKf())) {
                    if (PeakedHelp.checkIsWinById(info.playerId, info.status))
                        getNum += info.batNum;
                    else
                        getNum -= info.batNum;
                }
            }
        }
        var extS = getNum > 0 ? "\uFF0C|C:" + ColorUtil.GREEN + "&T:\u83B7\u5229\uFF1A" + getNum + "|" : "|C:" + ColorUtil.RED + "&T:\u635F\u5931\uFF1A" + -getNum + "\u7B79\u7801|";
        if (getNum == 0)
            extS = "";
        var str = "\u4F60\u5DF2\u7ECF\u4E0B\u6CE8" + list.length + "\u573A\u6BD4\u8D5B\uFF0C\u4E0B\u6CE8\u603B\u989D: |C:" + ColorUtil.GREEN + "&T:" + count + "|\u7B79\u7801" + extS;
        this.infoLabel.textFlow = TextFlowMaker.generateTextFlow1(str);
        list.sort(PeakedHelp.sortBetFun);
        this.list.dataProvider = new eui.ArrayCollection(list);
        DisplayUtils.scrollerToBottom(this.scrollerList);
    };
    return PeakMyBetRecordWin;
}(BaseEuiView));
__reflect(PeakMyBetRecordWin.prototype, "PeakMyBetRecordWin");
ViewManager.ins().reg(PeakMyBetRecordWin, LayerManager.UI_Popup);
//# sourceMappingURL=PeakMyBetRecordWin.js.map