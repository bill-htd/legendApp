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
var LimitTaskView = (function (_super) {
    __extends(LimitTaskView, _super);
    function LimitTaskView() {
        var _this = _super.call(this) || this;
        _this.skinName = "limittime";
        _this.name = "限时任务";
        _this.isTopLevel = true;
        return _this;
    }
    LimitTaskView.prototype.open = function () {
        this.addTouchEvent(this.list, this.onTouch);
        this.addTouchEvent(this.viewBtn, this.onTouch);
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.observe(UserTask.ins().postUpdteLimitTaskData, this.setPanel);
        this.observe(UserTask.ins().postUpdteLimitTaskData, this.updateFly);
        this.setPanel();
    };
    LimitTaskView.prototype.close = function () {
        TimerManager.ins().remove(this.runTime, this);
    };
    LimitTaskView.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.viewBtn:
                ViewManager.ins().open(RoleWin, 1);
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    LimitTaskView.prototype.setPanel = function () {
        var list = this.sortList();
        this.list.dataProvider = new eui.ArrayCollection(list);
        var taskId = UserTask.ins().currTaskListsId;
        var config = GlobalConfig.LimitTimeConfig[taskId];
        if (!config) {
            UserTips.ins().showCenterTips("限时任务id:" + taskId + "不存在限时任务表中");
            return;
        }
        var str = "";
        if (config.openZhuan > 0) {
            str = config.openZhuan + "\u8F6C";
        }
        else {
            str = config.openLevel + "\u7EA7";
        }
        var titleArr = ['title0', 'title1', 'title2'];
        for (var i = 0; i < titleArr.length; i++) {
            if (i == taskId - 1) {
                this[titleArr[i]].visible = true;
            }
            else {
                this[titleArr[i]].visible = false;
            }
        }
        for (var i = 0; i < 8; i++) {
            this["item" + i].redPoint.visible = false;
        }
        this.link0.text = str;
        this.expBarChange();
        this.itemChange();
        this.updateAttr();
        if (UserTask.ins().limitTaskEndTime - Math.floor(GameServer.serverTime / 1000) > 0) {
            this.runTime();
            TimerManager.ins().doTimer(1000, 0, this.runTime, this);
        }
        else {
            this.time.text = "活动已过期";
        }
    };
    LimitTaskView.prototype.runTime = function () {
        var time = UserTask.ins().limitTaskEndTime - Math.floor(GameServer.serverTime / 1000);
        if (time >= 0) {
            this.time.text = DateUtils.getFormatBySecond(time, 1);
        }
        else {
            this.time.text = "活动已过期";
            TimerManager.ins().remove(this.runTime, this);
        }
    };
    LimitTaskView.prototype.expBarChange = function () {
        var maxCount = UserTask.ins().limitTaskList.length;
        var currCount = UserTask.ins().limitTaskCount;
        if (this.expBar.maximum != maxCount) {
            this.expBar.maximum = maxCount;
        }
        this.expBar.value = currCount;
        if (currCount == 0) {
            this.playAllEffect();
        }
        else {
            this.removeAllEffect();
        }
    };
    LimitTaskView.prototype.itemChange = function () {
        var list = UserTask.ins().limitTaskList;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var punchItem = this["item" + i];
            if (item.state == 2) {
                punchItem.visible = false;
            }
            else {
                punchItem.visible = true;
            }
            var award = item.awardList[0];
            punchItem.data = award;
            punchItem.destruct();
            punchItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
        }
    };
    LimitTaskView.prototype.updateAttr = function () {
        var config = GlobalConfig.TogetherHitEquipQmConfig;
        var award = UserTask.ins().limitTaskList[0].awardList[0];
        var awardConfig = GlobalConfig.ItemConfig[award.id];
        var lv = awardConfig.zsLevel || 0;
        for (var k in config) {
            if (k + "" == lv + "") {
                for (var l in config[k]) {
                    var obj = config[k][l];
                    for (var m in obj) {
                        if (m + "" == "3") {
                            this.link4.textFlow = TextFlowMaker.generateTextFlow1(obj[m].desc);
                        }
                        else if (m + "" == "5") {
                            this.link6.textFlow = TextFlowMaker.generateTextFlow1(obj[m].desc);
                        }
                        else {
                            this.link8.textFlow = TextFlowMaker.generateTextFlow1(obj[m].desc);
                        }
                    }
                }
                break;
            }
        }
    };
    LimitTaskView.prototype.onTouchItem = function (e) {
        var item = e.currentTarget;
        var award = item.data;
        ViewManager.ins().open(HejiEquipTipsWin, award, false);
    };
    LimitTaskView.prototype.sortList = function () {
        var list = UserTask.ins().limitTaskList;
        return list;
        var rewardList = [];
        var noRewardList = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].state == 1) {
                rewardList.push(list[i]);
            }
            else {
                noRewardList.push(list[i]);
            }
        }
        return rewardList.concat(noRewardList.sort(this.sort));
    };
    LimitTaskView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.list.itemRenderer = LimitTaskItem;
        this.time.text = "";
        this.expBar.slideDuration = 0;
        this.effArr = [];
        for (var i = 0; i < 8; i++) {
            var eff = new MovieClip();
            eff.x = 177;
            eff.y = 174;
            eff.rotation = i * 45;
            eff.touchEnabled = false;
            this.effArr.push(eff);
        }
    };
    LimitTaskView.prototype.sort = function (a, b) {
        var s1 = a.state;
        var s2 = b.state;
        return Algorithm.sortAsc(s1, s2);
    };
    LimitTaskView.prototype.playAllEffect = function () {
        for (var i = 0; i < this.effArr.length; i++) {
            if (!this.effArr[i].parent) {
                this.effArr[i].playFile(RES_DIR_EFF + "hejizbjihuoeff", -1);
                this.EffectGroup.addChild(this.effArr[i]);
            }
        }
    };
    LimitTaskView.prototype.removeAllEffect = function () {
        for (var i = 0; i < this.effArr.length; i++) {
            if (this.effArr[i].parent) {
                DisplayUtils.removeFromParent(this.effArr[i]);
            }
        }
    };
    LimitTaskView.prototype.updateFly = function (taskData) {
        if (taskData && taskData.state == 2) {
            var index = UserTask.ins().limitTaskList.indexOf(taskData);
            if (index >= 0) {
                this.addFly(index);
            }
        }
    };
    LimitTaskView.prototype.addFly = function (index) {
        var item = this["item" + index];
        var newItem = new PunchEquipItemBase();
        newItem.currentState = item.currentState;
        newItem.anchorOffsetX = item.width / 2;
        newItem.anchorOffsetY = item.height / 2;
        newItem.scaleX = 0.53;
        newItem.scaleY = 0.53;
        newItem.alpha = 0.8;
        var par = item.parent;
        var p = new egret.Point();
        par.parent.localToGlobal(par.x + (item.x + item.width / 2) * 0.53, par.y + (item.y + item.height / 2) * 0.53, p);
        this.globalToLocal(p.x, p.y, p);
        newItem.x = p.x;
        newItem.y = p.y;
        this.addChild(newItem);
        var award = UserTask.ins().limitTaskList[index].awardList[0];
        newItem.validateNow();
        newItem.data = award;
        var uiview2 = ViewManager.ins().getView(UIView2);
        var roleBtn = uiview2.getToggleBtn(0);
        var tar = new egret.Point();
        roleBtn.parent.localToGlobal(roleBtn.x + roleBtn.width / 2, roleBtn.y + roleBtn.height / 2, tar);
        var tw = egret.Tween.get(newItem);
        tw.to({ scaleX: 0.8, scaleY: 0.8 }, 300).to({ x: p.x + 30 }, 50).to({ x: p.x - 30 }, 50).to({ x: p.x + 30 }, 50).to({ x: p.x - 30 }, 50)
            .to({ x: p.x + 30 }, 50).to({ x: p.x - 30 }, 50).to({ x: p.x + 30 }, 50).to({ x: p.x - 30 }, 50)
            .to({ x: p.x }, 25).to({ x: tar.x, y: tar.y, scaleX: 0.15, scaleY: 0.15 }, 800).call(function () {
            if (newItem.parent) {
                newItem.parent.removeChild(newItem);
            }
        });
    };
    LimitTaskView.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (UserTask.ins().currTaskListsId > 0)
            return true;
        ViewManager.ins().open(BossWin, 2);
        return false;
    };
    return LimitTaskView;
}(BaseEuiView));
__reflect(LimitTaskView.prototype, "LimitTaskView");
ViewManager.ins().reg(LimitTaskView, LayerManager.UI_Main);
//# sourceMappingURL=LimitTaskView.js.map