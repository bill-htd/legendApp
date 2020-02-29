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
var NewLilianWin = (function (_super) {
    __extends(NewLilianWin, _super);
    function NewLilianWin() {
        var _this = _super.call(this) || this;
        _this.barbc = new ProgressBarEff();
        _this.name = "\u7235\u4F4D";
        _this.isTopLevel = true;
        return _this;
    }
    NewLilianWin.prototype.childrenCreated = function () {
        this.list.itemRenderer = LiLianItem;
        this.itemList.itemRenderer = ItemBase;
        this.barbc.setWidth(525);
        this.barbc.x = 3;
        this.barbc.y = -15;
        this.expGroup.addChild(this.barbc);
        this.eff = new MovieClip;
        this.eff.x = 468;
        this.eff.y = 47;
        this.eff.scaleX = 0.85;
        this.eff.scaleY = 0.85;
        this.eff.touchEnabled = false;
        this.item4.isShowName(false);
        this.trainMc = {};
    };
    NewLilianWin.prototype.open = function () {
        this.addTouchEvent(this.list, this.onListTouch);
        this.addTouchEvent(this.upgradeBtn, this.onUpgrade);
        this.addTouchEvent(this.UplevelBtn0, this.onActive);
        this.addTouchEvent(this.reward, this.sendGetReward);
        this.observe(UserTask.ins().postTaskChangeData, this.setWinData);
        this.observe(LiLian.ins().postLilianData, this.onListChange);
        this.observe(LiLian.ins().postTrainsDayAward, this.updateProgress);
        for (var i = 1; i <= 4; i++) {
            this.addTouchEvent(this["isget" + i], this.onGiftClick);
        }
        this.barbc.reset();
        this.setWinData();
        this.showActPanel();
        this.activeTipsTxt0.text = "\u6FC0\u6D3B\u795E\u5668 \u9738\u8005\u4E4B\u8BC1 \u53EF\u5F00\u542F\u7235\u4F4D\u664B\u5347\u4E4B\u8DEF";
    };
    NewLilianWin.prototype.close = function () {
        this.removeTouchEvent(this.list, this.onListTouch);
        this.removeTouchEvent(this.upgradeBtn, this.onUpgrade);
        this.removeTouchEvent(this.UplevelBtn0, this.onActive);
        this.removeTouchEvent(this.reward, this.sendGetReward);
        DisplayUtils.removeFromParent(this.eff);
        for (var i in this.trainMc) {
            DisplayUtils.removeFromParent(this.trainMc[i]);
        }
        for (var i = 1; i <= 4; i++) {
            this.removeTouchEvent(this["isget" + i], this.onGiftClick);
        }
    };
    NewLilianWin.prototype.sendGetReward = function () {
        if (UserBag.ins().getSurplusCount() >= 1) {
            LiLian.ins().sendGetLilianReward();
        }
        else
            UserTips.ins().showTips("|C:0xff0000&T:背包已满，请清理背包|");
    };
    NewLilianWin.prototype.showActPanel = function () {
        this.Activation.visible = false;
        this.showAct.visible = !this.Activation.visible;
    };
    NewLilianWin.prototype.onActive = function (e) {
        switch (e.currentTarget) {
            case this.UplevelBtn0:
                if (!LiLian.ins().getLilianActiveState()) {
                    UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u9738\u8005\u4E4B\u8BC1 \u540E\u5F00\u542F");
                    e.$cancelable = true;
                    e.preventDefault();
                }
                break;
        }
    };
    NewLilianWin.prototype.onGiftClick = function (e) {
        for (var i = 1; i <= 4; i++) {
            if (e.currentTarget == this["isget" + i]) {
                var itemicon = this["gift" + i].getItemIcon();
                LiLian.ins().getTraining = true;
                this.flyItem(itemicon);
                LiLian.ins().sendTrainsDayAward(i);
                break;
            }
        }
    };
    NewLilianWin.prototype.flyItem = function (itemicon) {
        var flyItem = new eui.Image(itemicon.imgIcon.source);
        flyItem.x = itemicon.imgIcon.x;
        flyItem.y = itemicon.imgIcon.y;
        flyItem.width = itemicon.imgIcon.width;
        flyItem.height = itemicon.imgIcon.height;
        flyItem.scaleX = itemicon.imgIcon.scaleX;
        flyItem.scaleY = itemicon.imgIcon.scaleY;
        itemicon.imgIcon.parent.addChild(flyItem);
        GameLogic.ins().postFlyItemEx(flyItem);
    };
    NewLilianWin.prototype.onUpgrade = function (e) {
        var config = GlobalConfig.TrainLevelConfig[LiLian.ins().liLianLv + 1];
        if (!config)
            return;
        var exp = LiLian.ins().liLianExp;
        if (exp >= config.exp) {
            LiLian.ins().sendLilianUpgrade();
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:历练不足，无法升级|");
        }
    };
    NewLilianWin.prototype.onSeeSkill = function (e) {
        ViewManager.ins().open(LiLianTips);
    };
    NewLilianWin.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Label) {
            var item = e.target.parent;
            if (!item.isClose) {
                ViewManager.ins().close(LiLianWin);
            }
            FbWin.isClose = item.isClose;
            GameGuider.taskGuidance(item.data.id, 0);
            ViewManager.ins().close(LimitTaskView);
        }
    };
    NewLilianWin.prototype.onListChange = function (map) {
        var flag = map.flag;
        if (flag) {
            this.lilianUpgradeSuccess();
            this.setWinData();
        }
        this.showActPanel();
        if (LiLian.ins().isShow) {
            var config = GlobalConfig.TrainLevelConfig[LiLian.ins().liLianLv + 1];
            var img = "juewei" + "_" + config.type + "_1";
            Activationtongyong.show(0, config.trainName, img + "_png");
        }
    };
    NewLilianWin.prototype.setWinData = function () {
        var lv = LiLian.ins().liLianLv;
        this._totalPower = LiLian.ins().getPower();
        this.powerPanel.setPower(this._totalPower);
        var config = GlobalConfig.TrainLevelConfig[lv];
        if (ErrorLog.Assert(config, "LiLianPanel  config is null  lv = " + lv)) {
            return;
        }
        var imgType = config.type > 14 ? 14 : config.type;
        this.imgMedal.source = "juewei_1_" + imgType + "_png";
        this.levelImg.source = config.img ? config.img : "juewei_0_" + imgType + "_png";
        this.levelLabel.text = config.trainlevel + "\u7B49";
        var skillcfg = LiLian.ins().getCruLevelSkillCfg();
        this.attrTxt.text = AttributeData.getAttStr(config.attrAward, 0, 1, "：");
        var nextConfig = GlobalConfig.TrainLevelConfig[lv + 1];
        if (nextConfig) {
            var str = "";
            for (var i = 0; i < nextConfig.attrAward.length; i++) {
                str += nextConfig.attrAward[i].value;
                if (i < nextConfig.attrAward.length - 1)
                    str += "\n";
            }
            this.nextTxt.text = str;
            this.itemList.dataProvider = new eui.ArrayCollection(nextConfig.itemAward);
            this.currentState = "nomax";
            var tempStr = config.trainlevel == 1 ? nextConfig.trainName : "";
            this.levelLabel0.text = nextConfig.trainlevel + "\u7B49" + tempStr;
        }
        else {
            this.currentState = "max";
            this.itemList.dataProvider = new eui.ArrayCollection([]);
        }
        this.expChange();
        var taskList = UserTask.ins().task;
        this.list.dataProvider = new eui.ArrayCollection(taskList);
        this.list.validateNow();
        this.addRewardRefush();
        this.updateProgress();
    };
    NewLilianWin.prototype.addRewardRefush = function () {
        if (LiLian.ins().lilianReward > 0) {
            this.addReward.visible = true;
            var liliangReward = LiLian.ins().lilianReward;
            var tlac = GlobalConfig.GuanYinAwardConfig;
            var data = tlac[liliangReward];
            if (Assert(data, "获取神功达标奖励异常")) {
                return;
            }
            var itemData = new ItemData();
            itemData.configID = data.award.id;
            this.item4.data = itemData;
            this.reward.visible = this.reward.enabled = LiLian.ins().checkShowRedPoint2();
            this.tipsGroup.visible = !this.reward.visible;
            this.targetLevel.text = (data.level - LiLian.ins().liLianLv) + "";
        }
        else {
            this.addReward.visible = false;
            this.reward.enabled = false;
            this.tipsGroup.visible = false;
        }
    };
    NewLilianWin.prototype.expChange = function () {
        var config = GlobalConfig.TrainLevelConfig[LiLian.ins().liLianLv + 1];
        if (!config)
            config = GlobalConfig.TrainLevelConfig[LiLian.ins().liLianLv];
        var maxExp = config.exp;
        var exp = LiLian.ins().liLianExp;
        var boo = exp >= maxExp;
        if (boo) {
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
            if (!this.eff.parent)
                this.upInfo.addChild(this.eff);
        }
        else {
            DisplayUtils.removeFromParent(this.eff);
        }
        this.barbc.setData(exp, maxExp);
        this.redPoint.visible = LiLian.ins().getLilianBtnState();
        this.redPoint0.visible = LiLian.ins().checkShowRedPoint2();
    };
    NewLilianWin.prototype.lilianUpgradeSuccess = function () {
        var len = this.itemList.dataProvider.length;
        var resource = [];
        for (var i = 0; i < len; i++) {
            var item = this.itemList.getVirtualElementAt(i);
            resource.push(item.getItemSoure());
        }
        LiLian.ins().postGetLilianReward(resource);
    };
    NewLilianWin.prototype.updateProgress = function () {
        var train = LiLian.ins().getTrainDayAwardConfigs(GameServer.serverOpenDay + 1);
        if (train) {
            this.lilianed.text = LiLian.ins().liLianExpDay + "";
            for (var i in train) {
                var config = train[i];
                if (config) {
                    this["lilian" + i].text = config.score + "\u5386\u7EC3";
                    var cfg = GlobalConfig.ItemConfig[config.reward[0].id];
                    this["gift" + i].data = { id: config.reward[0].id, type: config.reward[0].type, count: config.reward[0].count };
                    this["gift" + i].isShowName(false);
                    this["bar" + i].maximum = 100;
                    this["lingqu" + i].touchEnabled = false;
                    if (LiLian.ins().liLianExpDayReward >> config.id & 1) {
                        this["bar" + i].value = 100;
                        this["lingqu" + i].visible = true;
                        this["isget" + i].touchEnabled = false;
                    }
                    else {
                        this["lingqu" + i].visible = false;
                        if (LiLian.ins().liLianExpDay >= config.score) {
                            this["bar" + i].value = 100;
                            this["isget" + i].touchEnabled = true;
                        }
                        else {
                            var preconfig = train[Number(i) - 1];
                            var expday = LiLian.ins().liLianExpDay;
                            var totalscore = config.score;
                            if (preconfig) {
                                expday = LiLian.ins().liLianExpDay - preconfig.score;
                                totalscore = config.score - preconfig.score;
                            }
                            expday = expday > 0 ? expday : 0;
                            this["bar" + i].value = Math.floor(expday / totalscore * 100);
                            this["isget" + i].touchEnabled = false;
                        }
                    }
                    this.updateTrainEff(config.id);
                }
            }
        }
    };
    NewLilianWin.prototype.updateTrainEff = function (id) {
        if (!this.trainMc[id])
            this.trainMc[id] = new MovieClip;
        var b = LiLian.ins().isGetTrainDayAward(id);
        this["redPoint" + id].visible = b;
        if (b) {
            if (!this.trainMc[id].parent) {
                this["eff" + id].parent.addChild(this.trainMc[id]);
                this.trainMc[id].playFile(RES_DIR_EFF + "openRole1", -1);
                this.trainMc[id].x = this["eff" + id].x;
                this.trainMc[id].y = this["eff" + id].y;
            }
        }
        else {
            DisplayUtils.removeFromParent(this.trainMc[id]);
        }
    };
    return NewLilianWin;
}(BaseEuiView));
__reflect(NewLilianWin.prototype, "NewLilianWin");
ViewManager.ins().reg(NewLilianWin, LayerManager.UI_Popup);
//# sourceMappingURL=NewLilianWin.js.map