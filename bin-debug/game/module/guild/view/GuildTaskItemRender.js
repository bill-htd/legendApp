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
var GuildTaskItemRender = (function (_super) {
    __extends(GuildTaskItemRender, _super);
    function GuildTaskItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildTaskItemSkin";
        return _this;
    }
    GuildTaskItemRender.prototype.onTap = function (e) {
        switch (e) {
            case this.conBtn:
            case this.goBtn:
                this.conBtnOnCLick();
                break;
        }
    };
    GuildTaskItemRender.prototype.conBtnOnCLick = function () {
        var info = this.data;
        switch (info.stdTask.type) {
            case 31:
                if (info.param >= info.stdTask.target)
                    UserTips.ins().showTips("本日捐献次数已满");
                else if (Actor.yb >= info.stdTask.param) {
                    Guild.ins().sendCon(info.stdTask.conID);
                }
                else
                    UserTips.ins().showTips("元宝不足");
                break;
            case 32:
                if (info.param >= info.stdTask.target)
                    UserTips.ins().showTips("本日捐献次数已满");
                else if (Actor.gold >= info.stdTask.param) {
                    Guild.ins().sendCon(info.stdTask.conID);
                }
                else
                    UserWarn.ins().setBuyGoodsWarn(1);
                break;
            case 33:
                if (info.param >= info.stdTask.target)
                    UserTips.ins().showTips("本日捐献次数已满");
                else if (UserBag.ins().getBagGoodsCountById(0, info.stdTask.param) >= 1) {
                    Guild.ins().sendCon(info.stdTask.conID);
                }
                else
                    UserTips.ins().showTips("道具不足");
                break;
            default:
                GameGuider.guidance(info.stdTask.controlTarget[0], info.stdTask.controlTarget[1]);
                break;
        }
    };
    GuildTaskItemRender.prototype.goBtnOnClick = function () {
        var info = this.data;
        switch (info.state) {
            case 0:
                GameGuider.guidance(info.stdTask.controlTarget[0], info.stdTask.controlTarget[1]);
                break;
            case 1:
                Guild.ins().sendGetTaskAward(info.taskID);
                break;
            case 2:
                break;
        }
    };
    GuildTaskItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildTaskInfo) {
            var info = this.data;
            if (info) {
                this.taskIcon.source = "guildtask_" + info.taskID;
                this.nameLab.text = info.stdTask.name;
                this.descLab.text = info.stdTask.desc;
                this.conGroup.visible = true;
                this.getGroup.visible = false;
                this.numLab.text = info.param + "/" + info.stdTask.target;
                this.conBtn.enabled = info.param < info.stdTask.target;
                if (info.param < info.stdTask.target) {
                    switch (info.stdTask.type) {
                        case 31:
                        case 32:
                        case 33:
                            this.conBtn.label = "捐 献";
                            break;
                        default:
                            this.conBtn.label = "前 往";
                            break;
                    }
                }
                else
                    this.conBtn.label = "完 成";
            }
        }
    };
    return GuildTaskItemRender;
}(BaseItemRender));
__reflect(GuildTaskItemRender.prototype, "GuildTaskItemRender");
//# sourceMappingURL=GuildTaskItemRender.js.map