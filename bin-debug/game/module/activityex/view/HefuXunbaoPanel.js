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
var Group = eui.Group;
var HefuXunbaoPanel = (function (_super) {
    __extends(HefuXunbaoPanel, _super);
    function HefuXunbaoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "hefuXunbao";
        return _this;
    }
    HefuXunbaoPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HefuXunbaoPanel.prototype.close = function () {
        this.removeTouchEvent(this.goBtn, this.onTap);
        TimerManager.ins().remove(this.playSkillAnmi, this);
    };
    HefuXunbaoPanel.prototype.open = function () {
        this.addTouchEvent(this.goBtn, this.onTap);
        if (!TimerManager.ins().isExists(this.playSkillAnmi, this))
            TimerManager.ins().doTimer(3000, 0, this.playSkillAnmi, this);
        this.initData();
    };
    HefuXunbaoPanel.prototype.initData = function () {
        this.playSkillAnmi();
        this.updateData();
    };
    HefuXunbaoPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.goBtn:
                ViewManager.ins().close(ActivityWin);
                ViewManager.ins().open(TreasureHuntWin);
                break;
        }
    };
    HefuXunbaoPanel.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor(activityData.startTime / 1000 - GameServer.serverTime / 1000);
        var endedTime = Math.floor(activityData.endTime / 1000 - GameServer.serverTime / 1000);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
        }
        else {
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        var btncfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        this.actDesc.textFlow = TextFlowMaker.generateTextFlow1(btncfg.acDesc);
    };
    HefuXunbaoPanel.prototype.playSkillAnmi = function () {
        var _this = this;
        for (var i = 1; i <= 2; i++) {
            if (!this["mc" + i])
                this["mc" + i] = new MovieClip;
        }
        var role = SubRoles.ins().getSubRoleByIndex(0);
        var mcSkillID = "skill40" + role.job;
        var targetSkillID = "skill" + (403 + role.job);
        var t = egret.Tween.get(this);
        if (!this["mc" + 1].parent)
            this["eff" + 1].addChild(this["mc" + 1]);
        this.mc1.playFile("res/skilleff/" + mcSkillID, 1, null, true);
        t.wait(1500).call(function () {
            if (!_this["mc" + 2].parent)
                _this["eff" + 2].addChild(_this["mc" + 2]);
            _this.mc2.playFile("res/skilleff/" + targetSkillID, 1, null, true);
        }, this);
    };
    return HefuXunbaoPanel;
}(BaseView));
__reflect(HefuXunbaoPanel.prototype, "HefuXunbaoPanel");
//# sourceMappingURL=HefuXunbaoPanel.js.map