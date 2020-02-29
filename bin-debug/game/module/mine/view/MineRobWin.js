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
var MineRobWin = (function (_super) {
    __extends(MineRobWin, _super);
    function MineRobWin() {
        var _this = _super.call(this) || this;
        _this._stateIndex = 0;
        _this._states = ["plunder", "revenge", "done"];
        _this.skinName = "HandleSkin";
        return _this;
    }
    MineRobWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.robaward.itemRenderer = ItemBase;
        this.awardList.itemRenderer = ItemBase;
        this.recordList.itemRenderer = MineDoneRecordRender;
        this.addTouchEvent(this.handleBtn, this.onTap);
        this.addTouchEvent(this.double, this.onTap);
    };
    MineRobWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(Mine.ins().postRoleInfo, this.updateInfo);
        this._data = param[0];
        this.update();
    };
    MineRobWin.prototype.updateInfo = function (power) {
        if (this._stateIndex == 0) {
            this.power.text = "" + power;
        }
        else if (this._stateIndex == 1) {
            this.enemyPower.text = "" + power;
        }
    };
    MineRobWin.prototype.update = function () {
        if (this._data instanceof MineRecord) {
            this._stateIndex = 1;
            Mine.ins().sendGetRolePower(this._data.fighterActorID);
        }
        else if (this._data instanceof MineModel) {
            this._stateIndex = 0;
            Mine.ins().sendGetRolePower(this._data.actorID);
        }
        else {
            this._stateIndex = 2;
        }
        this.currentState = this._states[this._stateIndex];
        var config = GlobalConfig.KuangYuanConfig[this._data.configID];
        if (this._stateIndex == 0) {
            var data = this._data;
            this.Title.textColor = config.color;
            this.Title.text = config.name + "\uFF08\u53EF\u63A0\u593A\uFF09";
            this.owner.text = data.name;
            this.power.text = data.power + "";
            this.gang.text = data.guildName || "无";
            var maxRobCount = GlobalConfig.CaiKuangConfig.maxRobCount;
            this.workNum.text = "\u5269\u4F59\u6B21\u6570\uFF1A" + (maxRobCount - Mine.ins().robCount) + "/" + maxRobCount;
            this.awardList.dataProvider = new eui.ArrayCollection(this.getAward(config));
        }
        else if (this._stateIndex == 1) {
            var data = this._data;
            this.enemy.text = data.fighterName;
            this.enemyPower.text = data.fighterPower + "";
            this.myFace0.source = "head_" + data.fighterJob + data.fighterSex;
            this.time.text = DateUtils.getFormatBySecond((data.time / 1000) >> 0, DateUtils.TIME_FORMAT_2);
            this.robaward.dataProvider = new eui.ArrayCollection(this.getAward(config));
        }
        else {
            this.getAwardTxt(config);
            var npcConfig = GlobalConfig.NpcBaseConfig[config.npcId];
            this.worker.source = npcConfig.icon;
            this.nameTxt.text = config.name;
            this.nameTxt.textColor = config.color;
            this.cost.text = GlobalConfig.CaiKuangConfig.doubleCost + "";
            if (Mine.ins().finishedData.beRob.length) {
                this.noRob.visible = false;
            }
            else {
                this.noRob.visible = true;
            }
            this.recordList.dataProvider = new eui.ArrayCollection(Mine.ins().finishedData.beRob);
        }
    };
    MineRobWin.prototype.getAward = function (config) {
        var rewards = config.rewards;
        var awards = [];
        var percent = config.robPrecent;
        for (var i = 0; i < rewards.length; i++) {
            var data = new RewardData();
            data.type = rewards[i].type;
            data.id = rewards[i].id;
            data.count = Math.ceil(rewards[i].count * percent / 100);
            awards.push(data);
        }
        return awards;
    };
    MineRobWin.prototype.getAwardTxt = function (config) {
        var rewards = [].concat(config.rewards);
        if (config.rewardItem) {
            rewards = rewards.concat(config.rewardItem);
        }
        var roberNum = 0;
        for (var _i = 0, _a = Mine.ins().finishedData.beRob; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.win)
                roberNum += 1;
        }
        var str1 = "";
        var str2 = "";
        for (var i = 0; i < rewards.length; i++) {
            if (rewards[i].type == 0) {
                str1 += RewardData.getCurrencyName(rewards[i].id);
            }
            else {
                var itemConfig = GlobalConfig.ItemConfig[rewards[i].id];
                str1 += itemConfig.name;
            }
            str1 += "x" + rewards[i].count + "\n";
            if (roberNum && i < config.rewards.length) {
                var robCount = Math.ceil(rewards[i].count * config.robPrecent / 100) * roberNum;
                str2 += "-" + robCount + "\n";
            }
        }
        this.reward.text = str1;
        this.minus.text = str2;
    };
    MineRobWin.prototype.onTap = function (e) {
        var _this = this;
        var target = e.currentTarget;
        if (target == this.bgClose) {
            if (this._stateIndex != 2) {
                ViewManager.ins().close(this);
            }
        }
        else if (target == this.handleBtn) {
            if (this._stateIndex == 1) {
                Mine.ins().sendFightBack(this._data.index);
                MineFight.ins().start({ type: 1, id: this._data.configID, index: this._data.index });
            }
            else if (this._stateIndex == 0) {
                if (!MineRobWin.openCheck(this._data)) {
                    return;
                }
                Mine.ins().sendRob(this._data);
            }
            else {
                Mine.ins().sendGetAward();
            }
            ViewManager.ins().close(this);
            ViewManager.ins().close(MineRecordWin);
        }
        else if (target == this.double) {
            if (Actor.yb < GlobalConfig.CaiKuangConfig.doubleCost) {
                UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3", function () {
                    ViewManager.ins().close(_this);
                    UserFb.ins().sendExitFb();
                });
                return;
            }
            Mine.ins().sendGetAward(true);
            ViewManager.ins().close(this);
            ViewManager.ins().close(MineRecordWin);
        }
    };
    MineRobWin.prototype.close = function () {
    };
    MineRobWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var info = param[0];
        if (info instanceof MineModel) {
            if (info.actorID == Actor.actorID) {
                return false;
            }
            if (Mine.ins().robCount >= GlobalConfig.CaiKuangConfig.maxRobCount) {
                UserTips.ins().showCenterTips("|C:0xff0000&T:\u4ECA\u65E5\u63A0\u593A\u6B21\u6570\u5DF2\u7528\u5B8C|");
                return false;
            }
            if (info.beFightActorID.indexOf(Actor.actorID) >= 0) {
                UserTips.ins().showCenterTips("|C:0xff0000&T:\u5F53\u524D\u77FF\u5DE5\u5DF2\u88AB\u81EA\u5DF1\u63A0\u593A\u8FC7|");
                return false;
            }
            if (!MineData.ins().getMineByIndex(info.index, info.actorID)) {
                UserTips.ins().showCenterTips("\u77FF\u5DE5\u5DF2\u6D88\u5931");
                return false;
            }
            if (info.beFightActorID.length >= GlobalConfig.CaiKuangConfig.maxBeRobCount) {
                UserTips.ins().showCenterTips("\u5F53\u524D\u77FF\u5DE5\u5DF2\u88AB\u63A0\u593A\u5B8C");
                return false;
            }
            if (info.isBeFight) {
                UserTips.ins().showCenterTips("\u5F53\u524D\u77FF\u5DE5\u6B63\u5728\u88AB\u522B\u4EBA\u63A0\u593A");
                return false;
            }
        }
        return true;
    };
    return MineRobWin;
}(BaseEuiView));
__reflect(MineRobWin.prototype, "MineRobWin");
ViewManager.ins().reg(MineRobWin, LayerManager.UI_Popup);
//# sourceMappingURL=MineRobWin.js.map