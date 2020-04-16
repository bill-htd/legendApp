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
var FranchiseWin = (function (_super) {
    __extends(FranchiseWin, _super);
    function FranchiseWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SpecialCardSkin";
        return _this;
    }
    FranchiseWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Recharge.ins().postFranchiseInfo, this.setView);
        this.addTouchEvent(this.btn1, this.onTap);
        this.addTouchEvent(this.btn0, this.onTap);
        if (this.feng.visible) {
            this.btn1.visible = false;
            this.xianshi1.visible = false;
            this.xianshi2.visible = false;
            this.btn0.visible = false;
            if (this.first)
                this.first.visible = false;
        }
        else {
            if (Recharge.ins().franchise > 0) {
                TimerManager.ins().doTimer(1000, 0, this.setTimeLbel, this);
                this.setTimeLbel();
                this.btn1.visible = true;
                this.xianshi1.visible = false;
                this.xianshi2.visible = false;
                this.btn0.visible = false;
                this.setView();
            }
            else {
                this.depictLabel.textFlow = TextFlowMaker.generateTextFlow1(GlobalConfig.PrivilegeData.rightDesc);
                var colorMatrix = [
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ];
                var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                var monthCardPriceInfo = window['getmonthCardPriceInfo']();
                if (monthCardPriceInfo[1].status != 1) {
                    this.btn1.filters = [colorFlilter];
                }
                this.btn1.visible = true;
                TimerManager.ins().remove(this.setTimeLbel, this);
                this.first.visible = true;
                if (this.first)
                    this.first.visible = Recharge.ins().firstBuy ? true : false;
            }
            this.leftTime.visible = Recharge.ins().franchise > 0 ? true : false;
        }
        this.setIconEff();
    };
    FranchiseWin.prototype.setView = function () {
        if (!Recharge.ins().franchiseget) {
            this.btn1.label = "已领取";
            this.btn1.currentState = "disabled";
            this.btn1.touchEnabled = false;
        }
        else {
            this.btn1.currentState = "up";
            this.btn1.touchEnabled = true;
            this.btn1.label = "领取奖励";
        }
        if (this.first)
            this.first.visible = false;
    };
    FranchiseWin.prototype.setTimeLbel = function () {
        var endedTime = Recharge.ins().franchise;
        var str = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 1);
        str = "<font color='#35e62d'>\u5269\u4F59\u65F6\u95F4:" + str + "</font>";
        this.leftTime.textFlow = new egret.HtmlTextParser().parser(str);
    };
    FranchiseWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this.btn1, this.onTap);
        this.removeTouchEvent(this.btn0, this.onTap);
        TimerManager.ins().remove(this.setTimeLbel, this);
    };
    FranchiseWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.btn1:
                if (this.btn1.label != "领取奖励") {
                    var monthCardPriceInfo = window['getmonthCardPriceInfo']();
                    if (monthCardPriceInfo[1].status != 1) {
                        WarnWin.show(monthCardPriceInfo[1].msg, function () { }, this, function () { }, this, 'sure');
                    }
                    else {
                        Recharge.ins().showReCharge(88, 8800, 0);
                    }
                }
                else {
                    Recharge.ins().sendGetFranchise();
                }
                break;
            case this.btn0:
                Recharge.ins().showReCharge(100, 1, 1);
                break;
        }
    };
    FranchiseWin.prototype.setIconEff = function () {
        var config = GlobalConfig.TitleConf[17];
        if (!config)
            return;
        if (config.eff) {
            if (!this.mc)
                this.mc = new MovieClip;
            if (!this.mc.parent)
                this.titleMcGroup.addChild(this.mc);
            this.mc.playFile(RES_DIR_EFF + "chenghaozztq_big", -1);
        }
        else {
            if (!this.titleImg)
                this.titleImg = new eui.Image(config.img);
            if (!this.titleImg.parent)
                this.titleMcGroup.addChild(this.titleImg);
        }
        var power = 0;
        power = UserBag.getAttrPower(config.attrs) * 3;
        this.powerPanel.setPower(power);
    };
    return FranchiseWin;
}(BaseView));
__reflect(FranchiseWin.prototype, "FranchiseWin");
//# sourceMappingURL=FranchiseWin.js.map