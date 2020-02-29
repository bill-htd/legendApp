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
var PubBossRemindItem = (function (_super) {
    __extends(PubBossRemindItem, _super);
    function PubBossRemindItem() {
        var _this = _super.call(this) || this;
        _this._move = false;
        _this._lastX = 0;
        _this._lastY = 0;
        return _this;
    }
    PubBossRemindItem.prototype.childrenCreated = function () {
        this.checkBoxs.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin1, this);
    };
    PubBossRemindItem.prototype.onTouchBegin1 = function (e) {
        this._lastX = e.stageX;
        this._lastY = e.stageY;
        this._lastSelect = this.checkBoxs.selected;
        this._move = false;
        if (this.$stage) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove1, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd1, this);
        }
    };
    PubBossRemindItem.prototype.onTouchMove1 = function (e) {
        if (MathUtils.getDistance(this._lastX, this._lastY, e.stageX, e.stageY) > 20) {
            this._move = true;
        }
    };
    PubBossRemindItem.prototype.onTouchEnd1 = function () {
        if (this._move) {
            this.checkBoxs.selected = this._lastSelect;
            this._move = false;
        }
        if (this.$stage) {
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove1, this);
            this.$stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd1, this);
        }
    };
    PubBossRemindItem.prototype.dataChanged = function () {
        var model = this.data;
        var config = GlobalConfig.WorldBossConfig[model.id];
        var canChallenge = UserBoss.isCanChallenge(config);
        var desc;
        if (config.samsaraLv > 0) {
            desc = config.showName;
        }
        else {
            if (config.zsLevel > 0) {
                desc = config.zsLevel + "\u8F6C";
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
    return PubBossRemindItem;
}(BaseItemRender));
__reflect(PubBossRemindItem.prototype, "PubBossRemindItem");
//# sourceMappingURL=PubBossRemindItem.js.map