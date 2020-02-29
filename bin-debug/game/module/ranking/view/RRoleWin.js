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
var RRoleWin = (function (_super) {
    __extends(RRoleWin, _super);
    function RRoleWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "RRoleWinSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RRoleWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.viewStack.selectedIndex = 0;
    };
    RRoleWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.otherPlayerData = param[0];
        this.roleSelect.otherPlayerData = this.otherPlayerData;
        this.nameTxt.text = this.otherPlayerData.name;
        this.roleSelect.open();
        this.addTouchEvent(this, this.onClick);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.observe(PeakedSys.ins().postSignUp, this.upLikeDt);
        this.roleSelect.setCurRole(0);
        this.setRoleInfo();
        this.upLikeDt();
        this.roleInfoPanel.showZhanling(this.otherPlayerData);
    };
    RRoleWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onClick);
        this.roleInfoPanel.clear();
        if (this.closeFun)
            this.closeFun();
    };
    RRoleWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
        this.roleSelect.close();
        this.roleInfoPanel.close();
    };
    RRoleWin.prototype.upLikeDt = function () {
        if (this.likeBtn) {
            this.likeBtn.enabled = PeakedSys.ins().kideNum < GlobalConfig.PeakRaceBase.likeCount && PeakedRedpoint.ins().redpoint2 > 0;
        }
    };
    RRoleWin.prototype.setRoleInfo = function () {
        var _this = this;
        var tempData = this.otherPlayerData.roleData[0];
        var server = "[S" + this.otherPlayerData.serverId + "]";
        if (!this.otherPlayerData.serverId || this.otherPlayerData.serverId == LocationProperty.srvid)
            server = "";
        this.nameTxt.text = this.otherPlayerData.name + server;
        egret.callLater(function () {
            _this.guildNameText.x = _this.nameTxt.x + _this.nameTxt.textWidth + 10;
        }, this);
        this.guildNameText.text = this.otherPlayerData.guildName ? "\u516C\u4F1A\uFF1A" + this.otherPlayerData.guildName : "";
        var strLv = this.otherPlayerData.zhuan ? this.otherPlayerData.zhuan + "\u8F6C" : "";
        this.levelText.text = "" + strLv + this.otherPlayerData.level + "\u7EA7";
        this.headIcon.source = "head_" + tempData.job + tempData.sex;
        var lv = this.otherPlayerData.lilianLv;
        var config = GlobalConfig.TrainLevelConfig[lv];
        this.jueweiIcon.source = "juewei_1_" + config.type + "_png";
    };
    RRoleWin.prototype.onChange = function (e) {
        this.setView(this.roleSelect.getCurRole());
    };
    RRoleWin.prototype.setView = function (id) {
        if (id === void 0) { id = 0; }
        this.roleInfoPanel.curRole = this.roleSelect.getCurRole();
        this.roleInfoPanel.open(this.otherPlayerData);
    };
    RRoleWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                var uiview2 = ViewManager.ins().getView(UIView2);
                if (uiview2)
                    uiview2.closeNav(UIView2.NAV_ROLE);
                break;
            case this.likeBtn:
                if (PeakedSys.ins().isKf()) {
                    PeakedSys.ins().sendKFToLikes(this.otherPlayerData.id);
                }
                else {
                    PeakedSys.ins().sendToLikes(this.otherPlayerData.id);
                }
                break;
        }
    };
    RRoleWin.prototype.hideEx = function (type) {
        if (type === void 0) { type = 1; }
        switch (type) {
            case 1:
                this.roleInfoPanel.juesexiangxi.visible = false;
                this.roleInfoPanel.powerPanel.visible = false;
                if (this.likeBtn)
                    this.likeBtn.visible = true;
                break;
            case 2:
                this.roleInfoPanel.juesexiangxi.visible = false;
                this.roleInfoPanel.powerPanel.visible = false;
                if (this.likeBtn)
                    this.likeBtn.visible = false;
                break;
        }
    };
    return RRoleWin;
}(BaseEuiView));
__reflect(RRoleWin.prototype, "RRoleWin");
ViewManager.ins().reg(RRoleWin, LayerManager.UI_Main);
//# sourceMappingURL=RRoleWin.js.map