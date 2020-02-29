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
var TeamFbResultWin = (function (_super) {
    __extends(TeamFbResultWin, _super);
    function TeamFbResultWin() {
        var _this = _super.call(this) || this;
        _this._result = 0;
        _this.skinName = "teamFbResultSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TeamFbResultWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listItem.itemRenderer = ItemBase;
        this.listChallenger.itemRenderer = ChallengerHeadItemRender;
        this.listAssistant.itemRenderer = AssistantHeadItemRender;
        this.list0.itemRenderer = DefeatItem;
    };
    TeamFbResultWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._configID = args[0];
        this._result = args[1];
        this._list = args[2];
        this.addTouchEvent(this, this.onTouch);
        this.update();
    };
    TeamFbResultWin.prototype.close = function () {
    };
    TeamFbResultWin.prototype.update = function () {
        this.listItem.dataProvider = new ArrayCollection(GlobalConfig.TeamFuBenConfig[this._configID].rewardShow);
        this.title.source = this._result ? "result_json.win_02" : "result_json.lost_02";
        this.bg.source = this._result ? "win_png" : "lost_png";
        this.win.visible = this._result > 0;
        this.defeat.visible = this._result == 0;
        this._hasCaptain = false;
        var helpList = [];
        var vo;
        var isHelp;
        var isCaptain;
        for (var i = 0; i < this._list.length; i++) {
            if (this._list[i].position == 2) {
                vo = this._list.splice(i, 1)[0];
                helpList.push(vo);
                if (vo.roleID == Actor.actorID)
                    isHelp = true;
                i--;
            }
            else if (this._list[i].position == 1) {
                if (this._list[i].roleID == Actor.actorID)
                    isCaptain = true;
                this._hasCaptain = true;
            }
        }
        this.assResultTxt.visible = isHelp;
        if (this._result == 0)
            this.updateDefeatList();
        this.listChallenger.dataProvider = new ArrayCollection(this._list);
        var len = helpList.length;
        var newList = [];
        for (var i = 0; i < len; i++)
            newList.push({ vo: helpList[i], id: this._configID });
        this.listAssistant.dataProvider = new ArrayCollection(newList);
        this.closeBtn.visible = isCaptain && this._result == 1;
        if (this._result == 0 || this._configID >= Object.keys(GlobalConfig.TeamFuBenConfig).length) {
            this.closeBtn.horizontalCenter = 0;
            this.challengeBtn.visible = false;
        }
        else {
            this.closeBtn.horizontalCenter = -80;
            this.challengeBtn.visible = this.closeBtn.visible;
        }
        this._exitTime = 5;
        TimerManager.ins().doTimer(1000, 0, this.repeate, this);
        this.repeate();
    };
    TeamFbResultWin.prototype.updateDefeatList = function () {
        var gainWay = [];
        for (var i in GlobalConfig.DeathGuideConfig) {
            var cfg = GlobalConfig.DeathGuideConfig[i];
            if (UserZs.ins().lv <= cfg.zslv || Actor.level <= cfg.lv) {
                for (var j in cfg.gainWay) {
                    if (cfg.gainWay[j][0] == 16) {
                        var pic_img = DieGuide.ins().getOpenRoles();
                        if (pic_img) {
                            var desConfig = GlobalConfig.DeathgainWayConfig[cfg.gainWay[j][0]];
                            desConfig.itemId = pic_img;
                            gainWay.push(cfg.gainWay[j][0]);
                        }
                        continue;
                    }
                    gainWay.push(cfg.gainWay[j][0]);
                }
                break;
            }
        }
        this.list0.dataProvider = new ArrayCollection(gainWay);
    };
    TeamFbResultWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.exitFb();
                break;
            case this.challengeBtn:
                this.exitFb(1);
                break;
            case this.openRole:
            case this.openRole1:
                ViewManager.ins().close(this);
                ViewManager.ins().open(NewRoleWin);
                break;
        }
    };
    TeamFbResultWin.prototype.repeate = function () {
        this.closeBtn.label = "退出(" + this._exitTime + "s)";
        this.assResultTxt.text = "等待队长操作（" + this._exitTime + "s）";
        if (this._exitTime <= 0) {
            TimerManager.ins().removeAll(this);
            this.exitFb();
            return;
        }
        this._exitTime--;
    };
    TeamFbResultWin.prototype.exitFb = function (type) {
        if (type === void 0) { type = 0; }
        if (this._result == 0 || this._configID >= Object.keys(GlobalConfig.TeamFuBenConfig).length)
            UserFb.ins().sendExitFb();
        else {
            if (this._hasCaptain)
                UserFb.ins().sendExitTFFb(type);
            else
                UserFb.ins().sendExitFb();
        }
        ViewManager.ins().close(this);
    };
    return TeamFbResultWin;
}(BaseEuiView));
__reflect(TeamFbResultWin.prototype, "TeamFbResultWin");
ViewManager.ins().reg(TeamFbResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=TeamFbResultWin.js.map