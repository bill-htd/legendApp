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
var GuanQiaTipsWin = (function (_super) {
    __extends(GuanQiaTipsWin, _super);
    function GuanQiaTipsWin() {
        var _this = _super.call(this) || this;
        _this.chapter = 0;
        _this.skinName = "CheckItemTipsSkin";
        _this.item0 = new ItemBase();
        _this.item0.x = 64;
        _this.item0.y = 46;
        _this.item0.scaleX = _this.item0.scaleY = 0.8;
        _this.reward.addChild(_this.item0);
        _this.item0.isShowName(false);
        _this.addTouchEvent(_this.rewardBtn, _this.onTap);
        _this.observe(UserFb.ins().postZhangJieAwardChange, _this.reflashChapter);
        _this.observe(UserFb.ins().postGuanqiaWroldReward, _this.reflashChapter);
        _this.rightIcon.visible = false;
        _this.chargeEff1 = new MovieClip;
        _this.chargeEff1.x = 100;
        _this.chargeEff1.y = 127;
        _this.chargeEff1.scaleX = 0.5;
        _this.chargeEff1.scaleY = 0.5;
        _this.addChild(_this.chargeEff1);
        return _this;
    }
    GuanQiaTipsWin.prototype.reflashChapter = function () {
        this.update(this.chapter);
    };
    GuanQiaTipsWin.prototype.updateDir = function (isLeft) {
        this.leftIcon.visible = isLeft;
        this.rightIcon.visible = !isLeft;
    };
    GuanQiaTipsWin.prototype.update = function (chapter) {
        this.chapter = chapter;
        var config = GlobalConfig.WorldRewardConfig[chapter];
        var lastConfig = GlobalConfig.WorldRewardConfig[chapter - 1];
        var laseLevel = 1;
        if (lastConfig) {
            laseLevel = lastConfig.needLevel + 1;
        }
        this.item0.data = config.rewards[0];
        var lastChapter = 0;
        lastChapter = laseLevel - UserFb.ins().guanqiaID;
        if (UserFb.ins().guanqiaID <= config.needLevel) {
            if (lastChapter > 0) {
                this.rew.text = "\u8DDD\u79BB" + config.name + "\u8FD8\u5DEE" + lastChapter + "\u5173";
            }
            else {
                this.rew.text = "\u8DDD\u79BB\u9886\u53D6\u5956\u52B1\u8FD8\u5DEE" + (config.needLevel - UserFb.ins().guanqiaID + 1) + "\u5173";
            }
            this.rew.visible = true;
            this.rewardBtn.visible = false;
            this.chargeEff1.visible = false;
            this.chargeEff1.stop();
        }
        else {
            this.rewardBtn.visible = true;
            if (UserFb.ins().isGetReceiveBox(chapter)) {
                this.rew.text = "";
                this.rewardBtn.enabled = false;
                this.chargeEff1.visible = false;
                this.chargeEff1.stop();
                this.rew.visible = true;
                this.rewardBtn.label = "已领取";
                this.rewardBtn.touchEnabled = false;
            }
            else {
                this.rewardBtn.enabled = true;
                this.rew.visible = false;
                this.rewardBtn.label = "领取";
                this.rewardBtn.touchEnabled = true;
                this.chargeEff1.visible = true;
                this.chargeEff1.playFile(RES_DIR_EFF + "chargeff1", -1);
            }
        }
    };
    GuanQiaTipsWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.rewardBtn:
                UserFb.ins().sendGuanqiaWroldReward(this.chapter);
                break;
        }
    };
    return GuanQiaTipsWin;
}(BaseView));
__reflect(GuanQiaTipsWin.prototype, "GuanQiaTipsWin");
//# sourceMappingURL=GuanQiaTipsWin.js.map