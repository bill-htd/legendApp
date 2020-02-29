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
var HomeBossRemindItem = (function (_super) {
    __extends(HomeBossRemindItem, _super);
    function HomeBossRemindItem() {
        var _this = _super.call(this) || this;
        _this._move = false;
        return _this;
    }
    HomeBossRemindItem.prototype.childrenCreated = function () {
        this.checkBoxs.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin1, this);
    };
    HomeBossRemindItem.prototype.onTouchBegin1 = function (e) {
        this._lastSelect = this.checkBoxs.selected;
        this._move = false;
        if (this.$stage) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove1, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd1, this);
        }
    };
    HomeBossRemindItem.prototype.onTouchMove1 = function () {
        this._move = true;
    };
    HomeBossRemindItem.prototype.onTouchEnd1 = function () {
        if (this._move) {
            this.checkBoxs.selected = this._lastSelect;
            this._move = false;
        }
        if (this.$stage) {
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove1, this);
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd1, this);
        }
    };
    HomeBossRemindItem.prototype.dataChanged = function () {
        var model = this.data;
        var config = GlobalConfig.WorldBossConfig[model.id];
        var levelConfig;
        for (var k in GlobalConfig.BossHomeConfig) {
            if (GlobalConfig.BossHomeConfig[k].boss.lastIndexOf(model.id) != -1) {
                levelConfig = GlobalConfig.BossHomeConfig[k];
                break;
            }
        }
        var canChallenge = false;
        if (levelConfig && UserVip.ins().lv >= levelConfig.vip) {
            if (config.zsLevel > 0) {
                canChallenge = UserZs.ins().lv >= config.zsLevel;
            }
            else {
                canChallenge = Actor.level >= config.level;
            }
            if (!canChallenge)
                this.txt.text = "未满足挑战等级";
            this.levelShow.text = config.zsLevel > 0 ? config.zsLevel + "转" : config.level + "级";
        }
        else {
            canChallenge = false;
            this.levelShow.text = "";
            this.txt.text = "未满足挑战VIP等级";
        }
        this.checkBoxs.visible = canChallenge;
        if (canChallenge) {
            this.checkBoxs.selected = UserBoss.ins().getBossRemindByIndex(model.id);
        }
        this.txt.visible = !this.checkBoxs.visible;
        this.checkBoxs.name = model.id + "";
        var boss = GlobalConfig.MonstersConfig[config.bossId];
        this.bossName.text = boss.name;
    };
    return HomeBossRemindItem;
}(BaseItemRender));
__reflect(HomeBossRemindItem.prototype, "HomeBossRemindItem");
//# sourceMappingURL=HomeBossRemindItem.js.map