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
var RuneDisplay = (function (_super) {
    __extends(RuneDisplay, _super);
    function RuneDisplay() {
        var _this = _super.call(this) || this;
        _this.pos = -1;
        _this.isShowName = true;
        return _this;
    }
    RuneDisplay.prototype.init = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.noOpenTF, this.onTap);
    };
    RuneDisplay.prototype.close = function () {
        this.removeTouchEvent(this.noOpenTF, this.onTap);
    };
    RuneDisplay.prototype.onTap = function (e) {
        var target = e.target;
        if (target == this.noOpenTF) {
            ViewManager.ins().open(FbWin, 2);
        }
    };
    RuneDisplay.prototype.setPos = function (pos) {
        this.pos = pos;
        var rlpc = RuneConfigMgr.ins().getLockCfg(pos);
        if (!this.assert(rlpc, "RuneLockPosConfig(" + pos + ")")) {
            var lv = SkyLevelModel.ins().cruLevel;
            var lockLv = rlpc.lockLv;
            if (lv > lockLv) {
                this.currentState = RuneDisplay.SKIN_STATE_UNLOCK;
            }
            else {
                this.currentState = RuneDisplay.SKIN_STATE_LOCK;
            }
        }
    };
    RuneDisplay.prototype.setLockTF = function (show) {
        if (this.pos < 0)
            return;
        if (this.currentState != RuneDisplay.SKIN_STATE_LOCK
            && this.currentState != RuneDisplay.SKIN_STATE_READY) {
            return;
        }
        var cfg = RuneConfigMgr.ins().getLockCfg(this.pos);
        if (this.assert(cfg, "RuneLockPosConfig(" + this.pos + ")"))
            return;
        var upPosCfg = null;
        if (this.pos >= 1)
            upPosCfg = RuneConfigMgr.ins().getLockCfg(this.pos - 1);
        if (upPosCfg && upPosCfg.lockLv <= SkyLevelModel.ins().cruLevel && show) {
            var info = GlobalConfig.FbChallengeConfig[cfg.lockLv];
            var model = SkyLevelModel.ins();
            var nextCfg = model.getNextOpenLevel();
            var layer = 0;
            if (nextCfg)
                layer = nextCfg.layer;
            var str = "|U:&C:0x35e62d&T:\u901A\u5173\u901A\u5929\u5854" + GlobalConfig.FbChNameConfig[info.group].name + layer + "\u5C42\u5F00\u542F";
            this.noOpenTF.textFlow = TextFlowMaker.generateTextFlow1(str);
        }
        else {
            this.noOpenTF.text = "";
        }
    };
    RuneDisplay.prototype.setData = function (data) {
        if (!data || (data.itemConfig && data.itemConfig.id <= 0))
            return;
        this.data = data;
        var itemCfg = GlobalConfig.ItemConfig[data.itemConfig.id];
        this._itemConfig = itemCfg;
        if (!this.assert(itemCfg, "ItemConfig(" + data.itemConfig.id + ")")) {
            this.nameBG.visible = this.isShowName;
            this.nameTF.visible = this.isShowName;
            this.iconImg.source = itemCfg.icon + '_png';
            var nameCfg = GlobalConfig.RuneNameConfig[ItemConfig.getSubType(itemCfg)];
            this.nameTF.textFlow = TextFlowMaker.generateTextFlow("|C:" + ItemConfig.getQualityColor(itemCfg) + "&T:" + nameCfg.runeName + "Lv." + itemCfg.id % 100);
        }
    };
    RuneDisplay.prototype.setDataByItemConfig = function (data) {
        if (!data)
            return;
        this._itemConfig = data;
        this.currentState = RuneDisplay.SKIN_STATE_UNLOCK;
        this.nameBG.visible = this.isShowName;
        this.nameTF.visible = this.isShowName;
        this.iconImg.source = data.icon + '_png';
        var nameCfg = GlobalConfig.RuneNameConfig[ItemConfig.getSubType(data)];
        if (data.level && data.level != 0)
            this.nameTF.textFlow = TextFlowMaker.generateTextFlow("|C:" + ItemConfig.getQualityColor(data) + "&T:" + nameCfg.runeName + " Lv." + data.level % 100 + "|");
        else
            this.nameTF.textFlow = TextFlowMaker.generateTextFlow("|C:" + ItemConfig.getQualityColor(data) + "&T:" + nameCfg.runeName + " Lv.1|");
    };
    RuneDisplay.prototype.getItemConfig = function () {
        return this._itemConfig;
    };
    RuneDisplay.prototype.cleanData = function () {
        this.data = null;
        this._itemConfig = null;
        this.iconImg.source = null;
        this.nameTF.text = "";
        this.nameTF.visible = false;
        this.nameBG.visible = false;
    };
    RuneDisplay.prototype.showOrHideSelected = function (isShow) {
        this.selectedImg.visible = isShow;
    };
    RuneDisplay.prototype.showName = function (boo) {
        this.isShowName = boo;
    };
    RuneDisplay.prototype.assert = function (value, msg) {
        return Assert(value, "[" + egret.getQualifiedClassName(RuneDisplay) + "] " + msg + "is null!");
    };
    RuneDisplay.SKIN_STATE_LOCK = "lock";
    RuneDisplay.SKIN_STATE_READY = "ready";
    RuneDisplay.SKIN_STATE_UNLOCK = "unlock";
    return RuneDisplay;
}(BaseComponent));
__reflect(RuneDisplay.prototype, "RuneDisplay");
//# sourceMappingURL=RuneDisplay.js.map