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
var OSATarget0Panel9 = (function (_super) {
    __extends(OSATarget0Panel9, _super);
    function OSATarget0Panel9() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this._angles = [0, 0, 0, 0, 0, 0, 0];
        _this._circleCenter = { x: 168, y: 120 };
        _this._a = 155;
        _this._b = 80;
        _this._angle = 0.1;
        return _this;
    }
    OSATarget0Panel9.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget0Panel9.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "XNWingUpSkin";
    };
    OSATarget0Panel9.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.addTouchEvent(this.pay0, this.onTap);
        this.updateData();
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
    };
    OSATarget0Panel9.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        this.resetBalls();
    };
    OSATarget0Panel9.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.pay0:
                var aCon = GlobalConfig.ActivityBtnConfig[this.activityID];
                if (!aCon.jump)
                    return;
                switch (aCon.jump[0]) {
                    case StatePageSysType.WING:
                        if (Actor.level < GlobalConfig.WingCommonConfig.openLevel) {
                            UserTips.ins().showTips("羽翼" + GlobalConfig.WingCommonConfig.openLevel + "级开启");
                            return;
                        }
                        ViewManager.ins().open(aCon.jump[1], aCon.jump[2], 0);
                        break;
                    case StatePageSysType.RING:
                        if (!LyMark.ins().checkOpen()) {
                            UserTips.ins().showTips("\u70C8\u7130\u6212\u6307\u8FBE\u5230" + GlobalConfig.FlameStamp.openLevel + "\u7EA7\u5F00\u542F");
                            return;
                        }
                        ViewManager.ins().open(aCon.jump[1], aCon.jump[2]);
                        break;
                    default:
                        ViewManager.ins().open(aCon.jump[1], aCon.jump[2]);
                }
                break;
        }
    };
    OSATarget0Panel9.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor(activityData.startTime / 1000 - GameServer.serverTime / 1000);
        var endedTime = Math.floor(activityData.endTime / 1000 - GameServer.serverTime / 1000);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
        }
        else {
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        var btncfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        this.title.source = btncfg.title;
        this.actInfo.textFlow = TextFlowMaker.generateTextFlow1(btncfg.acDesc);
        var aCon = GlobalConfig.ActivityBtnConfig[this.activityID];
        switch (aCon.jump[0]) {
            case StatePageSysType.RING:
                this.updateBalls();
                this.redPoint.visible = false;
                if (LyMark.ins().checkOpen()) {
                    if (!LyMark.ins().isMax) {
                        var cfg = GlobalConfig.FlameStampLevel[LyMark.ins().lyMarkLv];
                        var itemData = UserBag.ins().getBagItemById(cfg.costItem);
                        var count = itemData ? itemData.count : 0;
                        this.redPoint.visible = count >= cfg.costCount;
                    }
                }
                break;
        }
    };
    OSATarget0Panel9.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget0Panel9.prototype.updateBalls = function () {
        if (!this.img || !this.img.parent)
            return;
        var bollNum = 7;
        if (bollNum) {
            this.resetBalls();
            if (!this._balls) {
                this._balls = [];
                TimerManager.ins().doTimer(17 * 3, 0, this.doCircle, this);
            }
            this._circleCenter.x = this.img.width / 2;
            this._circleCenter.y = this.img.height / 2 + 25;
            var ball = void 0;
            var radian = 2 * Math.PI / bollNum;
            for (var i = 0; i < bollNum; i++) {
                ball = ObjectPool.pop("MovieClip");
                this.img.parent.addChild(ball);
                this._angles[i] = radian * i;
                ball.x = this._a * Math.cos(radian * i) + this._circleCenter.x;
                ball.y = this._b * Math.sin(radian * i) + this._circleCenter.y;
                this._balls.push(ball);
                ball.playFile(RES_DIR_EFF + "lymarkeff", -1);
            }
        }
    };
    OSATarget0Panel9.prototype.doCircle = function () {
        if (!this._balls) {
            TimerManager.ins().removeAll(this);
            return;
        }
        if (!this.img || !this.img.parent)
            return;
        var len = this._balls.length, ball;
        var parent;
        var imgIndex = 0, selfIndex = 0;
        for (var i = 0; i < len; i++) {
            ball = this._balls[i];
            ball.x = this._a * Math.cos(this._angles[i]) + this._circleCenter.x;
            ball.y = this._b * Math.sin(this._angles[i]) + this._circleCenter.y;
            this._angles[i] += this._angle;
            this._angles[i] = this._angles[i] % (2 * Math.PI);
            parent = ball.parent;
            imgIndex = parent.getChildIndex(this.img);
            selfIndex = parent.getChildIndex(ball);
            if (this._angles[i] >= 2.5 && this._angles[i] <= 6) {
                if (selfIndex > imgIndex)
                    parent.addChildAt(ball, 3);
            }
            else {
                if (selfIndex < imgIndex)
                    parent.addChildAt(ball, parent.numChildren);
            }
        }
    };
    OSATarget0Panel9.prototype.resetBalls = function () {
        TimerManager.ins().removeAll(this);
        if (this._balls) {
            var len = this._balls.length;
            for (var i = 0; i < len; i++) {
                this._balls[i].destroy();
                this._balls[i] = null;
            }
            this._balls.length = 0;
            this._balls = null;
        }
    };
    return OSATarget0Panel9;
}(BaseView));
__reflect(OSATarget0Panel9.prototype, "OSATarget0Panel9");
//# sourceMappingURL=OSATarget0Panel9.js.map