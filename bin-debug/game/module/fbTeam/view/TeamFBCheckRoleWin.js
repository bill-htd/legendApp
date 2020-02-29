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
var TeamFBCheckRoleWin = (function (_super) {
    __extends(TeamFBCheckRoleWin, _super);
    function TeamFBCheckRoleWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "teamFbCheckSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TeamFBCheckRoleWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.viewStack.selectedIndex = 0;
    };
    TeamFBCheckRoleWin.prototype.open = function () {
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
        this.roleSelect.setCurRole(0);
        this.setRoleInfo();
    };
    TeamFBCheckRoleWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onClick);
        this.roleInfoPanel.clear();
    };
    TeamFBCheckRoleWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
        this.roleSelect.close();
        this.roleInfoPanel.close();
    };
    TeamFBCheckRoleWin.prototype.setRoleInfo = function () {
        var tempData = this.otherPlayerData.roleData[0];
        var server = "[S" + this.otherPlayerData.serverId + "]";
        if (!this.otherPlayerData.serverId || this.otherPlayerData.serverId == LocationProperty.srvid)
            server = "";
        this.nameTxt.text = this.otherPlayerData.name + server;
        this.guildNameText.x = this.nameTxt.x + this.nameTxt.textWidth + 10;
        this.guildNameText.text = this.otherPlayerData.guildName ? "\u516C\u4F1A\uFF1A" + this.otherPlayerData.guildName : "";
        var strLv = this.otherPlayerData.zhuan ? this.otherPlayerData.zhuan + "\u8F6C" : "";
        this.levelText.text = "" + strLv + this.otherPlayerData.level + "\u7EA7";
        this.headIcon.source = "head_" + tempData.job + tempData.sex;
        var lv = this.otherPlayerData.lilianLv;
        var config = GlobalConfig.TrainLevelConfig[lv];
        this.jueweiIcon.source = "juewei_1_" + config.type + "_png";
    };
    TeamFBCheckRoleWin.prototype.onChange = function (e) {
        this.setView(this.roleSelect.getCurRole());
    };
    TeamFBCheckRoleWin.prototype.setView = function (id) {
        if (id === void 0) { id = 0; }
        this.roleInfoPanel.curRole = this.roleSelect.getCurRole();
        this.roleInfoPanel.open(this.otherPlayerData);
    };
    TeamFBCheckRoleWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.closeBtn1:
                ViewManager.ins().close(this);
                break;
        }
    };
    return TeamFBCheckRoleWin;
}(BaseEuiView));
__reflect(TeamFBCheckRoleWin.prototype, "TeamFBCheckRoleWin");
ViewManager.ins().reg(TeamFBCheckRoleWin, LayerManager.UI_Popup);
//# sourceMappingURL=TeamFBCheckRoleWin.js.map