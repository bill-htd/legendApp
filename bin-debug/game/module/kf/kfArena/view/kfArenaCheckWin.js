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
var kfArenaCheckWin = (function (_super) {
    __extends(kfArenaCheckWin, _super);
    function kfArenaCheckWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "kfArenaCheckSkin";
        _this.isTopLevel = true;
        return _this;
    }
    kfArenaCheckWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.outBtn, this.onTouch);
        this.addTouchEvent(this.checkBtn, this.onTouch);
        this.data = args[0];
        this.update();
    };
    kfArenaCheckWin.prototype.update = function () {
        this.currentState = KfArenaSys.ins().isTFCaptain ? "normal" : "check";
        this.nameLab.text = this.data.roleName;
        this.powerLab.text = "\u6218\u529B\uFF1A" + CommonUtils.overLength(this.data.power);
        this.scoreLab.text = "\u79EF\u5206\uFF1A" + this.data.score;
        this.winRateLab.text = "\u80DC\u7387\uFF1A" + this.data.winRate + "%";
        this.face.source = "head_" + this.data.job + this.data.sex;
    };
    kfArenaCheckWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                break;
            case this.outBtn:
                KfArenaSys.ins().sendOutTeam(this.data.roleID);
                break;
            case this.checkBtn:
                UserReadPlayer.ins().sendFindPlayer(this.data.roleID, this.data.serverId);
                break;
        }
        ViewManager.ins().close(this);
    };
    return kfArenaCheckWin;
}(BaseEuiView));
__reflect(kfArenaCheckWin.prototype, "kfArenaCheckWin");
ViewManager.ins().reg(kfArenaCheckWin, LayerManager.UI_Popup);
//# sourceMappingURL=kfArenaCheckWin.js.map