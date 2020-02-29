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
var GuildCreateWin = (function (_super) {
    __extends(GuildCreateWin, _super);
    function GuildCreateWin() {
        var _this = _super.call(this) || this;
        _this.selectLevel = 1;
        return _this;
    }
    GuildCreateWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildBuildSkin";
        this.leftLab.textFlow = (new egret.HtmlTextParser()).parser(this.formatLab(1));
        this.rightLab.textFlow = (new egret.HtmlTextParser()).parser(this.formatLab(2));
    };
    GuildCreateWin.prototype.changeSelect = function (id) {
        this.selectLevel = id;
        this.selectBmp.x = this.selectLevel == 1 ? this.bg1.x : this.bg2.x;
    };
    GuildCreateWin.prototype.formatLab = function (level) {
        var gcc = GlobalConfig.GuildCreateConfig;
        var gc = GlobalConfig.GuildConfig;
        var vipLv = gcc[level].vipLv;
        var vipDesc = vipLv > 0 ? "<font color='#3a8fee'>(VIP" + vipLv + "\u53EF\u521B\u5EFA)</font>" : "";
        var tempAward = gcc[level].award == 0 ? "\n" : "\n返还<font color='#0FEE27'>" + gcc[level].award.toString() + "</font>公会贡献";
        var content = "<font color='#FFDB00' size='20'>" + gcc[level].level.toString() + "级</font>公会"
            + "\n" + vipDesc
            + "\n容纳<font color='#0FEE27'>" + gc.maxMember[level - 1] + "</font>公会成员"
            + tempAward
            + "\n\n创建消耗:<font color='#FFDB00'>" + gcc[level].moneyCount.toString() + "</font>元宝";
        var str = "<font color='#DFD1B5' size='16'>" + content + "</font>";
        return str;
    };
    GuildCreateWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildCreateWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.leftLab, this.onTap);
        this.addTouchEvent(this.rightLab, this.onTap);
        this.addTouchEvent(this.okBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    GuildCreateWin.prototype.onTap = function (e) {
        var _this = this;
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.okBtn: {
                var gcc = GlobalConfig.GuildCreateConfig;
                var dp = gcc[this.selectLevel];
                var vipLv = gcc[dp.level].vipLv;
                if (UserVip.ins().lv < vipLv) {
                    UserTips.ins().showTips("vip等级不足");
                    return;
                }
                if (this.textInput.text == "")
                    UserTips.ins().showTips("请输入行会名字");
                else if (Actor.yb < dp.moneyCount) {
                    UserTips.ins().showTips("元宝不足");
                    ViewManager.ins().close(this);
                }
                else {
                    WarnWin.show("\u4F60\u5C06\u6D88\u8017" + dp.moneyCount + "\u5143\u5B9D\uFF0C\u521B\u5EFA" + dp.level + "\u7EA7\u516C\u4F1A[" + this.textInput.text + "]\uFF0C\u786E\u5B9A\u521B\u5EFA\uFF1F", function () {
                        Guild.ins().sendGuildCreate(_this.selectLevel, _this.textInput.text);
                    }, this);
                }
                break;
            }
            case this.leftLab:
                this.changeSelect(1);
                break;
            case this.rightLab:
                this.changeSelect(2);
                break;
        }
    };
    return GuildCreateWin;
}(BaseEuiView));
__reflect(GuildCreateWin.prototype, "GuildCreateWin");
ViewManager.ins().reg(GuildCreateWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildCreateWin.js.map