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
var SmallMapPanel = (function (_super) {
    __extends(SmallMapPanel, _super);
    function SmallMapPanel(limit_W, limit_H) {
        if (limit_W === void 0) { limit_W = 200; }
        var _this = _super.call(this) || this;
        _this._fixedMaxNum = 0;
        _this._limit_width = 200;
        _this._limit_height = 0;
        _this.R_Scale = 0.58;
        _this.MOVE_DELAY = 300;
        _this.flagRes = ["wj_gray_flag_icon", "wj_green_flag_icon", "wj_red_flag_icon"];
        _this.entityRes = ["wj_green_point", "wj_blue_point"];
        if (limit_W)
            _this._limit_width = limit_W;
        if (limit_H)
            _this._limit_height = limit_H;
        return _this;
    }
    SmallMapPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.signList = [];
        this.initUI();
    };
    SmallMapPanel.prototype.onMapComplete = function (e) {
        if (this._limit_width)
            this.R_Scale = this._limit_width / this.mapBg.width;
        else if (this._limit_height)
            this.R_Scale = this._limit_height / this.mapBg.height;
        this.mapBg.width *= this.R_Scale;
        this.mapBg.height *= this.R_Scale;
        this.frameImg.width = this.mapBg.width;
        this.frameImg.height = this.mapBg.height;
        this.initFixedP();
    };
    SmallMapPanel.prototype.open = function (type) {
        this._curSceneType = type;
        this.observe(GameLogic.ins().postCreateOtherEntity, this.calcPlayMainEntityList);
        this.observe(WJBattlefieldSys.ins().postRefCampFlag, this.refreshFixedP);
        this.calcPlayMainEntityList();
        this.refreshCoordinate();
        this.refreshFixedP();
        TimerManager.ins().doTimer(this.MOVE_DELAY, 0, this.refreshCoordinate, this);
    };
    SmallMapPanel.prototype.close = function () {
        this.removeObserve();
        this.signList = [];
        TimerManager.ins().remove(this.refreshCoordinate, this);
    };
    SmallMapPanel.prototype.initUI = function () {
        this._fixedList = [];
        switch (this._curSceneType) {
            case SmallSceneType.WJBattle:
                this._fixedMaxNum = 3;
                for (var i = 0; i < this._fixedMaxNum; i++) {
                    this._fixedList[i] = new eui.Image();
                    this._fixedList[i].source = this.flagRes[0];
                    this._fixedList[i].anchorOffsetX = this._fixedList[i].width >> 1;
                    this._fixedList[i].anchorOffsetY = this._fixedList[i].height;
                    var pos = GlobalConfig.WujiBaseConfig.flagPoint[i];
                    this._fixedList[i].x = pos.x * GameMap.CELL_SIZE / 10 * this.R_Scale;
                    this._fixedList[i].y = pos.y * GameMap.CELL_SIZE / 10 * this.R_Scale;
                    this.addChild(this._fixedList[i]);
                }
                break;
        }
        this.mapBg = new eui.Image();
        this.mapBg.source = "map/" + GameMap.getFileName() + "/small.jpg";
        this.mapBg.addEventListener(egret.Event.COMPLETE, this.onMapComplete, this);
        this.addChildAt(this.mapBg, 0);
    };
    SmallMapPanel.prototype.initFixedP = function () {
        switch (this._curSceneType) {
            case SmallSceneType.WJBattle:
                for (var i = 0; i < this._fixedMaxNum; i++) {
                    var pos = GlobalConfig.WujiBaseConfig.flagPoint[i];
                    this._fixedList[i].x = pos.x * GameMap.CELL_SIZE / 10 * this.R_Scale;
                    this._fixedList[i].y = pos.y * GameMap.CELL_SIZE / 10 * this.R_Scale;
                }
                break;
        }
    };
    SmallMapPanel.prototype.refreshFixedP = function () {
        switch (this._curSceneType) {
            case SmallSceneType.WJBattle:
                for (var i = 0; i < this._fixedMaxNum; i++) {
                    if (WJBattlefieldSys.ins().flagInfos[i + 1]) {
                        this._fixedList[i].source = WJBattlefieldSys.ins().flagInfos[i + 1] == 100 ? this.flagRes[1] : this.flagRes[2];
                    }
                    else
                        this._fixedList[i].source = this.flagRes[0];
                }
                break;
        }
    };
    SmallMapPanel.prototype.refreshCoordinate = function () {
    };
    SmallMapPanel.prototype.calcPlayMainEntityList = function () {
        var list = {};
        var teams = {};
        var entityList = EntityManager.ins().getAllEntity();
        for (var i in entityList) {
            var entity = entityList[i];
            if (entity && entity.infoModel) {
                if (entity.infoModel.type != EntityType.Role)
                    continue;
                var role = entity.infoModel;
                if (!teams[role.name])
                    teams[role.name] = [];
                teams[role.name].push(entity);
            }
        }
        for (var s in teams) {
            var team = teams[s];
            team.sort(function (a, b) {
                if (a.infoModel.job < b.infoModel.job)
                    return -1;
                if (a.infoModel.job > b.infoModel.job)
                    return 1;
                return 0;
            });
            var mainEntity = team[0];
            list[mainEntity.infoModel.handle] = mainEntity;
        }
        this._entityList = list;
        return list;
    };
    return SmallMapPanel;
}(BaseView));
__reflect(SmallMapPanel.prototype, "SmallMapPanel");
var SmallSceneType;
(function (SmallSceneType) {
    SmallSceneType[SmallSceneType["WJBattle"] = 0] = "WJBattle";
})(SmallSceneType || (SmallSceneType = {}));
//# sourceMappingURL=SmallMapPanel.js.map