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
var MaterialResultWin = (function (_super) {
    __extends(MaterialResultWin, _super);
    function MaterialResultWin() {
        var _this = _super.call(this) || this;
        _this.winResult = 0;
        _this.repeatTimes = 5;
        return _this;
    }
    MaterialResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "DailyFbResultSkin";
        this.listItem.itemRenderer = ItemBase;
        this.listData0 = new eui.ArrayCollection();
        this.list0.itemRenderer = DefeatItem;
    };
    MaterialResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this._fbType = GameMap.fbType;
        var result = param[0];
        this.winResult = result;
        this.bg.source = result ? "win_png" : "lost_png";
        this.closeBtn.name = result ? "领取奖励" : "退出";
        this.title.source = result ? "win_02" : "lost_02";
        DieGuide.ins().postdieGuide(result);
        var closeTime = 5;
        this.s = this.repeatTimes = closeTime;
        this.updateCloseBtnLabel();
        TimerManager.ins().doTimer(1000, this.repeatTimes, this.updateCloseBtnLabel, this);
        var rewards = param[1];
        if (param[2])
            this.txt.text = param[2];
        this.txt.visible = (result != 0);
        this.defeat.visible = (result == 0);
        this.addTouchEvent(this.closeBtn, this.onTap);
        if (result == 0) {
            this.updateDefeatList();
        }
        if (rewards)
            this.setRewardList(rewards);
    };
    MaterialResultWin.prototype.setRewardList = function (rewards) {
        if (rewards === void 0) { rewards = []; }
        var material = [];
        for (var i = 0; i < rewards.length; i++) {
            var itemConfig = GlobalConfig.ItemConfig[rewards[i].id];
            if (ItemConfig.getType(itemConfig) == 1) {
                material.push(rewards[i]);
            }
        }
        this.listItem.dataProvider = new eui.ArrayCollection(material);
    };
    MaterialResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        UserFb.ins().sendExitFb();
        if (this._fbType == UserFb.FB_TYPE_MATERIAL)
            ViewManager.ins().open(FbWin, 0);
    };
    MaterialResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
    };
    MaterialResultWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    MaterialResultWin.prototype.updateDefeatList = function () {
        var gainWay = [];
        for (var i in GlobalConfig.DeathGuideConfig) {
            var cfg = GlobalConfig.DeathGuideConfig[i];
            if (UserZs.ins().lv <= cfg.zslv || Actor.level <= cfg.lv) {
                for (var j in cfg.gainWay) {
                    if (cfg.gainWay[j][0] == 16) {
                        var pic_img = DieGuide.ins().getOpenRoles();
                        if (pic_img) {
                            var desConfig = GlobalConfig.DeathgainWayConfig[cfg.gainWay[j][0]];
                            desConfig.itemId = pic_img;
                            gainWay.push(cfg.gainWay[j][0]);
                        }
                        continue;
                    }
                    gainWay.push(cfg.gainWay[j][0]);
                }
                break;
            }
        }
        this.listData0.source = gainWay;
        this.list0.dataProvider = this.listData0;
    };
    return MaterialResultWin;
}(BaseEuiView));
__reflect(MaterialResultWin.prototype, "MaterialResultWin");
ViewManager.ins().reg(MaterialResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=MaterialResultWin.js.map