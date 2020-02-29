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
var GameNoticePanle = (function (_super) {
    __extends(GameNoticePanle, _super);
    function GameNoticePanle() {
        var _this = _super.call(this) || this;
        _this.skinName = "gameNoticeSkin";
        return _this;
    }
    GameNoticePanle.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
    };
    GameNoticePanle.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var str = GlobalConfig.HelpInfoConfig[5].text;
        var strList = str.split("_");
        this.title.textFlow = TextFlowMaker.generateTextFlow(strList[0]);
        this.desc.textFlow = TextFlowMaker.generateTextFlow(window['game_notice'] || strList[1]);
        if (UserFuLi.ins().isOpenNotice) {
            UserFuLi.ins().isOpenNotice = false;
            Notice.ins().postGameNotice();
            Notice.ins().setNoticeOPen();
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.update);
        this.addTouchEvent(this, this.onTouch);
        this.update();
    };
    GameNoticePanle.prototype.update = function () {
        this._cfg = GlobalConfig.WelfareConfig[4];
        var activity = Activity.ins().getActivityDataById(this._cfg.activityId ? this._cfg.activityId : 0);
        if (activity) {
            this.updataReward.visible = true;
            this.suerBtn.enabled = activity.canReward();
            this.redPoint.visible = this.suerBtn.enabled;
            if (activity.getRewardStateById(1) == Activity.Geted) {
                this.yilingqu.visible = true;
                this.suerBtn.visible = false;
            }
            else {
                this.yilingqu.visible = false;
                this.suerBtn.visible = true;
            }
            if (!this._collect) {
                this._collect = new ArrayCollection();
                this.reward.dataProvider = this._collect;
            }
            this._collect.source = GlobalConfig.ActivityType1Config[this._cfg.activityId][1].rewards;
        }
        else
            this.updataReward.visible = false;
    };
    GameNoticePanle.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
    };
    GameNoticePanle.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.suerBtn:
                Activity.ins().sendReward(this._cfg.activityId, 1);
                break;
        }
    };
    return GameNoticePanle;
}(BaseView));
__reflect(GameNoticePanle.prototype, "GameNoticePanle");
//# sourceMappingURL=GameNoticePanle.js.map