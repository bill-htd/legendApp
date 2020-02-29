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
var RingTurnDisplayer = (function (_super) {
    __extends(RingTurnDisplayer, _super);
    function RingTurnDisplayer() {
        var _this = _super.call(this) || this;
        _this.gAngle = 180;
        _this.gHasReset = true;
        _this.gInitPos = true;
        _this.isMaxX = false;
        _this.isMaxY = false;
        _this.gemPos1 = [64, -52, -68, -80, -84, -80, -64, -90, -50, -100, 40, -110, 64, -80, 64, -52];
        _this.mc = new MovieClip;
        _this.gFollowItem = new egret.DisplayObjectContainer();
        _this.addChild(_this.gFollowItem);
        _this.gCenterPos = new egret.Point();
        _this.gTurnItem = new egret.DisplayObjectContainer();
        _this.gTurnItem.addChild(_this.mc);
        _this.gFollowItem.addChild(_this.gTurnItem);
        TimerManager.ins().doTimer(20, 0, _this.update, _this);
        return _this;
    }
    RingTurnDisplayer.prototype.setOwner = function (player) {
        this.gOwner = player;
        this.gTurnTime = 10000 + 10000 * Math.random() + egret.getTimer();
        this.gAngle = RingTurnDisplayer.STAR_ANGLE;
        this.gStopTime = 0;
    };
    RingTurnDisplayer.prototype.update = function () {
        if (this.gInitPos) {
            this.gFollowItem.x = RingTurnDisplayer.TARGET_POINT_X;
            this.gFollowItem.y = RingTurnDisplayer.TARGET_POINT_Y - this.gOwner.height;
            this.gInitPos = false;
        }
        else {
            this.gFollowItem.x = this.gFollowItem.x - (this.gOwner.x - this.gOwnerLastX);
            this.gFollowItem.y = this.gFollowItem.y - (this.gOwner.y - this.gOwnerLastY);
        }
        this.gCenterPos = new egret.Point(this.effectX, this.effectY);
        this.moveCenterPoint();
        this.gOwnerLastX = this.gOwner.x;
        this.gOwnerLastY = this.gOwner.y;
    };
    RingTurnDisplayer.prototype.setEffectXY = function (dir) {
        var sx = this.gemPos1[dir * 2];
        var sy = this.gemPos1[dir * 2 + 1];
        this.effectX = sx + Math.ceil(100 * Math.random() - 50);
        this.effectY = sy + Math.ceil(100 * Math.random() - 50);
    };
    RingTurnDisplayer.prototype.moveCenterPoint = function () {
        var _local1;
        var _local2 = this.gCenterPos.x - this.gFollowItem.x;
        if (_local2 != 0) {
            if (Math.abs(_local2) > RingTurnDisplayer.MAX_DIS) {
                _local1 = Math.ceil(Math.abs(_local2) * RingTurnDisplayer.SPEED_RATIO) * 2 * 3 / 2;
                if (_local2 > 0) {
                    if (_local2 > _local1)
                        this.gFollowItem.x = this.gFollowItem.x + _local1;
                }
                else if (_local2 < 0) {
                    if (Math.abs(_local2) > _local1)
                        this.gFollowItem.x = this.gFollowItem.x - _local1;
                }
            }
            else {
                this.isMaxX = false;
                _local1 = Math.ceil(Math.abs(_local2) * RingTurnDisplayer.SPEED_RATIO) * 3 / 2 * 1.35;
                if (_local2 > 0) {
                    if (_local2 > _local1)
                        this.gFollowItem.x = this.gFollowItem.x + _local1;
                }
                else if (_local2 < 0) {
                    if (Math.abs(_local2) > _local1)
                        this.gFollowItem.x = this.gFollowItem.x - _local1;
                }
            }
        }
        var _local3 = this.gCenterPos.y - this.gFollowItem.y;
        if (_local3 != 0) {
            if (Math.abs(_local3) > RingTurnDisplayer.MAX_DIS) {
                _local1 = Math.ceil(Math.abs(_local3) * RingTurnDisplayer.SPEED_RATIO) * 2 * 3 / 2;
                if (_local3 >= 0) {
                    if (_local3 > _local1)
                        this.gFollowItem.y = this.gFollowItem.y + _local1;
                }
                else if (_local3 < 0) {
                    if (Math.abs(_local3) > _local1)
                        this.gFollowItem.y = this.gFollowItem.y - _local1;
                }
            }
            else {
                this.isMaxY = false;
                _local1 = Math.ceil(Math.abs(_local3) * RingTurnDisplayer.SPEED_RATIO) * 3 / 2 * 1.35;
                if (_local3 >= 0) {
                    if (_local3 > _local1)
                        this.gFollowItem.y = this.gFollowItem.y + _local1;
                }
                else if (_local3 < 0) {
                    if (Math.abs(_local3) > _local1)
                        this.gFollowItem.y = this.gFollowItem.y - _local1;
                }
            }
        }
    };
    RingTurnDisplayer.prototype.setModel = function (id, infoModel, topContainer) {
        this.infomodel = infoModel;
        if (infoModel.masterHandle && infoModel.masterHandle == Actor.handle) {
            if (id < 0 || id == null)
                return;
            if (EntityManager.ins().getMainRole(0) && (EntityManager.ins().getMainRole(0).infoModel.handle != infoModel.handle))
                return;
        }
        if (infoModel.masterHandle && SpecialRing.ins().hasHanlder(infoModel.masterHandle)) {
            if (this.lastID != id) {
                this.showRing(id);
                this.lastID = id;
            }
            return;
        }
        this.showRing(id);
        topContainer.addChild(this);
    };
    RingTurnDisplayer.prototype.showRing = function (id) {
        this.mc.alpha = 1;
        this.ringInfo = GlobalConfig.ActorExRingConfig[id];
        var monConfig = GlobalConfig.MonstersConfig[this.ringInfo.avatarFileName];
        this.mc.playFile(RES_DIR_MONSTER + "monster" + monConfig.avatar + "_0a", -1);
    };
    RingTurnDisplayer.prototype.reset = function () {
        if (this.mc) {
            DisplayUtils.removeFromParent(this.mc);
        }
        SpecialRing.ins().delHanlder(this.infomodel.masterHandle);
        this.gOwnerLastX = 0;
        this.gOwnerLastY = 0;
        this.gCenterPos.x = 0;
        this.gCenterPos.y = 0;
        this.gHasReset = true;
        this.gInitPos = true;
        this.gModelUrl = "";
        TimerManager.ins().removeAll(this);
    };
    RingTurnDisplayer.TARGET_POINT_X = 95;
    RingTurnDisplayer.TARGET_POINT_Y = -40;
    RingTurnDisplayer.MAX_DIS = 60;
    RingTurnDisplayer.STAR_ANGLE = 0;
    RingTurnDisplayer.SPEED_RATIO = 0.015;
    return RingTurnDisplayer;
}(egret.DisplayObjectContainer));
__reflect(RingTurnDisplayer.prototype, "RingTurnDisplayer");
//# sourceMappingURL=RingTurnDisplayer.js.map