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
var PersonalResultWin = (function (_super) {
    __extends(PersonalResultWin, _super);
    function PersonalResultWin() {
        var _this = _super.call(this) || this;
        _this.repeatTimes = 5;
        return _this;
    }
    PersonalResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "PersonalBossResultSkin";
        this.listCoin.itemRenderer = ResultCoinItem;
        this.listItem.itemRenderer = ItemBase;
        this.listData0 = new eui.ArrayCollection();
        this.list0.itemRenderer = DefeatItem;
    };
    PersonalResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this._fbType = GameMap.fbType;
        var result = param[0];
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
        if (GameMap.fbType == UserFb.FB_TYPE_GUARD_WEAPON)
            this.txt.text = "\u672C\u6B21\u51FB\u6740" + GuardWeaponModel.ins().getKillWave() + "\u6CE2\u602A\u7269";
        UserFb.ins().isQuite = true;
        if (param[3] instanceof Function) {
            this.closeFunc = param[3];
        }
        this.txt.visible = (result != 0);
        this.defeat.visible = (result == 0);
        this.addTouchEvent(this.closeBtn, this.onTap);
        if (result == 0)
            this.updateDefeatList();
        if (rewards)
            this.setRewardList(rewards);
        else
            this.setRewardList();
    };
    PersonalResultWin.prototype.setRewardList = function (rewards) {
        if (rewards === void 0) { rewards = []; }
        var coinData = [];
        var itemData = [];
        var soulData = [];
        var material = [];
        var rewardList = [];
        for (var i = 0; i < rewards.length; i++) {
            var itemConfig = GlobalConfig.ItemConfig[rewards[i].id];
            if (ItemConfig.getType(itemConfig) == 1) {
                if (material.length) {
                    var ishave = false;
                    for (var j = 0; j < material.length; j++) {
                        if (material[j].id == rewards[i].id) {
                            material[j].count += rewards[i].count;
                            ishave = true;
                            break;
                        }
                    }
                    if (!ishave)
                        material.push(rewards[i]);
                }
                else {
                    material.push(rewards[i]);
                }
                continue;
            }
            if (rewards[i].type == 0) {
                coinData.push(rewards[i]);
            }
            else {
                itemData.push(rewards[i]);
            }
        }
        this.labelItem.text = "获得道具：";
        this.labelItem.height = itemData.length > 0 ? 20 : 0;
        this.labelItem.visible = itemData.length > 0;
        coinData.sort(this.RuleSort);
        itemData.sort(this.RuleSortByItem);
        this.listCoin.dataProvider = new eui.ArrayCollection(coinData);
        rewardList = soulData.concat(coinData, material, itemData);
        this.listItem.dataProvider = new eui.ArrayCollection(rewardList);
    };
    PersonalResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        if (GameMap.fubenID > 0) {
            if (UserFb.ins().isQuite) {
                UserFb.ins().sendExitFb();
            }
        }
        if (this.closeFunc) {
            this.closeFunc();
            this.closeFunc = null;
        }
    };
    PersonalResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
    };
    PersonalResultWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    PersonalResultWin.prototype.updateDefeatList = function () {
        var gainWay = [];
        for (var i in GlobalConfig.DeathGuideConfig) {
            var cfg = GlobalConfig.DeathGuideConfig[i];
            if (UserZs.ins().lv <= cfg.zslv || Actor.level <= cfg.lv) {
                for (var j in cfg.gainWay) {
                    if (cfg.gainWay[j][0] == 14) {
                        var rch = Recharge.ins().getRechargeData(0);
                        if (rch.num && rch.num != 2) {
                            if (UserVip.ins().lv >= Object.keys(GlobalConfig.VipConfig).length)
                                continue;
                        }
                    }
                    else if (cfg.gainWay[j][0] == 16) {
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
    PersonalResultWin.prototype.RuleSort = function (a, b) {
        if (a.id < b.id)
            return -1;
        else
            return 1;
    };
    PersonalResultWin.prototype.RuleSortByItem = function (a, b) {
        var aItem = GlobalConfig.ItemConfig[a.id];
        var bItem = GlobalConfig.ItemConfig[b.id];
        var aq = ItemConfig.getQuality(aItem);
        var bq = ItemConfig.getQuality(bItem);
        if (aq > bq)
            return -1;
        else if (aq < bq)
            return 1;
        else {
            return 0;
        }
    };
    return PersonalResultWin;
}(BaseEuiView));
__reflect(PersonalResultWin.prototype, "PersonalResultWin");
ViewManager.ins().reg(PersonalResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=PersonalResultWin.js.map