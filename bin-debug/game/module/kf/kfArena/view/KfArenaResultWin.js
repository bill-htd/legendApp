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
var KfArenaResultWin = (function (_super) {
    __extends(KfArenaResultWin, _super);
    function KfArenaResultWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KfArenaResultSkin";
        return _this;
    }
    KfArenaResultWin.prototype.childrenCreated = function () {
        this.extrReward.itemRenderer = ItemBase;
        this.list.itemRenderer = KfArenaDataItem;
    };
    KfArenaResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.sureBtn, this.onTouch);
        this.blueScore.text = param[0];
        this.redScore.text = param[1];
        this.list.dataProvider = new eui.ArrayCollection(param[2]);
        this.extrReward.dataProvider = new eui.ArrayCollection(param[3]);
        TimerManager.ins().doTimer(1000, this.quitTime, this.onTime, this);
    };
    KfArenaResultWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
            case this.sureBtn:
                this.onExit();
                break;
        }
    };
    KfArenaResultWin.prototype.onTime = function () {
        if (this.quitTime > 0) {
            this.quitTime--;
            this.leaveInfo.text = this.quitTime + "s\u540E\u81EA\u52A8\u79BB\u5F00\u6218\u573A";
        }
        else {
            this.onExit();
        }
    };
    KfArenaResultWin.prototype.onExit = function () {
        ViewManager.ins().close(this);
        UserFb.ins().sendExitFb();
    };
    return KfArenaResultWin;
}(BaseEuiView));
__reflect(KfArenaResultWin.prototype, "KfArenaResultWin");
ViewManager.ins().reg(KfArenaResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=KfArenaResultWin.js.map