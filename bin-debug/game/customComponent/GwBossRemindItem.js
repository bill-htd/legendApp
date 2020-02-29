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
var GwBossRemindItem = (function (_super) {
    __extends(GwBossRemindItem, _super);
    function GwBossRemindItem() {
        var _this = _super.call(this) || this;
        _this._move = false;
        _this._lastX = 0;
        _this._lastY = 0;
        return _this;
    }
    GwBossRemindItem.prototype.childrenCreated = function () {
        this.checkBoxs.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin1, this);
    };
    GwBossRemindItem.prototype.onTouchBegin1 = function (e) {
        this._lastX = e.stageX;
        this._lastY = e.stageY;
        this._lastSelect = this.checkBoxs.selected;
        this._move = false;
        if (this.$stage) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove1, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd1, this);
        }
    };
    GwBossRemindItem.prototype.onTouchMove1 = function (e) {
        if (MathUtils.getDistance(this._lastX, this._lastY, e.stageX, e.stageY) > 20) {
            this._move = true;
        }
    };
    GwBossRemindItem.prototype.onTouchEnd1 = function () {
        if (this._move) {
            this.checkBoxs.selected = this._lastSelect;
            this._move = false;
        }
        if (this.$stage) {
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove1, this);
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd1, this);
        }
    };
    GwBossRemindItem.prototype.dataChanged = function () {
        var model = this.data;
        var config = GlobalConfig.WorldBossConfig[model.id];
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        var bossLv = config.zsLevel[0] * 1000 + config.level;
        var canChallenge = roleLv >= bossLv;
        var desc;
        if (config.samsaraLv > 0) {
            desc = config.showName;
        }
        else {
            if (config.zsLevel[0] > 0) {
                desc = config.zsLevel[0] + "\u8F6C-" + config.zsLevel[1] + "\u8F6C";
            }
            else {
                desc = config.level + "\u7EA7";
            }
        }
        this.checkBoxs.visible = canChallenge;
        if (canChallenge) {
            this.checkBoxs.selected = UserBoss.ins().getBossRemindByIndex(model.id);
        }
        this.txt.visible = !canChallenge;
        this.checkBoxs.name = model.id + "";
        var boss = GlobalConfig.MonstersConfig[config.bossId];
        this.bossName.text = boss.name;
        this.levelShow.text = desc;
    };
    return GwBossRemindItem;
}(BaseItemRender));
__reflect(GwBossRemindItem.prototype, "GwBossRemindItem");
//# sourceMappingURL=GwBossRemindItem.js.map