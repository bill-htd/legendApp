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
var GuileWarReliveWin = (function (_super) {
    __extends(GuileWarReliveWin, _super);
    function GuileWarReliveWin() {
        return _super.call(this) || this;
    }
    GuileWarReliveWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "SwitchCDSkin";
    };
    GuileWarReliveWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = param[0];
        this.sceneIndex = param[1];
        switch (this.type) {
            case 1:
                this.currentState = "switch";
                this.defaultStr = "\u79D2\u540E\u81EA\u52A8\u5207\u6362\u533A\u57DF";
                this.s = GuildWar.ins().getModel().getCdByType(this.type);
                break;
            case 2:
                this.currentState = "revive";
                this.defaultStr = "\u79D2\u540E\u5728\u9F99\u57CE\u57CE\u95E8\u590D\u6D3B";
                this.s = param[1];
                break;
            case 3:
                this.currentState = "exit";
                this.defaultStr = "\u79D2\u540E\u81EA\u52A8\u9000\u51FA\u6D3B\u52A8";
                this.s = GuildWar.ins().getModel().getCdByType(this.type);
                break;
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.timeDown.text = "" + this.s + this.defaultStr;
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        TimerManager.ins().doTimer(1000, this.s, this.updateCloseBtnLabel, this);
        this.refushMapInfo();
    };
    GuileWarReliveWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        if (this.type != 1) {
            GuildWar.ins().getModel().killName = "";
        }
    };
    GuileWarReliveWin.prototype.refushMapInfo = function () {
        if (this.type == 1) {
            this.mapName.text = GuildWar.ins().getModel().getNextMapName(this.sceneIndex);
        }
        else if (this.type == 2) {
            this.killName.text = "\u4F60\u88AB " + GuildWar.ins().getModel().killName + " \u73A9\u5BB6\u51FB\u8D25\uFF01";
            this.guildName.text = "\u6240\u5C5E\u516C\u4F1A\uFF1A" + GuildWar.ins().getModel().killGuild + " ";
        }
    };
    GuileWarReliveWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0) {
            if (this.type == 1) {
                GuildWar.ins().requestPlayNextMap(this.sceneIndex);
            }
            if (this.type == 3) {
                UserFb.ins().sendExitFb();
            }
            ViewManager.ins().close(GuileWarReliveWin);
        }
        this.timeDown.text = "" + this.s + this.defaultStr;
    };
    GuileWarReliveWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(GuileWarReliveWin);
                break;
        }
    };
    return GuileWarReliveWin;
}(BaseEuiView));
__reflect(GuileWarReliveWin.prototype, "GuileWarReliveWin");
ViewManager.ins().reg(GuileWarReliveWin, LayerManager.UI_Main);
//# sourceMappingURL=GuileWarReliveWin.js.map