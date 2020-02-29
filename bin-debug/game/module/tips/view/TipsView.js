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
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.labCount = 0;
        _this.list = [];
        _this.listCenter = [];
        _this.centerList = [];
        _this.taskTipsList = [];
        _this.sceneList = [];
        _this.attrList = [];
        _this.everList = [];
        _this.hintList = [];
        _this.rewardTipList = [];
        _this.goodEquipList = [];
        _this.skillTipList = [];
        _this.equipItemList = [];
        _this.equipHeartItemList = [];
        return _this;
    }
    TipsView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.touchChildren = false;
        this.touchEnabled = false;
        this.rewardTip = new TipsGoodReward();
        this.equipTip1 = new TipsGoodEquip();
        this.skillTip1 = new TipsSkillAlertPanel();
        this.equipTip = new TipsEquipAlertPanel();
        this.boxTip = new BoxGetHintTips();
        this.equipHeartTip = new TipsHeartEquipAlertPanel();
        this.observe(Actor.ins().postExp, this.showExp);
    };
    TipsView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    TipsView.prototype.showExp = function (exp) {
        if (!exp)
            return;
        this.showTips("|C:0x23CA23&T:\u7ECF\u9A8C +" + exp + "|");
    };
    TipsView.prototype.showHintTips = function (pic) {
        var tips = ObjectPool.pop("HintTipsItem");
        tips.verticalCenter = 200;
        tips.horizontalCenter = 0;
        tips.setTips(pic);
        this.addChild(tips);
        this.hintList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeHintTip, this);
        for (var i = this.hintList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.hintList[i]);
            var t = egret.Tween.get(this.hintList[i]);
            t.to({ "verticalCenter": 200 + i * -30 }, 300);
        }
    };
    TipsView.prototype.removeHintTip = function (e) {
        var index = this.hintList.indexOf(e.currentTarget);
        this.hintList.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
        e.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeHintTip, this);
        ObjectPool.push(e.currentTarget);
    };
    TipsView.prototype.showEverTips = function (para) {
        var tips = ObjectPool.pop("EverTipsItem");
        tips.x = para.x;
        tips.y = para.y;
        tips.labelText = para.str;
        this.addChild(tips);
        this.everList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeEverTip, this);
        for (var i = this.everList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.everList[i]);
            var t = egret.Tween.get(this.everList[i]);
            t.to({ "y": tips.y - (i * 30) }, 300);
        }
    };
    TipsView.prototype.removeEverTip = function (e) {
        var index = this.everList.indexOf(e.currentTarget);
        this.everList.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
        e.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeEverTip, this);
        ObjectPool.push(e.currentTarget);
    };
    TipsView.prototype.showAttrTips = function (para) {
        var tips = ObjectPool.pop("AttriteChangeView");
        tips.left = 30;
        tips.bottom = 190;
        tips.setLabelText(para[0], para[1]);
        this.addChild(tips);
        this.attrList.unshift(tips);
        tips.once(egret.Event.REMOVED_FROM_STAGE, this.removeAttrTip, this);
        for (var i = this.attrList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.attrList[i]);
            var t = egret.Tween.get(this.attrList[i]);
            t.to({ "bottom": 190 + (i * 40) }, 300);
        }
    };
    TipsView.prototype.removeAttrTip = function (e) {
        var index = this.attrList.indexOf(e.currentTarget);
        this.attrList.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
        ObjectPool.push(e.currentTarget);
    };
    TipsView.prototype.showCenterTips = function (str) {
        var tips = ObjectPool.pop("CenterTipsItem");
        tips.verticalCenter = 0;
        tips.horizontalCenter = 0;
        tips.labelText = str;
        this.addChild(tips);
        this.centerList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeCenterTip, this);
        for (var i = this.centerList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.centerList[i]);
            var t = egret.Tween.get(this.centerList[i]);
            t.to({ "verticalCenter": 0 + i * -30 }, 500);
        }
    };
    TipsView.prototype.removeCenterTip = function (e) {
        var tips = e.currentTarget;
        var index = this.centerList.indexOf(tips);
        this.centerList.splice(index, 1);
        tips.horizontalCenter = NaN;
        tips.verticalCenter = NaN;
        egret.Tween.removeTweens(tips);
        tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeCenterTip, this);
        ObjectPool.push(tips);
    };
    TipsView.prototype.showCenterTips2 = function (str) {
        var tips = ObjectPool.pop("CenterTipsItem");
        tips.horizontalCenter = 0;
        tips.verticalCenter = -60;
        this.addChild(tips);
        tips.labelText2 = str;
        this.centerList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeCenterTip2, this);
        for (var i = this.centerList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.centerList[i]);
            var t = egret.Tween.get(this.centerList[i]);
            t.to({ "verticalCenter": -120 - (i * 30) }, 300);
        }
    };
    TipsView.prototype.removeCenterTip2 = function (e) {
        var tips = e.currentTarget;
        tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeCenterTip2, this);
        tips.horizontalCenter = NaN;
        tips.verticalCenter = NaN;
        var index = this.centerList.indexOf(tips);
        this.centerList.splice(index, 1);
    };
    TipsView.prototype.showCenterTips3 = function (str) {
        var tips = ObjectPool.pop("CenterTipsItem");
        tips.verticalCenter = 0;
        tips.horizontalCenter = 0;
        tips.labelText3 = str;
        this.addChild(tips);
        this.centerList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeCenterTip3, this);
        for (var i = this.centerList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.centerList[i]);
            var t = egret.Tween.get(this.centerList[i]);
            t.to({ "verticalCenter": 0 + i * -30 }, 500);
        }
    };
    TipsView.prototype.removeCenterTip3 = function (e) {
        var tips = e.currentTarget;
        var index = this.centerList.indexOf(tips);
        this.centerList.splice(index, 1);
        tips.horizontalCenter = NaN;
        tips.verticalCenter = NaN;
        egret.Tween.removeTweens(tips);
        tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeCenterTip, this);
        ObjectPool.push(tips);
    };
    TipsView.prototype.showSceneTips = function (str) {
        var tips = ObjectPool.pop("SceneTipsItem");
        tips.verticalCenter = -175;
        tips.horizontalCenter = 0;
        tips.labelText = str;
        this.addChild(tips);
        this.sceneList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeSceneTip, this);
        for (var i = this.sceneList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.sceneList[i]);
            var t = egret.Tween.get(this.sceneList[i]);
            t.to({ "verticalCenter": -175 + i * -30 }, 500);
        }
    };
    TipsView.prototype.removeSceneTip = function (e) {
        var index = this.sceneList.indexOf(e.currentTarget);
        this.sceneList.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
        e.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeSceneTip, this);
        ObjectPool.push(e.currentTarget);
    };
    TipsView.prototype.showTaskTips = function (str) {
        var tips = ObjectPool.pop("CenterTipsItem");
        tips.bottom = 232;
        tips.horizontalCenter = 0;
        tips.labelText = str;
        this.addChild(tips);
        this.taskTipsList.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTaskTip, this);
        for (var i = this.taskTipsList.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.taskTipsList[i]);
            var t = egret.Tween.get(this.taskTipsList[i]);
            t.to({ "bottom": 232 + i * 30 }, 500);
        }
    };
    TipsView.prototype.removeTaskTip = function (e) {
        var index = this.taskTipsList.indexOf(e.currentTarget);
        this.taskTipsList.splice(index, 1);
        egret.Tween.removeTweens(e.currentTarget);
        e.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTaskTip, this);
        ObjectPool.push(e.currentTarget);
    };
    TipsView.prototype.showTips = function (str) {
        var tips = ObjectPool.pop("TipsItem");
        tips.left = 0;
        tips.bottom = 190;
        this.addChild(tips);
        tips.labelText = str;
        this.list.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
        for (var i = this.list.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.list[i]);
            var t = egret.Tween.get(this.list[i]);
            t.to({ "bottom": 190 + (i * 30) }, 300);
        }
    };
    TipsView.prototype.removeTipsItem = function (e) {
        var tips = e.currentTarget;
        tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
        tips.left = NaN;
        tips.bottom = NaN;
        var index = this.list.indexOf(tips);
        this.list.splice(index, 1);
        ObjectPool.push(tips);
    };
    TipsView.prototype.showGoodRewardTip = function (item) {
        this.rewardTipList.push(item);
        if (TimerManager.ins().isExists(this.goodRewardTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.goodRewardTimer, this);
        }
    };
    TipsView.prototype.showGoodEquipTip = function (item) {
        this.goodEquipList.push(item);
        if (TimerManager.ins().isExists(this.goodEquipTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.goodEquipTimer, this);
        }
    };
    TipsView.prototype.showBoxTip = function (id) {
        var conf = GlobalConfig.TreasureBoxConfig[id];
        this.goodEquipList.push(conf);
        if (TimerManager.ins().isExists(this.goodEquipTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.goodEquipTimer, this);
        }
    };
    TipsView.prototype.goodRewardTimer = function () {
        var _this = this;
        if (this.rewardTipList.length == 0) {
            TimerManager.ins().remove(this.goodEquipTimer, this);
            return;
        }
        if (this.isWait) {
            return;
        }
        var equipTip;
        if (!this.rewardTip.isUsing) {
            equipTip = this.rewardTip;
        }
        if (!equipTip) {
            return;
        }
        equipTip.x = 50;
        equipTip.y = 750;
        equipTip.alpha = 1;
        if (!equipTip.parent)
            this.addChild(equipTip);
        equipTip.isUsing = true;
        this.isWait = true;
        equipTip.data = this.rewardTipList.pop();
        var t = egret.Tween.get(equipTip);
        t.to({ "y": 600 }, 300).wait(1000).to({ "alpha": 0 }, 1000).call(function () {
            equipTip.isUsing = false;
            _this.isWait = false;
            _this.removeChild(equipTip);
        });
    };
    TipsView.prototype.goodEquipTimer = function () {
        var _this = this;
        if (this.goodEquipList.length == 0) {
            TimerManager.ins().remove(this.goodEquipTimer, this);
            return;
        }
        if (this.isWait) {
            return;
        }
        var equipTip;
        if (!this.equipTip1.isUsing) {
            equipTip = this.equipTip1;
        }
        if (!equipTip) {
            return;
        }
        equipTip.x = 50;
        equipTip.y = 750;
        equipTip.alpha = 1;
        if (!equipTip.parent)
            this.addChild(equipTip);
        equipTip.isUsing = true;
        this.isWait = true;
        equipTip.data = this.goodEquipList.pop();
        var t = egret.Tween.get(equipTip);
        t.to({ "y": 600 }, 300).wait(1000).to({ "alpha": 0 }, 1000).call(function () {
            equipTip.isUsing = false;
            _this.isWait = false;
            _this.removeChild(equipTip);
        });
    };
    TipsView.prototype.showRewardBox = function (type) {
        var conf = GlobalConfig.TreasureBoxConfig[type];
        this.goodEquipList.push(conf);
        if (TimerManager.ins().isExists(this.goodEquipTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.goodEquipTimer, this);
        }
    };
    TipsView.prototype.showSkillTip = function (item) {
        this.skillTipList.push(item);
        if (TimerManager.ins().isExists(this.skillTipTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.skillTipTimer, this);
        }
    };
    TipsView.prototype.skillTipTimer = function () {
        var _this = this;
        if (this.skillTipList.length == 0) {
            TimerManager.ins().remove(this.skillTipTimer, this);
            return;
        }
        if (this.isWait) {
            return;
        }
        var skillTip;
        if (!this.skillTip1.isUsing) {
            skillTip = this.skillTip1;
        }
        if (!skillTip) {
            return;
        }
        skillTip.x = 50;
        skillTip.y = 750;
        skillTip.alpha = 1;
        this.addChild(skillTip);
        skillTip.isUsing = true;
        this.isWait = true;
        skillTip.data = this.skillTipList.pop();
        var t = egret.Tween.get(skillTip);
        t.to({ "y": 600 }, 300).wait(1000).to({ "alpha": 0 }, 1000).call(function () {
            skillTip.isUsing = false;
            _this.isWait = false;
            _this.removeChild(skillTip);
        });
    };
    TipsView.prototype.showItemTip = function (item) {
        this.equipItemList.push(item);
        if (TimerManager.ins().isExists(this.itemTipTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.itemTipTimer, this);
        }
    };
    TipsView.prototype.itemTipTimer = function () {
        var _this = this;
        if (this.equipItemList.length == 0) {
            TimerManager.ins().remove(this.itemTipTimer, this);
            return;
        }
        if (this.isWait) {
            return;
        }
        var itemTip;
        if (!this.equipTip.isUsing) {
            itemTip = this.equipTip;
        }
        if (!itemTip) {
            return;
        }
        itemTip.x = 50;
        itemTip.y = 750;
        itemTip.alpha = 1;
        this.addChild(itemTip);
        itemTip.isUsing = true;
        this.isWait = true;
        itemTip.data = this.equipItemList.pop();
        var t = egret.Tween.get(itemTip);
        t.to({ "y": 600 }, 300).wait(1000).to({ "alpha": 0 }, 1000).call(function () {
            itemTip.isUsing = false;
            _this.isWait = false;
            _this.removeChild(itemTip);
        });
    };
    TipsView.prototype.showHeartItemTip = function (item) {
        this.equipHeartItemList.push(item);
        if (TimerManager.ins().isExists(this.itemHeartTipTimer, this)) {
        }
        else {
            TimerManager.ins().doTimer(16, 0, this.itemHeartTipTimer, this);
        }
    };
    TipsView.prototype.itemHeartTipTimer = function () {
        var _this = this;
        if (this.equipHeartItemList.length == 0) {
            TimerManager.ins().remove(this.itemHeartTipTimer, this);
            return;
        }
        if (this.isWait) {
            return;
        }
        var itemTip;
        if (!this.equipHeartTip.isUsing) {
            itemTip = this.equipHeartTip;
        }
        if (!itemTip) {
            return;
        }
        itemTip.x = 50;
        itemTip.y = 750 - 37;
        itemTip.alpha = 1;
        this.addChild(itemTip);
        itemTip.isUsing = true;
        this.isWait = true;
        itemTip.data = this.equipHeartItemList.pop();
        var t = egret.Tween.get(itemTip);
        t.to({ "y": 600 - 37 }, 300).wait(1000).to({ "alpha": 0 }, 1000).call(function () {
            itemTip.isUsing = false;
            _this.isWait = false;
            _this.removeChild(itemTip);
        });
    };
    return TipsView;
}(BaseEuiView));
__reflect(TipsView.prototype, "TipsView");
ViewManager.ins().reg(TipsView, LayerManager.UI_Tips);
//# sourceMappingURL=TipsView.js.map