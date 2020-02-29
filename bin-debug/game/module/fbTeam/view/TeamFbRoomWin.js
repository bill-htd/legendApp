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
var TeamFbRoomWin = (function (_super) {
    __extends(TeamFbRoomWin, _super);
    function TeamFbRoomWin() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this._room = 0;
        _this.skinName = "teamFbRoomSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TeamFbRoomWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemList.itemRenderer = ItemBase;
    };
    TeamFbRoomWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._state = args[0];
        this._config = GlobalConfig.TeamFuBenConfig[args[1]];
        this._room = args[2];
        this.observe(UserFb.ins().postFTRoomChange, this.onRoomInfoChange);
        this.observe(UserFb.ins().postCreateTFRoomSuccess, this.createSuccess);
        this.addTouchEvent(this, this.onTouch);
        this.update();
        this.onRoomInfoChange();
        ViewManager.ins().open(ChatMainUI);
    };
    TeamFbRoomWin.prototype.close = function () {
        ViewManager.ins().close(ChatMainUI);
    };
    TeamFbRoomWin.prototype.createSuccess = function () {
        this._room = UserFb.ins().tfRoomID;
        this.onRoomInfoChange();
    };
    TeamFbRoomWin.prototype.update = function () {
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.itemList.dataProvider = this._collect;
        }
        this._collect.source = this._config.rewardShow;
        this.fbName.text = this._config.name;
        this.passTxt.visible = false;
        this.infoText.visible = false;
        this.roleGroup.visible = true;
        this.challengeBtn.visible = false;
        this.leader.visible = this.member1.visible = this.member2.visible = false;
        if (this._state == 0) {
            this.roleGroup.visible = false;
            this.infoText.visible = true;
            this.infoText.textFlow = TextFlowMaker.generateTextFlow("\u901A\u5173" + GlobalConfig.TeamFuBenConfig[this._config.id - 1].name + "\u540E\u53EF\u5F00\u542F\u6311\u6218");
        }
        else if (this._state == 2) {
            this.passTxt.visible = true;
            this.member1.visible = this.member2.visible = false;
            var vo = new TeamFuBenRoleVo();
            var role = SubRoles.ins().getSubRoleByIndex(0);
            vo.roleID = Actor.actorID;
            vo.position = 1;
            vo.roleName = Actor.myName;
            vo.job = role.job;
            vo.sex = role.sex;
            vo.cloth = role.getEquipByIndex(2).item.configID;
            vo.weapon = role.getEquipByIndex(0).item.configID;
            vo.wingLv = role.wingsData.lv;
            vo.wingState = role.wingsData.openStatus;
            vo.pos1 = role.zhuangbei[0];
            vo.pos2 = role.zhuangbei[1];
            vo.pos3 = role.zhuangbei[2];
            vo.zs = UserZs.ins().lv;
            vo.lv = role.lv;
            this.leader.data = { vo: vo, configID: this._config.id };
            this.leader.visible = true;
        }
        else {
            this.challengeBtn.visible = true;
            if (this._room <= 0)
                UserFb.ins().sendCreateTFRoom();
        }
    };
    TeamFbRoomWin.prototype.onRoomInfoChange = function () {
        if (!this._room)
            return;
        var len = UserFb.ins().tfMembers ? UserFb.ins().tfMembers.length : 0;
        var vo, role;
        var arr = [this.member1, this.member2];
        for (var i = 0; i < len; i++) {
            if (UserFb.ins().tfMembers[i].position == 1)
                this.leader.data = { vo: UserFb.ins().tfMembers[i], configID: this._config.id };
            else {
                role = arr.shift();
                role.data = { vo: UserFb.ins().tfMembers[i], configID: this._config.id };
            }
        }
        len = arr.length;
        for (var i = 0; i < len; i++)
            arr[i].data = { vo: null, configID: this._config.id };
        arr.length = 0;
        arr = null;
        this.member1.visible = this.member1.data != null;
        this.member2.visible = this.member2.data != null;
        this.leader.visible = this.leader.data != null;
    };
    TeamFbRoomWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.challengeBtn:
                var date = new Date(GameServer.serverTime);
                if (date.getDay() == GlobalConfig.TeamFuBenBaseConfig.closeTime[0] && date.getHours() >= GlobalConfig.TeamFuBenBaseConfig.closeTime[1]) {
                    UserTips.ins().showTips("\u6BCF\u5468" + DateUtils.WEEK_CN[GlobalConfig.TeamFuBenBaseConfig.closeTime[0]] + GlobalConfig.TeamFuBenBaseConfig.closeTime[1] + "\u70B9\u540E\u4E0D\u80FD\u6311\u6218");
                    ViewManager.ins().close(this);
                    return;
                }
                if (!UserFb.ins().isTFCaptain) {
                    UserTips.ins().showTips("\u961F\u957F\u624D\u80FD\u5F00\u542F\u8FDB\u5165\u526F\u672C");
                    return;
                }
                UserFb.ins().sendBeginTF();
                ViewManager.ins().close(TeamFbRoomWin);
                break;
            case this.closeBtn0:
                if (this._state == 1) {
                    WarnWin.show("\u662F\u5426\u9000\u51FA\u623F\u95F4", function () {
                        UserFb.ins().sendExitTFRoom();
                        ViewManager.ins().close(TeamFbRoomWin);
                    }, this);
                }
                else
                    ViewManager.ins().close(this);
                break;
        }
    };
    return TeamFbRoomWin;
}(BaseEuiView));
__reflect(TeamFbRoomWin.prototype, "TeamFbRoomWin");
ViewManager.ins().reg(TeamFbRoomWin, LayerManager.UI_Popup);
//# sourceMappingURL=TeamFbRoomWin.js.map