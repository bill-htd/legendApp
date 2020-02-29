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
var RandBossWin = (function (_super) {
    __extends(RandBossWin, _super);
    function RandBossWin() {
        return _super.call(this) || this;
    }
    RandBossWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "RandBossSkin";
        this.list.itemRenderer = ItemBase;
        this.upVip.textFlow = new egret.HtmlTextParser().parser(StringUtils.addColor("<u>\u63D0\u5347VIP\u7B49\u7EA7</u>", '#23C42A'));
    };
    RandBossWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.sure, this.onTap);
        this.addTouchEvent(this.upVip, this.onTap);
        this.info = this.getUserInfoByItemId(param[0]);
        this.list.dataProvider = new eui.ArrayCollection(this.info.show);
        var num = UserFb.ins().bossCallNum;
        var maxNum = this.info.challengeTime[UserVip.ins().lv];
        this.playNum.text = maxNum - num + "/" + maxNum;
        this.lastNum = maxNum - num;
        this.bossdesc.text = this.info.titledes;
    };
    RandBossWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.sure, this.onTap);
        this.removeTouchEvent(this.upVip, this.onTap);
    };
    RandBossWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.sure:
                if (this.lastNum <= 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:今日召唤次数已用完|");
                    return;
                }
                if (Actor.level >= this.info.levelLimit) {
                    UserFb.ins().sendCallBossPlay(this.info.id);
                    ViewManager.ins().close(this);
                    ViewManager.ins().close(BagWin);
                    return;
                }
                UserTips.ins().showTips("|C:0xf3311e&T:等级达到" + this.info.levelLimit + "级可召唤|");
                break;
            case this.upVip:
                ViewManager.ins().open(VipWin);
                break;
        }
    };
    RandBossWin.prototype.getUserInfoByItemId = function (id) {
        var config = GlobalConfig.OtherBoss2Config;
        for (var i in config) {
            if (config[i].itemId == id) {
                return config[i];
            }
        }
        return null;
    };
    return RandBossWin;
}(BaseEuiView));
__reflect(RandBossWin.prototype, "RandBossWin");
ViewManager.ins().reg(RandBossWin, LayerManager.UI_Main);
//# sourceMappingURL=RandBossWin.js.map