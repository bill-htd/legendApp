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
var KfArenaMacthPanel = (function (_super) {
    __extends(KfArenaMacthPanel, _super);
    function KfArenaMacthPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u5339\u914D";
        return _this;
    }
    KfArenaMacthPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    KfArenaMacthPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.memberArr = [this.leader, this.member1, this.member2];
        this.dailyTime.text = "" + GlobalConfig.CrossArenaBase.joinCount;
        this.maxTime.text = "" + GlobalConfig.CrossArenaBase.maxJoinCount;
    };
    KfArenaMacthPanel.prototype.open = function () {
        this.addTouchEvent(this.disBtn, this.onTouch);
        this.addTouchEvent(this.macthBtn, this.onTouch);
        this.observe(KfArenaSys.ins().postPlayerInfo, this.updateInfo);
        this.observe(KfArenaSys.ins().postTeamInfo, this.update);
        this.observe(KfArenaSys.ins().postMacthState, this.update);
        this.update();
    };
    KfArenaMacthPanel.prototype.update = function () {
        this.updateMember();
        this.updateInfo();
        this.updateBtnState();
    };
    KfArenaMacthPanel.prototype.updateMember = function () {
        this.roleGroup.visible = KfArenaSys.ins().getIsJoinTeam();
        for (var _i = 0, _a = this.memberArr; _i < _a.length; _i++) {
            var member = _a[_i];
            member.data = null;
        }
        var tfMembers = KfArenaSys.ins().tfMembers;
        var index = 1;
        if (tfMembers && tfMembers.length) {
            for (var i = 0; i < tfMembers.length; i++) {
                var data = tfMembers[i];
                var isLeader = data.isLeader();
                if (isLeader) {
                    this.leader.data = data;
                }
                else {
                    this.memberArr[index].data = data;
                    index++;
                }
            }
        }
    };
    KfArenaMacthPanel.prototype.updateInfo = function () {
        var ins = KfArenaSys.ins();
        this.duanLabel.text = "\u5F53\u524D\u6BB5\u4F4D\uFF1A" + ins.getDuanName();
        this.scoreLabel.text = "\u5F53\u524D\u79EF\u5206\uFF1A" + ins.duanLevel;
        this.curMonthLabel.text = "\u5F53\u524D\u6218\u7EE9\uFF1A" + ins.curMouth.win + "\u80DC" + ins.curMouth.ping + "\u5E73" + ins.curMouth.fail + "\u8D25";
        this.historyLabel.text = "\u5386\u53F2\u6218\u7EE9\uFF1A" + ins.history.win + "\u80DC" + ins.history.ping + "\u5E73" + ins.history.fail + "\u8D25";
        this.countLabel.text = "" + ins.times;
        this.macthingLabel.visible = ins.macthState == 1;
    };
    KfArenaMacthPanel.prototype.updateBtnState = function () {
        if (!KfArenaSys.ins().getIsJoinTeam()) {
            this.disBtn.label = "\u521B\u5EFA\u6218\u961F";
            this.macthBtn.label = "\u5355\u4EBA\u5339\u914D";
        }
        else {
            if (KfArenaSys.ins().isTFCaptain)
                this.disBtn.label = "\u89E3\u6563\u6218\u961F";
            else
                this.disBtn.label = "\u79BB\u5F00\u6218\u961F";
            if (KfArenaSys.ins().macthState == 1)
                this.macthBtn.label = "\u53D6\u6D88\u5339\u914D";
            else
                this.macthBtn.label = "\u5F00\u59CB\u5339\u914D";
        }
    };
    KfArenaMacthPanel.prototype.onTouch = function (e) {
        if (KfArenaSys.ins().isStartIng == 0) {
            UserTips.ins().showCenterTips("\u6BCF\u65E512:00-12:30\u300122:00-22:30");
            return;
        }
        switch (e.target) {
            case this.disBtn:
                if (!KfArenaSys.ins().getIsJoinTeam()) {
                    KfArenaSys.ins().sendCreateTeam();
                    return;
                }
                KfArenaSys.ins().sendLeaveTeam();
                break;
            case this.macthBtn:
                if (KfArenaSys.ins().macthState == 1) {
                    if (!KfArenaSys.ins().isTFCaptain) {
                        UserTips.ins().showCenterTips("\u53EA\u6709\u961F\u957F\u624D\u53EF\u4EE5\u53D6\u6D88\u5339\u914D");
                        return;
                    }
                    KfArenaSys.ins().sendCancelMacth();
                    return;
                }
                if (!KfArenaSys.ins().getIsJoinTeam()) {
                    KfArenaSys.ins().sendPersonalMatch();
                    return;
                }
                if (!KfArenaSys.ins().isTFCaptain) {
                    UserTips.ins().showCenterTips("\u53EA\u6709\u961F\u957F\u624D\u53EF\u4EE5\u5F00\u59CB\u5339\u914D");
                    return;
                }
                KfArenaSys.ins().sendStartMacth();
                break;
        }
    };
    return KfArenaMacthPanel;
}(BaseEuiView));
__reflect(KfArenaMacthPanel.prototype, "KfArenaMacthPanel");
//# sourceMappingURL=KfArenaMacthPanel.js.map