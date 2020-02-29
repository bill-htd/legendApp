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
var LimitTaskItem = (function (_super) {
    __extends(LimitTaskItem, _super);
    function LimitTaskItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "LimitTimeItem";
        return _this;
    }
    LimitTaskItem.prototype.dataChanged = function () {
        this.goBtn.visible = true;
        this.done.visible = false;
        this.taskNameTxt.text = this.data.name;
        this.taskIcon.isShowName(false);
        this.taskIcon.data = this.data.awardList[0];
        this.progTxt.text = "(" + this.data.progress + "/" + this.data.target + ")";
        if (this.data.type == 83) {
            if (this.data.progress >= this.data.target) {
                this.progTxt.text = '1/1';
            }
            else {
                this.progTxt.text = '0/1';
            }
        }
        this.progTxt.textColor = 0xC41200;
        if (this.data.state == 0) {
            this.stateTxt.text = "进行中";
            this.goBtn.label = "前往";
        }
        else if (this.data.state == 1) {
            this.stateTxt.text = "可领取奖励";
            this.goBtn.label = "领取";
            this.progTxt.textColor = 0x499B4F;
        }
        else if (this.data.state == 2) {
            this.stateTxt.text = "已完成";
            this.goBtn.visible = false;
            this.done.visible = true;
            this.progTxt.textColor = 0x499B4F;
        }
        this.redPoint.visible = (this.data.state == 1);
        this.taskIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTopIcon, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    LimitTaskItem.prototype.onTopIcon = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    LimitTaskItem.prototype.onTap = function (e) {
        if (this.data.state == 0) {
            var para = this.data.controlTarget[1] ? this.data.controlTarget[1] : 0;
            if (this.data.controlTarget[0] == 'GuanQiaRewardWin') {
                this.gotoQuanQia();
                return;
            }
            ViewManager.ins().open(this.data.controlTarget[0], para);
        }
        else if (this.data.state == 1) {
            if (UserBag.ins().getSurplusCount() < 1) {
                UserTips.ins().showTips("\u80CC\u5305\u5269\u4F59\u7A7A\u4F4D\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u6E05\u7406");
            }
            else {
                UserTask.ins().sendGetLimitTaskReward(this.data.id);
            }
        }
    };
    LimitTaskItem.prototype.gotoQuanQia = function () {
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().closeTopLevel();
            ViewManager.ins().open(BagFullTipsWin);
        }
        else {
            if (UserFb.ins().currentEnergy >= UserFb.ins().energy) {
                ViewManager.ins().closeTopLevel();
                UserFb.ins().autoPk();
            }
            else {
                UserTips.ins().showTips("|C:0xf3311e&T:能量不足|");
            }
        }
        return false;
    };
    return LimitTaskItem;
}(BaseItemRender));
__reflect(LimitTaskItem.prototype, "LimitTaskItem");
//# sourceMappingURL=LimitTaskItem.js.map