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
var GwBossItem = (function (_super) {
    __extends(GwBossItem, _super);
    function GwBossItem() {
        var _this = _super.call(this) || this;
        _this.states = ['cannot', 'already', 'havetime'];
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    GwBossItem.prototype.dataChanged = function () {
        var data = this.data;
        var config = GlobalConfig.WorldBossConfig[data.id];
        this.fbname.text = config.showName;
        if (this.selected)
            this.bg0.visible = true;
        else
            this.bg0.visible = false;
        this.enabled = true;
        TimerManager.ins().remove(this.updateTime, this);
        if (data.canChallenge) {
            this.currentState = this.states[1];
        }
        else if (data.isDie && data.canInto) {
            this.updateTime();
            TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
            this.currentState = this.states[2];
        }
        else {
            this.enabled = false;
            this.currentState = this.states[0];
        }
        this.levelNeed.text = "(" + config.zsLevel[0] + "\u8F6C-" + config.zsLevel[1] + "\u8F6C)";
    };
    GwBossItem.prototype.updateTime = function () {
        var time = this.data.relieveTime - egret.getTimer();
        this.timeTxt.text = "" + DateUtils.getFormatBySecond(Math.floor(time / 1000), 1);
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.timeTxt.text = "";
        }
    };
    GwBossItem.prototype.onRemove = function (e) {
        TimerManager.ins().remove(this.updateTime, this);
    };
    return GwBossItem;
}(BaseItemRender));
__reflect(GwBossItem.prototype, "GwBossItem");
//# sourceMappingURL=GwBossItem.js.map