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
var WorldBossItem = (function (_super) {
    __extends(WorldBossItem, _super);
    function WorldBossItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemove, _this);
        return _this;
    }
    WorldBossItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var config = GlobalConfig.WorldBossConfig[this.data.id];
        if (!config)
            return;
        var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
        TimerManager.ins().remove(this.updateTime, this);
        this.titleText.text = bossBaseConfig.name;
        if (this.data.bossState == 2 || this.data.bossState == 0) {
            this.killImg.visible = false;
            this.updateTime();
            TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
        }
        else if (this.data.bossState == 1) {
            this.timeTxt.text = "已刷新";
            this.killImg.visible = true;
        }
        else {
            this.killImg.visible = false;
        }
    };
    WorldBossItem.prototype.updateTime = function () {
        var time = this.data.relieveTime - egret.getTimer();
        this.timeTxt.text = "" + DateUtils.getFormatBySecond(Math.floor(time / 1000), 1);
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.timeTxt.text = "";
        }
    };
    WorldBossItem.prototype.onRemove = function (e) {
        TimerManager.ins().remove(this.updateTime, this);
    };
    return WorldBossItem;
}(BaseItemRender));
__reflect(WorldBossItem.prototype, "WorldBossItem");
//# sourceMappingURL=WorldBossItem.js.map