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
var HunShouFBWin = (function (_super) {
    __extends(HunShouFBWin, _super);
    function HunShouFBWin() {
        return _super.call(this) || this;
    }
    HunShouFBWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemList.itemRenderer = ItemBase;
    };
    HunShouFBWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(Hungu.ins().postHunShouFBInfo, this.update);
        this.observe(Hungu.ins().postSweepHunShouFB, this.updateTimes);
        this.addTouchEvent(this, this.onTouch);
        this.update();
    };
    HunShouFBWin.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
    };
    HunShouFBWin.prototype.update = function () {
        this.updateTimes();
        var id = Hungu.ins().hunShouFBPassID ? Hungu.ins().hunShouFBPassID + 1 : 1;
        this._isMax = false;
        if (id > Object.keys(GlobalConfig.FsFbConfig).length) {
            this._isMax = true;
            id--;
        }
        var cfg = GlobalConfig.FsFbConfig[id];
        this._zsLvEough = UserZs.ins().lv >= cfg.zsLevelLimit;
        this.zsLimit.textFlow = TextFlowMaker.generateTextFlow("|C:" + (this._zsLvEough ? 0x35E62B : 0xFF0000) + "&T:\u6311\u6218\u8981\u6C42\uFF1A\u4EBA\u7269" + cfg.zsLevelLimit + "\u8F6C|");
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.itemList.dataProvider = this._collect;
        }
        this._collect.source = cfg.award;
        this.btnSweep.visible = GlobalConfig.HunGuConf.sweepLayer <= Hungu.ins().hunShouFBPassID;
        this.sweepInfoText.visible = this.sweepInfo.visible = this.btnSweep.visible;
        this.btnChallenge.visible = !this._isMax;
        this.btnChallenge.horizontalCenter = this.btnSweep.visible ? 109 : 0;
        this.max.visible = this._isMax;
        this.zsLimit.visible = !this._isMax;
        if (this.sweepInfo.visible)
            this.sweepInfo.text = (Hungu.ins().hunShouFBPassID) + "";
        this.bossName.source = cfg.pic;
        if (!this._bossMc) {
            this._bossMc = ObjectPool.pop("MovieClip");
            this.Boss.addChild(this._bossMc);
        }
        this._bossMc.playFile(RES_DIR_MONSTER + ("monster" + GlobalConfig.MonstersConfig[cfg.monster].avatar + "_3s"), -1);
    };
    HunShouFBWin.prototype.updateTimes = function () {
        this.lbTime.textFlow = TextFlowMaker.generateTextFlow("|c:" + (Hungu.ins().hunShouFBTimes ? 0x35E62B : 0xFF0000) + "&T:" + Hungu.ins().hunShouFBTimes + "|");
    };
    HunShouFBWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.btnSweep:
            case this.btnChallenge:
                if (!Hungu.ins().hunShouFBTimes) {
                    UserTips.ins().showTips("\u5269\u4F59\u6B21\u6570\u4E0D\u8DB3");
                    return;
                }
                if (e.target == this.btnSweep)
                    Hungu.ins().sweepHunShouFB();
                else {
                    if (!this._zsLvEough)
                        UserTips.ins().showTips("\u8F6C\u751F\u7B49\u7EA7\u4E0D\u8DB3");
                    else if (this._isMax)
                        UserTips.ins().showTips("\u5F53\u524D\u5DF2\u901A\u5173");
                    else {
                        Hungu.ins().enterHunShouFB();
                        ViewManager.ins().close(LadderWin);
                    }
                }
                break;
        }
    };
    return HunShouFBWin;
}(BaseEuiView));
__reflect(HunShouFBWin.prototype, "HunShouFBWin");
//# sourceMappingURL=HunShouFBWin.js.map