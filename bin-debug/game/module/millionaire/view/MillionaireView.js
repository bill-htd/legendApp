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
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["LEFT_TOP"] = 1] = "LEFT_TOP";
    DIRECTION[DIRECTION["TOP_MID"] = 2] = "TOP_MID";
    DIRECTION[DIRECTION["RIGHT_TOP"] = 3] = "RIGHT_TOP";
    DIRECTION[DIRECTION["LEFT_MID"] = 4] = "LEFT_MID";
    DIRECTION[DIRECTION["RIGHT_MID"] = 5] = "RIGHT_MID";
    DIRECTION[DIRECTION["LEFT_DOWN"] = 6] = "LEFT_DOWN";
    DIRECTION[DIRECTION["DOWN_MID"] = 7] = "DOWN_MID";
    DIRECTION[DIRECTION["RIGHT_DOWN"] = 8] = "RIGHT_DOWN";
    DIRECTION[DIRECTION["MOVING"] = 9] = "MOVING";
})(DIRECTION || (DIRECTION = {}));
var MillionaireView = (function (_super) {
    __extends(MillionaireView, _super);
    function MillionaireView() {
        var _this = _super.call(this) || this;
        _this.step = 3;
        _this.count = 0;
        _this.gridList = [];
        _this.curGridId = Millionaire.ins().gridId ? Millionaire.ins().gridId : 1;
        _this.nextPos = _this.curGridId;
        _this.cameraWidth = GlobalConfig.RichManBaseConfig.cameraWidth;
        _this.cameraHeight = GlobalConfig.RichManBaseConfig.cameraHeight;
        _this.updateStop = true;
        _this.countDown = 0;
        _this.aniTime = 0;
        _this.dictime = 10;
        _this.count = 0;
        _this.effing = false;
        _this.btnUp = false;
        _this.stepNum = 0;
        _this.isUpdateRandom = false;
        _this.step = GlobalConfig.RichManBaseConfig.speed;
        _this.diceimg = false;
        return _this;
    }
    MillionaireView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateMillionaire, this);
        this.gridList = [];
        this.roleModel.destory();
        DisplayUtils.removeFromParent(this.masksp);
    };
    MillionaireView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Millionaire.ins().postMillionaireInfo, this.callbackMillionaireInfo);
        this.observe(Millionaire.ins().postTurnDice, this.callbackTurnDice);
        this.observe(Millionaire.ins().postOverAllReward, this.callbackOverAllReward);
        this.createMap();
        this.createRole();
        this.initPos();
        TimerManager.ins().remove(this.updateMillionaire, this);
        TimerManager.ins().doTimer(this.dictime, 0, this.updateMillionaire, this);
    };
    MillionaireView.prototype.callbackMillionaireInfo = function () {
    };
    MillionaireView.prototype.callbackTurnDice = function () {
        if (Millionaire.ins().isStrideStart) {
            this.nextPos = 1;
            this.stepNum = Millionaire.ins().dicePoint - (this.gridList.length - this.curGridId);
        }
        else {
            this.nextPos = this.curGridId + Millionaire.ins().dicePoint;
        }
        var cfg = GlobalConfig.RichManGridConfig[this.nextPos];
        if (cfg && cfg.action == MillionaireItem.ACTION_3) {
        }
        else {
            if (this.nextPos != 1)
                this.nextPos = Millionaire.ins().gridId;
        }
        if (Millionaire.ins().isAutoGo)
            this.countDown = 0;
        else
            this.countDown = GlobalConfig.RichManBaseConfig.diceTime;
        this.updateStop = false;
    };
    MillionaireView.prototype.callbackOverAllReward = function () {
        this.isUpdateRandom = true;
    };
    MillionaireView.prototype.updateMapEx = function () {
        var _this = this;
        this.updateEff(function () {
            _this.updateMap();
        });
    };
    MillionaireView.prototype.updateMapOnly = function () {
        var i = this.curGridId;
        this.gridList[i].setHideEff();
        Millionaire.ins().rewardIdByGrids[i] = -1;
    };
    MillionaireView.prototype.updateEff = function (callfunc) {
        this.aniTime = 0.5;
        this.effing = true;
        var self = this;
        this.arrEff = [];
        var _loop_1 = function (i) {
            var mitem = this_1.gridList[i];
            if (GlobalConfig.RichManGridConfig[i].action == MillionaireItem.ACTION_3 ||
                GlobalConfig.RichManGridConfig[i].action == MillionaireItem.ACTION_4) {
                this_1.arrEff[i] = true;
                return "continue";
            }
            this_1.arrEff[i] = false;
            if (mitem) {
                if (mitem.isEffing) {
                    self.arrEff[i] = true;
                    return "continue";
                }
                egret.Tween.get(mitem.itemicon).to({ scaleX: 0, scaleY: 0 }, this_1.aniTime * 1000).call(function () {
                    egret.Tween.removeTweens(mitem.itemicon);
                    self.arrEff[i] = true;
                });
            }
        };
        var this_1 = this;
        for (var i = 1; i <= this.gridList.length - 1; i++) {
            _loop_1(i);
        }
        this.callfunc = callfunc;
    };
    MillionaireView.prototype.getDirection = function () {
        if (this.mapGroup.width <= this.cameraWidth && this.mapGroup.height <= this.cameraHeight)
            return DIRECTION.LEFT_TOP;
        var p = new egret.Point();
        p.x = this.gridList[this.curGridId].x;
        p.y = this.gridList[this.curGridId].y;
        var grid_x = Math.floor(p.x + this.gridList[this.curGridId].width / 2);
        var grid_y = Math.floor(p.y + this.gridList[this.curGridId].height / 2);
        if (grid_x >= Math.floor(this.cameraWidth / 2) &&
            grid_y >= Math.floor(this.cameraHeight / 2) &&
            grid_x <= Math.floor((this.mapGroup.width - this.cameraWidth / 2)) &&
            grid_y <= Math.floor((this.mapGroup.height - this.cameraHeight / 2))) {
            return DIRECTION.MOVING;
        }
        else {
            if (grid_x <= Math.floor(this.cameraWidth / 2) &&
                grid_y <= Math.floor(this.cameraHeight / 2)) {
                return DIRECTION.LEFT_TOP;
            }
            else if (grid_x >= Math.floor(this.cameraWidth / 2) &&
                grid_x <= Math.floor((this.mapGroup.width - this.cameraWidth / 2)) &&
                grid_y <= Math.floor(this.cameraHeight / 2)) {
                return DIRECTION.TOP_MID;
            }
            else if (grid_x >= Math.floor(this.mapGroup.width - this.cameraWidth / 2) &&
                grid_y <= Math.floor(this.cameraHeight / 2)) {
                return DIRECTION.RIGHT_TOP;
            }
            else if (grid_x <= Math.floor((this.cameraWidth / 2)) &&
                grid_y >= Math.floor(this.cameraHeight / 2) &&
                grid_y <= Math.floor(this.mapGroup.height - this.cameraHeight / 2)) {
                return DIRECTION.LEFT_MID;
            }
            else if (grid_x >= Math.floor((this.mapGroup.width - this.cameraWidth / 2)) &&
                grid_y >= Math.floor(this.cameraHeight / 2) &&
                grid_y <= Math.floor(this.mapGroup.height - this.cameraHeight / 2)) {
                return DIRECTION.RIGHT_MID;
            }
            else if (grid_x <= Math.floor(this.cameraWidth / 2) &&
                grid_y >= Math.floor((this.mapGroup.height - this.cameraHeight / 2))) {
                return DIRECTION.LEFT_DOWN;
            }
            else if (grid_x >= Math.floor(this.cameraWidth / 2) &&
                grid_x <= Math.floor((this.mapGroup.width - this.cameraWidth / 2)) &&
                grid_y >= Math.floor((this.mapGroup.height - this.cameraHeight / 2))) {
                return DIRECTION.DOWN_MID;
            }
            else if (grid_x >= Math.floor(this.mapGroup.width - this.cameraWidth / 2) &&
                grid_y >= Math.floor((this.mapGroup.height - this.cameraHeight / 2))) {
                return DIRECTION.RIGHT_DOWN;
            }
            return 0;
        }
    };
    MillionaireView.prototype.initPos = function () {
        this.mapGroup.x = 0;
        this.mapGroup.y = 0;
        var p = this.gridList[this.curGridId].localToGlobal();
        this.globalToLocal(p.x, p.y, p);
        var dir = this.getDirection();
        if (dir == DIRECTION.MOVING) {
            this.mapGroup.x = this.cameraWidth / 2 - p.x - this.gridList[this.curGridId].width / 2;
            this.mapGroup.y = this.cameraHeight / 2 - p.y - this.gridList[this.curGridId].height / 2;
        }
        else {
            if (dir == DIRECTION.LEFT_TOP) {
                this.mapGroup.x = 0;
                this.mapGroup.y = 0;
            }
            else if (dir == DIRECTION.TOP_MID) {
                this.mapGroup.x = -p.x + this.cameraWidth / 2 - this.gridList[this.curGridId].width / 2;
                this.mapGroup.y = 0;
            }
            else if (dir == DIRECTION.RIGHT_TOP) {
                this.mapGroup.x = this.cameraWidth - this.mapGroup.width - this.gridList[this.curGridId].width / 2;
                this.mapGroup.y = 0;
            }
            else if (dir == DIRECTION.LEFT_MID) {
                this.mapGroup.x = 0;
                this.mapGroup.y = -p.y + this.cameraHeight / 2 - this.gridList[this.curGridId].height / 2;
            }
            else if (dir == DIRECTION.RIGHT_MID) {
                this.mapGroup.x = this.cameraWidth - this.mapGroup.width - this.gridList[this.curGridId].width / 2;
                this.mapGroup.y = -p.y + this.cameraHeight / 2 - this.gridList[this.curGridId].height / 2;
            }
            else if (dir == DIRECTION.LEFT_DOWN) {
                this.mapGroup.x = 0;
                this.mapGroup.y = this.cameraHeight - this.mapGroup.height - this.gridList[this.curGridId].height / 2;
            }
            else if (dir == DIRECTION.DOWN_MID) {
                this.mapGroup.x = -p.x + this.cameraWidth / 2 - this.gridList[this.curGridId].width / 2;
                this.mapGroup.y = this.cameraHeight - this.mapGroup.height - this.gridList[this.curGridId].height / 2;
            }
            else if (dir == DIRECTION.RIGHT_DOWN) {
                this.mapGroup.x = this.cameraWidth - this.mapGroup.width - this.gridList[this.curGridId].width / 2;
                this.mapGroup.y = this.cameraHeight - this.mapGroup.height - this.gridList[this.curGridId].height / 2;
            }
        }
        p = this.gridList[this.curGridId].localToGlobal();
        this.globalToLocal(p.x, p.y, p);
        this.roleModel.x = p.x + this.roleModel.width / 2;
        this.roleModel.y = p.y + this.roleModel.height / 2;
    };
    MillionaireView.prototype.createRole = function () {
        var role = SubRoles.ins().getSubRoleByIndex(0);
        this.roleModel = new MillionaireRole(role.sex);
        var cfg = GlobalConfig.RichManGridConfig[this.curGridId];
        if (cfg)
            this.roleModel.state = cfg.dir;
        this.roleModel.width = 53;
        this.roleModel.height = 53 + 38;
        this.roleModel.x = this.roleModel.x + this.roleModel.width / 2;
        this.roleModel.y = this.roleModel.y + this.roleModel.height / 2;
        this.roleModel.updateModel();
        this.addChild(this.roleModel);
    };
    MillionaireView.prototype.createMap = function () {
        if (!this.mapGroup) {
            this.mapGroup = new eui.Group();
            this.mapGroup.x = 0;
            this.mapGroup.y = 0;
            this.addChild(this.mapGroup);
        }
        for (var i = 1; i <= Millionaire.ins().rewardIdByGrids.length - 1; i++) {
            var cfg = GlobalConfig.RichManGridConfig[i];
            if (cfg) {
                if (i == 1) {
                    var mitem_1 = new MillionaireItem();
                    mitem_1.x = 0;
                    mitem_1.y = 0;
                    mitem_1.data = { rewardId: Millionaire.ins().rewardIdByGrids[i], index: i };
                    this.mapGroup.addChild(mitem_1);
                    this.gridList[i] = mitem_1;
                    continue;
                }
                var precfg = GlobalConfig.RichManGridConfig[i - 1];
                if (!precfg)
                    continue;
                var mitem = new MillionaireItem();
                mitem.data = { rewardId: Millionaire.ins().rewardIdByGrids[i], index: i };
                this.gridList[i] = mitem;
                this.mapGroup.addChild(mitem);
                switch (precfg.dir) {
                    case MillionaireView.DIR_UP:
                        mitem.x = this.gridList[i - 1].x;
                        mitem.y = this.gridList[i - 1].y - this.gridList[i - 1].height;
                        break;
                    case MillionaireView.DIR_RIGHT:
                        mitem.x = this.gridList[i - 1].x + this.gridList[i - 1].width;
                        mitem.y = this.gridList[i - 1].y;
                        break;
                    case MillionaireView.DIR_DOWN:
                        mitem.x = this.gridList[i - 1].x;
                        mitem.y = this.gridList[i - 1].y + this.gridList[i - 1].height;
                        break;
                    case MillionaireView.DIR_LEFT:
                        mitem.x = this.gridList[i - 1].x - this.gridList[i - 1].width;
                        mitem.y = this.gridList[i - 1].y;
                        break;
                }
            }
        }
        this.sortGrid();
        if (!this.masksp) {
            this.masksp = new egret.Sprite();
            var square = new egret.Shape();
            square.graphics.beginFill(0xffff00);
            square.graphics.drawRect(this.mapGroup.x, this.mapGroup.y - 70, this.cameraWidth, this.cameraHeight + 70);
            square.graphics.endFill();
            this.masksp.addChild(square);
            this.addChild(this.masksp);
            this.mapGroup.mask = this.masksp;
        }
    };
    MillionaireView.prototype.updateMap = function () {
        for (var i = 1; i <= this.gridList.length - 1; i++) {
            this.gridList[i].data = { rewardId: Millionaire.ins().rewardIdByGrids[i], index: i };
            this.gridList[i].itemicon.scaleX = 1;
            this.gridList[i].itemicon.scaleY = 1;
        }
    };
    MillionaireView.prototype.sortGrid = function () {
        this.mapGroup.$children.sort(this.sortF);
    };
    MillionaireView.prototype.sortF = function (d1, d2) {
        if (d1.y > d2.y) {
            return 1;
        }
        else if (d1.y < d2.y) {
            return -1;
        }
        else {
            return 0;
        }
    };
    MillionaireView.prototype.updateMillionaire = function () {
        if (this.countDown) {
            this.count += this.dictime / 100;
            if (this.count >= 1) {
                this.countDown -= 0.1;
                this.count = 0;
            }
            if (this.countDown <= 0) {
                this.countDown = 0;
                this.count = 0;
                this.diceimg = false;
            }
            return;
        }
        if (this.effing) {
            var isSuccess = true;
            for (var i = 1; i <= this.arrEff.length - 1; i++) {
                if (!this.arrEff[i]) {
                    isSuccess = false;
                    break;
                }
            }
            if (isSuccess) {
                if (this.callfunc && typeof (this.callfunc) == "function")
                    this.callfunc();
                this.effing = false;
                this.callfunc = null;
                if (this.stepNum > 0) {
                    this.nextPos += this.stepNum;
                    this.stepNum = 0;
                }
                if (this.curGridId == this.nextPos) {
                    this.btnUp = false;
                }
            }
            return;
        }
        if (this.updateStop)
            return;
        if (this.roleModel) {
            this.checkRoleType();
            if (this.roleModel.roleType == MillionaireRole.ACTION) {
                this.Action();
            }
            else {
                this.Stop();
            }
        }
    };
    MillionaireView.prototype.checkRoleType = function () {
        if (this.curGridId != this.nextPos) {
            this.roleModel.roleType = MillionaireRole.ACTION;
        }
    };
    MillionaireView.prototype.getMoveGridId = function () {
        if (this.curGridId != this.nextPos) {
            var p = this.gridList[this.curGridId].localToGlobal();
            this.globalToLocal(p.x, p.y, p);
            if (p.x + this.roleModel.width / 2 == this.roleModel.x && p.y + this.roleModel.height / 2 == this.roleModel.y) {
                this.curGridId += 1;
                if (this.curGridId > this.gridList.length - 1)
                    this.curGridId = 1;
                var cfg = GlobalConfig.RichManGridConfig[this.curGridId - 1];
                if (cfg) {
                    this.roleModel.state = cfg.dir;
                }
            }
        }
        this.roleModel.updateModel();
        return this.curGridId;
    };
    MillionaireView.prototype.Stop = function () {
        this.updateStop = true;
        this.roleModel.updateModel();
    };
    MillionaireView.prototype.Action = function () {
        this.updateStop = false;
        var newGridId = this.getMoveGridId();
        var p = this.gridList[newGridId].localToGlobal();
        this.globalToLocal(p.x, p.y, p);
        var difX = 0;
        var difY = 0;
        switch (this.roleModel.state) {
            case MillionaireView.DIR_LEFT:
            case MillionaireView.DIR_RIGHT:
                if (this.roleModel.x != p.x + this.roleModel.width / 2) {
                    difX = p.x - this.roleModel.x + this.roleModel.width / 2;
                }
                break;
            case MillionaireView.DIR_UP:
            case MillionaireView.DIR_DOWN:
                if (this.roleModel.y != p.y + this.roleModel.height / 2) {
                    difY = p.y - this.roleModel.y + this.roleModel.height / 2;
                }
                break;
        }
        if (Math.abs(difX) > this.step) {
            difX = this.getStepPixel(this.roleModel.state);
        }
        if (Math.abs(difY) > this.step) {
            difY = this.getStepPixel(this.roleModel.state);
        }
        var moveObj;
        var isRoleX;
        var dir = this.getDirection();
        if (dir == DIRECTION.LEFT_TOP || dir == DIRECTION.LEFT_MID || dir == DIRECTION.LEFT_DOWN ||
            dir == DIRECTION.RIGHT_TOP || dir == DIRECTION.RIGHT_MID || dir == DIRECTION.RIGHT_DOWN ||
            dir == DIRECTION.TOP_MID || dir == DIRECTION.DOWN_MID) {
            if ((dir == DIRECTION.LEFT_TOP || dir == DIRECTION.LEFT_MID || dir == DIRECTION.LEFT_DOWN) &&
                (this.roleModel.state == MillionaireView.DIR_RIGHT || this.roleModel.state == MillionaireView.DIR_LEFT) &&
                (this.mapGroup.x >= 0) ||
                (dir == DIRECTION.RIGHT_TOP || dir == DIRECTION.RIGHT_MID || dir == DIRECTION.RIGHT_DOWN) &&
                    (this.roleModel.state == MillionaireView.DIR_LEFT || this.roleModel.state == MillionaireView.DIR_RIGHT) &&
                    (this.mapGroup.x <= -this.mapGroup.width + this.cameraWidth) ||
                (dir == DIRECTION.TOP_MID || dir == DIRECTION.DOWN_MID) && this.roleModel.state == MillionaireView.DIR_RIGHT &&
                    (this.roleModel.x + this.roleModel.width / 2 < this.cameraWidth / 2) ||
                (dir == DIRECTION.TOP_MID || dir == DIRECTION.DOWN_MID) && this.roleModel.state == MillionaireView.DIR_LEFT &&
                    (this.roleModel.x + this.roleModel.width / 2 > this.cameraWidth / 2)) {
                moveObj = this.roleModel;
                isRoleX = true;
            }
            else {
                moveObj = this.mapGroup;
                difX = -difX;
                isRoleX = false;
            }
        }
        else {
            moveObj = this.mapGroup;
            difX = -difX;
            isRoleX = false;
        }
        var nextPosX = moveObj.x + difX;
        var isRoleY;
        if (dir == DIRECTION.LEFT_TOP || dir == DIRECTION.TOP_MID || dir == DIRECTION.RIGHT_TOP ||
            dir == DIRECTION.LEFT_DOWN || dir == DIRECTION.DOWN_MID || dir == DIRECTION.RIGHT_DOWN ||
            dir == DIRECTION.LEFT_MID || dir == DIRECTION.RIGHT_MID) {
            if ((dir == DIRECTION.LEFT_TOP || dir == DIRECTION.TOP_MID || dir == DIRECTION.RIGHT_TOP) &&
                (this.roleModel.state == MillionaireView.DIR_DOWN || this.roleModel.state == MillionaireView.DIR_UP) &&
                (this.mapGroup.y >= 0) ||
                (dir == DIRECTION.LEFT_DOWN || dir == DIRECTION.DOWN_MID || dir == DIRECTION.RIGHT_DOWN) &&
                    (this.roleModel.state == MillionaireView.DIR_UP || this.roleModel.state == MillionaireView.DIR_DOWN) &&
                    (this.mapGroup.y <= -this.mapGroup.height + this.cameraHeight) ||
                (dir == DIRECTION.LEFT_MID || dir == DIRECTION.RIGHT_MID) && this.roleModel.state == MillionaireView.DIR_DOWN &&
                    (this.roleModel.y + this.roleModel.height / 2 < this.cameraHeight / 2) ||
                (dir == DIRECTION.LEFT_MID || dir == DIRECTION.RIGHT_MID) && this.roleModel.state == MillionaireView.DIR_UP &&
                    (this.roleModel.y + this.roleModel.height / 2 > this.cameraHeight / 2)) {
                moveObj = this.roleModel;
                isRoleY = true;
            }
            else {
                moveObj = this.mapGroup;
                difY = -difY;
                isRoleY = false;
            }
        }
        else {
            moveObj = this.mapGroup;
            difY = -difY;
            isRoleY = false;
        }
        var nextPosY = moveObj.y + difY;
        if (!difX && !difY) {
            this.roleModel.roleType = MillionaireRole.STOP;
            this.doSometing();
            this.roleModel.updateModel();
            return;
        }
        else {
            this.roleModel.roleType = MillionaireRole.ACTION;
        }
        if (isRoleX) {
            if (this.roleModel.x + this.roleModel.width / 2 < this.cameraWidth / 2 && nextPosX + this.roleModel.width / 2 > this.cameraWidth / 2 ||
                this.roleModel.x + this.roleModel.width / 2 > this.cameraWidth / 2 && nextPosX + this.roleModel.width / 2 < this.cameraWidth / 2)
                this.roleModel.x = this.cameraWidth / 2 - this.roleModel.width / 2;
            else
                this.roleModel.x = nextPosX;
        }
        else {
            this.mapGroup.x = nextPosX;
        }
        if (isRoleY) {
            if (this.roleModel.y + this.roleModel.height / 2 < this.cameraHeight / 2 && nextPosY + this.roleModel.height / 2 > this.cameraHeight / 2 ||
                this.roleModel.y + this.roleModel.height / 2 > this.cameraHeight / 2 && nextPosY + this.roleModel.height / 2 < this.cameraHeight / 2)
                this.roleModel.y = this.cameraHeight / 2 - this.roleModel.height / 2;
            else
                this.roleModel.y = nextPosY;
        }
        else {
            this.mapGroup.y = nextPosY;
        }
    };
    MillionaireView.prototype.doSometing = function () {
        var config = GlobalConfig.RichManGridConfig[this.curGridId];
        if (!config)
            return;
        if (this.curGridId == 1) {
            this.updateMapOnly();
            this.updateMapEx();
            return;
        }
        if (config.action == MillionaireItem.ACTION_1) {
            this.updateMapOnly();
        }
        else if (config.action == MillionaireItem.ACTION_2) {
            if (Millionaire.ins().randomGridById <= 0) {
                UserTips.ins().showCenterTips("\u8E29\u4E2D\u968F\u673A\u547D\u8FD0\u5F02\u5E38 \u68C0\u67E54\u53F7\u6D88\u606F\u662F\u5426\u6709\u8FD4\u56DE\u8FC7");
                return;
            }
            if (this.isUpdateRandom) {
                this.isUpdateRandom = false;
                this.updateMapEx();
            }
            else {
                if (Millionaire.ins().rewardIdByGrids[this.curGridId] == -1) {
                    this.btnUp = false;
                    return;
                }
                this.updateMapOnly();
            }
        }
        else if (config.action == MillionaireItem.ACTION_3) {
            this.nextPos = Millionaire.ins().gridId;
            this.curGridId = this.nextPos;
            this.initPos();
        }
        else if (config.action == MillionaireItem.ACTION_4) {
            this.updateMapOnly();
        }
        this.btnUp = false;
    };
    MillionaireView.prototype.getStepPixel = function (state) {
        switch (state) {
            case MillionaireView.DIR_UP:
                return -this.step;
            case MillionaireView.DIR_DOWN:
                return this.step;
            case MillionaireView.DIR_RIGHT:
                return this.step;
            case MillionaireView.DIR_LEFT:
                return -this.step;
        }
    };
    MillionaireView.prototype.checkCamera = function (state, dir) {
        if (dir == DIRECTION.MOVING)
            return true;
        switch (state) {
            case MillionaireView.DIR_UP:
                if (this.roleModel.y + this.roleModel.height / 2 > this.cameraHeight / 2)
                    return false;
                break;
            case MillionaireView.DIR_DOWN:
                if (this.roleModel.y + this.roleModel.height / 2 < this.cameraHeight / 2)
                    return false;
                break;
            case MillionaireView.DIR_RIGHT:
                if (this.roleModel.x + this.roleModel.width / 2 < this.cameraWidth / 2)
                    return false;
                break;
            case MillionaireView.DIR_LEFT:
                if (this.roleModel.x + this.roleModel.width / 2 > this.cameraWidth / 2)
                    return false;
                break;
        }
        return true;
    };
    MillionaireView.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
        this.close();
    };
    MillionaireView.DIR_UP = 1;
    MillionaireView.DIR_RIGHT = 2;
    MillionaireView.DIR_DOWN = 3;
    MillionaireView.DIR_LEFT = 4;
    return MillionaireView;
}(BaseEuiView));
__reflect(MillionaireView.prototype, "MillionaireView");
//# sourceMappingURL=MillionaireView.js.map