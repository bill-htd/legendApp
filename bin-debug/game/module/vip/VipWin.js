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
var VipWin = (function (_super) {
    __extends(VipWin, _super);
    function VipWin() {
        var _this = _super.call(this) || this;
        _this.barbc = new ProgressBarEff();
        _this._curLv = 0;
        _this.skinName = "VipSkin";
        return _this;
    }
    VipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.barbc.setWidth(320);
        this.barbc.x = 88;
        this.barbc.y = 10;
        this.topGroup.addChild(this.barbc);
        this.list.itemRenderer = ItemBase;
        this.list0.itemRenderer = ItemBase;
        this.vipValue = BitmapNumber.ins().createNumPic(0, "vip_v", 5);
        this.vipValue.x = 36;
        this.vipValue.y = 39;
        this.vipGroup.addChild(this.vipValue);
    };
    VipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.topUpBtn, this.onTap);
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.rightBtn, this.onTap);
        this.addTouchEvent(this.suerBtn, this.onTap);
        this.addTouchEvent(this.suerBtn0, this.onTap);
        this.observe(UserVip.ins().postUpdataExp, this.changeExpBar);
        this.observe(UserVip.ins().postUpdateVipAwards, this.changeAwards);
        this.observe(UserVip.ins().postUpdateVipData, this.changeAwards);
        this.observe(UserVip.ins().postUpdateWeekAwards, this.changeAwards);
        this.barbc.reset();
        this.changeExpBar();
        this.changeAwards();
        this._curLv = param[0] ? param[0] : this.getVipLevel();
        var playPunView = ViewManager.ins().getView(PlayFunView);
        if (playPunView) {
            if (playPunView.vip.visible)
                this._curLv = 3;
            playPunView.preVip = playPunView.vip.visible = false;
        }
        if (this._curLv) {
            var config = GlobalConfig.VipConfig[this._curLv];
            this.showVipInfo(config);
        }
    };
    VipWin.prototype.getVipLevel = function () {
        if (UserVip.ins().lv) {
            for (var i = 0; i < UserVip.ins().lv; i++) {
                if (!((UserVip.ins().state >> i) & 1)) {
                    return i + 1;
                }
            }
        }
        var maxVipLevel = Object.keys(GlobalConfig.VipConfig).length;
        if (UserVip.ins().lv >= maxVipLevel - 1)
            return maxVipLevel;
        return UserVip.ins().lv + 1;
    };
    VipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.topUpBtn, this.onTap);
        this.removeTouchEvent(this.leftBtn, this.onTap);
        this.removeTouchEvent(this.rightBtn, this.onTap);
        this.removeTouchEvent(this.suerBtn, this.onTap);
        this.removeObserve();
    };
    VipWin.prototype.onTap = function (e) {
        var config;
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(VipWin);
                break;
            case this.topUpBtn:
                ViewManager.ins().close(VipWin);
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || rdata.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                break;
            case this.leftBtn:
                config = GlobalConfig.VipConfig[--this._curLv];
                this.showVipInfo(config);
                break;
            case this.rightBtn:
                config = GlobalConfig.VipConfig[++this._curLv];
                this.showVipInfo(config);
                break;
            case this.suerBtn:
                config = GlobalConfig.VipConfig[this._curLv];
                var num = 0;
                var awards = config.awards;
                var len = awards.length;
                for (var i = 0; i < len; i++) {
                    if (awards[i].type == 1 && awards[i].id < 200000)
                        num++;
                }
                if (UserBag.ins().getSurplusCount() >= num)
                    UserVip.ins().sendGetAwards(this._curLv);
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                break;
            case this.suerBtn0:
                UserVip.ins().sendGetWeekAwards();
                break;
        }
    };
    VipWin.prototype.showVipInfo = function (config) {
        if (config) {
            this.setAwards(config);
        }
        else {
            this._curLv = UserVip.ins().lv;
        }
        this.changeBtn();
    };
    VipWin.prototype.changeExpBar = function () {
        var vipData = UserVip.ins();
        var config = GlobalConfig.VipConfig[vipData.lv];
        var curLv = 0;
        var curNeedYb = vipData.exp;
        if (config) {
            curLv = vipData.lv;
        }
        var nextConfig = GlobalConfig.VipConfig[curLv + 1];
        var nextNeedYb = 0;
        var ybValue = 0;
        var str = "";
        if (nextConfig) {
            nextNeedYb = nextConfig.needYb - curNeedYb;
            var needYb = nextNeedYb - ybValue;
            str = "再充值|C:0xFFAA24&T:" + nextNeedYb + "元宝|成为VIP" + (vipData.lv + 1);
            this.barbc.setData(curNeedYb, nextConfig.needYb);
        }
        else {
            str = "VIP等级已满";
            this.barbc.setData(curNeedYb, config.needYb);
            this.barbc.setLbValueText(curNeedYb + "/" + config.needYb);
        }
        this.titleLabel.textFlow = TextFlowMaker.generateTextFlow(str);
        config = GlobalConfig.VipConfig[this._curLv];
        this.showVipInfo(config);
    };
    VipWin.prototype.changeAwards = function () {
        var config;
        this._curLv = UserVip.ins().lv;
        if (this._curLv >= 0) {
            for (var i = 0; i < this._curLv; i++) {
                if (!this.getRemindByIndex(i) || this.checkWeekReward(i)) {
                    config = GlobalConfig.VipConfig[i + 1];
                    this._curLv = i + 1;
                    this.setAwards((config) ? config : config = GlobalConfig.VipConfig[--this._curLv]);
                    this.changeBtn();
                    return;
                }
            }
            config = GlobalConfig.VipConfig[++this._curLv];
            this.setAwards((config) ? config : config = GlobalConfig.VipConfig[--this._curLv]);
            this.changeBtn();
        }
    };
    VipWin.prototype.setAwards = function (config) {
        this.depictLabel.textFlow = TextFlowMaker.generateTextFlow(config.description);
        this.list.dataProvider = new eui.ArrayCollection(config.awards);
        this.list0.dataProvider = new eui.ArrayCollection(config.weekReward);
        this.vipImg.source = config.vipImg;
        var curNeedYb = UserVip.ins().exp;
        var needYb = config.needYb - curNeedYb;
        var str = "";
        if (needYb > 0) {
            str = "再充值|C:0xFFAA24&T:" + needYb + "元宝|成为VIP" + (config.id);
        }
        else {
            str = "";
        }
        this.more.textFlow = TextFlowMaker.generateTextFlow1(str);
        var str1 = "\u5145\u503C|C:0xFFAA24&T:" + config.needYb + "\u5143\u5B9D|\u6210\u4E3AVIP" + config.id;
        this.show.textFlow = TextFlowMaker.generateTextFlow1(str1);
        BitmapNumber.ins().changeNum(this.vipValue, UserVip.ins().lv, "vip_v", 3);
        if (UserVip.ins().lv < 10) {
            this.vipValue.x = 36;
            this.vipValue.y = 39;
        }
        else {
            this.vipValue.x = 26;
            this.vipValue.y = 39;
        }
        this.titleText.text = "VIP" + this._curLv + "\u7279\u6743";
        this.suerBtn.visible = false;
        this.suerBtn.enabled = false;
        if (this.mc) {
            DisplayUtils.removeFromParent(this.mc);
        }
        if (this.mc1) {
            DisplayUtils.removeFromParent(this.mc1);
        }
        if (this.getRemindByIndex(config.id - 1)) {
            this.suerBtn.visible = true;
            this.suerBtn.label = "已领取";
        }
        else {
            if (UserVip.ins().lv >= config.id) {
                this.suerBtn.visible = true;
                this.suerBtn.enabled = true;
                this.suerBtn.label = "领取";
                this.mc = this.mc || new MovieClip;
                this.mc.x = 49;
                this.mc.y = 22;
                this.mc.scaleX = 0.6;
                this.mc.scaleY = 0.85;
                this.mc.playFile(RES_DIR_EFF + 'chargeff1', -1);
                this.suerBtn.addChild(this.mc);
            }
        }
        if (UserVip.ins().lv == config.id) {
            this.suerBtn0.visible = true;
            if (UserVip.ins().weekState == 0) {
                this.suerBtn0.enabled = false;
                this.suerBtn0.label = "已领取";
            }
            else {
                this.suerBtn0.enabled = true;
                this.suerBtn0.label = "领取";
                this.mc1 = this.mc1 || new MovieClip;
                this.mc1.x = 49;
                this.mc1.y = 22;
                this.mc1.scaleX = 0.6;
                this.mc1.scaleY = 0.85;
                this.mc1.playFile(RES_DIR_EFF + 'chargeff1', -1);
                this.suerBtn0.addChild(this.mc1);
            }
        }
        else {
            this.suerBtn0.visible = false;
            this.suerBtn0.label = "领取";
        }
    };
    VipWin.prototype.getRemindByIndex = function (index) {
        var uservip = UserVip.ins();
        var state = uservip.state;
        if (uservip.lv <= 0)
            return false;
        return ((state >> index) & 1) == 1;
    };
    VipWin.prototype.checkWeekReward = function (index) {
        if (UserVip.ins().lv <= 0)
            return false;
        return (index + 1 == UserVip.ins().lv && UserVip.ins().weekState == 1);
    };
    VipWin.prototype.changeBtn = function () {
        if (this._curLv > 1) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
            if (this._curLv >= CommonUtils.getObjectLength(GlobalConfig.VipConfig))
                this.rightBtn.visible = false;
        }
        else if (this._curLv <= 1) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
    };
    return VipWin;
}(BaseEuiView));
__reflect(VipWin.prototype, "VipWin");
ViewManager.ins().reg(VipWin, LayerManager.UI_Popup);
//# sourceMappingURL=VipWin.js.map