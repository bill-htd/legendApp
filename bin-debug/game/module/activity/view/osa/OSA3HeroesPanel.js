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
var OSA3HeroesPanel = (function (_super) {
    __extends(OSA3HeroesPanel, _super);
    function OSA3HeroesPanel() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.skinName = "OSA3Heroes";
        return _this;
    }
    OSA3HeroesPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.updateData();
    };
    OSA3HeroesPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.active, this.onTap);
        this.observe(ThreeHeroes.ins().postInfoChange, this.updateData);
        this.updateData();
    };
    OSA3HeroesPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.active, this.onTap);
        this.removeObserve();
    };
    OSA3HeroesPanel.prototype.onTap = function (e) {
        if (e.currentTarget == this.active) {
            if (ThreeHeroes.ins().awardState == ThreeHeroes.NotActive)
                ViewManager.ins().open(VipWin, [4]);
            else if (ThreeHeroes.ins().awardState == ThreeHeroes.CanGet)
                ThreeHeroes.ins().sendReward();
            else if (ThreeHeroes.ins().awardState == ThreeHeroes.Active)
                UserTips.ins().showTips("再登陆" + (GlobalConfig.LoginActivateConfig.loginDays - ThreeHeroes.ins().loginDays) + "天可领取20000元宝");
        }
    };
    OSA3HeroesPanel.prototype.getTime = function (activityData) {
        var openTime = GlobalConfig.GuildBattleConst.openServer;
        var date = new Date(activityData.startTime);
        var head = (date.getMonth() + 1) + "月" + date.getDate() + "日-";
        date = new Date(activityData.endTime - DateUtils.SECOND_PER_DAY * 1000);
        var end = (date.getMonth() + 1) + "月" + date.getDate() + "日" + "23:59";
        return head + end;
    };
    OSA3HeroesPanel.prototype.updateData = function () {
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
            this.actTime.text = this.getTime(activityData);
        }
        var state = ThreeHeroes.ins().awardState;
        this.active.enabled = state != ThreeHeroes.Geted;
        this.redPoint.visible = state == ThreeHeroes.CanGet;
        if (state == ThreeHeroes.NotActive) {
            this.active.label = "激活";
        }
        else if (state == ThreeHeroes.CanGet || state == ThreeHeroes.Active) {
            this.active.label = "领取奖励";
        }
        else {
            this.active.label = "已领取";
        }
        var config = GlobalConfig.ActivityBtnConfig[this.activityID];
        this.actInfo.text = config.acDesc;
        this.state.text = state == ThreeHeroes.Active ? ("再登陆" + (GlobalConfig.LoginActivateConfig.loginDays - ThreeHeroes.ins().loginDays) + "天可领取20000元宝") : "";
    };
    return OSA3HeroesPanel;
}(BaseView));
__reflect(OSA3HeroesPanel.prototype, "OSA3HeroesPanel");
//# sourceMappingURL=OSA3HeroesPanel.js.map