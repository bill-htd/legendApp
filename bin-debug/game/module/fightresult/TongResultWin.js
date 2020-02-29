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
var TongResultWin = (function (_super) {
    __extends(TongResultWin, _super);
    function TongResultWin() {
        var _this = _super.call(this) || this;
        _this.repeatTimes = 5;
        return _this;
    }
    TongResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ChuangtianguanResultSkin";
        this.listCoin.itemRenderer = ResultCoinItem;
        this.listItem.itemRenderer = ItemBase;
        this.listData0 = new eui.ArrayCollection();
        this.list0.itemRenderer = DefeatItem;
    };
    TongResultWin.prototype.showRune = function (result) {
        if (GameMap.fbType != UserFb.FB_TYPE_TIAOZHAN) {
            return;
        }
        if (!result) {
            this.nune.visible = false;
            return;
        }
        var fbconfig = GlobalConfig.FbChallengeConfig[SkyLevelModel.ins().cruLevel - 1];
        if (!fbconfig || !fbconfig.showIcon) {
            this.nune.visible = false;
            return;
        }
        var item_config = GlobalConfig.ItemConfig[fbconfig.showIcon];
        var quality = ItemConfig.getQuality(item_config);
        if (quality == FBChallengePanel.RunType) {
            this.nune.visible = false;
            return;
        }
        this.nune.visible = true;
        this.scrollerGroup.y += this.nune.height * 3 / 2;
        var desc = "";
        if (fbconfig.equipPos) {
            this.nuneLock.visible = true;
            desc = "开启战纹槽：";
            this.oldValue.text = (fbconfig.equipPos - 1).toString();
            this.newValue.text = fbconfig.equipPos.toString();
        }
        else {
            this.nuneLock.visible = false;
            desc = "解锁类型：";
            this.nuneValue.text = fbconfig.describe;
        }
        this.nameLabel.text = desc;
        this.nuneValue.visible = !this.nuneLock.visible;
    };
    TongResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        var result = param[0];
        this.bg.source = result ? "win_png" : "lost_png";
        this.closeBtn.name = result ? "领取奖励" : "退出";
        this.title.source = result ? "win_02" : "lost_02";
        this.closeBtn.label = result ? "领取奖励" : "退出";
        DieGuide.ins().postdieGuide(result);
        this.showRune(result);
        var closeTime = 5;
        this.s = closeTime;
        this.repeatTimes = closeTime;
        this.updateNextLevelBtnLabel();
        TimerManager.ins().doTimer(1000, this.repeatTimes, this.updateNextLevelBtnLabel, this);
        var rewards = param[1];
        if (param[2])
            this.txt.text = param[2];
        UserFb.ins().isQuite = true;
        if (param[3] instanceof Function) {
            this.closeFunc = param[3];
        }
        else {
            if (param[3] == false) {
                UserFb.ins().isQuite = param[3];
            }
        }
        this.txt.visible = (result != 0);
        this.defeat.visible = (result == 0);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.rewardBtn, this.onTap);
        if (result == 0) {
            this.rewardBtn.visible = false;
            this.updateDefeatList();
        }
        else if (result == 1) {
            var model = SkyLevelModel.ins();
            var info = GlobalConfig.FbChallengeConfig[model.cruLevel];
            if (info) {
                this.rewardBtn.visible = true;
                this.closeBtn.x = 0;
                if (info.layer == 1) {
                    this.rewardBtn.label = "\u7EE7\u7EED\u6311\u6218";
                    this.rewardBtn.width = 130;
                }
                else {
                    this.rewardBtn.label = "\u6311\u6218\u7B2C" + info.layer + "\u5C42";
                    this.rewardBtn.name = "\u6311\u6218\u7B2C" + info.layer + "\u5C42";
                    this.rewardBtn.width = 140;
                }
            }
            else {
                this.rewardBtn.visible = false;
                this.closeBtn.x = 90;
            }
        }
        if (rewards)
            this.setRewardList(rewards);
        else
            this.setRewardList();
    };
    TongResultWin.prototype.setRewardList = function (rewards) {
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
        this.scrollerGroup.height = 324;
        this.labelItem.text = "获得道具：";
        this.labelItem.height = itemData.length > 0 ? 20 : 0;
        this.labelItem.visible = itemData.length > 0;
        coinData.sort(this.RuleSort);
        itemData.sort(this.RuleSortByItem);
        this.listCoin.dataProvider = new eui.ArrayCollection(coinData);
        rewardList = soulData.concat(coinData, material, itemData);
        this.listItem.dataProvider = new eui.ArrayCollection(rewardList);
    };
    TongResultWin.prototype.close = function () {
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
        if (SkyLevelModel.ins().lotteryRemainTimes > 0 && GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN) {
            ViewManager.ins().open(BabelLotteryWin);
        }
    };
    TongResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
    };
    TongResultWin.prototype.updateNextLevelBtnLabel = function () {
        this.s--;
        if (this.s <= 0) {
            UserFb2.ins().sendChallenge();
            UserFb.ins().isQuite = false;
            ViewManager.ins().close(this);
        }
        this.rewardBtn.label = this.rewardBtn.name + "(" + this.s + "s)";
    };
    TongResultWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.rewardBtn:
                UserFb2.ins().sendChallenge();
                UserFb.ins().isQuite = false;
                ViewManager.ins().close(this);
                break;
        }
    };
    TongResultWin.prototype.updateDefeatList = function () {
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
                    if (cfg.gainWay[j][0] == 14 || cfg.gainWay[j][0] == 20) {
                        var maxVipLv = Object.keys(GlobalConfig.VipConfig).length;
                        if (UserVip.ins().lv >= maxVipLv) {
                            continue;
                        }
                    }
                    gainWay.push(cfg.gainWay[j][0]);
                }
                break;
            }
        }
        this.listData0.source = gainWay;
        this.list0.dataProvider = this.listData0;
    };
    TongResultWin.prototype.RuleSort = function (a, b) {
        if (a.id < b.id)
            return -1;
        else
            return 1;
    };
    TongResultWin.prototype.RuleSortByItem = function (a, b) {
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
    return TongResultWin;
}(BaseEuiView));
__reflect(TongResultWin.prototype, "TongResultWin");
ViewManager.ins().reg(TongResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=TongResultWin.js.map