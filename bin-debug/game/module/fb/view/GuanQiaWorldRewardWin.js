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
var GuanQiaWorldRewardWin = (function (_super) {
    __extends(GuanQiaWorldRewardWin, _super);
    function GuanQiaWorldRewardWin() {
        var _this = _super.call(this) || this;
        _this.isReceive = false;
        _this.pass = 0;
        _this.rewardCount = 0;
        return _this;
    }
    GuanQiaWorldRewardWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "CheckWorldRewardSkin";
        this.isTopLevel = true;
    };
    GuanQiaWorldRewardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.update(param[0]);
    };
    GuanQiaWorldRewardWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
    };
    GuanQiaWorldRewardWin.prototype.update = function (pass) {
        this.isReceive = UserFb.ins().isReceiveBox(pass);
        this.pass = pass > 0 ? pass : 1;
        var config = GlobalConfig.WorldRewardConfig[this.pass];
        this.rewardCount = config.rewards.length;
        this.specialItem0.data = config.rewards[0];
        this.specialItem1.data = config.rewards[1];
        this.specialItem2.data = config.rewards[2];
        this.specialItem3.data = config.rewards[3];
        var levelStr;
        var chapterStr;
        if (pass > 1) {
            var lastConfig = GlobalConfig.WorldRewardConfig[this.pass - 1];
            levelStr = this.getLevelStr(lastConfig.needLevel, config.needLevel);
            chapterStr = lastConfig.needLevel + 1 + "-" + config.needLevel;
        }
        else {
            levelStr = this.getLevelStr(config.needLevel - 1, config.needLevel);
            chapterStr = "" + config.needLevel;
        }
        this.requireLabel.text = "\u901A\u5173\u7B2C" + chapterStr + "\u7AE0\uFF08" + levelStr + "\u5173\uFF09\u7684\u5956\u52B1";
        if (this.isReceive)
            this.closeBtn0.label = "领取";
        else
            this.closeBtn0.label = "确定";
    };
    GuanQiaWorldRewardWin.prototype.getLevelStr = function (value, total) {
        return value * 10 + 1 + "-" + total * 10;
    };
    GuanQiaWorldRewardWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.closeBtn0:
                if (this.isReceive)
                    this.sendReceiveReward();
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:通关地图才能领取奖励|");
                ViewManager.ins().close(this);
                break;
        }
    };
    GuanQiaWorldRewardWin.prototype.sendReceiveReward = function () {
        if (UserBag.ins().getSurplusCount() >= this.rewardCount)
            UserFb.ins().sendGuanqiaWroldReward(this.pass);
        else
            UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
    };
    return GuanQiaWorldRewardWin;
}(BaseEuiView));
__reflect(GuanQiaWorldRewardWin.prototype, "GuanQiaWorldRewardWin");
ViewManager.ins().reg(GuanQiaWorldRewardWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuanQiaWorldRewardWin.js.map