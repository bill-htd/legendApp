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
var PersonalBossPanel = (function (_super) {
    __extends(PersonalBossPanel, _super);
    function PersonalBossPanel() {
        return _super.call(this) || this;
    }
    PersonalBossPanel.prototype.childrenCreated = function () {
        this.init();
    };
    PersonalBossPanel.prototype.init = function () {
        this.list.itemRenderer = PersonalBossItem;
        this.rewardList.itemRenderer = ItemBase;
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.scaleY = 1;
        this.bossImage.x = 78;
        this.bossImage.y = 165;
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
    };
    PersonalBossPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tempArrData = [];
        var arr = UserBoss.ins().getListData();
        var canPlayArr = arr[0], canNotPlayArr = arr[1], dieArr = arr[2];
        this.tempArrData = canPlayArr.concat(canNotPlayArr, dieArr);
        this.bossGroup.addChild(this.bossImage);
        this.tempIndex = 0;
        this.addTouchEvent(this.challengeBtn, this.onTap);
        this.listData.replaceAll(this.tempArrData);
        this.list.scrollV = 0;
        this.list.selectedIndex = 0;
        var index = 0;
        if (param[0])
            index = this.getIdFromBossId(param[0], canPlayArr);
        this.currData = this.list.dataProvider.getItemAt(index);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickMenu, this);
        this.setWin();
    };
    PersonalBossPanel.prototype.getIdFromBossId = function (bossId, canPlayArr) {
        for (var i = 0; i < canPlayArr.length; i++) {
            if (canPlayArr[i].bossId == bossId) {
                this.list.selectedIndex = i;
                return i;
            }
        }
        return 0;
    };
    PersonalBossPanel.prototype.onClickMenu = function (e) {
        this.currData = this.list.dataProvider.getItemAt(e.itemIndex);
        this.setWin();
    };
    PersonalBossPanel.prototype.setWin = function () {
        this.config = this.currData;
        var bossBaseConfig = GlobalConfig.MonstersConfig[this.config.bossId];
        var lvStr;
        if (!this.config.levelLimit && !this.config.zsLevel)
            lvStr = bossBaseConfig.level + "\u7EA7";
        else
            lvStr = this.config.zsLevel > 0 ? this.config.zsLevel + "\u8F6C" : this.config.levelLimit + "\u7EA7";
        this.nameTxt.text = bossBaseConfig.name + "(" + lvStr + ")";
        var str = "无";
        this.rewardList.dataProvider = new eui.ArrayCollection(this.config.showItem);
        if (this.currData.roleName != "") {
            str = this.currData.roleName;
            if (this.currData.guildName != "")
                str = str + "(" + this.currData.guildName + ")";
        }
        if (this.config.monthcard && !Recharge.ins().monthDay) {
            this.stateImage.source = "";
        }
        else if (this.config.specialCard && !Recharge.ins().franchise) {
            this.stateImage.source = "";
        }
        else {
            if (this.config.zsLevel <= UserZs.ins().lv && this.config.levelLimit <= Actor.level) {
                if (UserFb.ins().getFbDataById(this.currData.id).getCount() > 0) {
                    this.stateImage.source = "zdbosskejisha";
                }
                else {
                    this.stateImage.source = "zdbossyijisha";
                }
            }
            else {
                this.stateImage.source = "";
            }
        }
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        var bossLv = this.config.zsLevel * 1000 + this.config.levelLimit;
        var showChallenge;
        if (this.config.monthcard) {
            if (Recharge.ins().monthDay <= 0) {
                this.canChallengeTxt.text = "\u6708\u5361\u7279\u6743\u53EF\u6311\u6218";
                showChallenge = false;
            }
            else {
                this.canChallengeTxt.text = "";
                showChallenge = true;
            }
        }
        else if (this.config.specialCard) {
            if (!Recharge.ins().franchise) {
                this.canChallengeTxt.text = "\u81F3\u5C0A\u7279\u6743\u53EF\u6311\u6218";
                showChallenge = false;
            }
            else {
                this.canChallengeTxt.text = "";
                showChallenge = true;
            }
        }
        else if (this.config.privilege) {
            if (!Recharge.ins().getIsForeve()) {
                this.canChallengeTxt.text = "\u8D35\u65CF\u7279\u6743\u53EF\u6311\u6218";
                showChallenge = false;
            }
            else {
                this.canChallengeTxt.text = "";
                showChallenge = true;
            }
        }
        else {
            showChallenge = roleLv >= bossLv;
            this.canChallengeTxt.text = this.config.zsLevel > 0 ? this.config.zsLevel + "\u8F6C\u53EF\u6311\u6218" : this.config.levelLimit + "\u7EA7\u53EF\u6311\u6218";
        }
        this.challengeBtn.visible = showChallenge;
        this.canChallengeTxt.visible = !showChallenge;
        this.bossImage.playFile(RES_DIR_MONSTER + ("monster" + bossBaseConfig.avatar + "_3s"), -1);
        this.btnLabel();
    };
    PersonalBossPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.challengeBtn:
                if (UserFb.ins().checkInFB())
                    return;
                if (this.config.zsLevel <= UserZs.ins().lv && this.config.levelLimit <= Actor.level) {
                    if (UserFb.ins().getFbDataById(this.currData.id).getCount() <= 0) {
                        UserTips.ins().showTips("次数不足，无法挑战");
                        return;
                    }
                    var isPass = UserFb.ins().fbModel[this.config.id].isPass;
                    if (Recharge.ins().franchise && isPass) {
                        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                            ViewManager.ins().open(BagFullTipsWin);
                        }
                        else {
                            UserFb.ins().sendChallenge(this.config.id);
                        }
                        ViewManager.ins().close(LimitTaskView);
                    }
                    else {
                        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                            ViewManager.ins().open(BagFullTipsWin);
                        }
                        else {
                            if (!(UserZs.ins().lv >= this.config.sweepLevel && isPass)) {
                                ViewManager.ins().close(BossWin);
                            }
                            UserFb.ins().sendChallenge(this.currData.id);
                        }
                        ViewManager.ins().close(LimitTaskView);
                    }
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:等级不足，无法挑战|");
                }
                break;
        }
    };
    PersonalBossPanel.prototype.setOneData = function () {
    };
    PersonalBossPanel.prototype.close = function () {
        TimerManager.ins().remove(this.setOneData, this);
        this.tempArrData = null;
    };
    PersonalBossPanel.prototype.sortFun = function (config1, config2) {
        var count1 = UserFb.ins().getFbDataById(config1.id).getCount();
        var count2 = UserFb.ins().getFbDataById(config2.id).getCount();
        if (count1 > count2)
            return -1;
        if (count1 < count2)
            return 1;
        if (config1.zsLevel < config2.zsLevel)
            return -1;
        if (config1.zsLevel > config2.zsLevel)
            return 1;
        if (config1.levelLimit < config2.levelLimit)
            return -1;
        if (config1.levelLimit > config2.levelLimit)
            return 1;
        return 0;
    };
    PersonalBossPanel.prototype.btnLabel = function () {
        var isPass = UserFb.ins().fbModel[this.config.id].isPass;
        if (Recharge.ins().franchise && isPass) {
            this.challengeBtn.label = "快速挑战";
        }
        else if (UserZs.ins().lv >= this.config.sweepLevel && isPass) {
            this.challengeBtn.label = "快速挑战";
        }
        else {
            this.challengeBtn.label = "挑战";
        }
    };
    return PersonalBossPanel;
}(BaseView));
__reflect(PersonalBossPanel.prototype, "PersonalBossPanel");
//# sourceMappingURL=PersonalBossPanel.js.map