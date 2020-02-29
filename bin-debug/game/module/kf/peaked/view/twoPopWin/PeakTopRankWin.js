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
var PeakTopRankWin = (function (_super) {
    __extends(PeakTopRankWin, _super);
    function PeakTopRankWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SupportRankSkin";
        return _this;
    }
    PeakTopRankWin.prototype.initUI = function () {
        this.list.itemRenderer = PeakTopRankItemRender;
        this._listDt = new eui.ArrayCollection();
        this.list.dataProvider = this._listDt;
    };
    PeakTopRankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(PeakedSys.ins().postSignUp, this.onSingUp);
        this.observe(PeakedSys.ins().postTopRank, this.upList);
        this.observe(PeakedSys.ins().postKFTopRank, this.upList);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.tipGroup, this.onTouch);
        this.addTouchEvent(this.list, this.onTouch);
        this.onSingUp();
    };
    PeakTopRankWin.prototype.onSingUp = function () {
        if (PeakedSys.ins().isKf()) {
            PeakedSys.ins().sendKFTopRank();
        }
        else {
            PeakedSys.ins().sendTopRank();
        }
    };
    PeakTopRankWin.prototype.upList = function () {
        if (PeakedSys.ins().isKf()) {
            this._listDt.replaceAll(PeakedSys.ins().kfTopRankInfoList);
        }
        else {
            this._listDt.replaceAll(PeakedSys.ins().topRankInfoList);
        }
    };
    PeakTopRankWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
            case this.tipGroup:
                ViewManager.ins().close(this);
                break;
            default:
                if (e.target.parent instanceof PeakTopRankItemRender) {
                    var data = e.target.parent.data;
                    if (e.target instanceof eui.Button) {
                        if (PeakedSys.ins().isKf()) {
                            PeakedSys.ins().sendKFToLikes(data.playerId);
                        }
                        else {
                            PeakedSys.ins().sendToLikes(data.playerId);
                        }
                    }
                    else if (e.target instanceof eui.Label) {
                        UserReadPlayer.ins().sendFindPlayer(data.playerId, data.servId);
                    }
                }
        }
    };
    return PeakTopRankWin;
}(BaseEuiView));
__reflect(PeakTopRankWin.prototype, "PeakTopRankWin");
ViewManager.ins().reg(PeakTopRankWin, LayerManager.UI_Popup);
//# sourceMappingURL=PeakTopRankWin.js.map