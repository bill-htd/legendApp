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
var NewWorldBossUIView = (function (_super) {
    __extends(NewWorldBossUIView, _super);
    function NewWorldBossUIView() {
        var _this = _super.call(this) || this;
        _this.GRAYIMG_WIDTH = 0;
        _this.leftTime = 0;
        _this._curMonsterID = 0;
        _this.curValue = 1;
        _this.skinName = "wpkBossUiSkin";
        return _this;
    }
    NewWorldBossUIView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bossBloodGroup.visible = false;
        this.leftTimeGroup.visible = false;
        this.dropDown.visible = false;
        this.dropDown.setEnabled(false);
        this.attList.visible = false;
        this.attList0.visible = false;
        this.grayImg.source = "bosshp2";
        this.grayImgMask = new egret.Rectangle(0, 0, this.grayImg.width, this.grayImg.height);
        this.grayImg.mask = this.grayImgMask;
        this.GRAYIMG_WIDTH = this.grayImg.width;
    };
    NewWorldBossUIView.prototype.open = function () {
        this.observe(UserBoss.ins().postHpChange, this.reflashBlood);
        this.observe(UserBoss.ins().postBossAppear, this.reflashBlood);
        this.observe(UserBoss.ins().postNewBossReliveTime, this.updateReliveTime);
        this.observe(UserBoss.ins().postNewBossOpen, this.updateTime);
        this.observe(UserBoss.ins().postNewBossRank, this.updateRank);
        this.observe(UserBoss.ins().postAddAttrNum, this.updateAttr);
        this.addTouchEvent(this.guwu, this.onTap);
        this.addTouchEvent(this.tipBtn0, this.onTap);
        this.initView();
    };
    NewWorldBossUIView.prototype.initView = function () {
        this.updateTime();
        this.updateReliveTime();
        this.updateAttr();
        this.dropDown.currentState = "down";
        this.bossConfig = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (!this.bossConfig) {
            return;
        }
        this.updateBaseInfo();
        this.reflashBlood();
    };
    NewWorldBossUIView.prototype.updateTime = function () {
        var time = UserBoss.ins().newWorldBossData.startTime;
        var isOpen = UserBoss.ins().newWorldBossData.isOpen;
        if (!isOpen || !time) {
            this.leftTimeGroup.visible = false;
            return;
        }
        var overTime = Math.floor((GameServer.serverTime - time) / 1000);
        if (overTime <= 0 || overTime >= GlobalConfig.NewWorldBossBaseConfig.bossTime) {
            this.leftTimeGroup.visible = false;
            return;
        }
        this.leftTimeGroup.visible = true;
        this.leftTime = GlobalConfig.NewWorldBossBaseConfig.bossTime - overTime;
        if (!TimerManager.ins().isExists(this.setTime, this)) {
            TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        }
        this.setTime();
    };
    NewWorldBossUIView.prototype.setTime = function () {
        this.lastTime.text = DateUtils.getFormatBySecond(this.leftTime, DateUtils.TIME_FORMAT_10);
        if (this.leftTime > 0) {
            this.leftTime -= 1;
        }
    };
    NewWorldBossUIView.prototype.updateReliveTime = function () {
        if (UserBoss.ins().reliveTime > 0) {
            ViewManager.ins().open(WorldBossBeKillWin);
        }
        else {
            ViewManager.ins().close(WorldBossBeKillWin);
        }
    };
    NewWorldBossUIView.prototype.updateBaseInfo = function () {
        this.bossConfig = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (!this.bossConfig) {
            return;
        }
        this._curMonsterID = UserBoss.ins().monsterID;
        this.nameTxt.text = this.bossConfig.name;
        this.head.source = "monhead" + this.bossConfig.head + "_png";
        this.lvTxt.text = "Lv." + this.bossConfig.level;
    };
    NewWorldBossUIView.prototype.reflashBlood = function () {
        if (this._curMonsterID != UserBoss.ins().monsterID) {
            this.updateBaseInfo();
        }
        this.bossConfig = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (!this.bossConfig) {
            this.bossBloodGroup.visible = false;
            this.leftTimeGroup.visible = false;
            return;
        }
        var charm = EntityManager.ins().getEntityByHandle(UserBoss.ins().bossHandler);
        if (!charm || !charm.infoModel || charm.infoModel.getAtt(AttributeType.atHp) <= 0) {
            this.bossBloodGroup.visible = false;
            this.leftTimeGroup.visible = false;
            return;
        }
        var monstermodel = charm ? charm.infoModel : null;
        if (monstermodel) {
            this.bloodBar.maximum = monstermodel.getAtt(AttributeType.atMaxHp);
            this.bloodBar.value = monstermodel.getAtt(AttributeType.atHp);
            this.bossBloodGroup.visible = this.bloodBar.value > 0;
        }
        else {
            this.bloodBar.maximum = this.bossConfig.hp;
            this.bloodBar.value = this.bossConfig.hp;
            this.bossBloodGroup.visible = this.bloodBar.value > 0;
        }
        if (!this.bossBloodGroup.visible)
            this.leftTimeGroup.visible = false;
        this.dropDown.visible = true;
        this.updateRank();
        this.curValue = Math.floor(this.bloodBar.value / this.bloodBar.maximum * 100);
        this.tweenBlood();
    };
    NewWorldBossUIView.prototype.tweenBlood = function () {
        var _this = this;
        var bloodPer = (this.curValue * this.GRAYIMG_WIDTH) / 100;
        var self = this;
        egret.Tween.removeTweens(this.grayImgMask);
        if (bloodPer < 3)
            return;
        var t = egret.Tween.get(this.grayImgMask, {
            onChange: function () {
                if (self.grayImg)
                    self.grayImg.mask = _this.grayImgMask;
            }
        }, self);
        t.to({ "width": bloodPer - 3 }, 1000).call(function () {
            if (bloodPer <= 0) {
                self.grayImgMask.width = this.GRAYIMG_WIDTH;
                egret.Tween.removeTweens(this.grayImgMask);
            }
        }, self);
    };
    NewWorldBossUIView.prototype.updateRank = function () {
        var dataArr = UserBoss.ins().newWorldBossData.rankList ? UserBoss.ins().newWorldBossData.rankList.concat() : [];
        var len = dataArr.length;
        if (len) {
            if (len > 10) {
                len = 10;
            }
            var showArr = dataArr.slice(1, len);
            this.dropDown.setData(showArr);
            this.dropDown.setLabel(dataArr[0].roleName + ":" + CommonUtils.overLength(dataArr[0].value));
        }
        else {
            this.dropDown.setData([]);
            this.dropDown.setLabel('');
        }
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].id == Actor.actorID) {
                var txt = CommonUtils.overLength(dataArr[i].value);
                this.myTxt.text = "\u81EA\u5DF1\uFF1A" + txt;
                break;
            }
        }
    };
    NewWorldBossUIView.prototype.updateAttr = function () {
        var count = UserBoss.ins().newWorldBossData.addAttrNum || 0;
        var curConf = GlobalConfig.NewWorldBossAttrConfig[count];
        var nextConf = GlobalConfig.NewWorldBossAttrConfig[count + 1];
        var str = "";
        var curAttr = { type: 0, value: 0 };
        var nextAttr = { type: 0, value: 0 };
        if (nextConf) {
            for (var i = 0; i < nextConf.attr.length; i++) {
                if (i > 0)
                    str += "\n";
                nextAttr.type = nextConf.attr[i].type;
                nextAttr.value = nextConf.attr[i].value;
                curAttr.type = nextAttr.type;
                curAttr.value = 0;
                if (curConf && curConf.attr[i]) {
                    curAttr.value = curConf.attr[i].value;
                }
                str += AttributeData.getAttStrByType(curAttr, 0, ":", false);
                nextAttr.value -= curAttr.value;
                str += AttributeData.getAttStrByType(nextAttr, 0, "+", false, false);
            }
            if (!this.costGroup.parent) {
                this.timeGroup.addChildAt(this.costGroup, 0);
            }
        }
        else {
            for (var i = 0; i < curConf.attr.length; i++) {
                if (i > 0)
                    str += "\n";
                str += AttributeData.getAttStrByType(curConf.attr[i], 0, ":", false);
            }
            if (this.costGroup.parent) {
                this.costGroup.parent.removeChild(this.costGroup);
            }
        }
        this.guwuNum.text = str;
        this.guwutime.text = count + "/" + Object.keys(GlobalConfig.NewWorldBossAttrConfig).length;
        var conf = nextConf || curConf;
        if (conf.type == 1) {
            this.typeImg.source = "szjinbi";
        }
        else if (conf.type == 2) {
            this.typeImg.source = "szyuanbao";
        }
        this.cost.text = conf.count + "";
    };
    NewWorldBossUIView.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.guwu) {
            if (UserBoss.ins().newWorldBossData.addAttrNum == Object.keys(GlobalConfig.NewWorldBossAttrConfig).length) {
                UserTips.ins().showTips("\u9F13\u821E\u6B21\u6570\u5DF2\u7528\u5B8C");
                return;
            }
            var count = UserBoss.ins().newWorldBossData.addAttrNum || 0;
            var nextConf = GlobalConfig.NewWorldBossAttrConfig[count + 1];
            if (nextConf) {
                if (nextConf.type == 1 && Actor.gold < nextConf.count) {
                    UserTips.ins().showTips("\u91D1\u5E01\u4E0D\u8DB3");
                    return;
                }
                else if (nextConf.type == 2 && Actor.yb < nextConf.count) {
                    UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
                    return;
                }
            }
            UserBoss.ins().sendBuyAddAttrNum();
        }
        else if (tar == this.tipBtn0) {
            ViewManager.ins().open(NewBossJiangliView);
        }
    };
    NewWorldBossUIView.prototype.close = function () {
        TimerManager.ins().removeAll(this);
        WatcherUtil.removeFromArray(UserBoss.ins().newWorldBossData.rankList);
        this._curMonsterID = 0;
    };
    return NewWorldBossUIView;
}(BaseEuiView));
__reflect(NewWorldBossUIView.prototype, "NewWorldBossUIView");
ViewManager.ins().reg(NewWorldBossUIView, LayerManager.UI_Main);
//# sourceMappingURL=NewWorldBossUIView.js.map