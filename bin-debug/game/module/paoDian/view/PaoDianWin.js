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
var PaoDianWin = (function (_super) {
    __extends(PaoDianWin, _super);
    function PaoDianWin() {
        var _this = _super.call(this) || this;
        _this._leftTime = 0;
        _this._stateList = ["one", "two", "three", "", "five"];
        _this.skinName = "PointFightSkin";
        return _this;
    }
    PaoDianWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.observe(PaoDianCC.ins().postEnterSuccess, this.updateTime);
        this.observe(PaoDianCC.ins().postBelongChange, this.update);
        this.observe(PaoDianCC.ins().postAreaChange, this.updateCurrentArea);
        this.update();
        this.updateTime();
        this.updateCurrentArea();
    };
    PaoDianWin.prototype.update = function () {
        var cfg, id;
        var belong;
        var btn;
        var char;
        for (var i = 0; i < 5; i++) {
            cfg = GlobalConfig.PassionPointConfig.expPoint[i];
            id = cfg[2];
            belong = PaoDianCC.ins().getBelongById(id);
            btn = this["area" + i];
            btn.name = belong ? belong.handler + "" : cfg[0] + "," + cfg[1];
            this["occupy" + i].visible = belong == null;
            if (belong) {
                char = EntityManager.ins().getEntityBymasterhHandle(belong.handler);
                if (char) {
                    this["name" + i].text = char.infoModel.name;
                    this["guild" + i].text = char.infoModel.guildName;
                }
                else {
                    this["name" + i].text = "";
                    this["guild" + i].text = "";
                }
            }
            else {
                this["name" + i].text = "";
                this["guild" + i].text = "";
            }
        }
    };
    PaoDianWin.prototype.updateTime = function () {
        TimerManager.ins().remove(this.repeat, this);
        this._leftTime = PaoDianCC.ins().getLeftTime();
        if (this._leftTime > 0) {
            TimerManager.ins().doTimer(1000, 0, this.repeat, this);
            this.repeat();
        }
        else
            this.wholeLeftTime.text = "";
    };
    PaoDianWin.prototype.repeat = function () {
        if (this._leftTime <= 0) {
            this.wholeLeftTime.text = "";
            TimerManager.ins().remove(this.repeat, this);
            return;
        }
        this.wholeLeftTime.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 4);
        this._leftTime--;
    };
    PaoDianWin.prototype.updateCurrentArea = function () {
        var cfg = GlobalConfig.PassionPointAwardConfig[PaoDianCC.ins().areaId];
        this.currentArea.currentState = this._stateList[cfg ? cfg.times - 1 : 0];
    };
    PaoDianWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
        TimerManager.ins().remove(this.repeat, this);
    };
    PaoDianWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.area0:
            case this.area1:
            case this.area2:
            case this.area3:
            case this.area4:
                var list = e.target.name.split(",");
                if (list.length == 1)
                    GameLogic.ins().postChangeAttrPoint(Number(list[0]));
                else {
                    GameLogic.ins().stopAI();
                    SysSetting.ins().setValue("mapClickTx", 0);
                    SysSetting.ins().setValue("mapClickTy", 0);
                    GameMap.moveTo(Number(list[0]) * GameMap.CELL_SIZE, Number(list[1]) * GameMap.CELL_SIZE);
                }
                break;
            case this.currentArea:
                PaoDianCC.ins().sendCheckMyInfo();
                ViewManager.ins().open(PaoDianCurrentWin);
                break;
            case this.help:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[20].text);
                break;
        }
    };
    return PaoDianWin;
}(BaseEuiView));
__reflect(PaoDianWin.prototype, "PaoDianWin");
ViewManager.ins().reg(PaoDianWin, LayerManager.Main_View);
//# sourceMappingURL=PaoDianWin.js.map