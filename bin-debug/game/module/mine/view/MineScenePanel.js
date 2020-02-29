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
var MineScenePanel = (function (_super) {
    __extends(MineScenePanel, _super);
    function MineScenePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "WaKuangFbSkin";
        return _this;
    }
    MineScenePanel.prototype.open = function () {
        this.quickFinish.textFlow = [{ text: "\u5FEB\u901F\u5B8C\u6210", style: { underline: true } }];
        this.addTouchEvent(this.quickFinish, this.onTap);
        this.addTouchEvent(this.xiangqing, this.onTap);
        this.addTouchEvent(this.wakuang, this.onTap);
        this.observe(Mine.ins().postMineBaseInfo, this.updateBase);
        this.observe(Mine.ins().postInitScene, this.updateScene);
        this.observe(Mine.ins().postSceneUpdate, this.updateScene);
        this.observe(Mine.ins().postRecordHasUpdate, this.recordHasUpdate);
        this.observe(Mine.ins().postMineRecord, this.recordHasUpdate);
        this.observe(Mine.ins().postMineFightState, this.updateScene);
        this.observe(Mine.ins().postStartMine, this.MineRedPoint);
        this.observe(Mine.ins().postFinished, this.MineRedPoint);
        this.updateScene();
    };
    MineScenePanel.prototype.close = function () {
        TimerManager.ins().removeAll(this);
    };
    MineScenePanel.prototype.onTap = function (e) {
        var target = e.currentTarget;
        if (target == this.quickFinish) {
            this.openQuick();
        }
        else if (target == this.xiangqing) {
            ViewManager.ins().open(MineRecordWin);
        }
        else if (target == this.wakuang) {
            ViewManager.ins().open(MineChoseWorkerWin);
        }
    };
    MineScenePanel.prototype.openQuick = function () {
        var sec = Math.floor((this._totalTime * 1000 + Mine.ins().mineStartTime - GameServer.serverTime) / 1000);
        var min = Math.ceil(sec / 60);
        var cost = GlobalConfig.CaiKuangConfig.quickCost * min;
        if (cost <= 0)
            return;
        if (Actor.yb < cost) {
            UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3");
            return;
        }
        var str = "\u786E\u5B9A\u6D88\u8017<font color='#FFB82A'>" + cost + "\u5143\u5B9D</font>\u5FEB\u901F\u5B8C\u6210\u6316\u77FF\uFF1F";
        WarnWin.show(str, function () {
            Mine.ins().sendQuickFinish();
        }, this);
    };
    MineScenePanel.prototype.updateBase = function () {
        var myMine = MineData.ins().myMine;
        if (MineFight.ins().isFighting) {
            this.recordGroup.visible = false;
        }
        else {
            this.recordGroup.visible = true;
        }
        this.wakuangGroup.visible = this.recordGroup.visible;
        if (!Mine.ins().isOverTime() && myMine) {
            this.myGroup.visible = true;
            var config = GlobalConfig.KuangYuanConfig[myMine.configID];
            this._totalTime = config.needTime;
            this.addTime();
        }
        else {
            this.removeTime();
            this.myGroup.visible = false;
        }
    };
    MineScenePanel.prototype.updateScene = function () {
        var mineData = MineData.ins();
        this.nameTxt.text = "\u6BD4\u5947\u77FF\u6D1E" + mineData.index;
        this.workerNum.text = "\u77FF\u5DE5\uFF1A" + mineData.mines.length + "\u4EBA";
        this.recordHasUpdate(Mine.ins().hasNewRecord);
        this.MineRedPoint();
        this.updateBase();
    };
    MineScenePanel.prototype.recordHasUpdate = function (b) {
        this.redPoint.visible = !!b;
    };
    MineScenePanel.prototype.MineRedPoint = function () {
        var addCount = Recharge.ins().franchise ? GlobalConfig.PrivilegeData.addKuangCount : 0;
        this.redPoint1.visible = Mine.ins().mineCount < GlobalConfig.CaiKuangConfig.maxOpenKuangCount + addCount && Mine.ins().isOverTime();
    };
    MineScenePanel.prototype.addTime = function () {
        if (!TimerManager.ins().isExists(this.timeHandler, this)) {
            TimerManager.ins().doTimer(1000, 0, this.timeHandler, this);
        }
    };
    MineScenePanel.prototype.timeHandler = function () {
        var sec = Math.floor((Mine.ins().mineEndTime - GameServer.serverTime) / 1000);
        if (sec >= 0) {
            this.time.text = "\uFF08" + DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_3) + "\uFF09";
        }
    };
    MineScenePanel.prototype.removeTime = function () {
        TimerManager.ins().remove(this.timeHandler, this);
    };
    return MineScenePanel;
}(BaseEuiView));
__reflect(MineScenePanel.prototype, "MineScenePanel");
ViewManager.ins().reg(MineScenePanel, LayerManager.UI_Main);
//# sourceMappingURL=MineScenePanel.js.map