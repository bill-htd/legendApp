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
var ResultWin = (function (_super) {
    __extends(ResultWin, _super);
    function ResultWin() {
        var _this = _super.call(this) || this;
        _this.winResult = 0;
        _this.repeatTimes = 5;
        _this.isBossResult = false;
        return _this;
    }
    ResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ResultSkin";
        this.listCoin.itemRenderer = ResultCoinItem;
        this.listItem.itemRenderer = ItemBase;
        this.listEmblem.itemRenderer = ItemBase;
        this.listData0 = new eui.ArrayCollection();
        this.list0.itemRenderer = DefeatItem;
        this.winnerEff = new MovieClip;
        this.winnerEff.x = 41;
        this.winnerEff.y = 41;
        this.winnerEff.touchEnabled = false;
    };
    ResultWin.prototype.sortFunc = function (a, b) {
        if (a.type == 1 && b.type == 1) {
            var aItem = GlobalConfig.ItemConfig[a.id];
            var bItem = GlobalConfig.ItemConfig[b.id];
            var aq = ItemConfig.getQuality(aItem);
            var bq = ItemConfig.getQuality(aItem);
            if (aq > bq)
                return -1;
            else if (aq < bq)
                return 1;
            else {
                if (aItem.level > bItem.level)
                    return -1;
                else if (aItem.level < bItem.level)
                    return 1;
            }
        }
        else {
            if (a.type < b.type)
                return -1;
            else if (a.type > b.type)
                return 1;
        }
        return 0;
    };
    ResultWin.prototype.showRune = function (result) {
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
    ResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this._fbType = GameMap.fbType;
        this.doublePrice.visible = false;
        var result = param[0];
        this.winResult = result;
        this.bg.source = result ? "win_png" : "lost_png";
        this.closeBtn.name = result ? "领取奖励" : "退出";
        this.title.source = result ? "win_02" : "lost_02";
        DieGuide.ins().postdieGuide(result);
        this.showRune(result);
        var closeTime = GameMap.fbType == UserFb.FB_TYPE_EXP ? 15 : 5;
        if (GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS || GameMap.fbType == UserFb.FB_TYPE_ALLHUMENBOSS || GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS || GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS) {
            closeTime = 10;
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_NEW_WORLD_BOSS) {
            closeTime = 21;
        }
        this.s = this.repeatTimes = closeTime;
        this.updateCloseBtnLabel();
        if (!CityCC.ins().isCity)
            TimerManager.ins().doTimer(1000, this.repeatTimes, this.updateCloseBtnLabel, this);
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
        if (CityCC.ins().isCity)
            UserFb.ins().isQuite = false;
        if (param[4]) {
            var isBelong = param[4][0];
            if (isBelong) {
                if (!this.winnerEff.parent)
                    this.effGroup.addChild(this.winnerEff);
                this.winnerEff.playFile(RES_DIR_EFF + "yanhuaeff", 1);
            }
            var tname = param[4][1] || "";
            var strlist = tname.split("\n");
            if (strlist[1])
                tname = strlist[1];
            else
                tname = strlist[0];
            tname = StringUtils.replaceStr(tname, "0xffffff", ColorUtil.ROLENAME_COLOR_GREEN + "");
            this.belongTxt.textFlow = TextFlowMaker.generateTextFlow1(tname);
            this.labelItem.text = isBelong ? "我的归属奖：" : "我的参与奖：";
            this.isBossResult = true;
            this.roleIcon.icon = param[4][2];
            this.roleIcon['jobImg'].visible = false;
            this.txt.text = "";
        }
        else {
            this.belongTxt.text = "";
        }
        this.txt.visible = (result != 0);
        this.defeat.visible = (result == 0);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.rewardBtn, this.onTap);
        this.addTouchEvent(this.openRole, this.onTap);
        this.addTouchEvent(this.openRole1, this.onTap);
        this.openRole.visible = false;
        this.defeat.y = 210;
        this.closeBtn.x = 90;
        if (result == 0) {
            if (GameMap.fubenID != 0)
                this.defeat.y = 110;
            this.updateDefeatList();
        }
        if (GameMap.fubenID != 0 && result == 1) {
            if (GameMap.fbType == UserFb.FB_TYPE_EXP) {
                this.closeBtn.label = "领取奖励";
            }
            else if (GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN) {
                var model = SkyLevelModel.ins();
                var info = GlobalConfig.FbChallengeConfig[model.cruLevel];
                if (info) {
                    if (UserZs.ins().lv >= info.zsLevelLimit && Actor.level >= info.levelLimit && SkyLevelModel.ins().lotteryRemainTimes == 0) {
                        this.rewardBtn.visible = true;
                        this.closeBtn.x = 0;
                        if (info.layer == 1) {
                            this.rewardBtn.label = "\u7EE7\u7EED\u6311\u6218";
                            this.rewardBtn.width = 130;
                        }
                        else {
                            this.rewardBtn.label = "\u6311\u6218\u7B2C" + info.layer + "\u5C42";
                            this.rewardBtn.width = 140;
                        }
                    }
                    else {
                        this.rewardBtn.visible = false;
                        this.closeBtn.x = 90;
                    }
                }
                else {
                    this.rewardBtn.visible = false;
                    this.closeBtn.x = 90;
                }
            }
            else if (GameMap.fbType == UserFb.FB_TYPE_NEW_WORLD_BOSS) {
                this.winnerGroup.visible = false;
                this.closeBtn.visible = false;
                this.rewardBtn.visible = false;
                this.txt.visible = false;
                this.wpkBoss.visible = true;
                this.wpkBoss.open();
            }
            else if (GameMap.fbType == UserFb.FB_TYPE_HUN_SHOU) {
                this.closeBtn.name = "退出";
                this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
                var layer = Hungu.ins().hunShouFBPassID;
                var isMax = layer >= Object.keys(GlobalConfig.FsFbConfig).length;
                if (!isMax) {
                    this.rewardBtn.visible = true;
                    this.closeBtn.x = 0;
                    this.rewardBtn.label = "\u6311\u6218\u7B2C" + (layer + 1) + "\u5C42";
                }
                else {
                    this.rewardBtn.visible = false;
                    this.closeBtn.x = 90;
                }
            }
            else {
                this.rewardBtn.visible = false;
            }
        }
        else {
            this.rewardBtn.visible = false;
        }
        if (rewards)
            this.setRewardList(rewards);
        else
            this.setRewardList();
    };
    ResultWin.prototype.setRewardList = function (rewards) {
        if (rewards === void 0) { rewards = []; }
        var coinData = [];
        var emblemData = [];
        var itemData = [];
        if (this.isBossResult) {
            this.winnerGroup.visible = true;
            this.scrollerGroup.y += 60;
            this.scrollerGroup.height = 336;
            this.labelEmblem.height = 0;
            this.labelItem.height = 20;
            this.labelEmblem.visible = false;
            this.labelItem.visible = true;
            var soulData = [];
            var rewardList = [];
            for (var i = 0; i < rewards.length; i++) {
                var itemConfig = GlobalConfig.ItemConfig[rewards[i].id];
                if (ItemConfig.getType(itemConfig) == 1) {
                    if (ResultWin.filterFb.indexOf(GameMap.fbType) != -1) {
                        emblemData.push(rewards[i]);
                    }
                    else {
                        if (emblemData.length) {
                            var ishave = false;
                            for (var j = 0; j < emblemData.length; j++) {
                                if (emblemData[j].id == rewards[i].id) {
                                    emblemData[j].count += rewards[i].count;
                                    ishave = true;
                                    break;
                                }
                            }
                            if (!ishave)
                                emblemData.push(rewards[i]);
                        }
                        else {
                            emblemData.push(rewards[i]);
                        }
                    }
                    continue;
                }
                if (rewards[i].type == 0) {
                    if (rewards[i].id == MoneyConst.soul) {
                        soulData.push(rewards[i]);
                    }
                    else {
                        coinData.push(rewards[i]);
                    }
                }
                else {
                    itemData.push(rewards[i]);
                }
            }
            itemData.sort(this.RuleSortByItem);
            rewardList = soulData.concat(coinData, emblemData, itemData);
            this.listItem.dataProvider = new eui.ArrayCollection(rewardList);
        }
        else {
            var soulData = [];
            var material = [];
            var rewardList = [];
            for (var i = 0; i < rewards.length; i++) {
                var itemConfig = GlobalConfig.ItemConfig[rewards[i].id];
                if (ItemConfig.getType(itemConfig) == 1) {
                    if (ResultWin.filterFb.indexOf(GameMap.fbType) != -1) {
                        material.push(rewards[i]);
                    }
                    else {
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
                    }
                    continue;
                }
                if (rewards[i].type == 0) {
                    coinData.push(rewards[i]);
                }
                else {
                    var conf = GlobalConfig.ItemConfig[rewards[i].id];
                    var type = ItemConfig.getType(conf);
                    if (type == ItemType.TYPE_6) {
                        itemData.push(rewards[i]);
                    }
                    else {
                        itemData.push(rewards[i]);
                    }
                }
            }
            this.winnerGroup.visible = false;
            this.scrollerGroup.height = 324;
            this.labelItem.text = "获得道具：";
            this.labelEmblem.height = emblemData.length > 0 ? 20 : 0;
            this.labelItem.height = itemData.length > 0 ? 20 : 0;
            this.labelEmblem.visible = emblemData.length > 0;
            this.labelItem.visible = itemData.length > 0;
            coinData.sort(this.RuleSort);
            itemData.sort(this.RuleSortByItem);
            this.listCoin.dataProvider = new eui.ArrayCollection(coinData);
            this.listEmblem.dataProvider = new eui.ArrayCollection(emblemData);
            rewardList = soulData.concat(coinData, material, itemData);
            this.listItem.dataProvider = new eui.ArrayCollection(rewardList);
        }
    };
    ResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        this.wpkBoss.close();
        for (var i = 1; i < 6; i++) {
            this.removeTouchEvent(this["img" + i], this.onTap);
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.openRole, this.onTap);
        this.removeTouchEvent(this.openRole1, this.onTap);
        if (GameMap.fubenID > 0) {
            if (UserFb.ins().isQuite) {
                UserFb.ins().sendExitFb();
            }
        }
        if (this._fbType == UserFb.FB_TYPE_MATERIAL) {
            ViewManager.ins().open(FbWin, 0);
        }
        else if (this._fbType == UserFb.FB_TYPE_GUILD_BOSS) {
            ViewManager.ins().open(GuildBossWin);
        }
        else if (this._fbType == UserFb.FB_TYPE_HOMEBOSS) {
            ViewManager.ins().open(BossWin, 5);
        }
        if (this.closeFunc) {
            this.closeFunc();
            this.closeFunc = null;
        }
        if (this.bossmc) {
            DisplayUtils.removeFromParent(this.bossmc);
            this.bossmc = null;
        }
        if (SkyLevelModel.ins().lotteryRemainTimes > 0 && GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN) {
            ViewManager.ins().open(BabelLotteryWin);
        }
    };
    ResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        if (CityCC.ins().isCity)
            this.closeBtn.label = "" + this.closeBtn.name;
        else
            this.closeBtn.label = this.closeBtn.name + "(" + this.s + "s)";
    };
    ResultWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.rewardBtn:
                if (GameMap.fbType == UserFb.FB_TYPE_HUN_SHOU) {
                    if (!Hungu.ins().hunShouFBTimes) {
                        UserTips.ins().showTips("\u5269\u4F59\u6B21\u6570\u4E0D\u8DB3");
                        return;
                    }
                    if (UserZs.ins().lv < GlobalConfig.FsFbConfig[Hungu.ins().hunShouFBPassID + 1].zsLevelLimit)
                        UserTips.ins().showTips("\u8F6C\u751F\u7B49\u7EA7\u4E0D\u8DB3");
                    else {
                        Hungu.ins().enterHunShouFB();
                        UserFb.ins().isQuite = false;
                    }
                }
                else {
                    UserFb2.ins().sendChallenge();
                    UserFb.ins().isQuite = false;
                }
                ViewManager.ins().close(this);
                break;
            case this.openRole:
            case this.openRole1:
                ViewManager.ins().close(this);
                ViewManager.ins().open(NewRoleWin);
                break;
        }
    };
    ResultWin.prototype.updateDefeatList = function () {
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
    ResultWin.prototype.RuleSort = function (a, b) {
        if (a.id < b.id)
            return -1;
        else
            return 1;
    };
    ResultWin.prototype.RuleSortByItem = function (a, b) {
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
    ResultWin.filterFb = [UserFb.FB_TYPE_MATERIAL];
    return ResultWin;
}(BaseEuiView));
__reflect(ResultWin.prototype, "ResultWin");
ViewManager.ins().reg(ResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=ResultWin.js.map